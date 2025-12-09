import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type {
  Property,
  PropertyDocument,
  PoolInfo,
} from "../../types-marketplace";
import { YieldSection } from "./YieldSection";
import { DocumentsSection } from "./DocumentsSection";
import { TokenPurchaseModal } from "./TokenPurchaseModal";
import { ImageCarousel } from "./ImageCarousel";
import { PropertyMap } from "./PropertyMap";
import { getPropertyImages } from "../../services-marketplace/propertyImages";
import { geocodeAddressWithCache } from "../../utils-marketplace/geocoding";
import "leaflet/dist/leaflet.css";

interface PropertyDetailsProps {
  walletState: { account: string | null; isConnected: boolean };
  getProperty: (id: bigint) => Promise<Property | null>;
  getPoolInfo: (id: bigint) => Promise<PoolInfo | null>;
  getPropertyDocuments: (id: bigint) => Promise<PropertyDocument[]>;
  getInvestorTokens: (propertyId: bigint, investor: string) => Promise<number>;
  buyTokens: (propertyId: bigint, tokenAmount: number) => Promise<boolean>;
  uploadDocument: (
    propertyId: bigint,
    name: string,
    docType: string,
    ipfsHash: string
  ) => Promise<boolean>;
  loading: boolean;
  tokenPriceUSD: number;
  calculateTokenPriceETH: () => string;
}

export const PropertyDetails = ({
  walletState,
  getProperty,
  getPoolInfo,
  getPropertyDocuments,
  getInvestorTokens,
  buyTokens,
  uploadDocument,
  loading,
  tokenPriceUSD,
  calculateTokenPriceETH,
}: PropertyDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [property, setProperty] = useState<Property | null>(null);
  const [poolInfo, setPoolInfo] = useState<PoolInfo | null>(null);
  const [documents, setDocuments] = useState<PropertyDocument[]>([]);
  const [userTokens, setUserTokens] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "overview" | "yield" | "documents"
  >("overview");
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (id) {
      loadPropertyData();
    }
  }, [id, walletState.account]);

  // Geocoding dell'indirizzo quando la property viene caricata
  useEffect(() => {
    if (property?.address) {
      geocodeAddressWithCache(property.address).then((result) => {
        if (result) {
          setMapCoordinates({ lat: result.lat, lng: result.lng });
        }
      });
    }
  }, [property?.address]);

  const loadPropertyData = async () => {
    if (!id) return;

    const propertyId = BigInt(id);
    const propData = await getProperty(propertyId);
    const poolData = await getPoolInfo(propertyId);
    const docs = await getPropertyDocuments(propertyId);

    setProperty(propData);
    setPoolInfo(poolData);
    setDocuments(docs);

    if (walletState.account) {
      const tokens = await getInvestorTokens(propertyId, walletState.account);
      setUserTokens(tokens);
    }
  };

  const handleBuyTokens = async (propertyId: bigint, tokenAmount: number) => {
    const success = await buyTokens(propertyId, tokenAmount);
    if (success) {
      setShowTokenModal(false);
      await loadPropertyData();
    }
  };

  const handleUploadDocument = async (
    propertyId: bigint,
    name: string,
    docType: string,
    ipfsHash: string
  ) => {
    const success = await uploadDocument(propertyId, name, docType, ipfsHash);
    if (success) {
      await loadPropertyData();
    }
  };

  if (!property || !poolInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  // Recupera tutte le immagini salvate in localStorage
  const allImages = getPropertyImages(property.id.toString());
  // Se non ci sono immagini salvate, usa quella del contratto
  const images = allImages.length > 0 ? allImages : [property.imageUrl];

  const isOwner =
    property.owner.toLowerCase() === walletState.account?.toLowerCase();
  const percentageComplete = Number(poolInfo.percentageComplete);
  const tokensAvailable = Number(poolInfo.tokensAvailable);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header con immagine */}
      <div className="relative h-[500px] bg-slate-900">
        <div className="w-full h-full">
          <ImageCarousel
            images={images}
            alt={property.name}
            showControls={true}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Pulsante indietro */}
        <button
          onClick={() => navigate("/marketplace")}
          className="absolute top-6 left-6 bg-white/95 hover:bg-white text-slate-900 px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg backdrop-blur-sm"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Indietro
        </button>
      </div>

      {/* Container principale */}
      <div className="container mx-auto px-4 pb-8">
        {/* Info card sovrapposta */}
        <div className="-mt-20 relative z-10 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-slate-900">
                    {property.name}
                  </h1>
                  {property.isActive ? (
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Attiva
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Chiusa
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-slate-600">
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {property.address}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                    {property.area.toString()} m²
                  </span>
                </div>
              </div>

              {property.isActive && tokensAvailable > 0 && !isOwner && (
                <button
                  onClick={() => setShowTokenModal(true)}
                  className="bg-gradient-to-r from-amber-500 to-pink-500 hover:opacity-90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Investi Ora
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Statistiche principali */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="text-sm text-slate-500 mb-1">Valore Totale</div>
            <div className="text-2xl font-bold text-slate-900">
              ${Number(property.totalValueUSD).toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="text-sm text-slate-500 mb-1">Progresso Pool</div>
            <div className="text-2xl font-bold text-slate-900">
              {percentageComplete}%
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-amber-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentageComplete}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="text-sm text-slate-500 mb-1">Token Disponibili</div>
            <div className="text-2xl font-bold text-slate-900">
              {tokensAvailable.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              su {Number(poolInfo.totalTokens).toLocaleString()} totali
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="text-sm text-slate-500 mb-1">I Tuoi Token</div>
            <div className="text-2xl font-bold text-slate-900">
              {userTokens}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              ≈ ${(userTokens * tokenPriceUSD).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="bg-white rounded-xl border border-slate-200 mb-8 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
            <nav className="flex gap-2 p-3">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex-1 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "overview"
                    ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-lg"
                    : "text-slate-600 hover:bg-white hover:shadow-md"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Panoramica
              </button>
              <button
                onClick={() => setActiveTab("yield")}
                className={`flex-1 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "yield"
                    ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-lg"
                    : "text-slate-600 hover:bg-white hover:shadow-md"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                Rendimento
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={`flex-1 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "documents"
                    ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-lg"
                    : "text-slate-600 hover:bg-white hover:shadow-md"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Documenti
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-amber-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Descrizione
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {property.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 border border-amber-200 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-4 text-lg flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-amber-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      Dettagli Proprietà
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-amber-100">
                        <span className="text-slate-600 font-medium">
                          Superficie:
                        </span>
                        <span className="font-semibold text-slate-900">
                          {property.area.toString()} m²
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-amber-100">
                        <span className="text-slate-600 font-medium">
                          Indirizzo:
                        </span>
                        <span className="font-semibold text-slate-900 text-right max-w-[60%]">
                          {property.address}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-600 font-medium">
                          Data Listing:
                        </span>
                        <span className="font-semibold text-slate-900">
                          {new Date(
                            Number(property.listedTimestamp) * 1000
                          ).toLocaleDateString("it-IT")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 border border-pink-200 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-4 text-lg flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-pink-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Info Pool
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-pink-100">
                        <span className="text-slate-600 font-medium">
                          Prezzo Token:
                        </span>
                        <span className="font-semibold text-slate-900">
                          ${tokenPriceUSD}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-pink-100">
                        <span className="text-slate-600 font-medium">
                          Totale Investitori:
                        </span>
                        <span className="font-semibold text-slate-900">
                          {poolInfo.investors.length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-600 font-medium">
                          Stato:
                        </span>
                        <span
                          className={`font-semibold ${
                            property.isActive
                              ? "text-emerald-600"
                              : "text-slate-600"
                          }`}
                        >
                          {property.isActive ? "Attiva" : "Chiusa"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mappa con posizione immobile */}
                {mapCoordinates && property.address && (
                  <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-4 text-lg flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-amber-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Posizione
                    </h4>
                    <div className="rounded-lg overflow-hidden">
                      <PropertyMap
                        lat={mapCoordinates.lat}
                        lng={mapCoordinates.lng}
                        title={property.name}
                        address={property.address}
                      />
                    </div>
                  </div>
                )}

                {poolInfo.investors.length > 0 && (
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-200 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-4 text-lg flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Investitori ({poolInfo.investors.length})
                    </h4>
                    <div className="bg-white rounded-lg p-4 max-h-60 overflow-y-auto border border-blue-100">
                      <div className="space-y-2">
                        {poolInfo.investors.map((investor, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <span className="font-mono text-slate-700 font-medium">
                              {investor.slice(0, 6)}...{investor.slice(-4)}
                            </span>
                            {investor.toLowerCase() ===
                              walletState.account?.toLowerCase() && (
                              <span className="bg-gradient-to-r from-amber-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                Tu
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "yield" && (
              <YieldSection property={property} userTokens={userTokens} />
            )}

            {activeTab === "documents" && (
              <DocumentsSection
                propertyId={property.id}
                propertyName={property.name}
                documents={documents}
                isOwner={isOwner}
                onUploadDocument={handleUploadDocument}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal acquisto token */}
      {showTokenModal && (
        <TokenPurchaseModal
          property={property}
          onPurchase={handleBuyTokens}
          onCancel={() => setShowTokenModal(false)}
          loading={loading}
          tokenPriceUSD={tokenPriceUSD}
          tokenPriceETH={calculateTokenPriceETH()}
          availableTokens={tokensAvailable}
        />
      )}
    </div>
  );
};
