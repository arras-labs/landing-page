import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  ScaleControl,
} from "react-leaflet";
import L from "leaflet";

// ---- Fix icone di Leaflet con Vite ----
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Crea icona custom per il marker
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface PropertyMapProps {
  lat: number;
  lng: number;
  title: string;
  address: string;
  zoom?: number;
}

export function PropertyMap({
  lat,
  lng,
  title,
  address,
  zoom = 14,
}: PropertyMapProps) {
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

        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>
            <div className="text-sm">
              <div className="font-medium">{title}</div>
              <div className="text-slate-600">{address}</div>
            </div>
          </Popup>
        </Marker>

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
