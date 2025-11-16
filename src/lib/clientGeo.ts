// -----------------------------------------------------
// Types
// -----------------------------------------------------
export interface ILocation {
    city: string;
    region?: string;
    country?: string;
    isp?: string;
    lat?: number;
    lon?: number;
}

// Strong typing for provider mapper input
type ProviderResponse = Record<string, unknown>;

// -----------------------------------------------------
// Localhost check
// -----------------------------------------------------
const isLocalhostIp = (ip?: string) => {
    if (!ip) return false;
    return ip === '::1' || ip === '127.0.0.1' || ip.startsWith('::ffff:127.');
};

// -----------------------------------------------------
// Fetch with timeout wrapper
// -----------------------------------------------------
async function fetchWithTimeout(url: string, timeout = 5000): Promise<ProviderResponse> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        return (await res.json()) as ProviderResponse;
    } finally {
        clearTimeout(id);
    }
}

// -----------------------------------------------------
// Main function - Get location by IP (Client side)
// -----------------------------------------------------
export async function getLocationFromIp(ip?: string): Promise<ILocation | null> {
    if (!ip || isLocalhostIp(ip)) {
        return { city: 'Localhost', country: 'Local', region: 'Local' };
    }

    // -------------------------------
    // Provider definitions
    // -------------------------------
    const providers: {
        name: string;
        url: string;
        mapper: (data: ProviderResponse) => ILocation | null;
    }[] = [
            {
                name: 'ipapi',
                url:
                    ip && ip.trim()
                        ? `https://ipapi.co/${encodeURIComponent(ip)}/json/`
                        : 'https://ipapi.co/json/',

                mapper: (data: ProviderResponse): ILocation | null => {
                    if (!data) return null;

                    const city =
                        (data.city as string) ||
                        undefined;

                    const region =
                        (data.region as string) ||
                        (data.region_name as string) ||
                        (data.regionName as string) ||
                        undefined;

                    const country =
                        (data.country_name as string) ||
                        (data.country as string) ||
                        undefined;

                    const isp =
                        (data.org as string) ||
                        (data.isp as string) ||
                        undefined;

                    const lat =
                        (data.latitude as number) ??
                        (data.lat as number) ??
                        undefined;

                    const lon =
                        (data.longitude as number) ??
                        (data.lon as number) ??
                        undefined;

                    if (!city && !country) return null;

                    return {
                        city: city ?? 'Unknown',
                        region: region ?? 'Unknown',
                        country: country ?? 'Unknown',
                        isp: isp ?? 'Unknown',
                        lat: lat !== undefined ? Number(lat) : undefined,
                        lon: lon !== undefined ? Number(lon) : undefined,
                    };
                },
            },

            {
                name: 'ipwhois',
                url:
                    ip && ip.trim()
                        ? `https://ipwhois.app/json/${encodeURIComponent(ip)}`
                        : 'https://ipwhois.app/json/',

                mapper: (data: ProviderResponse): ILocation | null => {
                    if (!data) return null;

                    const nested = (data.data ?? {}) as ProviderResponse;

                    const city =
                        (data.city as string) ||
                        (nested.city as string) ||
                        undefined;

                    const region =
                        (data.region as string) ||
                        (data.region_name as string) ||
                        (nested.region as string) ||
                        undefined;

                    const country =
                        (data.country as string) ||
                        (data.country_name as string) ||
                        (nested.country as string) ||
                        undefined;

                    const isp =
                        (data.isp as string) ||
                        (data.org as string) ||
                        (nested.isp as string) ||
                        (nested.org as string) ||
                        undefined;

                    const lat =
                        (data.latitude as number) ??
                        (data.lat as number) ??
                        (nested.latitude as number) ??
                        (nested.lat as number) ??
                        undefined;

                    const lon =
                        (data.longitude as number) ??
                        (data.lon as number) ??
                        (nested.longitude as number) ??
                        (nested.lon as number) ??
                        undefined;

                    if (!city && !country) return null;

                    return {
                        city: city ?? 'Unknown',
                        region: region ?? 'Unknown',
                        country: country ?? 'Unknown',
                        isp: isp ?? 'Unknown',
                        lat: lat !== undefined ? Number(lat) : undefined,
                        lon: lon !== undefined ? Number(lon) : undefined,
                    };
                },
            },
        ];

    // -----------------------------------------------------
    // Try providers in order (with retry)
    // -----------------------------------------------------
    for (const p of providers) {
        try {
            const data = await fetchWithTimeout(p.url, 5000);
            const mapped = p.mapper(data);
            if (mapped) return mapped;

            // retry once
            const data2 = await fetchWithTimeout(p.url, 5000);
            const mapped2 = p.mapper(data2);
            if (mapped2) return mapped2;
        } catch {
            // silently continue to next provider
            continue;
        }
    }

    return null;
}
