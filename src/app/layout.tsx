import type { Metadata, Viewport } from "next";
import { Mulish } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shovon.bd"),
  title: {
    default:
      "Md Minaruzzaman Shovon | Water Resources Engineer & Full Stack Developer",
    template: "%s | Minaruzzaman Shovon",
  },
  description:
    "Md Minaruzzaman Shovon is a Water Resources Engineering undergraduate at CUET and Full Stack Developer focused on hydrological modeling, environmental analysis, and high-performance web applications with AI integration.",
  keywords: [
    "Md Minaruzzaman Shovon",
    "Water Resources Engineering",
    "CUET",
    "hydrology",
    "hydrological modeling",
    "Full Stack Developer",
    "AI integration",
    "Next.js",
    "React",
    "Node.js",
    "Bangladesh",
  ],
  authors: [{ name: "Minaruzzaman Shovon" }],
  creator: "Minaruzzaman Shovon",
  openGraph: {
    type: "website",
    url: "https://shovon.bd/",
    title:
      "Md Minaruzzaman Shovon | Water Resources Engineer & Full Stack Developer",
    description:
      "Water Resources Engineering undergraduate at CUET focused on hydrological modeling, environmental analysis, and AI-powered web applications.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@sh00von",
    title: "Md Minaruzzaman Shovon",
    description:
      "Water Resources Engineering undergraduate at CUET and Full Stack Developer working on hydrological modeling and AI-powered web applications.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#171717",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`antialiased ${mulish.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={`${mulish.className} min-h-screen`} suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JJF34HQPL9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JJF34HQPL9');
          `}
        </Script>
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wbdj1lhmzk");
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
