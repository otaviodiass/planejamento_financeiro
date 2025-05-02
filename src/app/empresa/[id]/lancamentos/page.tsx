import TabelaLancamentos from "@/app/componentes/TabelaLancamentos"
import { buscarTransacaoEmpresa } from "@/lib/api";

interface Props {
    params: { id: string }
}

interface Transacao {
  id: number,
  valor: number,
  data: string,
  descricao: string | null,
  subcategoria: string,
  categoria: string,
}

// async function buscarEmpresa(id: string) {
//     const response = await fetch(`http://localhost:3000/api/empresa/${id}/lancamentos`)
//     const data: { message: string; transacoes: Transacao[] } = await response.json()
//     return data.transacoes
// }

async function buscarEmpresa(id: string) {
    const data: { message: string; transacoes: Transacao[] } = await buscarTransacaoEmpresa(id)
    return data.transacoes
}

export default async function PaginaLancamentos({ params }: Props) {
    const { id } = await params
    const dados = await buscarEmpresa(id)
    return (
        <div className="flex justify-center">
            <TabelaLancamentos dados={dados}></TabelaLancamentos>
        </div>
    )
}
