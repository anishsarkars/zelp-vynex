'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import { APP_CONFIG } from '@/lib/config'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'b56e18d47c72ab683b10817fe69cdb4b' // IMPORTANT: Replace this with your actual WalletConnect Project ID!

// 2. Set chains
const robinhoodChain = {
  chainId: APP_CONFIG.chain.chainId,
  name: APP_CONFIG.chain.name,
  currency: APP_CONFIG.chain.currency.symbol,
  explorerUrl: APP_CONFIG.chain.explorer,
  rpcUrl: APP_CONFIG.chain.rpc
}

// 3. Create a metadata object
const metadata = {
  name: 'Zelp',
  description: 'YieldShares and Morpho Markets on Robinhood Chain',
  url: 'https://zelpp.vercel.app',
  icons: ['https://zelpp.vercel.app/logo.png']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
  /*Optional*/
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  defaultChainId: APP_CONFIG.chain.chainId,
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [robinhoodChain],
  projectId,
  enableAnalytics: false, 
  enableOnramp: false
})

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
