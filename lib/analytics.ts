export interface UTMParameters {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
}

export function getAnalyticsData(): UTMParameters {
  if (typeof window === "undefined") return {};

  const searchParams = new URLSearchParams(window.location.search);
  return {
    utmSource: searchParams.get("utm_source") || undefined,
    utmMedium: searchParams.get("utm_medium") || undefined,
    utmCampaign: searchParams.get("utm_campaign") || undefined,
    referrer: document.referrer || undefined,
  };
}
