import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  LayersControl,
  LayerGroup,
  ScaleControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";

// ---- Fix icone di Leaflet con Vite ----
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Imposta le icone default una volta sola
const ensureLeafletIcons = (() => {
  let done = false;
  return () => {
    if (done) return;
    const Default = L.Icon.Default as any;
    Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });
    done = true;
  };
})();

// ---- Tipi minimi ----
export type Poi = {
  id: string;
  type: "metro" | "bus" | "grocery" | "pharmacy" | "gym" | "bank";
  name: string;
  lat: number;
  lng: number;
  meta?: Record<string, any>;
};

export type Comp = {
  id: string;
  lat: number;
  lng: number;
  address: string;
  rent: number;
  area: number;
  euroPerSqm: number;
  beds: number;
  baths: number;
  sourceUrl?: string;
  date?: string;
};

export function PropertyMap({
  center = [44.496, 11.34], // Bologna centro (mock)
  zoom = 14,
  property,
  pois = [],
  comps = [],
}: {
  center?: [number, number];
  zoom?: number;
  property: {
    title: string;
    address: string;
    lat: number;
    lng: number;
    photos?: string[];
    rentExpected?: number;
    netYield?: number;
  };
  pois?: Poi[];
  comps?: Comp[];
}) {
  ensureLeafletIcons();

  // KPI overlay (UI custom nell’angolo)
  function KPIs() {
    const map = useMap();
    // esempio di misura distanza metro più vicino
    const nearestMetro = pois
      .filter((p) => p.type === "metro")
      .map((p) => ({
        p,
        d: map.distance([property.lat, property.lng], [p.lat, p.lng]),
      }))
      .sort((a, b) => a.d - b.d)[0];

    // helper metri → minuti a piedi (~80 m/min)
    const toMin = (m: number) => Math.round(m / 80);

    return (
      <div className="absolute right-3 top-3 z-[1000] rounded-xl border border-slate-200 bg-white/90 backdrop-blur px-3 py-2 text-xs shadow">
        <div className="font-medium text-slate-700 mb-1">Distanze rapidi</div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-slate-600">
          <span>Metro</span>
          <span className="text-right">
            {nearestMetro ? `${toMin(nearestMetro.d)} min` : "-"}
          </span>
          <span>Supermercato</span>
          <span className="text-right">
            {minsToClosest(pois, "grocery", map, property)}
          </span>
          <span>Parco/palestra</span>
          <span className="text-right">
            {minsToClosest(pois, "gym", map, property)}
          </span>
          <span>Farmacia</span>
          <span className="text-right">
            {minsToClosest(pois, "pharmacy", map, property)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200">
      <MapContainer
        center={[property.lat, property.lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          // OSM tile
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <ScaleControl position="bottomleft" />

        {/* Overlay KPI UI */}
        <KPIs />

        <LayersControl position="topright">
          {/* Immobile + raggio “isochrone” semplificato */}
          <LayersControl.Overlay checked name="Immobile">
            <LayerGroup>
              <Marker position={[property.lat, property.lng]}>
                <Popup>
                  <div className="text-sm">
                    <div className="font-medium">{property.title}</div>
                    <div className="text-slate-600">{property.address}</div>
                    {property.rentExpected != null && (
                      <div>Canone atteso: €{property.rentExpected}/m</div>
                    )}
                    {property.netYield != null && (
                      <div>Yield netto: {property.netYield}%</div>
                    )}
                  </div>
                </Popup>
              </Marker>
              {/* ‘Isochrone’ cerchi 5 e 10 minuti a piedi */}
              <Circle
                center={[property.lat, property.lng]}
                radius={400} // ~5 min
                pathOptions={{
                  color: "#0ea5e9",
                  opacity: 0.6,
                  fillOpacity: 0.05,
                }}
              />
              <Circle
                center={[property.lat, property.lng]}
                radius={800} // ~10 min
                pathOptions={{
                  color: "#06b6d4",
                  opacity: 0.4,
                  fillOpacity: 0.03,
                }}
              />
            </LayerGroup>
          </LayersControl.Overlay>

          {/* Servizi */}
          <LayersControl.Overlay name="Servizi (POI)">
            <LayerGroup>
              {pois.map((p) => (
                <Marker key={p.id} position={[p.lat, p.lng]}>
                  <Popup>
                    <div className="text-sm">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-slate-600">{p.type}</div>
                      {p.meta?.note && <div>{p.meta.note}</div>}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          {/* Comparables (affitti vicini) */}
          <LayersControl.Overlay name="Comps affitti">
            <LayerGroup>
              {comps.map((c) => (
                <Marker key={c.id} position={[c.lat, c.lng]}>
                  <Popup>
                    <div className="text-sm">
                      <div className="font-medium">{c.address}</div>
                      <div>
                        {c.area} m² · {c.beds} letti · {c.baths} bagni
                      </div>
                      <div>
                        Canone: €{c.rent} · {c.euroPerSqm} €/m²
                      </div>
                      {c.date && (
                        <div className="text-slate-500">({c.date})</div>
                      )}
                      {c.sourceUrl && (
                        <a
                          href={c.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sky-600 underline"
                        >
                          Apri fonte
                        </a>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}

// Helpers
function minsToClosest(
  pois: Poi[],
  type: Poi["type"],
  map: L.Map,
  property: { lat: number; lng: number }
) {
  const subset = pois.filter((p) => p.type === type);
  if (!subset.length) return "-";
  const distances = subset.map((p) =>
    map.distance([property.lat, property.lng], [p.lat, p.lng])
  );
  const min = Math.min(...distances); // metri
  const mins = Math.round(min / 80); // ~80 m/minuto a piedi
  return `${mins} min`;
}
