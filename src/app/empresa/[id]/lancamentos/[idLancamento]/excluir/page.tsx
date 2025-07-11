"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import React from "react"

interface Transacao {
  id: number
  valor: number
  data: string
  descricao: string | null
  categoria: string
  subcategoria: string
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function PaginaExcluirLancamento() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const idLancamento = params.idLancamento as string

  const [transacao, setTransacao] = useState<Transacao | null>(null)

  useEffect(() => {
    async function carregarTransacao() {
      const res = await fetch(`${baseUrl}/api/empresa/${id}/lancamentos/${idLancamento}`)
      if (res.ok) {
        const json = await res.json()
        console.log('json exluir',json.transacaoSelecionada)
        setTransacao(json.transacaoSelecionada)
      } else {
        alert("Erro ao carregar transação")
      }
    }

    carregarTransacao()
  }, [id, idLancamento])

  async function handleExcluir() {
    const res = await fetch(`${baseUrl}/api/empresa/${id}/lancamentos/${idLancamento}`, {
      method: "DELETE",
    })

    if (res.ok) {
      alert("Transação excluída com sucesso")
      router.push(`/empresa/${id}/lancamentos/editar`)
    } else {
      alert("Erro ao excluir transação")
    }
  }

  function handleCancelar() {
    router.push(`/empresa/${id}/lancamentos/editar`)
  }

  if (!transacao) {
    return <p>Carregando...</p>
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-red-600">Excluir Transação</h1>

      <div className="space-y-2 border rounded p-4 mb-6 bg-gray-50">
        <p><strong>Categoria:</strong> {transacao.categoria}</p>
        <p><strong>Subcategoria:</strong> {transacao.subcategoria}</p>
        <p><strong>Descrição:</strong> {transacao.descricao}</p>
        <p><strong>Valor:</strong> R$ {transacao.valor}</p>
        {/* <p><strong>Data:</strong> {transacao.data.slice(0, 10)}</p> */}
        <p><strong>Data:</strong> {new Date(transacao.data).toLocaleDateString()}</p>
        {/* new Date(transacao.data).toLocaleDateString() */}
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={handleExcluir}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Excluir
        </button>
        <button
          onClick={handleCancelar}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}
