import PageTitle from "@/components/ui/page-title";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Clientes",
    description: "Gerencie seus clientes de forma fácil e eficiente com nossa aplicação. Adicione, edite, visualize e exclua informações de clientes com rapidez e praticidade.",
};

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <PageTitle>Gerenciar Clientes</PageTitle>
            {children}
        </>
    )
}
