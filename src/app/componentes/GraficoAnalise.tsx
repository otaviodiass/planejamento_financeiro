'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { useEffect, useState } from 'react'
import { buscarTransacaoEmpresa } from '@/lib/api'
import { getAnoMes } from '@/utils/data-utils'
import { calcularReceitaEOperacional } from '@/utils/indicadores'

interface Props {
  id: string
}

interface Transacao {
  id: number,
  valor: number,
  data: string,
  descricao: string | null,
  subcategoria: string,
  categoria: string,
}[]


export default function GraficoAnalise({ id }: Props) {
  const [dados, setDados] = useState<{ mes: string, receita: number, resultadoOperacional: number }[]>([])

  useEffect(() => {
    buscarTransacaoEmpresa(id).then(resp => {
      const { receita, resultadoOperacional } = calcularReceitaEOperacional(resp.transacoes)
  
      const meses = Array.from(new Set(resp.transacoes.map((t: Transacao) => getAnoMes(t.data)))) as string[]
      const mesesOrdenados = meses.sort()
  
      const dadosCompletos = mesesOrdenados.map((mes, i) => ({
        mes,
        receita: receita[i] || 0,
        resultadoOperacional: resultadoOperacional[i] || 0
      }))
  
      setDados(dadosCompletos)
    })
  }, [id])

  return (
    <div className="m-10">
      <h2 className="text-xl font-semibold text-blue-800 mb-4">Receita x Resultado Operacional</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dados}>
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip formatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
          <Legend />
          <Line type="monotone" dataKey="receita" stroke="#28a745" name="Receita Total" />
          <Line type="monotone" dataKey="resultadoOperacional" stroke="#007bff" name="Resultado Operacional" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
