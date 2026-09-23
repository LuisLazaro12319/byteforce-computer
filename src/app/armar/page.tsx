import type { Metadata } from "next";
import { Armador } from "@/components/Armador";

export const metadata: Metadata = {
  title: "Armá tu PC",
  description: "Elegí cada pieza de tu PC y mirá el total en el momento.",
};

export default function ArmarPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="titulo-display text-3xl sm:text-4xl">Armá tu PC</h1>
      <p className="mt-2 text-tenue">Elegí cada componente. El total se actualiza en el momento.</p>
      <Armador />
    </div>
  );
}
