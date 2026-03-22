import type { Metadata } from "next";
import { Orbitron, Rajdhani, Old_Standard_TT } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const oldStandard = Old_Standard_TT({
  variable: "--font-old-standard",
  weight: "400",
  style: "italic",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Porsche 911 GT3 RS",
  description: "A digital showcase of the Porsche 911 GT3 RS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} ${oldStandard.variable}`}>
      <body className="antialiased min-h-screen bg-porche-black text-white font-rajdhani">
        {children}
      </body>
    </html>
  );
}
