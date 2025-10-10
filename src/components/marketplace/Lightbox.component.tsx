import { X } from "lucide-react";
import React from "react";

export default function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft")
        onIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, index, onClose, onIndex]);

  return (
    <div className="fixed inset-0 z-[3000] bg-black/80 backdrop-blur-sm">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 z-[3500] rounded-lg bg-white/10 p-2 text-white hover:bg-white/20 pointer-events-auto"
        aria-label="Chiudi"
        type="button"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        className="absolute inset-0 grid place-items-center px-4"
        onClick={onClose}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src={images[index]}
          className="max-h-[86vh] max-w-[92vw] object-contain select-none pointer-events-none"
        />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-[92]">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                onIndex(i);
              }}
              className={`h-1.5 w-6 rounded-full ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
              aria-label={`slide ${i + 1}`}
              type="button"
            />
          ))}
        </div>

        <button
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 z-[92]"
          onClick={(e) => {
            e.stopPropagation();
            onIndex((index - 1 + images.length) % images.length);
          }}
          aria-label="Precedente"
          type="button"
        >
          <span className="block rotate-90 text-xl leading-none">‹</span>
        </button>
        <button
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 z-[92]"
          onClick={(e) => {
            e.stopPropagation();
            onIndex((index + 1) % images.length);
          }}
          aria-label="Successiva"
          type="button"
        >
          <span className="block -rotate-90 text-xl leading-none">›</span>
        </button>
      </div>
    </div>
  );
}
