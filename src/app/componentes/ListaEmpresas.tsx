'use client'
import Link from "next/link";
import React from "react";

interface Empresa {
    id: number;
    nome: string;
    cnpj: string;
}

async function buscarEmpresas() {
    const response = await fetch(`http://localhost:3000/api/empresa`)
    const data: { message: string; empresas: Empresa[] } = await response.json()
    const listaEmpresas = Array.isArray(data.empresas) ? data.empresas : [];
    return listaEmpresas
}

export default function ListaEmpresas() {
    const [empresas, setEmpresas] = React.useState<Empresa[]>([]);

    React.useEffect(() => {
        async function carregarEmpresas() {
            const lista = await buscarEmpresas();
            setEmpresas(lista);
        }
        carregarEmpresas();
    }, []);

    return(
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6 text-center">
                Empresas Cadastradas
            </h2>

            <div className="max-h-72 overflow-y-auto">
                <ul className="space-y-4">
                    { empresas.map((empresa) => (
                        <li key={empresa.id}>
                            <Link href={`/empresa/${encodeURIComponent(empresa.id)}`}>
                                <div className="bg-[#F9FAFB] hover:bg-[#E0F2FE] transition p-4 rounded-lg border border-[#CBD5E1] shadow-sm cursor-pointer">
                                    <p className="font-semibold text-base font-sans text-[#1E3A8A]">{empresa.nome}</p>
                                    <p className="text-gray-500 text-sm">{empresa.cnpj}</p>
                                </div>
                            </Link>
                        </li>
                    )) }
                </ul>
            </div>
        </div>
    )
}
