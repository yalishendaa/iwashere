import { createConfig, http } from 'wagmi';
import { base } from 'viem/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '';

// Create wagmi config
export const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    ...(projectId ? [walletConnect({ projectId })] : []),
  ],
  transports: {
    [base.id]: http(),
  },
});
