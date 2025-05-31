'use client'

import { buscarTransacaoEmpresa } from '@/lib/api'
import { calcularMargemLucro } from '@/utils/indicadores';
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

export default function IndicadorMargemLucro({ id }: Props) {

    const [transacoes, setTransacoes] = useState<Transacao[]>([])

    useEffect(() => {
        buscarTransacaoEmpresa(id).then(res =>{
            setTransacoes(res.transacoes)
        })
    }, [id])

    const margemLucro = calcularMargemLucro(transacoes)

    return (
        <div className='m-4 p-4 border border-blue-300 rounded-lg shadow-sm bg-blue-50 text-center w-full max-w-md mx-auto'>
            <h2 className='text-lg font-bold text-blue-800 mb-1'>Margem de Lucro Anual</h2>
            <p className={`text-2xl font-semibold ${margemLucro > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {margemLucro.toFixed(2)}%
            </p>
        </div>
    )
}
