'use client'

import Image from "next/image";
import { MeshBackground } from "@/components/background/meshbg";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Menu } from "@/components/sections/menu";
import { Location } from "@/components/sections/location";
import { Contact } from "@/components/sections/contact";

export default function Home() {

  const onHello = (nombre: string) => {
    console.log(`Hola ${nombre} desde la pagina principal`)
  }

  return (
    <div className="relative min-h-screen">
      {/* <MeshBackground /> */}
      <Navbar />
      <Hero />
      <Menu/>
      <Location/>
      <Contact/>
    </div>
  );
}
