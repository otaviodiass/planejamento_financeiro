import TabelaResumo from "@/app/componentes/TabelaResumo"
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

async function buscarTransacao(id: string) {
    const data: { message: string; transacoes: Transacao[] } = await buscarTransacaoEmpresa(id)
    return data.transacoes
}

export default async function PaginaAnalise({ params }: Props) {
    const { id } = await params
    return (
        <TabelaResumo id={id}></TabelaResumo>
    )
}