import Link from 'next/link';
import React from 'react';

// interface Props {
//     params: { id: string }
// }

interface Empresa {
    id: number;
    nome: string;
    cnpj: string;
}

async function buscaEmpresa(id: any) {

    const response = await fetch(`http://localhost:3000/api/empresa/${id}`)
    const data: { message: string; empresa: Empresa } = await response.json()

    const empresaSelecionada = data.empresa
    const nomeEmpresa = empresaSelecionada?.nome
    const cnpjEmpresa = empresaSelecionada?.cnpj
    return { nomeEmpresa, cnpjEmpresa }
}

export default async function EmpresaPage({ params }: any) {
    const {id} =  params
    const { nomeEmpresa, cnpjEmpresa} = await buscaEmpresa(id)

    return (
        <div className='flex justify-center min-h-[calc(100vh-5rem)] bg-gray-100'>
            <div className='p-6 w-full max-w-[600px]'>
                <h1 className='text-2xl font-bold mb-6 text-center'>Dados da Empresa</h1>
                <table className='w-full text-left'>
                    <tbody>
                        <tr className='border-b border-gray-300'>
                            <td className='px-4 py-3 font-semibold text-gray-700 border-r border-gray-300'>Nome</td>
                            <td className='px-4 py-3 text-gray-800'>{nomeEmpresa}</td>
                        </tr>
                        <tr>
                            <td className='px-4 py-3 font-semibold text-gray-700 border-r border-gray-300'>CNPJ</td>
                            <td className='px-4 py-3 text-gray-800'>{cnpjEmpresa}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Link href={`/empresa/${id}/editar`}>
                <button className="m-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Editar Dados
                </button>
            </Link>
        </div>
    )
}
