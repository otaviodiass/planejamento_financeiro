'use client'

import React from 'react'

interface Transacao {
  id: number,
  valor: number,
  data: string,
  descricao: string | null,
  subcategoria: string,
  categoria: string,
}

interface TabelaTranspostaProps {
  dados: Transacao[]
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

export default function TabelaTransposta({ dados }: TabelaTranspostaProps) {
  const tipos = Array.from(new Set(dados.map(l => l.categoria)))

  const mesesOrdenados = Array.from(
    new Set(dados.map(l => getAnoMes(l.data)))
  ).sort()

  return (
    <div className="space-y-16 mt-10">
      {tipos.map(tipo => {
        const porTipo = dados.filter(l => l.categoria === tipo)
        const subCategorias = Array.from(new Set(porTipo.map(l => l.subcategoria)))

        const isReceita = tipo === 'Receita'
        const cor = isReceita ? 'text-green-600' : 'text-red-600'

        return (
          <div key={tipo}>
            <h2 className="text-2xl font-bold mb-6 text-blue-800">{tipo}</h2>
            <div className="w-[1000px] overflow-x-auto rounded-xl shadow-md border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">SubCategoria</th>
                    {mesesOrdenados.map(mes => (
                      <th key={mes} className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                        {formatarMesAno(mes)}
                      </th>
                    ))}
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-600">
                      Total Anual
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-600">
                      Média Anual
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {subCategorias.map((sub, idx) => {
                    const totalAnual = porTipo
                      .filter(l => l.subcategoria === sub)
                      .reduce((acc, l) => acc + l.valor, 0)
                    
                    const totalMedia = totalAnual / mesesOrdenados.length

                    return (
                      <tr key={sub} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-3 text-sm font-medium text-gray-800 w-2xs">{sub}</td>
                        {mesesOrdenados.map(mes => {
                          const total = porTipo
                            .filter(l => l.subcategoria === sub && getAnoMes(l.data) === mes)
                            .reduce((acc, l) => acc + l.valor, 0)

                          return (
                            <td key={mes} className={`px-6 py-3 text-sm font-semibold text-center hover:bg-gray-100 transition-colors duration-200 ${total > 0 ? cor : 'text-gray-400'}`}>
                              {total > 0
                                ? total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                : '-'}
                            </td>
                          )
                        })}
                        <td className={`px-6 py-3 text-sm font-semibold text-center ${totalAnual > 0 ? cor : 'text-gray-400'}`}>
                          {totalAnual > 0
                            ? totalAnual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                            : '-'}
                        </td>

                        <td className={`px-6 py-3 text-sm font-semibold text-center ${totalMedia > 0 ? cor : 'text-gray-400'}`}>
                          {totalMedia > 0
                            ? totalMedia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                            : '-'}
                        </td>
                      </tr>
                    )
                  })}

                  <tr className="bg-blue-100 font-bold">
                    <td className="px-6 py-3 text-sm text-gray-800">Total da Categoria</td>
                    {mesesOrdenados.map(mes => {
                      const totalMes = porTipo
                        .filter(l => getAnoMes(l.data) === mes)
                        .reduce((acc, l) => acc + l.valor, 0)

                      return (
                        <td key={mes} className={`px-6 py-3 text-sm text-center font-bold ${totalMes > 0 ? cor : 'text-gray-400'}`}>
                          {totalMes > 0
                            ? totalMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                            : '-'}
                        </td>
                      )
                    })}
                    <td className={`px-6 py-3 text-sm text-center font-bold ${cor}`}>
                      {porTipo.reduce((acc, l) => acc + l.valor, 0).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>

                    <td className={`px-6 py-3 text-sm text-center font-bold ${cor}`}>
                      {(porTipo.reduce((acc, l) => acc + l.valor, 0) / mesesOrdenados.length).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}