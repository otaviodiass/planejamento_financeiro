"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import React from "react"

interface Props {
  params: Promise<{ id: string, idLancamento: string }>
}

interface Transacao {
  id: number
  valor: number
  data: string
  descricao: string | null
  categoria: string
  subcategoria: string
}

export default function PaginaEditarLancamento() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const idLancamento = params.idLancamento as string

  const [transacao, setTransacao] = useState<Transacao | null>(null)
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState(0)
  const [data, setData] = useState("")

  console.log('id', id)
  console.log('idlancamento', idLancamento)

  useEffect(() => {
    async function carregarTransacao() {
      const res = await fetch(`http://localhost:3000/api/empresa/${id}/lancamentos/${idLancamento}`)
      if (res.ok) {
        const json = await res.json()
        const t = json.transacao
        console.log('t', t)
        setTransacao(t)
        setDescricao(t.descricao || "")
        setValor(t.valor)
        setData(t.data.slice(0, 10)) // formato YYYY-MM-DD
      } else {
        alert("Erro ao carregar transação")
      }
    }

    carregarTransacao()
  }, [id, idLancamento])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch(`http://localhost:3000/api/empresa/${id}/lancamentos/${idLancamento}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descricao,
        valor,
        data,
      }),
    })

    if (res.ok) {
      alert("Transação atualizada com sucesso")
      router.push(`/empresa/${id}/lancamentos/editar`)
    } else {
      alert("Erro ao atualizar transação")
    }
  }

  if (!transacao) {
    return <p>Carregando...</p>
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Transação</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Descrição</label>
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  )
}
