// Utility per cercare punti di interesse vicino a una posizione usando Overpass API (OpenStreetMap)

export interface POI {
  id: string;
  type:
    | "subway"
    | "train"
    | "bus"
    | "grocery"
    | "pharmacy"
    | "gym"
    | "bank"
    | "school"
    | "restaurant";
  name: string;
  lat: number;
  lng: number;
  distance?: number; // in metri
}

const POI_TYPES = {
  subway: { tag: "station", value: "subway", emoji: "🚇" },
  train: { tag: "railway", value: "station", emoji: "🚆" },
  bus: { tag: "highway", value: "bus_stop", emoji: "🚌" },
  grocery: { tag: "shop", value: "supermarket", emoji: "🛒" },
  pharmacy: { tag: "amenity", value: "pharmacy", emoji: "💊" },
  gym: { tag: "leisure", value: "fitness_centre", emoji: "💪" },
  bank: { tag: "amenity", value: "bank", emoji: "🏦" },
  school: { tag: "amenity", value: "school", emoji: "🏫" },
  restaurant: { tag: "amenity", value: "restaurant", emoji: "🍽️" },
};

/**
 * Cerca POI vicino a una posizione usando Overpass API
 * @param lat Latitudine
 * @param lng Longitudine
 * @param radiusMeters Raggio di ricerca in metri (default 1000m = ~12 min a piedi)
 * @param types Tipi di POI da cercare
 */
export async function searchNearbyPOIs(
  lat: number,
  lng: number,
  radiusMeters: number = 1000,
  types: (keyof typeof POI_TYPES)[] = [
    "subway",
    "train",
    "grocery",
    "pharmacy",
    "gym",
    "bank",
  ]
): Promise<POI[]> {
  try {
    // Costruisci query Overpass per cercare tutti i tipi di POI
    const queries = types.map((type) => {
      const { tag, value } = POI_TYPES[type];
      return `node["${tag}"="${value}"](around:${radiusMeters},${lat},${lng});`;
    });

    const overpassQuery = `
      [out:json][timeout:25];
      (
        ${queries.join("\n        ")}
      );
      out body;
    `;

    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: overpassQuery,
    });

    if (!response.ok) {
      console.error("Overpass API error:", response.statusText);
      return [];
    }

    const data = await response.json();

    // Mappa i risultati a POI
    const pois: POI[] = data.elements.map((element: any) => {
      // Determina il tipo basandosi sui tag
      let type: POI["type"] = "grocery";
      for (const [poiType, config] of Object.entries(POI_TYPES)) {
        if (element.tags[config.tag] === config.value) {
          type = poiType as POI["type"];
          break;
        }
      }

      // Calcola distanza
      const distance = calculateDistance(lat, lng, element.lat, element.lon);

      return {
        id: element.id.toString(),
        type,
        name: element.tags.name || `${type} senza nome`,
        lat: element.lat,
        lng: element.lon,
        distance,
      };
    });

    // Ordina per distanza e prendi solo i più vicini per ogni tipo
    const poiByType = new Map<string, POI[]>();

    pois.forEach((poi) => {
      if (!poiByType.has(poi.type)) {
        poiByType.set(poi.type, []);
      }
      poiByType.get(poi.type)!.push(poi);
    });

    // Prendi solo i 2 più vicini per ogni tipo
    const result: POI[] = [];
    poiByType.forEach((poisOfType) => {
      const sorted = poisOfType.sort(
        (a, b) => (a.distance || 0) - (b.distance || 0)
      );
      result.push(...sorted.slice(0, 2));
    });

    return result;
  } catch (error) {
    console.error("Error fetching POIs:", error);
    return [];
  }
}

/**
 * Calcola la distanza tra due coordinate in metri (formula Haversine)
 */
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371e3; // Raggio della Terra in metri
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distanza in metri
}

/**
 * Converte metri in minuti a piedi (assumendo ~80m/min)
 */
export function metersToWalkingMinutes(meters: number): number {
  return Math.round(meters / 80);
}

/**
 * Ottiene l'emoji per un tipo di POI
 */
export function getPOIEmoji(type: POI["type"]): string {
  return POI_TYPES[type]?.emoji || "📍";
}
