import { getAnoMes } from "./data-utils";

interface Transacao {
    id: number,
    valor: number,
    data: string,
    descricao: string | null,
    subcategoria: string,
    categoria: string,
}

interface MargemMes {
    mes: string
    valor: number
    percentual: number
}

export function calcularMargemDeContribuicao(transacoes: Transacao[]): MargemMes[] {
    const meses = Array.from(new Set(transacoes.map(t => getAnoMes(t.data)))).sort()

    const receitas = transacoes.filter(t => t.categoria === 'Receita')
    const custoVariavel = transacoes.filter(t => t.categoria === 'Custo Variável')

    return meses.map(mes => {
        const receitaMes = receitas
            .filter(r => getAnoMes(r.data) === mes)
            .reduce((acc, r) => acc + r.valor, 0)
        
        const custoVariavelMes = custoVariavel
            .filter(c => getAnoMes(c.data) === mes)
            .reduce((acc, c) => acc + c.valor, 0)

        const margem = receitaMes - custoVariavelMes
        const percentual = receitaMes > 0 ? (margem / receitaMes) * 100 : 0

        return {mes, valor: margem, percentual}
    })
}

export function calcularMargemDeContribuicaoAnual(transacoes: Transacao[]) {
    const receitaAnual = transacoes.filter(t => t.categoria === 'Receita').reduce((acc, r) => acc + r.valor, 0)
    const custoVariavelAnual = transacoes.filter(t => t.categoria === 'Custo Variável').reduce((acc, c) => acc + c.valor, 0)
    
    const margemAnual = receitaAnual - custoVariavelAnual
    
    return {margemAnual}
}
