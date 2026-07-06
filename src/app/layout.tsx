import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Montserrat as MontserratFont } from "next/font/google";
import "@/app/globals.css";

const Cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const Montserrat = MontserratFont({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AUREO — CMS",
  description: "Content Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${Cormorant.variable} ${Montserrat.variable} h-full antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="min-h-full flex flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        {children}
      </body>
    </html>
  );
}
