import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback } from "react";

export function ImageCarousel({
  images,
  altPrefix = "Foto immobile",
}: {
  images: string[];
  altPrefix?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const hasImages = images && images.length > 0;

  const go = useCallback(
    (n: number) => {
      setIndex((_) => (n + images.length) % images.length);
    },
    [images.length]
  );

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  if (!hasImages) {
    return (
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 grid place-items-center">
        <span className="text-xs text-slate-500">Nessuna immagine</span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
      <div
        className="flex h-full w-full"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: "transform 400ms ease",
        }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${altPrefix} ${i + 1}`}
            loading="lazy"
            className="h-full w-full object-cover flex-shrink-0 basis-full"
          />
        ))}
      </div>

      {/* Controls */}
      <button
        aria-label="Precedente"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur p-2 shadow hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Successiva"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur p-2 shadow hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-black" : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Vai alla slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
