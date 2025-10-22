const getRootUrl = () => {
  const explicit = process.env.NEXT_PUBLIC_URL;
  if (explicit) return explicit;

  const deployment =
    process.env.VERCEL_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (deployment) {
    return deployment.startsWith('http') ? deployment : `https://${deployment}`;
  }

  return 'http://localhost:3000';
};

const ROOT_URL = getRootUrl();

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  accountAssociation: {
    "header": "eyJmaWQiOjQyMTU2MCwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDVERjk2RjUwMTc5OTk4QzhEODE1MTA4OEI4NEI1ZmZDOWQ0NDY3MjgifQ",
    "payload": "eyJkb21haW4iOiJpd2FzaGVyZWFwcC15YmJqLnZlcmNlbC5hcHAifQ",
    "signature": "rNW/ddr+6VkgOF/QzON3d6+kGSEviZuUskb/H7iUK00lP+90BkrIYtjzh9kJcs9r7ggcy0vLEr0KHu0y69qZRxw="
  },
  miniapp: {
    version: "1",
    name: "IWasHere", 
    subtitle: "Press once per 24h", 
    description: "A simple app where users can press a button once per 24 hours. Stops forever when Jesse presses.",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.svg`],
    iconUrl: `${ROOT_URL}/icon.svg`,
    splashImageUrl: `${ROOT_URL}/splash.svg`,
    splashBackgroundColor: "#1a1a1a",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["social", "game", "jesse", "24h", "cooldown"],
    heroImageUrl: `${ROOT_URL}/hero.svg`, 
    tagline: "Press the button once per 24 hours",
    ogTitle: "IWasHere - Press once per 24h",
    ogDescription: "A simple app where users can press a button once per 24 hours. Stops forever when Jesse presses.",
    ogImageUrl: `${ROOT_URL}/hero.svg`,
  },
} as const;
