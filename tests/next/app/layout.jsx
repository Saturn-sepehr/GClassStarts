import "./globals.css";
import AnimInit from "./anim-init";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata = {
  title: "gclass-anims — Next.js",
  description: "Setting up gclass-anims in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <AnimInit />
        {children}
      </body>
    </html>
  );
}
