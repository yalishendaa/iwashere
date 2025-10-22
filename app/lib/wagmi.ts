import { getDefaultConfig } from '@coinbase/onchainkit';
import { base } from 'viem/chains';

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '';

// Create wagmi config
export const config = getDefaultConfig({
  appName: 'IWasHere',
  appDescription: 'A simple app where users can press a button once per 24 hours',
  appUrl: 'https://iwashere.vercel.app', // your app's url
  appIcon: 'https://iwashere.vercel.app/icon.png', // your app's icon
  chains: [base],
  projectId,
});
