const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: ""
  },
  miniapp: {
    version: "1",
    name: "IWasHere", 
    subtitle: "Press once per 24h", 
    description: "A simple app where users can press a button once per 24 hours. Stops forever when Jesse presses.",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#1a1a1a",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["social", "game", "jesse", "24h", "cooldown"],
    heroImageUrl: `${ROOT_URL}/hero.png`, 
    tagline: "Press the button once per 24 hours",
    ogTitle: "IWasHere - Press once per 24h",
    ogDescription: "A simple app where users can press a button once per 24 hours. Stops forever when Jesse presses.",
    ogImageUrl: `${ROOT_URL}/hero.png`,
  },
} as const;
