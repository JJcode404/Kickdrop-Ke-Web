import { useRef, useState } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion.js";

/**
 * Swipeable product gallery: a scroll-snap track (native swipe on touch,
 * buttery on desktop) with prev/next arrows and thumbnail navigation.
 * Click/tap the main image to toggle zoom; hover zooms subtly via CSS.
 */
export default function Gallery({ images, name }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const reduced = usePrefersReducedMotion();

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(images.length - 1, i));
    track.scrollTo({
      left: clamped * track.clientWidth,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== index) {
      setIndex(i);
      setZoomed(false);
    }
  };

  return (
    <div className="gallery" aria-roledescription="carousel" aria-label={`${name} images`}>
      <div className="gallery__stage">
        <div className="gallery__track" ref={trackRef} onScroll={onScroll}>
          {images.map((img, i) => (
            <button
              type="button"
              className={`gallery__slide ${zoomed && i === index ? "is-zoomed" : ""}`}
              key={img.src}
              onClick={() => setZoomed((z) => !z)}
              aria-label={
                zoomed && i === index ? "Zoom out of image" : "Zoom into image"
              }
              tabIndex={i === index ? 0 : -1}
            >
              <img
                className="product-photo"
                src={img.src}
                alt={img.label}
                loading={i === 0 ? "eager" : "lazy"}
                width="800"
                height="572"
                draggable="false"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="gallery__arrow gallery__arrow--prev"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous image"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          className="gallery__arrow gallery__arrow--next"
          onClick={() => goTo(index + 1)}
          disabled={index === images.length - 1}
          aria-label="Next image"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <p className="gallery__counter" aria-hidden="true">
          {index + 1} / {images.length}
        </p>
      </div>

      <div className="gallery__thumbs" role="tablist" aria-label="Choose image">
        {images.map((img, i) => (
          <button
            type="button"
            key={img.src}
            role="tab"
            aria-selected={i === index}
            aria-label={img.label}
            className={`gallery__thumb ${i === index ? "is-active" : ""}`}
            onClick={() => goTo(i)}
          >
            <img
              className="product-photo"
              src={img.src}
              alt=""
              loading="lazy"
              width="160"
              height="114"
              draggable="false"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
