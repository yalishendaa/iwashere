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

const ICON_URL =
  process.env.NEXT_PUBLIC_ICON_URL ||
  'https://placehold.co/1024x1024.png?text=IWasHere';

const SCREENSHOT_URL =
  process.env.NEXT_PUBLIC_SCREENSHOT_URL ||
  'https://placehold.co/1080x1920.png?text=IWasHere';

const SPLASH_URL =
  process.env.NEXT_PUBLIC_SPLASH_URL ||
  'https://placehold.co/2048x2048.png?text=IWasHere';

const HERO_URL =
  process.env.NEXT_PUBLIC_HERO_URL ||
  'https://placehold.co/1200x630.png?text=IWasHere';

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
    screenshotUrls: [SCREENSHOT_URL],
    iconUrl: ICON_URL,
    splashImageUrl: SPLASH_URL,
    splashBackgroundColor: "#1a1a1a",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["social", "game", "jesse", "24h", "cooldown"],
    heroImageUrl: HERO_URL, 
    tagline: "Press the button once per 24 hours",
    ogTitle: "IWasHere - Press once per 24h",
    ogDescription: "A simple app where users can press a button once per 24 hours. Stops forever when Jesse presses.",
    ogImageUrl: HERO_URL,
  },
} as const;
