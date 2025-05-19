'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface Empresa {
  id: number
  nome: string
  cnpj: string
  representante: string
}

export default function EditarEmpresaPage() {
  const { id } = useParams()
  const router = useRouter()

  const [empresa, setEmpresa] = useState<Empresa | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      async function fetchEmpresa() {
      const res = await fetch(`/api/empresa/${id}`)
      const data = await res.json()
      setEmpresa(data.empresa)
      setLoading(false)
  }

  fetchEmpresa()
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
      e.preventDefault()

      const res = await fetch(`/api/empresa/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(empresa),
      })

      if (res.ok) {
      alert('Empresa atualizada com sucesso!')
      router.push(`/empresa/${id}`)
      } else {
      alert('Erro ao atualizar empresa.')
      }
  }

  if (loading) return <p className="p-6">Carregando...</p>
  if (!empresa) return <p className="p-6">Empresa não encontrada.</p>

   return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">Editar Empresa</h1>

        <label className="block mb-4">
          <span className="text-gray-700">Nome</span>
          <input
            type="text"
            value={empresa.nome}
            onChange={e => setEmpresa({ ...empresa, nome: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">CNPJ</span>
          <input
            type="text"
            value={empresa.cnpj}
            onChange={e => setEmpresa({ ...empresa, cnpj: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Representante</span>
          <input
            type="text"
            value={empresa.representante}
            onChange={e => setEmpresa({ ...empresa, representante: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </label>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => router.push(`/empresa/${id}`)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}
