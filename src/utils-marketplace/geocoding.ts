// Utility per convertire un indirizzo in coordinate geografiche usando Nominatim (OpenStreetMap)

interface GeocodeResult {
  lat: number;
  lng: number;
  displayName: string;
}

/**
 * Converte un indirizzo testuale in coordinate geografiche
 * @param address Indirizzo completo (es: "Via delle Magnolie 18, Bologna, Italy")
 * @returns Coordinate lat/lng o null se non trovato
 */
export async function geocodeAddress(
  address: string
): Promise<GeocodeResult | null> {
  if (!address || address.trim().length === 0) {
    return null;
  }

  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`,
      {
        headers: {
          "User-Agent": "CasaChain-Marketplace/1.0",
        },
      }
    );

    if (!response.ok) {
      console.error("Geocoding failed:", response.statusText);
      return null;
    }

    const data = await response.json();

    if (data && data.length > 0) {
      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        displayName: result.display_name,
      };
    }

    return null;
  } catch (error) {
    console.error("Error geocoding address:", error);
    return null;
  }
}

/**
 * Cache per le coordinate geocodificate
 */
const geocodeCache = new Map<string, GeocodeResult>();

/**
 * Versione con cache del geocoding
 */
export async function geocodeAddressWithCache(
  address: string
): Promise<GeocodeResult | null> {
  const cacheKey = address.toLowerCase().trim();

  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey) || null;
  }

  const result = await geocodeAddress(address);

  if (result) {
    geocodeCache.set(cacheKey, result);
  }

  return result;
}
