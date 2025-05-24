'use client'

import Link from "next/link"
import { useState, useEffect, useMemo } from "react"
import React from "react"

interface Props {
  params: Promise<{ id: string }>
}

interface Transacao {
  id: number,
  valor: number,
  data: string,
  descricao: string | null,
  subcategoria: string,
  categoria: string,
}

export default function PaginaEdicaoLancamentos({ params }: Props) {
  const { id } = React.use(params)

  const [dados, setDados] = useState<Transacao[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [filtroSubcategoria, setFiltroSubcategoria] = useState('')

  useEffect(() => {
    async function fetchDados() {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:3000/api/empresa/${id}/lancamentos`, { cache: "no-store" })
        if (!res.ok) throw new Error('Erro ao buscar transações')
        const json = await res.json()
        setDados(json.transacoes)
        setLoading(false)
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido')
        setLoading(false)
      }
    }
    fetchDados()
  }, [id])


  const categorias = useMemo(() => {
    return Array.from(new Set(dados.map(d => d.categoria)))
  }, [dados])

  const subcategorias = useMemo(() => {
    return Array.from(new Set(
      dados
        .filter(d => !filtroCategoria || d.categoria === filtroCategoria)
        .map(d => d.subcategoria)
    ))
  }, [dados, filtroCategoria])

  const dadosFiltrados = useMemo(() => {
    return dados.filter(d =>
      (!filtroCategoria || d.categoria === filtroCategoria) &&
      (!filtroSubcategoria || d.subcategoria === filtroSubcategoria)
    )
  }, [dados, filtroCategoria, filtroSubcategoria])

  if (loading) return <p className="p-6 text-center">Carregando...</p>
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Editar Lançamentos</h1>

      <div className="mb-6 flex gap-4">
        <select
          className="border rounded p-2"
          value={filtroCategoria}
          onChange={e => {
            setFiltroCategoria(e.target.value)
            setFiltroSubcategoria('') // resetar subcategoria ao mudar categoria
          }}
        >
          <option value="">Todas as Categorias</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="border rounded p-2"
          value={filtroSubcategoria}
          onChange={e => setFiltroSubcategoria(e.target.value)}
          disabled={!filtroCategoria} // só libera se categoria selecionada
        >
          <option value="">Todas as Subcategorias</option>
          {subcategorias.map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-300 shadow-sm rounded-lg">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Data</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Valor</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Categoria</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Subcategoria</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Descrição</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Ação</th>
          </tr>
        </thead>
        <tbody>
          {dadosFiltrados.map(transacao => (
            <tr key={transacao.id} className="hover:bg-gray-50 transition">
              <td className="border border-gray-300 px-4 py-2">{new Date(transacao.data).toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2 text-green-700">
                {transacao.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </td>
              <td className="border border-gray-300 px-4 py-2">{transacao.categoria}</td>
              <td className="border border-gray-300 px-4 py-2">{transacao.subcategoria}</td>
              <td className="border border-gray-300 px-4 py-2">{transacao.descricao}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <Link href={`/empresa/${id}/lancamentos/${transacao.id}/editar`}>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm m-1">
                    Editar
                  </button>
                </Link>
                <Link href={`/empresa/${id}/lancamentos/${transacao.id}/excluir`}>
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm m-1">
                    Excluir
                  </button>
                </Link>
              </td>
              
            </tr>
          ))}
          {dadosFiltrados.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                Nenhuma transação encontrada para os filtros selecionados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
