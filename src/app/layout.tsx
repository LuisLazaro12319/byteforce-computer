import type { Metadata } from "next";
import { Rajdhani, Inter } from "next/font/google";
import "./globals.css";
import { TiendaProvider } from "@/context/TiendaContext";
import { SiteChrome } from "@/components/SiteChrome";
import { MARCA, SITIO } from "@/lib/config";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: `${MARCA.nombre} — ${MARCA.tagline}`,
    template: `%s · ${MARCA.nombre}`,
  },
  description: MARCA.descripcion,
  keywords: [
    "tienda de computacion",
    "armar pc",
    "pc gamer",
    "notebooks",
    "componentes de pc",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: MARCA.nombre,
    title: `${MARCA.nombre} — ${MARCA.tagline}`,
    description: MARCA.descripcion,
    url: SITIO,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      suppressHydrationWarning
      className={`${rajdhani.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <TiendaProvider>
          <SiteChrome>{children}</SiteChrome>
        </TiendaProvider>
      </body>
    </html>
  );
}
