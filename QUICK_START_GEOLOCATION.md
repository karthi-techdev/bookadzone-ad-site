# Quick Start Guide - Client-Side Geolocation

## What Changed?
Your geolocation detection has been **moved from server-side to client-side**. This means users' accurate locations will be captured based on their actual IP address, not the server's IP.

## Files Modified/Created

| File | Change | Purpose |
|------|--------|---------|
| `src/hooks/useClientLocation.ts` | **NEW** | React hook to fetch client geolocation |
| `src/components/navbar.tsx` | **UPDATED** | Integrated geolocation hook, includes location in form |
| `src/app/api/notify/route.ts` | **UPDATED** | API accepts & stores location data from client |
| `GEOLOCATION_CHANGES.md` | **NEW** | Detailed documentation |

## How to Test

### 1. Check Geolocation is Working
```bash
# Open Developer Tools (F12)
# Go to Network tab
# Submit the signup form
# Look for the request to /api/notify
# Check the Request Body - you should see location object
```

### 2. Verify in Database
```javascript
// MongoDB query
db.notificationSignups.findOne({ email: 'test@example.com' })

// You should see:
{
  "location": {
    "city": "Trichy",      // User's actual city
    "region": "Tamil Nadu",
    "country": "India",
    "isp": "ISP Name",
    "lat": 10.7905,
    "lon": 78.7047
  }
}
```

### 3. Browser Console
Check for logs like:
```
GeoIP location fetched: {city: 'Trichy', region: 'Tamil Nadu', ...}
```

## Key Features

✅ **Accurate Location Detection** - Gets user's real location, not server's  
✅ **Automatic Fetching** - Location fetched when component mounts  
✅ **Error Handling** - Gracefully handles failures with "Unknown" defaults  
✅ **Type-Safe** - Full TypeScript support  
✅ **Non-Blocking** - Doesn't prevent form submission if location fetch fails  

## API Integration

**Uses**: `ip-api.com` (free tier)  
**Endpoint**: `http://ip-api.com/json/`  
**Method**: GET  
**Rate Limit**: 45 requests/minute (free tier)

## What Gets Stored

When a user signs up, the following location data is stored:

```typescript
{
  city: string;          // e.g., "Trichy"
  region: string;        // e.g., "Tamil Nadu"
  country: string;       // e.g., "India"
  isp: string;           // e.g., "Airtel"
  lat?: number;          // e.g., 10.7905
  lon?: number;          // e.g., 78.7047
}
```

## Troubleshooting

### Location shows "Unknown"
1. Check browser console for errors
2. Verify VPN/proxy isn't interfering
3. Try with a different network
4. Check ip-api.com rate limits

### Form submission fails
- Location fetch failure won't prevent submission
- Form will submit with "Unknown" location values
- Check browser console for detailed error logs

### Seeing different location than expected
1. Clear browser cache
2. Try incognito/private mode
3. Check if VPN is active
4. Try from different network

## Next Steps

1. **Monitor Signup Locations**: Check MongoDB to see geographic distribution
2. **Consider Caching**: Add localStorage caching if concerned about API calls
3. **Add User Consent**: Consider adding consent dialog for privacy
4. **Custom Service**: Later, you can replace ip-api.com with your own service

## Code Usage

In any component, you can use the geolocation hook:

```typescript
import { useClientLocation } from '@/hooks/useClientLocation';

export default function MyComponent() {
  const { location, isLoading, error } = useClientLocation();

  return (
    <div>
      {isLoading && <p>Detecting location...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && (
        <p>You are in {location.city}, {location.country}</p>
      )}
    </div>
  );
}
```

## Support

For issues or questions:
1. Check `GEOLOCATION_CHANGES.md` for detailed documentation
2. Review browser console for error logs
3. Check MongoDB to verify data storage
4. Verify IP-API service is accessible (http://ip-api.com/json/)
