import PageTitle from "@/components/ui/page-title";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Produtos",
    description: "Controle seus produtos com facilidade. Realize operações de criação, leitura, atualização e exclusão de produtos em nossa aplicação de gerenciamento simples e intuitiva.",
};

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <PageTitle>Gerenciar Produtos</PageTitle>
            {children}
        </>
    )
}
