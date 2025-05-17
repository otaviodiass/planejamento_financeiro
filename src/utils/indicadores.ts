import { getAnoMes } from "./data-utils";

interface Transacao {
    id: number,
    valor: number,
    data: string,
    descricao: string | null,
    subcategoria: string,
    categoria: string,
}

interface Categoria {
    categoria: string,
    valoresPorMes: number[],
    totalAnual: number
}


export function totalPorCategoriaMensalAnual(transacoes: Transacao[]) {
    const categoria = Array.from(new Set(transacoes.map(t => t.categoria)))
    const meses = Array.from(new Set(transacoes.map(t => getAnoMes(t.data)))).sort()

    const resumo = categoria.map(categoria => {
        const valoresPorMes = meses.map(mes => {
            const total = transacoes
                .filter(t => t.categoria === categoria && getAnoMes(t.data) === mes)
                .reduce((acc, t) => acc + t.valor, 0)
            return total
        })

        const totalAnual = valoresPorMes.reduce((acc, val) => acc + val, 0)

        return {
            categoria,
            valoresPorMes,
            totalAnual
        }
    })

    return resumo
}

export function calcularMargemContribuicao(receita: Categoria, custoVariavel: Categoria){
    if (!receita || !custoVariavel){
        return { categoria: 'Margem de Contribuição', valoresPorMes: [], totalAnual: 0}
    }
    const margemContribuicao = receita.valoresPorMes.map((valor, indice) => { return valor - custoVariavel.valoresPorMes[indice] })
    const margemContribuicaoAnual = receita.totalAnual - custoVariavel.totalAnual

    return { categoria: 'Margem de Contribuição', valoresPorMes: margemContribuicao, totalAnual: margemContribuicaoAnual}
}

export function calcularResultadoOperacional(receita: Categoria, custoFixo: Categoria, custoVariavel: Categoria) {
    if (!receita || !custoFixo || !custoVariavel) {
        return { categoria: 'Resultado Operacional', valoresPorMes: [], totalAnual: 0}
    }

    const resultadoOperacional = receita.valoresPorMes.map((valor, indice) => {
        return valor - (custoVariavel.valoresPorMes[indice] + custoFixo.valoresPorMes[indice])
    })

    const resultadoOperacionalAnual = receita.totalAnual - (custoVariavel.totalAnual + custoFixo.totalAnual)

    return { categoria: 'Resultado Operacional', valoresPorMes: resultadoOperacional, totalAnual: resultadoOperacionalAnual}
}

export function calcularReceitaEOperacional(transacoes: Transacao[]) {
    const totalPorCategoria = totalPorCategoriaMensalAnual(transacoes)
    const meses = Array.from(new Set(transacoes.map(t => getAnoMes(t.data)))).sort()

    const receita = totalPorCategoria.filter(r => r.categoria === "Receita")[0]
    const custoVariavel = totalPorCategoria.filter(cv => cv.categoria === "Custo Variável")[0]
    const custoFixo = totalPorCategoria.filter(cf => cf.categoria === "Custo Fixo")[0]

    if (!receita || !custoVariavel || !custoFixo){
        return { receita: [], resultadoOperacional: [] }
    } else {
        const resultadoOperacional = calcularResultadoOperacional(receita, custoFixo, custoVariavel)
    
        if (!resultadoOperacional) {
            return { receita: [], resultadoOperacional: [] }
        }

        // const dados = receita.valoresPorMes.map((valor, indice) => ({
        //     mes: meses[indice],
        //     receitaAcumulada: valor,
        //     resultadoOperacionalAcumulado: resultadoOperacional.valoresPorMes[indice]
        // }))
    
        // return dados
        return { receita: receita.valoresPorMes, resultadoOperacional: resultadoOperacional.valoresPorMes }
    }
}
