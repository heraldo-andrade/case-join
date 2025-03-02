import TopBar from "../ui/topbar";

interface Props {
    children: React.ReactNode
}

const LayoutPage = ({ children }: Props) => {

    return (
        <section className="w-full p-10 pt-5 relative h-full ">
            <TopBar />
            <main className="mt-8 pb-8">
                {children}
            </main>
        </section>
    );
};

export default LayoutPage;