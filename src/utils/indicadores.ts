import { TraceState } from "next/dist/trace";
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

export function calcularMargemLucro(transacoes: Transacao[]) {
    const totalPorCategoria = totalPorCategoriaMensalAnual(transacoes)
    
    const receita = totalPorCategoria.filter(r => r.categoria === "Receita")[0]
    const custoVariavel = totalPorCategoria.filter(cv => cv.categoria === "Custo Variável")[0]
    const custoFixo = totalPorCategoria.filter(cf => cf.categoria === "Custo Fixo")[0]

    if (!receita || !custoVariavel || !custoFixo) {
        return 0
    } else {
        const lucro = receita.totalAnual - custoVariavel.totalAnual - custoFixo.totalAnual
    
        const margem = receita.totalAnual > 0 ? (lucro / receita.totalAnual) * 100 : 0
    
        return margem
    }
}

export function calcularPontoEquilibrio(transacoes: Transacao[]) {
    const totalPorCategoria = totalPorCategoriaMensalAnual(transacoes)

    const receita = totalPorCategoria.filter(r => r.categoria === "Receita")[0]
    const custoVariavel = totalPorCategoria.filter(cv => cv.categoria === "Custo Variável")[0]
    const custoFixo = totalPorCategoria.filter(cf => cf.categoria === "Custo Fixo")[0]

    if (!receita || !custoVariavel || !custoFixo) {
        return 0
    } else {
        const margemContribuicao = (receita.totalAnual - custoVariavel.totalAnual) / receita.totalAnual
    
        const pontoEquilibrio = custoFixo.totalAnual / margemContribuicao
    
        return pontoEquilibrio
    }
}

export function calcularCrescimentoReceita(transacoes: Transacao[]) {
    const crescimento = []
    const totalPorCategoria = totalPorCategoriaMensalAnual(transacoes)

    const receita = totalPorCategoria.filter(r => r.categoria === "Receita")[0]


    console.log('receitaaaaaaaaaaa', receita)

    // ((receitaAtual - receitaAnterior) / receitaAnterior) * 100

    if (!receita){
        return []
    } else {
        for (let index = 0; index < receita.valoresPorMes.length; index++) {
            const anterior = receita.valoresPorMes[index - 1]
            const atual = receita.valoresPorMes[index]
    
            const crescimentoAtual = anterior > 0 ? ((atual - anterior) / anterior) * 100 : 0
            crescimento.push(crescimentoAtual)
        }
        return crescimento
    }
}

export function receitaVsDespesas(transacoes: Transacao[]) {
    const totalPorCategoria = totalPorCategoriaMensalAnual(transacoes)

    const receita = totalPorCategoria.filter(r => r.categoria === "Receita")[0]
    const custoVariavel = totalPorCategoria.filter(cv => cv.categoria === "Custo Variável")[0]
    const custoFixo = totalPorCategoria.filter(cf => cf.categoria === "Custo Fixo")[0]

    const meses = Array.from(new Set(transacoes.map(t => getAnoMes(t.data)))).sort()

    if (!receita || !custoVariavel || !custoFixo) {
        return []
    } else {
        const dados = meses.map((mes, i) => ({
            mes,
            receita: receita.valoresPorMes[i] || 0,
            custoFixo: custoFixo.valoresPorMes[i] || 0,
            custoVariavel: custoVariavel.valoresPorMes[i] || 0,
            margemLucro: margemLucro(receita.valoresPorMes[i], custoVariavel.valoresPorMes[i], custoFixo.valoresPorMes[i])
        }))
        return dados
    }
}

export function margemLucro(receita: number, custoVariavel: number, custoFixo: number) {
    if (!receita || !custoVariavel || !custoFixo) {
        return 0
    } else {
        const lucro = receita - custoVariavel - custoFixo
    
        const margem = receita > 0 ? (lucro / receita) * 100 : 0
    
        return margem
    }
}
