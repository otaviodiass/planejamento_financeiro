import BotaoCabecalho from "@/app/componentes/BotaoCabecalho";
import Link from "next/link";
import { JSX } from "react";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};


async function Layout({ children, params }: LayoutProps) {
  const { id } = params;

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-gray-900">
      <header className="bg-[#1E3A8A] shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 flex-nowrap">
          <Link href="/">
            <h1 className="text-xl sm:text-2xl font-bold text-white whitespace-nowrap">
              Planejamento Financeiro
            </h1>
          </Link>

          <div className="overflow-x-auto min-w-0 scroll-invisivel">
            <ul className="flex gap-2 whitespace-nowrap">
              <li>
                <BotaoCabecalho empresaId={id} destino="" label="Dados da Empresa" />
              </li>
              <li>
                <BotaoCabecalho empresaId={id} destino="inserir-dados" label="Inserir Lançamento" />
              </li>
              <li>
                <BotaoCabecalho empresaId={id} destino="lancamentos" label="Lançamentos" />
              </li>
              <li>
                <BotaoCabecalho empresaId={id} destino="analise" label="Análise Financeira" />
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
}

export default Layout as unknown as (props: any) => Promise<JSX.Element>;

