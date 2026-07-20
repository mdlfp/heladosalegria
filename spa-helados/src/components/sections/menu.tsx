"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MenuItem } from "@/validations/menu";
import Image from "next/image";

const MENU_ITEMS: MenuItem[] = [
  {
    id: "mango",
    name: "Mango",
    description: "Helado de mango natural bañado en chamoy y chile en polvo o lechera",
    price: 50,
    category: "helados",
  },
  {
    id: "coco",
    name: "Coco",
    description: "Helado de coco natural con un toque de lechera",
    price: 50,
    category: "helados",
  },
  {
    id: "oreo",
    name: "Oreo",
    description: "Helado sabor oreo con trozos de galleta y lechera",
    price: 50,
    category: "helados",
  },
  {
    id: "ciruela",
    name: "Ciruela",
    description: "Helado sabor ciruela con ciruelas dentro y lechera",
    price: 50,
    category: "helados",
  },
  {
    id: "fresa",
    name: "Fresa",
    description: "Helado sabor fresa con lechera",
    price: 50,
    category: "helados",
  },
  {
    id: "cafe",
    name: "Cafe",
    description: "Helado sabor cafe bañado con lechera",
    price: 50,
    category: "helados",
  },
];

const flavorGradientClass: Record<string, string> = {
  mango: "text-gradient-mango",
  ciruela: "text-gradient-ciruela",
  coco: "text-gradient-coco",
  fresa: "text-gradient-fresa",
  cafe: "text-gradient-cafe",
  oreo: "text-gradient-oreo",
};

// Calcula la distancia circular más corta entre dos índices (-1, 0, 1, etc.)
function getOffset(itemIndex: number, currentIndex: number, total: number) {
  let diff = itemIndex - currentIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

function MenuItemCard({ item, offset }: { item: MenuItem; offset: number }) {
  const isCenter = offset === 0;
  const isVisible = Math.abs(offset) <= 1;

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
            src={`/productos/${item.id}.png`}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 280px, 480px"
            className="object-contain drop-shadow-md"
          />
        </div>

        <h3
          className={`text-6xl font-bold ${flavorGradientClass[item.id]}`}
          style={{ fontFamily: "var(--font-kalam)" }}
        >
          {item.name}
        </h3>

        <p className="text-base text-muted-foreground mt-1">{item.description}</p>

        <span className="mt-3 inline-block bg-primary text-primary-foreground font-bold px-4 py-1 rounded-full">
          ${item.price}
        </span>
      </div>
    </div>
  );
}

export function Menu() {
  const [index, setIndex] = useState(0);
  const total = MENU_ITEMS.length;


  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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
      <section id="menu" className="px-4 py-16 md:px-6">
        <h2 className="text-gradient-white mb-10 text-center text-7xl">
          Nuestros Sabores
        </h2>

        <div className="relative overflow-hidden touch-pan-y mx-auto flex h-130 md:h-160 max-w-2xl items-center justify-center md:overflow-visible md:touch-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          <button
            onClick={goPrev}
            aria-label="Sabor anterior"
            className="absolute left-0 z-30 shrink-0 rounded-full bg-card p-2 shadow-md transition hover:bg-secondary"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>

          {MENU_ITEMS.map((item, i) => (
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
          {MENU_ITEMS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setIndex(i)}
              aria-label={`Ir a ${item.name}`}
              className={`h-2 w-2 rounded-full transition ${i === index ? "bg-primary w-6" : "bg-muted"
                }`}
            />
          ))}
        </div>
      </section>
    );
  }