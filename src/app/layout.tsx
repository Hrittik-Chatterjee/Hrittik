import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Hrittik Chatterjee — Portfolio",
  description: "A retro desktop portfolio experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${vt323.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full overflow-hidden" style={{ background: "#008080", fontFamily: "'VT323', monospace" }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
