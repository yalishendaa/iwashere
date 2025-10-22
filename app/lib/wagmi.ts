import { createConfig, http } from 'wagmi';
import { base } from 'viem/chains';
import { injected, walletConnect } from 'wagmi/connectors';
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '';

// Create wagmi config
const isMiniApp = typeof window !== 'undefined' && !!(window as any).farcaster;

export const config = createConfig({
  chains: [base],
  connectors: [
    ...(isMiniApp ? [farcasterMiniApp()] : []),
    injected(),
    ...(projectId ? [walletConnect({ projectId })] : []),
  ],
  transports: {
    [base.id]: http(),
  },
});
