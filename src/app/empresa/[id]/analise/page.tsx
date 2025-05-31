import CrescimentoReceita from "@/app/componentes/CrescimentoReceita";
import GraficoAnalise from "@/app/componentes/GraficoAnalise";
import IndicadorMargemLucro from "@/app/componentes/IndicadorMargemLucro";
import IndicadorPontoEquilibrio from "@/app/componentes/IndicadorPontoEquilibrio";
import ReceitaVsDespesas from "@/app/componentes/ReceitaVsDespesas";
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
        <div>
            <TabelaResumo id={id}></TabelaResumo>
            <GraficoAnalise id={id}></GraficoAnalise>
            <div className="flex">
                <IndicadorMargemLucro id={id}></IndicadorMargemLucro>
                <IndicadorPontoEquilibrio id={id}></IndicadorPontoEquilibrio>
            </div>
            <CrescimentoReceita id={id}></CrescimentoReceita>
            <ReceitaVsDespesas id={id}></ReceitaVsDespesas>
        </div>
    )
}