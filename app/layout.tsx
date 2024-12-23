import type { Metadata } from "next";
import localFont from "next/font/local";
import AppWalletProvider from "./wallet/AppWalletProvider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Chimera",
  description: "Build, customize and monetize AI agents with tailored plugins.",
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1733783816/Chimaera_smmhep.png",
        width: 1200,
        height: 630,
        alt: "Chimera Logo",
      },
    ],
  },
  twitter: {
    title: "Chimera",
    description:
      "Build, customize and monetize AI agents with tailored plugins.",
    images: [
      {
        url: "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1733783816/Chimaera_smmhep.png",
        alt: "Chimera Logo",
      },
    ],
    creator: "@_Chimera__",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppWalletProvider>{children}</AppWalletProvider>
      </body>
    </html>
  );
}
