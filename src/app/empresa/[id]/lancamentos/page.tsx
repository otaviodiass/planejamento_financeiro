import TabelaLancamentos from "@/app/componentes/TabelaLancamentos"
import { buscarTransacaoEmpresa } from "@/lib/api";
import { Pencil } from "lucide-react";
import Link from "next/link";

// interface Props {
//     params: { id: string }
// }

interface Transacao {
  id: number,
  valor: number,
  data: string,
  descricao: string | null,
  subcategoria: string,
  categoria: string,
}

async function buscarEmpresa(id: string) {
    const data: { message: string; transacoes: Transacao[] } = await buscarTransacaoEmpresa(id)
    return data.transacoes
}

export default async function PaginaLancamentos({ params }: any) {
    const { id } = params
    const dados = await buscarEmpresa(id)
    return (
        <div className="flex justify-center">
            <TabelaLancamentos dados={dados}></TabelaLancamentos>
            <Link href={`/empresa/${id}/lancamentos/editar`}>
                <button className="m-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
                    <Pencil className="w-6 h-6"/>
                </button>
            </Link>
        </div>
    )
}
