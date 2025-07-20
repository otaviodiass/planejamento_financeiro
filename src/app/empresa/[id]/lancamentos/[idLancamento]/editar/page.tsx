"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import React from "react"

interface Categoria {
  id: number
  nome: string
  tipo: string
}

interface Subcategoria {
  id: number
  nome: string
  categoriaId: number
}

interface Transacao {
  id: number
  valor: number
  data: string
  descricao: string | null
  subcategoriaId: number
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function EditarLancamento() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const idLancamento = params.idLancamento as string

  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([])
  const [subcategoriasFiltradas, setSubcategoriasFiltradas] = useState<Subcategoria[]>([])

  const [transacao, setTransacao] = useState<Transacao | null>(null)
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState(0)
  const [data, setData] = useState("")
  const [categoriaId, setCategoriaId] = useState<number | null>(null)
  const [subcategoriaId, setSubcategoriaId] = useState<number | null>(null)

  useEffect(() => {
    async function carregarCategorias() {
      const res = await fetch(`${baseUrl}/api/categoria`)
      const json = await res.json()
      setCategorias(json.categorias)
    }

    async function carregarSubcategorias() {
      const res = await fetch(`${baseUrl}/api/subcategoria`)
      const json = await res.json()
      setSubcategorias(json.subcategorias)
    }

    async function carregarTransacao() {
      const res = await fetch(`${baseUrl}/api/empresa/${id}/lancamentos/${idLancamento}`)
      if (res.ok) {
        const json = await res.json()
        const t = json.transacaoSelecionada
        console.log('t:', t)
        setTransacao(t)
        setDescricao(t.descricao || "")
        setValor(t.valor)
        setData(t.data.slice(0, 10))
        setSubcategoriaId(t.subcategoriaId)
        setCategoriaId(t.categoriaId)
      } else {
        alert("Erro ao carregar lançamento")
      }
    }

    carregarCategorias()
    carregarSubcategorias()
    carregarTransacao()
  }, [id, idLancamento])

  useEffect(() => {
    if (subcategoriaId && subcategorias.length > 0) {
      const sub = subcategorias.find(s => s.id === subcategoriaId)
      if (sub) setCategoriaId(sub.categoriaId)
    }
  }, [subcategoriaId, subcategorias])

  useEffect(() => {
    if (categoriaId !== null) {
      const filtradas = subcategorias.filter(s => s.categoriaId === categoriaId)
      setSubcategoriasFiltradas(filtradas)
    } else {
      setSubcategoriasFiltradas([])
    }
  }, [categoriaId, subcategorias])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch(`${baseUrl}/api/empresa/${id}/lancamentos/${idLancamento}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descricao,
        valor,
        data,
        subcategoriaId,
      }),
    })

    if (res.ok) {
      alert("Lançamento atualizado com sucesso")
      router.push(`/empresa/${id}/lancamentos/editar`)
    } else {
      alert("Erro ao atualizar lançamento")
    }
  }

  if (!transacao) {
    return <p className="p-6 text-center">Carregando...</p>
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Lançamento</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Categoria</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={categoriaId ?? ""}
            onChange={(e) => {
              const selected = parseInt(e.target.value)
              setCategoriaId(selected)
              setSubcategoriaId(null)
            }}
            required
          >
            <option value="" disabled>Selecione</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Subcategoria</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={subcategoriaId ?? ""}
            onChange={(e) => setSubcategoriaId(parseInt(e.target.value))}
            required
          >
            <option value="" disabled>Selecione</option>
            {subcategoriasFiltradas.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Descrição</label>
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Valor</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(parseFloat(e.target.value))}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  )
}
