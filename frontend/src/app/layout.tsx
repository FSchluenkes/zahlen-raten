import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Wrapper from "@/components/wrapper/wrapper";

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
  title: "Zahlen-Raten",
  description: "Miniprojekt: Zahlen-Raten",
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
        style={{ margin: "0px", padding: "0px", border: "0px" }}
      >
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
