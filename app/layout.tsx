import type { Metadata } from "next";
import { Josefin_Sans, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GlobalProtection from "./components/GlobalProtection";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdullah Shaimy | Graphic Designer & CEO",
  description:
    "Personal portfolio of Abdullah Shaimy, a Creative Graphic Designer and CEO from Sri Lanka — crafting high-impact visual identities and digital experiences.",
  keywords: ["portfolio", "graphic designer", "CEO", "Sri Lanka", "UI/UX", "brand identity", "Abdullah Shaimy"],
  openGraph: {
    title: "Abdullah Shaimy | Graphic Designer & CEO",
    description: "Crafting High-Impact Visual Identities & Digital Experiences",
    type: "website",
  },
};

import { ThemeProvider } from "./components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${josefin.variable} ${lato.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <GlobalProtection />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
