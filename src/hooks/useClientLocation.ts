import { useState, useEffect, useCallback } from 'react';

export interface ClientLocation {
  city: string;
  region: string;
  country: string;
  isp: string;
  lat?: number;
  lon?: number;
}

const DEFAULT_LOCATION: ClientLocation = {
  city: 'Unknown',
  region: 'Unknown',
  country: 'Unknown',
  isp: 'Unknown',
};

const CACHE_KEY = 'clientLocation_v1';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// Updated union type to include all providers
type ProviderName = 'ipapi' | 'ipwhois' | 'ip-api';

async function fetchWithTimeoutAndRetry(
  url: string,
  attempts = 2,
  timeout = 5000
): Promise<unknown> {
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(id);

      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      return await res.json();
    } catch (err: unknown) {
      lastError = err;
      clearTimeout(id);

      if (attempt < attempts) {
        await new Promise((r) => setTimeout(r, 300 * attempt));
      }
    }
  }

  throw lastError;
}

function mapToClientLocation(
  data: unknown,
  provider: ProviderName
): ClientLocation | null {
  if (!data || typeof data !== 'object') return null;

  const d = data as Record<string, unknown>;

  const getString = (v: unknown) =>
    typeof v === 'string' && v.trim() !== '' ? v : undefined;

  const getNumber = (v: unknown) =>
    typeof v === 'number'
      ? v
      : typeof v === 'string' && v.trim() !== ''
      ? Number(v)
      : undefined;

  // === ipapi.co ===
  if (provider === 'ipapi') {
    const city = getString(d.city);
    const region =
      getString(d.region) ??
      getString(d.region_name) ??
      getString(d.regionName);
    const country = getString(d.country_name) ?? getString(d.country);
    const isp = getString(d.org) ?? getString(d.isp);
    const lat = getNumber(d.latitude) ?? getNumber(d.lat);
    const lon = getNumber(d.longitude) ?? getNumber(d.lon);

    if (city || country) {
      return {
        city: city || 'Unknown',
        region: region || 'Unknown',
        country: country || 'Unknown',
        isp: isp || 'Unknown',
        lat,
        lon,
      };
    }
    return null;
  }

  // === ipwhois.app / ipwho.is ===
  if (provider === 'ipwhois') {
    const nested =
      d.data && typeof d.data === 'object'
        ? (d.data as Record<string, unknown>)
        : undefined;

    const city = getString(d.city) ?? getString(nested?.city);
    const region =
      getString(d.region) ??
      getString(d.region_name) ??
      getString(nested?.region);
    const country =
      getString(d.country) ??
      getString(d.country_name) ??
      getString(nested?.country);
    const isp =
      getString(d.isp) ??
      getString(d.org) ??
      getString(nested?.isp) ??
      getString(nested?.org);
    const lat =
      getNumber(d.latitude) ??
      getNumber(d.lat) ??
      getNumber(nested?.latitude) ??
      getNumber(nested?.lat);
    const lon =
      getNumber(d.longitude) ??
      getNumber(d.lon) ??
      getNumber(nested?.longitude) ??
      getNumber(nested?.lon);

    if (city || country) {
      return {
        city: city || 'Unknown',
        region: region || 'Unknown',
        country: country || 'Unknown',
        isp: isp || 'Unknown',
        lat,
        lon,
      };
    }
    return null;
  }

  // === ip-api.com ===
  if (provider === 'ip-api') {
    const city = getString(d.city);
    const region = getString(d.regionName);
    const country = getString(d.country) ?? getString(d.countryCode);
    const isp = getString(d.isp) ?? getString(d.org);
    const lat = getNumber(d.lat);
    const lon = getNumber(d.lon);

    if (city || country) {
      return {
        city: city || 'Unknown',
        region: region || 'Unknown',
        country: country || 'Unknown',
        isp: isp || 'Unknown',
        lat,
        lon,
      };
    }
    return null;
  }

  return null;
}

// Hook
export const useClientLocation = () => {
  const [location, setLocation] = useState<ClientLocation>(DEFAULT_LOCATION);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (typeof window === 'undefined') return;

    setIsLoading(true);
    setError(null);

    // Try cache
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { time: number; data: ClientLocation };
        if (parsed?.time && Date.now() - parsed.time < CACHE_TTL) {
          setLocation(parsed.data);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Cache read failed:', e);
    }

    let found: ClientLocation | null = null;

    const providers = [
      { url: 'https://ip-api.com/json/', name: 'ip-api' as const },
      { url: 'https://ipwho.is/', name: 'ipwhois' as const },
      { url: 'https://ipapi.co/json/', name: 'ipapi' as const },
    ];

    for (const p of providers) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(p.url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!res.ok) continue;

        const data = (await res.json()) as unknown;
        const mapped = mapToClientLocation(data, p.name);

        if (
          mapped &&
          (mapped.city !== 'Unknown' || mapped.country !== 'Unknown')
        ) {
          found = mapped;
          break;
        }
      } catch (err: unknown) {
        const errorObj =
          err instanceof Error ? err : new Error(String(err));

        if (errorObj.name !== 'AbortError') {
          console.warn(`Provider ${p.name} failed:`, errorObj.message);
        }
      }
    }

    if (found) {
      setLocation(found);

      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ time: Date.now(), data: found })
        );
      } catch (e) {
        console.warn('Cache write failed:', e);
      }
    } else {
      setLocation(DEFAULT_LOCATION);
      setError('Could not determine location');
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { location, isLoading, error, refetch };
};
