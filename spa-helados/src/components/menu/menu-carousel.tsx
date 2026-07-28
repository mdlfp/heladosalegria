"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { Product } from "@/validations/product";
import { getFlavorKey, type FlavorKey } from "@/lib/flavor";

const flavorGradientClass: Record<FlavorKey, string> = {
  mango: "text-gradient-mango",
  ciruela: "text-gradient-ciruela",
  coco: "text-gradient-coco",
  fresa: "text-gradient-fresa",
  cafe: "text-gradient-cafe",
  oreo: "text-gradient-oreo",
  default: "text-gradient-white",
};

// Calcula la distancia circular más corta entre dos índices (-1, 0, 1, etc.)
function getOffset(itemIndex: number, currentIndex: number, total: number) {
  let diff = itemIndex - currentIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

// Muestra el precio base, o "Desde $X" si el producto solo tiene variantes
function getDisplayPrice(item: Product): string {
  if (item.basePrice != null) return `$${item.basePrice}`;
  if (item.variants && item.variants.length > 0) {
    const min = Math.min(...item.variants.map((v) => v.price));
    return `Desde $${min}`;
  }
  return "";
}

function MenuItemCard({ item, offset }: { item: Product; offset: number }) {
  const isCenter = offset === 0;
  const isVisible = Math.abs(offset) <= 1;
  const flavorKey = getFlavorKey(item.name);
  const imageUrl = item.image?.url ?? "/placeholder-product.svg";
  const displayPrice = getDisplayPrice(item);

  return (
    <div
      className="absolute left-1/2 top-1/2 w-70 md:w-120 transition-all duration-500 ease-out"
      style={{
        transform: `translate(-50%, -50%) translateX(${offset * 75}%) scale(${isCenter ? 1 : 0.7
          })`,
        opacity: isVisible ? (isCenter ? 1 : 0.5) : 0,
        zIndex: isCenter ? 20 : 10,
        pointerEvents: isCenter ? "auto" : "none",
      }}
    >
      <div className="relative overflow-hidden rounded-3xl shadow-lg bg-card flex flex-col items-center p-5 text-center">
        <div className="relative w-70 h-70 mb-3 md:w-120 md:h-120">
          <Image
            src={imageUrl}
            alt={item.image?.alternativeText || item.name}
            fill
            unoptimized={Boolean(item.image?.url)}
            sizes="(max-width: 768px) 280px, 480px"
            className="object-contain drop-shadow-md"
          />
        </div>

        <h3
          className={`text-6xl font-bold ${flavorGradientClass[flavorKey]}`}
          style={{ fontFamily: "var(--font-kalam)" }}
        >
          {item.name}
        </h3>

        {item.description && (
          <p className="text-base text-muted-foreground mt-1">{item.description}</p>
        )}

        {displayPrice && (
          <span className="mt-3 inline-block bg-primary text-primary-foreground font-bold px-4 py-1 rounded-full">
            {displayPrice}
          </span>
        )}
      </div>
    </div>
  );
}

export function MenuCarousel({ items }: { items: Product[] }) {
  const [index, setIndex] = useState(0);
  const total = items.length;

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  if (total === 0) {
    return (
      <p className="text-center text-muted-foreground">
        Aún no hay sabores disponibles.
      </p>
    );
  }

  const goPrev = () =>
    setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));

  const goNext = () =>
    setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goNext();
    } else if (distance < -minSwipeDistance) {
      goPrev();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <>
      <div
        className="relative overflow-hidden touch-pan-y mx-auto flex h-130 md:h-160 max-w-2xl items-center justify-center md:overflow-visible md:touch-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={goPrev}
          aria-label="Sabor anterior"
          className="absolute left-0 z-30 shrink-0 rounded-full bg-card p-2 shadow-md transition hover:bg-secondary"
        >
          <ChevronLeft className="h-6 w-6 text-primary" />
        </button>

        {items.map((item, i) => (
          <MenuItemCard
            key={item.id}
            item={item}
            offset={getOffset(i, index, total)}
          />
        ))}

        <button
          onClick={goNext}
          aria-label="Siguiente sabor"
          className="absolute right-0 z-30 shrink-0 rounded-full bg-card p-2 shadow-md transition hover:bg-secondary"
        >
          <ChevronRight className="h-6 w-6 text-primary" />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setIndex(i)}
            aria-label={`Ir a ${item.name}`}
            className={`h-2 w-2 rounded-full transition ${i === index ? "bg-primary w-6" : "bg-muted"
              }`}
          />
        ))}
      </div>
    </>
  );
}