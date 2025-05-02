'use client'

import { buscarTransacaoEmpresa } from '@/lib/api'
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

export default function TabelaResumo({ id }: Props) {

    const [empresas, setEmpresas] = useState<Transacao[]>([])

    useEffect(() => {
        buscarTransacaoEmpresa(id).then(res =>{
            setEmpresas(res.transacoes)
        })
    }, [id])

    return(
        <div>{empresas.map(e => <p key={e.id}>{e.valor}</p>)}</div>
    )
}
