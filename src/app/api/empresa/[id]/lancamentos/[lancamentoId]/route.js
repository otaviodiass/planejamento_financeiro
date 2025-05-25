import { buscarEmpresaId, buscarTransacao, editarTransacao, deletarTransacao } from '@/services/empresaService'
import { validarId } from '@/utils/validation'

export async function GET(resquest, { params }) {
    const { id, lancamentoId } = await params
    const idEmpresa = validarId(id)
    const idLancamento = validarId(lancamentoId)
    console.log('chamou aqui', idLancamento, idEmpresa)

    const empresaSelecionada = await buscarEmpresaId(idEmpresa)

    if (empresaSelecionada) {
        const transacao = await buscarTransacao(idLancamento)

        const transacaoSelecionada = {
          id: transacao.id,
          valor: transacao.valor,
          data: transacao.data,
          descricao: transacao.descricao,
          subcategoriaId: transacao.subcategoria.id,
          categoriaId: transacao.subcategoria.categoriaId,
        }

        return new Response(JSON.stringify({ message: `Transações da empresa: ${empresaSelecionada.nome}`, transacaoSelecionada}), {
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

export async function DELETE(request, { params }) {
  const { id, lancamentoId } = await params

  const idEmpresaValido = validarId(id)
  const idLancamentoValido = validarId(lancamentoId)

  const empresaSelecionada = await buscarEmpresaId(idEmpresaValido)

  if (empresaSelecionada) {

    const transacaoDeletada = deletarTransacao(idLancamentoValido)

    return new Response(JSON.stringify({ message: `Transações da empresa: ${empresaSelecionada.nome}`, transacaoDeletada}), {
            status: 200,
            headers: { "Content-Type": "application/json" },
    });
  }

}
