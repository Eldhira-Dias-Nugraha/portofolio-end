import type { Metadata } from "next";
import { Inter, Outfit, Bebas_Neue, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingBackground from "@/components/FloatingBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const cormorant = Cormorant_Garamond({ 
  weight: ["400", "700"], 
  subsets: ["latin"], 
  style: ["italic"],
  variable: "--font-serif" 
});

export const metadata: Metadata = {
  title: "Portofolio-end | Eldhira Dias",
  description: "A premium portfolio showcasing modern web development skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} ${bebas.variable} ${cormorant.variable} antialiased bg-black text-white`}>
        <FloatingBackground />
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <footer className="py-10 border-t border-purple-900/20 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Creative Portfolio. Built with Next.js & Tailwind CSS.</p>
        </footer>
      </body>
    </html>
  );
}
