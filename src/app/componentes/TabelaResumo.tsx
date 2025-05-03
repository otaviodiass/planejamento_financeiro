'use client'

import { buscarTransacaoEmpresa } from '@/lib/api'
import { calcularMargemDeContribuicao, calcularMargemDeContribuicaoAnual } from '@/utils/indicadores';
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

    const categoria = Array.from(new Set(transacoes.map(t => t.categoria)))
    const meses = Array.from(new Set(transacoes.map(t => getAnoMes(t.data)))).sort()

    const margemPorMes = calcularMargemDeContribuicao(transacoes)
    const { margemAnual } = calcularMargemDeContribuicaoAnual(transacoes)

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

    return (
        <div className='m-10'>
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
                        {resumo.map(({ categoria, valoresPorMes, totalAnual }) => (
                            <tr key={categoria}>
                                <td className='px-6 py-3 text-sm font-medium text-gray-800'>{categoria}</td>
                                {valoresPorMes.map((valor, i) => (
                                    <td key={i} className={`px-6 py-3 text-sm font-semibold text-center hover:bg-gray-100 transition-colors duration-200 ${
                                        valor > 0 ? 'text-blue-700' : 'text-gray-400'
                                      }`}>
                                        {valor > 0 ? valor.toLocaleString('pt-BR',  { style: 'currency', currency: 'BRL' }) : '-'}
                                    </td>
                                ))}
                                <td className="px-6 py-3 text-sm font-semibold text-center text-blue-700">
                                    {totalAnual > 0 ? totalAnual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-'}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td className="px-6 py-3 text-sm text-gray-800">Margem de Contribuição</td>
                            {margemPorMes.map(({ mes, valor, percentual }) => (
                                <td key={mes} className={`px-6 py-3 text-sm font-semibold text-center ${percentual > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {percentual.toFixed(1)}%
                                </td>
                            ))}
                            <td className={`px-6 py-3 text-sm font-semibold text-center ${margemAnual > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {margemAnual > 0 ? margemAnual.toLocaleString('pt-BR',  { style: 'currency', currency: 'BRL' }) : '-'}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}
