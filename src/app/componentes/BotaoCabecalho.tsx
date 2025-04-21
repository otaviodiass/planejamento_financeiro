'use client'

import { useRouter } from "next/navigation"

type Props = {
    empresaId: string;
    destino: string;
    label: string
}

export default function BotaoInserir({ empresaId, destino, label }: Props) {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/empresa/${empresaId}/${destino}`)
    }

    return (
        <button
            onClick={handleClick} 
            className="cursor-pointer text-white hover:bg-[#DBEAFE] hover:text-[#1E3A8A] font-medium px-4 py-2 rounded-md transition-colors">
            {label}
        </button>
    )
}
