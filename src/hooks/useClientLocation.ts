// hooks/useClientLocation.ts
'use client';

import { useEffect, useState, useCallback } from 'react';

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

// Use a **CORS-proxy** that works on Vercel
const PROXY_URL = 'https://api.allorigins.win/get?url=';

async function fetchWithProxy(url: string): Promise<any> {
  const encoded = encodeURIComponent(url);
  const proxy = `${PROXY_URL}${encoded}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(proxy, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const content = data.contents ? JSON.parse(data.contents) : null;
    return content;
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

function mapLocation(data: any): ClientLocation | null {
  if (!data || typeof data !== 'object') return null;

  const get = (keys: string[]) => {
    for (const k of keys) {
      if (data[k] && typeof data[k] === 'string' && data[k].trim()) {
        return data[k].trim();
      }
    }
    return null;
  };

  const city = get(['city', 'region', 'regionName', 'district']);
  const region = get(['region', 'regionName', 'state', 'province']);
  const country = get(['country', 'country_name', 'countryCode', 'country_code']);
  const isp = get(['isp', 'org', 'as', 'connection.isp']);
  const lat = data.lat ?? data.latitude ?? data.latitud;
  const lon = data.lon ?? data.longitude ?? data.longitud;

  if (city || country) {
    return {
      city: city || 'Unknown',
      region: region || 'Unknown',
      country: country || 'Unknown',
      isp: isp || 'Unknown',
      lat: typeof lat === 'number' ? lat : undefined,
      lon: typeof lon === 'number' ? lon : undefined,
    };
  }
  return null;
}

export const useClientLocation = () => {
  const [location, setLocation] = useState<ClientLocation>(DEFAULT_LOCATION);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = useCallback(async () => {
    if (typeof window === 'undefined') return;

    setIsLoading(true);
    setError(null);

    const apis = [
      'https://ipapi.co/json/',
      'https://ipwho.is/',
      'https://ip-api.com/json/',
      'https://get.geojs.io/v1/ip/geo.json',
    ];

    let found: ClientLocation | null = null;

    for (const api of apis) {
      try {
        const data = await fetchWithProxy(api);
        const mapped = mapLocation(data);
        if (mapped && (mapped.city !== 'Unknown' || mapped.country !== 'Unknown')) {
          found = mapped;
          break;
        }
      } catch (err) {
        console.warn(`Geo API failed: ${api}`, err);
      }
    }

    if (found) {
      setLocation(found);
      // Optional: cache in memory only (avoid localStorage issues)
    } else {
      // Fallback: Use browser geolocation
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setLocation({
              city: 'Unknown',
              region: 'Unknown',
              country: 'Unknown',
              isp: 'Unknown',
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
            });
          },
          () => {
            setLocation(DEFAULT_LOCATION);
            setError('Location denied');
          },
          { timeout: 5000 }
        );
      } else {
        setLocation(DEFAULT_LOCATION);
        setError('Geolocation not supported');
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return { location, isLoading, error, refetch: fetchLocation };
};