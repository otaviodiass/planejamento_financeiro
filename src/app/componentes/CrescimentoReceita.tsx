'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { buscarTransacaoEmpresa } from '@/lib/api'
import { calcularCrescimentoReceita } from '@/utils/indicadores';
import { useEffect, useState } from 'react'
import { getAnoMes } from '@/utils/data-utils';

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

export default function CrescimentoReceita({ id }: Props) {

    const [transacoes, setTransacoes] = useState<Transacao[]>([])

    useEffect(() => {
        buscarTransacaoEmpresa(id).then(res =>{
            setTransacoes(res.transacoes)
        })
    }, [id])

    const crescimentoReceita = calcularCrescimentoReceita(transacoes)

    const meses = Array.from(new Set(transacoes.map(t => getAnoMes(t.data)))).sort()

    const dadosGrafico = crescimentoReceita.map((valor, index) => ({
        mes: meses[index],
        crescimento: Number(valor.toFixed(2))
    }))

    return(
        <div className='p-4 border border-blue-200 bg-blue-50 rounded-xl shadow-md m-8'>
            <h2 className='text-lg font-semibold text-blue-800 mb-3'>Crescimento Mensal da Receita</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dadosGrafico}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="mes"/>
                    <YAxis domain={['auto', 'auto']} tickFormatter={(v) => `${v}%`} />
                    <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`}/>
                    <Line type="monotone" dataKey="crescimento" stroke="#1e40af" strokeWidth={2}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}