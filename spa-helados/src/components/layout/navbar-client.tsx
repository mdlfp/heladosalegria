"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NAV_LINKS = [
    { label: "Inicio", href: "#inicio" },
    { label: "Menú", href: "#menu" },
    { label: "Ubicación", href: "#ubicacion" },
    { label: "Contacto", href: "#contacto" },
];

export function NavbarClient({
    businessName,
    whatsappHref,
}: {
    businessName: string;
    whatsappHref: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        handleScroll(); // por si ya carga con scroll (ej. refresh a mitad de página)
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.pushState(null, "", href);
        }
    };

    return (
        <header className="fixed z-50 left-0 right-0 top-0 border-b border-border bg-(--background)/60 backdrop-blur-md">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
                {/* Logo */}
                <Link
                    href="#inicio"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("#inicio");
                    }}
                    className="flex items-center gap-2"
                >
                    <Image
                        src="/logo-helados.png"
                        alt={`Logo de ${businessName}`}
                        width={50}
                        height={50}
                        className=""
                    />
                    <span
                        className={`overflow-hidden whitespace-nowrap text-lg font-bold text-primary-foreground transition-all duration-300 ease-in-out ${isScrolled
                            ? "max-w-0 -translate-x-6 opacity-0"
                            : "max-w-xs translate-x-0 opacity-100"
                            }`}
                    >
                        {businessName}
                    </span>
                </Link>

                {/* Links desktop */}
                <ul className="hidden items-center gap-8 md:flex">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(link.href);
                                }}
                                className="text-base font-medium text-pink-900  transition-colors hover:text-primary"
                            >
                                {link.label}
                            </Link>
                        </li>

                    ))}
                </ul>

                {/* CTA desktop */}
                <div className="hidden md:block">
                    <Link href={whatsappHref} target="_blank" rel="noopener noreferrer">
                        <Button variant="whatsFull" size="md" >
                            Ordenar ya
                        </Button>
                    </Link>
                </div>

                {/* Botón hamburguesa mobile */}
                <button
                    className="flex flex-col gap-1.5 md:hidden"
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}
                    aria-label="Abrir menú"
                    aria-expanded={isOpen}
                >
                    <span
                        className={`h-0.5 w-6 bg-foreground transition-transform ${isOpen ? "translate-y-2 rotate-45" : ""
                            }`}
                    />
                    <span
                        className={`h-0.5 w-6 bg-foreground transition-opacity ${isOpen ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`h-0.5 w-6 bg-foreground transition-transform ${isOpen ? "-translate-y-2 -rotate-45" : ""
                            }`}
                    />
                </button>
            </nav>

            {/* Menú mobile */}
            {
                isOpen && (
                    <ul className="flex flex-col gap-4 border-t border-border px-4 py-6 md:hidden">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsOpen(false);
                                        scrollToSection(link.href);
                                    }}
                                    className="block text-base font-medium text-foreground"
                                >
                                    {link.label}

                                </Link>
                            </li>
                        ))
                        }
                        <li>
                            <Link href={whatsappHref} target="_blank" rel="noopener noreferrer">
                                <Button variant="whatsFull" size="sm" className="mt-2 w-full" >
                                    Ordenar ya
                                </Button>
                            </Link>

                        </li>
                    </ul >
                )
            }
        </header >
    );
}