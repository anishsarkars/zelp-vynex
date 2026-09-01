export const APP_CONFIG = {
  brand: "Zelp",
  ticker: "ZELP",
  
  chain: {
    name: "Robinhood Chain",
    chainId: 4663,
    rpc: "https://robinhood-rpc.publicnode.com",
    rpcs: [
      "https://robinhood-rpc.publicnode.com",
      "https://rpc.mainnet.chain.robinhood.com",
    ],
    explorer: "https://robinhoodchain.blockscout.com",
    currency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },

  vaults: {
    factory: "0xee57E1B9B87Ca4318E046FAE2C45923f61d8D199",
    extra: [
      { address: "0x01680B41D61253a61c4C55e897a05D10F280cD2A" }
    ],
    assets: {
      USDG:  { name: "Global Dollar", decimals: 6 },
      NVDA:  { name: "NVIDIA",        decimals: 18 },
      TSLA:  { name: "Tesla",         decimals: 18 },
      AAPL:  { name: "Apple",         decimals: 18 },
      MSFT:  { name: "Microsoft",     decimals: 18 },
      AMZN:  { name: "Amazon",        decimals: 18 },
      GOOGL: { name: "Alphabet",      decimals: 18 },
      META:  { name: "Meta",          decimals: 18 },
      AMD:   { name: "AMD",           decimals: 18 },
      AVGO:  { name: "Broadcom",      decimals: 18 },
      COIN:  { name: "Coinbase",      decimals: 18 },
      PLTR:  { name: "Palantir",      decimals: 18 },
      SPY:   { name: "S&P 500 ETF",   decimals: 18 },
      QQQ:   { name: "Nasdaq 100 ETF", decimals: 18 },
      GLD:   { name: "SPDR Gold Trust",   decimals: 18 },
      SLV:   { name: "iShares Silver",    decimals: 18 },
    },
  },

  stable: { t: "USDG", name: "Global Dollar", address: "0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168", decimals: 6 },
};
