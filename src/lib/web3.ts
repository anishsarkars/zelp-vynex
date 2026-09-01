import { ethers } from 'ethers';
import { APP_CONFIG } from './config';

export interface VaultData {
  address: string;
  asset: string;
  assetSymbol: string;
  symbol: string;
  name: string;
  decimals: number;
  totalAssets: bigint;
  totalSupply: bigint;
  pricePerShare: bigint;
  feeBps: number;
  shares?: bigint;
  assetBalance?: bigint;
  worth?: bigint;
  earning: boolean;
}

const FACTORY_ABI = [
  "function allVaults() view returns (address[])",
  "function vaultCount() view returns (uint256)",
];

const VAULT_ABI = [
  "function asset() view returns (address)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalAssets() view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function pricePerShare() view returns (uint256)",
  "function feeBps() view returns (uint16)",
  "function perfFeeBps() view returns (uint16)",
  "function harvester() view returns (address)",
  "function target() view returns (address)",
  "function convertToAssets(uint256) view returns (uint256)",
];

const ERC20_ABI = [
  "function symbol() view returns (string)",
  "function name() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
];

export function getProvider() {
  return new ethers.JsonRpcProvider(APP_CONFIG.chain.rpc, APP_CONFIG.chain.chainId, {
    staticNetwork: true,
    batchMaxCount: 8,
  });
}

export async function connectWallet() {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    throw new Error("No Ethereum wallet found in this browser.");
  }
  
  const raw = (window as any).ethereum;
  const accounts = await raw.request({ method: "eth_requestAccounts" });
  if (!accounts || accounts.length === 0) throw new Error("No accounts found.");

  const provider = new ethers.BrowserProvider(raw);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  const net = await provider.getNetwork();
  if (Number(net.chainId) !== APP_CONFIG.chain.chainId) {
    const hexChainId = "0x" + APP_CONFIG.chain.chainId.toString(16);
    try {
      await raw.request({ method: "wallet_switchEthereumChain", params: [{ chainId: hexChainId }] });
    } catch (e: any) {
      if (e.code === 4902 || e.code === -32603) {
        await raw.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: hexChainId,
            chainName: APP_CONFIG.chain.name,
            nativeCurrency: APP_CONFIG.chain.currency,
            rpcUrls: [APP_CONFIG.chain.rpc],
            blockExplorerUrls: [APP_CONFIG.chain.explorer],
          }],
        });
        await raw.request({ method: "wallet_switchEthereumChain", params: [{ chainId: hexChainId }] });
      } else {
        throw e;
      }
    }
  }

  return { provider, signer, address };
}

export async function listVaults(holder?: string): Promise<VaultData[]> {
  const p = getProvider();
  
  const factory = new ethers.Contract(APP_CONFIG.vaults.factory, FACTORY_ABI, p);
  const factoryAddrs: string[] = await factory.allVaults();
  
  // Combine factory vaults with extra routed vaults (like USDG)
  const addrs = [
    ...(APP_CONFIG.vaults.extra || []).map(e => e.address),
    ...factoryAddrs
  ];
  
  const vaults: VaultData[] = [];
  
  // To avoid massive batch limits, we loop and fetch sequentially, or parallel with limits
  for (const addr of addrs) {
    try {
      const v = new ethers.Contract(addr, VAULT_ABI, p);
      
      const symbol = await v.symbol();
      const name = await v.name();
      const decimals = Number(await v.decimals());
      const asset = await v.asset();
      
      const a = new ethers.Contract(asset, ERC20_ABI, p);
      const assetSymbol = await a.symbol();
      
      const totalAssets = await v.totalAssets();
      const totalSupply = await v.totalSupply();
      const pricePerShare = await v.pricePerShare();
      
      let feeBps = 0;
      try { feeBps = Number(await v.feeBps()); } catch(e) { 
        try { feeBps = Number(await v.perfFeeBps()); } catch(ex) {}
      }

      let earning = false;
      try {
        const harvester = await v.harvester();
        if (harvester && harvester !== ethers.ZeroAddress) earning = true;
      } catch(e) {}

      let shares = 0n;
      let assetBalance = 0n;
      let worth = 0n;
      
      if (holder) {
        try { shares = await v.balanceOf(holder); } catch(e) {}
        try { assetBalance = await a.balanceOf(holder); } catch(e) {}
        if (shares > 0n) {
          try { worth = await v.convertToAssets(shares); } catch(e) {}
        }
      }
      
      vaults.push({
        address: addr,
        asset,
        assetSymbol,
        symbol,
        name,
        decimals,
        totalAssets,
        totalSupply,
        pricePerShare,
        feeBps,
        shares,
        assetBalance,
        worth,
        earning
      });
    } catch(err) {
      console.warn("Failed to fetch vault", addr, err);
    }
  }
  
  return vaults;
}
