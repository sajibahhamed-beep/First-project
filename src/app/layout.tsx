import type { Metadata } from "next";
import { Inter, Lato, Geist } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sajuxly - Sajib | Personal Portfolio & Design Studio",
  description:
    "Crafting intuitive digital experiences and teaching designers how to communicate through design. Portfolio of Sajib, designer based in Dhaka, Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${lato.variable} ${geist.variable} scroll-smooth antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#090b0e] text-white font-sans selection:bg-[#06ACFE] selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
