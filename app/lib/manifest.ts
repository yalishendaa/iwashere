import { headers } from 'next/headers';
import { minikitConfig } from '../../minikit.config';

const revalidateSeconds = 60;

export const manifestRevalidate = revalidateSeconds;

export function buildManifest() {
  const headerList = typeof headers === 'function' ? headers() : null;
  const forwardedProto = headerList?.get('x-forwarded-proto');
  const proto =
    forwardedProto && forwardedProto.includes('https')
      ? 'https'
      : forwardedProto ?? 'https';
  const host =
    headerList?.get('x-forwarded-host') ?? headerList?.get('host') ?? '';

  const rootUrl =
    process.env.NEXT_PUBLIC_URL || minikitConfig.miniapp.homeUrl || '';

  const baseFromConfig = resolveOrigin(rootUrl);
  const base = baseFromConfig || (host ? `${proto}://${host}` : '');

  const absolutize = (value: string | undefined) => {
    if (!value) return value;
    if (value.startsWith('http://') || value.startsWith('https://')) {
      return value;
    }
    if (!base) return value;
    if (value.startsWith('/')) return `${base}${value}`;
    return `${base}/${value}`;
  };

  const { miniapp, accountAssociation } = minikitConfig;

  return {
    accountAssociation,
    version: miniapp.version,
    name: miniapp.name,
    subtitle: miniapp.subtitle,
    description: miniapp.description,
    screenshotUrls: miniapp.screenshotUrls.map(absolutize),
    iconUrl: absolutize(miniapp.iconUrl),
    splashImageUrl: absolutize(miniapp.splashImageUrl),
    splashBackgroundColor: miniapp.splashBackgroundColor,
    homeUrl: baseFromConfig ?? absolutize(miniapp.homeUrl),
    webhookUrl: absolutize(miniapp.webhookUrl),
    primaryCategory: miniapp.primaryCategory,
    tags: miniapp.tags,
    heroImageUrl: absolutize(miniapp.heroImageUrl),
    tagline: miniapp.tagline,
    ogTitle: miniapp.ogTitle,
    ogDescription: miniapp.ogDescription,
    ogImageUrl: absolutize(miniapp.ogImageUrl),
  };
}

function resolveOrigin(url: string | undefined) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.origin;
  } catch {
    return null;
  }
}
