import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PrimeReactProvider } from 'primereact/api';
import "./globals.css";
import "primeicons/primeicons.css";
import LayoutPage from "@/components/layout-page";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Case Join",
  description: "Aplicação simples de gerenciamento desenvolvida com Next.js, permitindo realizar operações CRUD para Clientes, Produtos e Pedidos, oferecendo uma interface intuitiva e fácil de usar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html
      lang="pt-br"
      className="h-full min-h-screen"
    >
      <body
        className={`${inter.variable} min-h-screen h-full font-sans antialiased`}
      >
        <PrimeReactProvider>
          <LayoutPage>
            {children}
          </LayoutPage>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
