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

type ProviderName = 'ipapi' | 'ipwhois';

/**
 * Fetch with timeout and retry
 */
async function fetchWithTimeoutAndRetry(url: string, attempts = 2, timeout = 5000): Promise<unknown> {
    let lastError: unknown = null;
    for (let attempt = 1; attempt <= attempts; attempt++) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        try {
            const res = await fetch(url, { signal: controller.signal });
            clearTimeout(id);
            if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
            const data = await res.json();
            return data;
        } catch (err) {
            lastError = err;
            clearTimeout(id);
            if (attempt < attempts) {
                // exponential backoff
                await new Promise((r) => setTimeout(r, 300 * attempt));
                continue;
            }
            throw err;
        }
    }
    throw lastError;
}

function mapToClientLocation(data: unknown, provider: ProviderName): ClientLocation | null {
    if (!data || typeof data !== 'object') return null;

    const d = data as Record<string, unknown>;

    const getString = (v: unknown) => (typeof v === 'string' && v.trim() !== '') ? v as string : undefined;
    const getNumber = (v: unknown) => (typeof v === 'number' ? v as number : (typeof v === 'string' && v.trim() !== '' ? Number(v) : undefined));

    // ipapi.co (https://ipapi.co/json/)
    if (provider === 'ipapi') {
        const city = getString(d.city) ?? getString(d['city']);
        const region = getString(d.region) ?? getString(d['region']) ?? getString(d.region_name) ?? getString(d.regionName);
        const country = getString(d.country_name) ?? getString(d.country);
        const isp = getString(d.org) ?? getString(d['org']) ?? getString(d.isp);
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

    // ipwhois.app / generic fallback
    if (provider === 'ipwhois') {
        const nested = (d['data'] && typeof d['data'] === 'object') ? (d['data'] as Record<string, unknown>) : undefined;
        const city = getString(d.city) ?? getString(nested?.city);
        const region = getString(d.region) ?? getString(d.region_name) ?? getString(nested?.region);
        const country = getString(d.country) ?? getString(d.country_name) ?? getString(nested?.country);
        const isp = getString(d.isp) ?? getString(d.org) ?? getString(nested?.isp) ?? getString(nested?.org);
        const lat = getNumber(d.latitude) ?? getNumber(d.lat) ?? getNumber(nested?.latitude) ?? getNumber(nested?.lat);
        const lon = getNumber(d.longitude) ?? getNumber(d.lon) ?? getNumber(nested?.longitude) ?? getNumber(nested?.lon);

        if (city || country) {
            return {
                city: city || 'Unknown',
                region: region || 'Unknown',
                country: country || 'Unknown',
                isp: isp || 'Unknown',
                lat: lat !== undefined ? lat : undefined,
                lon: lon !== undefined ? lon : undefined,
            };
        }
        return null;
    }

    return null;
}

/**
 * Hook to fetch client's geolocation based on their IP address
 * Uses HTTPS providers and caches results in localStorage
 */
export const useClientLocation = () => {
    const [location, setLocation] = useState<ClientLocation>(DEFAULT_LOCATION);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        if (typeof window === 'undefined') return;
        setIsLoading(true);
        setError(null);

        // Check cache first
        try {
            const raw = localStorage.getItem(CACHE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && parsed.time && Date.now() - parsed.time < CACHE_TTL) {
                    setLocation(parsed.data as ClientLocation);
                    setIsLoading(false);
                    return;
                }
            }
        } catch (err) {
            // ignore cache parse errors
            console.warn('Failed to read cached location', err);
        }

        // Providers (HTTPS first to avoid mixed-content issues)
        const providers: { url: string; name: ProviderName }[] = [
            { url: 'https://ipapi.co/json/', name: 'ipapi' },
            { url: 'https://ipwhois.app/json/', name: 'ipwhois' },
        ];

        let found: ClientLocation | null = null;

        for (const p of providers) {
            try {
                const data = await fetchWithTimeoutAndRetry(p.url, 2, 5000);
                const mapped = mapToClientLocation(data, p.name);
                if (mapped) {
                    found = mapped;
                    break;
                }
            } catch (err) {
                console.warn(`GeoIP provider ${p.name} failed:`, err);
                continue;
            }
        }

        if (found) {
            setLocation(found);
            try {
                localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), data: found }));
            } catch (err) {
                console.warn('Failed to cache location', err);
            }
        } else {
            setLocation(DEFAULT_LOCATION);
            setError('Could not determine location');
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        // Fire-and-forget fetch on mount
        void refetch();
    }, [refetch]);

    return { location, isLoading, error, refetch };
};
