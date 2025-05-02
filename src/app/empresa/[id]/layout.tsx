import BotaoCabecalho from "@/app/componentes/BotaoCabecalho";
import Link from "next/link";

type LayoutProps = {
    children: React.ReactNode;
    params: {
      id: string;
    };
  };
  

export default async function Layout({ children, params }: LayoutProps) {
    const { id } = await params;

    return (
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-gray-900">
            <header className="bg-[#1E3A8A] shadow-md">
                <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/">
                        <h1 className="text-2xl font-bold text-white">Planejamento Financeiro</h1>
                    </Link>

                    <nav>
                        <ul className="flex gap-4">
                            <li>
                                <BotaoCabecalho empresaId={id} destino="" label="Dados da Empresa"></BotaoCabecalho>
                            </li>
                            <li>
                                <BotaoCabecalho empresaId={id} destino="inserir-dados" label="Inserir Dados"></BotaoCabecalho>
                            </li>
                            <li>
                                <BotaoCabecalho empresaId={id} destino="lancamentos" label="Lançamentos"></BotaoCabecalho>
                            </li>
                            <li>
                                <BotaoCabecalho empresaId={id} destino="analise" label="Análise Financeira"></BotaoCabecalho>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="flex-grow">{children}</main>
        </div>
    );
}
