'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { buscarTransacaoEmpresa } from '@/lib/api'
import { receitaVsDespesas } from '@/utils/indicadores';
import { useEffect, useState } from 'react'
import { getAnoMes } from '@/utils/data-utils';
import TooltipCustomizado from '@/app/componentes/TooltipCustomizado'

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

export default function ReceitaVsDespesas({ id }: Props) {

    const [transacoes, setTransacoes] = useState<Transacao[]>([])

    useEffect(() => {
        buscarTransacaoEmpresa(id).then(res =>{
            setTransacoes(res.transacoes)
        })
    }, [id])

    const dados = receitaVsDespesas(transacoes)

    return(
         <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl shadow-md m-8">
      <h2 className="text-lg font-semibold text-blue-800 mb-3">Receita vs Despesas Mensais</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          {/* <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`} /> */}
          <Tooltip content={<TooltipCustomizado/>}/>
          <Legend />
          {/* Receita: barra separada */}
          <Bar dataKey="receita" fill="#10B981" name="Receita" />

          {/* Despesas: empilhadas */}
          <Bar dataKey="custoFixo" stackId="despesas" fill="#3B82F6" name="Custo Fixo" />
          <Bar dataKey="custoVariavel" stackId="despesas" fill="#F97316" name="Custo Variável" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    )
}