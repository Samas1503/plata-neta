import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "plata-neta",
  description: "Cobros y pagos directos por transferencia para tu comercio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
