import PageTitle from "@/components/ui/page-title";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pedidos",
    description: "Gerencie seus pedidos de forma ágil e organizada. Realize operações CRUD para pedidos e mantenha o controle completo sobre o status e detalhes das compras.",
};

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <PageTitle>Gerenciar Pedidos</PageTitle>
            {children}
        </>
    )
}
