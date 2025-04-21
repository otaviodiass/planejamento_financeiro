import Link from "next/link";
import ListaEmpresas from "./componentes/ListaEmpresas";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6]">
      <header className="flex justify-center items-center bg-[#1E3A8A] h-24 w-full">
        <h1 className="text-center text-3xl text-white font-bold">Planejamento Financeiro</h1>
      </header>
      
      <main className="flex flex-col items-center justify-center gap-40 grow">
        <section className="mt-10">
          <h2 className="text-center mb-6 text-2xl font-semibold text-[#1E3A8A]">
            Gerencie as Finanças do seu Negócio com Facilidade
          </h2>
          <div>
            <ListaEmpresas />
          </div>
        </section>

        <Link href="/cadastro-empresa">
          <button className="rounded-full bg-[#3B82F6] px-8 py-5 text-xl font-semibold text-white hover:bg-[#1D4ED8] transition">
            Começe Agora
          </button>
        </Link>
      </main>

      <footer className="flex justify-center items-center h-20 text-2xl bg-[#1E3A8A] text-white">
        Planejamento Financeiro
      </footer>
    </div>
  );
}
