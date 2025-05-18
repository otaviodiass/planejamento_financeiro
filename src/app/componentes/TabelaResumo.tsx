'use client'

import { buscarTransacaoEmpresa } from '@/lib/api'
import { totalPorCategoriaMensalAnual, calcularMargemContribuicao, calcularResultadoOperacional, calcularReceitaEOperacional } from '@/utils/indicadores';
import { useEffect, useState } from 'react'

interface Props {
    id: string;
}

interface Transacao {
    id: number,
    valor: number,
    data: string,
    descricao: string | null,
    subcategoria: string,
    categoria: string,
}

function getAnoMes(data: string) {
    const date = new Date(data)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function formatarMesAno(anoMes: string) {
    const [ano, mes] = anoMes.split('-')
    const data = new Date(Number(ano), Number(mes) - 1)
    return data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
}

export default function TabelaResumo({ id }: Props) {

    const [transacoes, setTransacoes] = useState<Transacao[]>([])

    useEffect(() => {
        buscarTransacaoEmpresa(id).then(res =>{
            setTransacoes(res.transacoes)
        })
    }, [id])

    const c = calcularReceitaEOperacional(transacoes)
    console.log('gráfico', c)

    const meses = Array.from(new Set(transacoes.map(t => getAnoMes(t.data)))).sort()

    const resp = totalPorCategoriaMensalAnual(transacoes)

    const receita = resp.filter(r => r.categoria === "Receita")[0]
    const custoVariavel = resp.filter(cv => cv.categoria === "Custo Variável")[0]
    const custoFixo = resp.filter(cf => cf.categoria === "Custo Fixo")[0]

    const margemContribuicao = calcularMargemContribuicao(receita, custoVariavel)

    const resulOp = calcularResultadoOperacional(receita, custoFixo, custoVariavel)

    return (
        <div className='m-8'>
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Resumo</h2>
            <div className='w-full overflow-x-auto rounded-xl shadow-md border border-gray-200'>
                <table className="w-full table-auto divide-y divide-gray-200">
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600"></th>
                            {meses.map(mes => (
                                <th key={mes} className='px-6 py-4 text-center text-sm font-semibold text-gray-600'>{formatarMesAno(mes)}</th>
                            ))}
                            <th className='px-6 py-4 text-center text-sm font-semibold text-gray-600'>Total Anual</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-100'>
                        {receita && (
                            <tr>
                            <td className="px-6 py-3 text-sm font-medium text-gray-800">Receita</td>
                            {receita.valoresPorMes.map((valor, i) => (
                                <td key={i} className={`px-6 py-3 text-sm font-semibold text-center hover:bg-gray-100 transition-colors duration-200 ${
                                    valor > 0 ? 'text-blue-700' : 'text-gray-400'
                                  }`}>
                                {valor > 0 ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-'}
                                </td>
                            ))}
                            <td className="px-6 py-3 text-sm font-semibold text-center text-blue-700">
                                {receita.totalAnual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </td>
                            </tr>
                        )}
                        {custoVariavel && (
                            <tr>
                            <td className="px-6 py-3 text-sm font-medium text-gray-800">Custo Variável</td>
                            {custoVariavel.valoresPorMes.map((valor, i) => (
                                <td key={i} className={`px-6 py-3 text-sm font-semibold text-center hover:bg-gray-100 transition-colors duration-200 ${
                                    valor > 0 ? 'text-blue-700' : 'text-gray-400'
                                  }`}>
                                {valor > 0 ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-'}
                                </td>
                            ))}
                            <td className="px-6 py-3 text-sm font-semibold text-center text-blue-700">
                                {custoVariavel.totalAnual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </td>
                            </tr>
                        )}
                        <tr>
                            <td className="px-6 py-3 text-sm text-gray-800">Margem de Contribuição</td>
                            {margemContribuicao.valoresPorMes.map((valor, indice) => (
                                <td key={indice} className={`px-6 py-3 text-sm font-semibold text-center ${valor > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {valor.toLocaleString('pt-BR',  { style: 'currency', currency: 'BRL' })}
                                </td>
                            ))}
                            <td className={`px-6 py-3 text-sm font-semibold text-center ${margemContribuicao.totalAnual > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {margemContribuicao.totalAnual > 0 ? margemContribuicao.totalAnual.toLocaleString('pt-BR',  { style: 'currency', currency: 'BRL' }) : '-'}
                            </td>
                        </tr>
                        {custoFixo && (
                            <tr>
                            <td className="px-6 py-3 text-sm font-medium text-gray-800">Custo Fixo</td>
                            {custoFixo.valoresPorMes.map((valor, i) => (
                                <td key={i} className={`px-6 py-3 text-sm font-semibold text-center hover:bg-gray-100 transition-colors duration-200 ${
                                    valor > 0 ? 'text-blue-700' : 'text-gray-400'
                                  }`}>
                                {valor > 0 ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-'}
                                </td>
                            ))}
                            <td className="px-6 py-3 text-sm font-semibold text-center text-blue-700">
                                {custoFixo.totalAnual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </td>
                            </tr>
                        )}
                         {resulOp && (
                            <tr>
                            <td className="px-6 py-3 text-sm font-medium text-gray-800">Resultado Operacional</td>
                            {resulOp.valoresPorMes.map((valor, indice) => (
                                <td key={indice} className={`px-6 py-3 text-sm font-semibold text-center hover:bg-gray-100 transition-colors duration-200 ${
                                    valor > 0 ? 'text-blue-700' : 'text-red-600'
                                  }`}>
                                {/* {valor > 0 ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-'} */}
                                {valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </td>
                            ))}
                            <td className="px-6 py-3 text-sm font-semibold text-center text-blue-700">
                                {resulOp.totalAnual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )

}
