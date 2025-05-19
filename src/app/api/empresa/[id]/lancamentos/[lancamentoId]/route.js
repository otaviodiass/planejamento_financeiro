import { buscarEmpresaId, buscarTransacao, editarTransacao } from '@/services/empresaService'
import { validarId } from '@/utils/validation'

export async function GET(resquest, { params }) {
    const { id, lancamentoId } = await params
    const idEmpresa = validarId(id)
    const idLancamento = validarId(lancamentoId)
    console.log('chamou aqui', id)

    const empresaSelecionada = await buscarEmpresaId(idEmpresa)

    if (empresaSelecionada) {
        const transacao = await buscarTransacao(idLancamento)

        // const transacoes = resposta.map((resp) => ({
        //     id: resp.id,
        //     descricao: resp.descricao,
        //     valor: resp.valor,
        //     data: resp.data,
        //     subcategoria: resp.subcategoria.nome,
        //     categoria: resp.subcategoria.categoria.nome,
        // }))

        return new Response(JSON.stringify({ message: `Transações da empresa: ${empresaSelecionada.nome}`, transacao}), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

}

export async function PUT(request, { params }) {
  const { id, lancamentoId } = await params

  console.log('id', id)
  console.log('idLancamento', lancamentoId)

  const idLancamentoValido = validarId(lancamentoId)

  const dadosNovosTransacao = await request.json()

  const transacaoAtualizada = await editarTransacao(idLancamentoValido, dadosNovosTransacao)

  return new Response(JSON.stringify({ message: 'Deu certo!', dados: dadosNovosTransacao }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

