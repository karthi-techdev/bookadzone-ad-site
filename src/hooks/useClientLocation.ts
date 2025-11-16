// hooks/useClientLocation.ts
'use client';

import { useEffect, useState } from 'react';

export interface ClientLocation {
  city: string;
  region: string;
  country: string;
  isp: string;
  lat?: number;
  lon?: number;
}

const DEFAULT = { city: 'Unknown', region: 'Unknown', country: 'Unknown', isp: 'Unknown' };

export const useClientLocation = () => {
  const [location, setLocation] = useState<ClientLocation>(DEFAULT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const apis = [
      'https://ipapi.co/json/',
      'https://ipwho.is/',
      'https://ip-api.com/json/',
    ];

    const tryApi = async (url: string) => {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) return null;
        const data = await res.json();

        const city = data.city || data.region || 'Unknown';
        const country = data.country_name || data.country || data.countryCode || 'Unknown';

        if (city !== 'Unknown' || country !== 'Unknown') {
          return {
            city,
            region: data.regionName || data.region || 'Unknown',
            country,
            isp: data.isp || data.org || 'Unknown',
            lat: data.lat ?? data.latitude,
            lon: data.lon ?? data.longitude,
          };
        }
      } catch {
        return null;
      }
      return null;
    };

    (async () => {
      for (const api of apis) {
        const result = await tryApi(api);
        if (result) {
          setLocation(result);
          clearTimeout(timeout);
          setIsLoading(false);
          return;
        }
      }

      // Fallback: browser geolocation
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setLocation({
              ...DEFAULT,
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
            });
          },
          () => setLocation(DEFAULT),
          { timeout: 5000 }
        );
      } else {
        setLocation(DEFAULT);
      }
      setIsLoading(false);
    })();

    return () => clearTimeout(timeout);
  }, []);

  return { location, isLoading };
};