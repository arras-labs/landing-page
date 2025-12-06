import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  ScaleControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";

// ---- Fix icone di Leaflet con Vite ----
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {
  searchNearbyPOIs,
  metersToWalkingMinutes,
  getPOIEmoji,
  type POI,
} from "../../utils-marketplace/poi";

// Crea icona custom per il marker principale (proprietà)
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Funzione per creare icone con emoji per i POI
function createEmojiIcon(emoji: string): L.DivIcon {
  return L.divIcon({
    html: `<div style="font-size: 24px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${emoji}</div>`,
    className: "poi-emoji-marker",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

interface PropertyMapProps {
  lat: number;
  lng: number;
  title: string;
  address: string;
  zoom?: number;
}

// Componente per mostrare KPI con distanze
function POIDistances({
  pois,
  propertyLat,
  propertyLng,
}: {
  pois: POI[];
  propertyLat: number;
  propertyLng: number;
}) {
  const map = useMap();

  // Raggruppa POI per tipo e prendi solo il più vicino
  const nearestByType = new Map<string, POI>();
  pois.forEach((poi) => {
    const existing = nearestByType.get(poi.type);
    if (!existing || (poi.distance || 0) < (existing.distance || 0)) {
      nearestByType.set(poi.type, poi);
    }
  });

  // Mostra tutti i tipi di POI trovati, ordinati per distanza
  const displayPOIs = Array.from(nearestByType.values()).sort(
    (a, b) => (a.distance || 0) - (b.distance || 0)
  );

  if (displayPOIs.length === 0) return null;

  return (
    <div className="absolute right-3 top-3 z-[1000] rounded-xl border border-slate-200 bg-white/95 backdrop-blur px-3 py-2 text-xs shadow-lg">
      <div className="font-semibold text-slate-800 mb-2">📍 Distanze</div>
      <div className="space-y-1.5">
        {displayPOIs.map((poi) => (
          <div
            key={poi.id}
            className="flex items-center justify-between gap-3 text-slate-600"
          >
            <span className="flex items-center gap-1">
              <span>{getPOIEmoji(poi.type)}</span>
              <span className="capitalize">
                {poi.type === "subway"
                  ? "Metro"
                  : poi.type === "grocery"
                  ? "Supermarket"
                  : poi.type}
              </span>
            </span>
            <span className="font-medium text-slate-900">
              {poi.distance
                ? `${metersToWalkingMinutes(poi.distance)} min`
                : "-"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PropertyMap({
  lat,
  lng,
  title,
  address,
  zoom = 14,
}: PropertyMapProps) {
  const [pois, setPois] = useState<POI[]>([]);
  const [loadingPOIs, setLoadingPOIs] = useState(false);

  // Carica POI quando il componente viene montato
  useEffect(() => {
    const loadPOIs = async () => {
      setLoadingPOIs(true);
      try {
        const nearbyPOIs = await searchNearbyPOIs(lat, lng, 1000);
        setPois(nearbyPOIs);
      } catch (error) {
        console.error("Error loading POIs:", error);
      } finally {
        setLoadingPOIs(false);
      }
    };

    loadPOIs();
  }, [lat, lng]);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 z-0">
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <ScaleControl position="bottomleft" />

        {/* Overlay con distanze POI */}
        {!loadingPOIs && pois.length > 0 && (
          <POIDistances pois={pois} propertyLat={lat} propertyLng={lng} />
        )}

        {/* Marker principale della proprietà */}
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>
            <div className="text-sm">
              <div className="font-medium">{title}</div>
              <div className="text-slate-600">{address}</div>
            </div>
          </Popup>
        </Marker>

        {/* Markers per i POI con emoji */}
        {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={[poi.lat, poi.lng]}
            icon={createEmojiIcon(getPOIEmoji(poi.type))}
          >
            <Popup>
              <div className="text-xs">
                <div className="font-medium flex items-center gap-1">
                  <span>{getPOIEmoji(poi.type)}</span>
                  <span>{poi.name}</span>
                </div>
                {poi.distance && (
                  <div className="text-slate-500 mt-1">
                    ~{metersToWalkingMinutes(poi.distance)} min a piedi (
                    {Math.round(poi.distance)}m)
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Cerchi per indicare distanze a piedi (~5 e 10 minuti) */}
        <Circle
          center={[lat, lng]}
          radius={400} // ~5 min
          pathOptions={{
            color: "#f59e0b",
            opacity: 0.6,
            fillOpacity: 0.05,
          }}
        />
        <Circle
          center={[lat, lng]}
          radius={800} // ~10 min
          pathOptions={{
            color: "#ec4899",
            opacity: 0.4,
            fillOpacity: 0.03,
          }}
        />
      </MapContainer>
    </div>
  );
}
