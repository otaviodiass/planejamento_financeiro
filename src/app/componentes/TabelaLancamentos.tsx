'use client'

import React from 'react'

type Lancamento = {
  tipoCategoria: string
  subCategoriaTipo: string
  valorTransacao: number
  dataTransacao: string
}

interface TabelaTranspostaProps {
  dados: Lancamento[]
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
  const tipos = Array.from(new Set(dados.map(l => l.tipoCategoria)))

  const mesesOrdenados = Array.from(
    new Set(dados.map(l => getAnoMes(l.dataTransacao)))
  ).sort()

  return (
    <div className="space-y-16 mt-10">
      {tipos.map(tipo => {
        const porTipo = dados.filter(l => l.tipoCategoria === tipo)
        const subCategorias = Array.from(new Set(porTipo.map(l => l.subCategoriaTipo)))

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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {subCategorias.map((sub, idx) => (
                    <tr key={sub} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-3 text-sm font-medium text-gray-800 w-2xs">{sub}</td>
                      {mesesOrdenados.map(mes => {
                        const total = porTipo
                          .filter(l => l.subCategoriaTipo === sub && getAnoMes(l.dataTransacao) === mes)
                          .reduce((acc, l) => acc + l.valorTransacao, 0)

                        const isReceita = tipo === 'Receita'
                        const cor = isReceita ? 'text-green-600' : 'text-red-600'

                        return (
                          <td key={mes} className={`px-6 py-3 text-sm font-semibold text-center hover:bg-gray-100 transition-colors duration-200 ${total > 0 ? cor : 'text-gray-400'}`}>
                            {total > 0
                              ? total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                              : '-'}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}
