'use client'

import { buscarTransacaoEmpresa } from '@/lib/api'
import { calcularPontoEquilibrio } from '@/utils/indicadores';
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

export default function IndicadorPontoEquilibrio({ id }: Props) {

    const [transacoes, setTransacoes] = useState<Transacao[]>([])

    useEffect(() => {
        buscarTransacaoEmpresa(id).then(res =>{
            setTransacoes(res.transacoes)
        })
    }, [id])

    const pontoEquilibrio = calcularPontoEquilibrio(transacoes)

    // return (
    //     <div className='p-6 border rounded-xl shadow-md bg-white w-full max-w-md mx-auto text-center mb-4'>
    //         <h3 className='text-lg font-semibold text-gray-700 mb-2'>Ponto de Equilíbrio Anual</h3>
    //         <p className={`text-3xl font-bold ${pontoEquilibrio > 0 ? 'text-green-600' : 'text-red-600'}`}>
    //             {pontoEquilibrio.toFixed(2)}%
    //         </p>
    //     </div>
    // )
    return (
    <div className="m-4 p-4 border border-blue-300 rounded-lg shadow-sm bg-blue-50 text-center w-full max-w-md mx-auto">
        <h2 className="text-lg font-bold text-blue-800 mb-1">Ponto de Equilíbrio Anual</h2>
        <p className="text-2xl font-semibold text-blue-700">
            {pontoEquilibrio.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })}
        </p>
    </div>
  )
}
