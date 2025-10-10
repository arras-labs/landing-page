import React from "react";
import Lightbox from "./Lightbox.component";

export default function GalleryStrip({ images }: { images: string[] }) {
  const [open, setOpen] = React.useState(false);
  const [idx, setIdx] = React.useState(0);
  const openAt = (i: number) => {
    setIdx(i);
    setOpen(true);
  };

  return (
    <>
      <div className="relative left-1/2 right-1/2 -translate-x-1/2 w-full">
        <div className="w-screen">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-12 md:col-span-7 lg:col-span-8">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                src={images[0]}
                onClick={() => openAt(0)}
                className="h-[58vh] w-full object-cover cursor-zoom-in select-none"
              />
            </div>
            <div className="col-span-12 md:col-span-5 lg:col-span-4 grid grid-rows-2 gap-0">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                src={images[1]}
                onClick={() => openAt(1)}
                className="h-[29vh] w-full object-cover cursor-zoom-in select-none"
              />
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                src={images[2]}
                onClick={() => openAt(2)}
                className="h-[29vh] w-full object-cover cursor-zoom-in select-none"
              />
            </div>
            <div className="col-span-12 grid grid-cols-3 gap-0">
              {images.slice(3, 6).map((src, i) => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img
                  key={src}
                  src={src}
                  onClick={() => openAt(i + 3)}
                  className="h-[20vh] w-full object-cover cursor-zoom-in select-none"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {open && (
        <Lightbox
          images={images}
          index={idx}
          onClose={() => setOpen(false)}
          onIndex={(i) => setIdx(i)}
        />
      )}
    </>
  );
}
