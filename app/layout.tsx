import type { Metadata } from "next";
import { Josefin_Sans, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CircuitLines from "./components/CircuitLines";
import { ThemeProvider } from "./components/ThemeProvider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abdullahshaimy.dev";

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
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abdullah Shaimy | Developer & Designer",
    template: "%s | Abdullah Shaimy",
  },
  description:
    "Personal portfolio of Abdullah Shaimy, a developer and designer from Sri Lanka crafting high-performance web applications and elegant digital experiences.",
  keywords: [
    "portfolio",
    "full-stack developer",
    "web development",
    "Next.js",
    "React",
    "UI/UX",
    "brand identity",
    "Abdullah Shaimy",
    "NanoVext",
  ],
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Abdullah Shaimy", url: siteUrl }],
  creator: "Abdullah Shaimy",
  publisher: "Abdullah Shaimy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Abdullah Shaimy | Developer & Designer",
    description: "Crafting High-Performance Web Applications & Elegant Digital Experiences",
    url: siteUrl,
    type: "website",
    siteName: "Abdullah Shaimy",
    locale: "en_US",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Abdullah Shaimy Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Shaimy | Developer & Designer",
    description: "Crafting High-Performance Web Applications & Elegant Digital Experiences",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${josefin.variable} ${lato.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <CircuitLines />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
