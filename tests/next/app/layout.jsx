import "./globals.css";
import AnimInit from "./anim-init";

export const metadata = {
  title: "gclass-anims — Next.js",
  description: "Setting up gclass-anims in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AnimInit />
        {children}
      </body>
    </html>
  );
}
