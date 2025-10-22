# IWasHere - Base Mini App

A Base Mini App where users can press a button once per 24 hours. The contract stops forever when JESSE (0x2211d1D0020DAEA8039E46Cf1367962070d77DA9) presses for the first time.

## Prerequisites

- Base app account
- Vercel account for hosting
- Deployed smart contract address

## Quick Start

### 1. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/iwashere-miniapp)

**Note:** Make sure to add the following environment variables in Vercel:
- `NEXT_PUBLIC_CONTRACT_ADDRESS` - Your deployed contract address
- `NEXT_PUBLIC_PROJECT_ID` - WalletConnect project ID (optional)

### 2. Clone Repository

```bash
git clone https://github.com/your-username/iwashere-miniapp
cd iwashere-miniapp
npm install
```

### 3. Update Manifest Configuration

Edit `minikit.config.ts` to customize your app:

```typescript
export const minikitConfig = {
  accountAssociation: { // this will be added in step 5
    "header": "",
    "payload": "",
    "signature": ""
  },
  miniapp: {
    version: "1",
    name: "IWasHere", 
    subtitle: "Press once per 24h", 
    description: "A simple app where users can press a button once per 24 hours. Stops forever when Jesse presses.",
    // ... other configuration
  },
} as const;
```

### 4. Set Contract Address

```bash
# Copy environment file
cp env.example .env.local

# Edit .env.local with your deployed contract address:
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

### 5. Create Account Association

1. Ensure all changes are live by pushing to the `main` branch
2. Turn off Vercel's **Deployment Protection** in your project settings
3. Navigate to the [Base Build Account association tool](https://build.base.org/account-association)
4. Paste your domain in the `App URL` field and click "Submit"
5. Click "Verify" and follow instructions to generate `accountAssociation` fields
6. Copy the `accountAssociation` object and update `minikit.config.ts`

### 6. Push Updates to Production

```bash
git add .
git commit -m "Update manifest configuration"
git push origin main
```

### 7. Preview Your App

Go to [base.dev/preview](https://base.dev/preview) to validate your app:
1. Add your app URL to view embeds
2. Use "Account association" tab to verify credentials
3. Use "Metadata" tab to check manifest fields
4. Confirm `/.well-known/farcaster.json` returns your live manifest

### 8. Publish to Base App

Create a post in the Base app with your app's URL to publish it.

## Contract Integration

This app integrates with a smart contract that:
- Allows users to press once per 24 hours
- Tracks per-address counter and last press timestamp
- Stops forever when JESSE presses for the first time
- Emits events: `Pressed`, `StoppedByJesse`

## Environment Variables

- `NEXT_PUBLIC_CONTRACT_ADDRESS`: Deployed contract address
- `NEXT_PUBLIC_PROJECT_ID`: WalletConnect project ID (optional)
- `NEXT_PUBLIC_URL`: App URL for production

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
iwashere/
├── app/
│   ├── .well-known/
│   │   └── farcaster.json    # Mini app manifest
│   ├── api/
│   │   └── webhook/          # Webhook endpoint
│   ├── components/           # React components
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilities and config
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── public/                  # Static assets
├── minikit.config.ts       # Mini app configuration
└── package.json
```

## Base Mini App Features

- ✅ Farcaster manifest integration
- ✅ Farcaster QuickAuth sign-in
- ✅ Account association with Base
- ✅ OnchainKit wallet connection
- ✅ Smart contract integration
- ✅ Webhook support
- ✅ Vercel deployment ready

## License

MIT
