import Link from "next/link";

export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-gray-900">
            <header className="bg-[#1E3A8A] shadow-md">
                <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-center">
                    <Link href="/">
                        <h1 className="text-2xl font-bold text-white">Planejamento Financeiro</h1>
                    </Link>
                </div>
            </header>

            <main className="flex-grow">{children}</main>
        </div>
    );
}
