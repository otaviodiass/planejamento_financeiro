"use client"

import { useEffect, useState } from "react";

export default function CadastrarEmpresa() {

    const [mensagem, setMensagem] = useState('')
    const [tipoMensagem, setTipoMensagem] = useState<'sucesso' | 'erro' | null>(null)

    useEffect(() => {
        if (tipoMensagem === 'sucesso') {
            const timer = setTimeout(() => {
                setMensagem('');
                setTipoMensagem(null)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [tipoMensagem])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const data = {
            nome: formData.get('nome'),
            cnpj: formData.get('cnpj'),
            representante: formData.get('representante'),
        };

        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${baseUrl}/api/empresa`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (response.ok) {
            setMensagem("Empresa Cadastrada com sucesso!")
            setTipoMensagem("sucesso")
        } else {
            setMensagem("Erro ao cadastrar empresa. Tente novamente.")
            setTipoMensagem("erro")
        }
    };

    return (
        <div>
            {mensagem && (
                <div
                    className={`p-3 rounded-md text-center font-medium mb-4 ${tipoMensagem === 'sucesso'
                            ? 'bg-green-100 text-green-800 border border-green-300'
                            : 'bg-red-100 text-red-800 border border-red-300 flex justify-between items-center'
                        }`}>
                    <span>{mensagem}</span>
                    {tipoMensagem === 'erro' && (
                        <button
                            onClick={() => {
                                setMensagem('');
                                setTipoMensagem(null);
                            }}
                            className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                            Ok
                        </button>
                    )}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                // className="bg-white p-8 m-4 rounded-2xl shadow-lg w-full max-w-lg transition-all"
                className="space-y-6 p-6 bg-white shadow rounded-md max-w-md mx-auto mt-10">

                <h2 className="text-center text-2xl font-bold text-[#1E3A8A] mb-6">Cadastro de Empresa</h2>

                <div className="mb-4">
                    <label htmlFor='nome' className="text-gray-700 font-medium text-lg block mb-2">Nome</label>
                    <input
                        type="text"
                        id='nome'
                        name='nome'
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='cnpj' className="text-gray-700 font-medium text-lg block mb-2">CNPJ</label>
                    <input
                        type="text"
                        id='cnpj'
                        name='cnpj'
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='representante' className="text-gray-700 font-medium text-lg block mb-2">Representante</label>
                    <input
                        type="text"
                        id='representante'
                        name='representante'
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                    />
                </div>
                <button className="w-full bg-[#1E3A8A] text-white text-lg font-semibold py-3 px-4 rounded-lg hover:bg-[#3B82F6] transition-colors duration-300 cursor-pointer">
                    Enviar
                </button>
            </form>
        </div>
    )
}