import TopBar from "../ui/topbar";

interface Props {
    children: React.ReactNode
}

const LayoutPage = ({ children }: Props) => {

    return (
        <section className="w-full relative h-full ">
            <TopBar />
            <main className="pt-26 px-6 md:px-12 pb-8">
                {children}
            </main>
        </section>
    );
};

export default LayoutPage;