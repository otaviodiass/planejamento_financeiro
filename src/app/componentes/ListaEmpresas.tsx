'use client'
import Link from "next/link";
import React from "react";
// import { empresas } from "../dbfake/db";

interface Empresa {
    id: number;
    nome: string;
    cnpj: string;
    representante: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

async function buscarEmpresas() {
    const response = await fetch(`${baseUrl}/api/empresa`)
    const data: { message: string; empresas: Empresa[] } = await response.json()
    console.log(data.empresas)
    const listaEmpresas = Array.isArray(data.empresas) ? data.empresas : [];
    console.log(listaEmpresas)
    return listaEmpresas
}

function formatarCNPJ(cnpj:string) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
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
                                    <p className="text-gray-500 text-sm">{formatarCNPJ(empresa.cnpj)}</p>
                                </div>
                            </Link>
                        </li>
                    )) }
                </ul>
            </div>
        </div>
    )
}
