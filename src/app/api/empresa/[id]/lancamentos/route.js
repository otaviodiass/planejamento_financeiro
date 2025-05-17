import { buscarEmpresaId, buscarTransacoesEmpresa, criarTransacao } from '@/services/empresaService'
import { validarId } from '@/utils/validation'

export async function POST(request, { params }) {
    const { id } = await params
    const idEmpresa = validarId(id)
    // const {tipoCategoria, subCategoriaTipo, valorTransacao, dataTransacao } = await request.json()
    const dadosTransacao = await request.json()
    const empresa = await buscarEmpresaId(idEmpresa)

    if (empresa) {
        const transacao = await criarTransacao(empresa.id, dadosTransacao)

        return new Response(JSON.stringify({ message: `Transação efetuada para a ${empresa.nome}`, transacao }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } else {
        return new Response(JSON.stringify({ message: 'Empresa não foi encontrada!' }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
        })
    }
}

export async function GET(resquest, { params }) {
    const { id } = await params
    const idEmpresa = validarId(id)

    const empresaSelecionada = await buscarEmpresaId(idEmpresa)

    if (empresaSelecionada) {
        const resposta = await buscarTransacoesEmpresa(empresaSelecionada.id)

        const transacoes = resposta.map((resp) => ({
            id: resp.id,
            descricao: resp.descricao,
            valor: resp.valor,
            data: resp.data,
            subcategoria: resp.subcategoria.nome,
            categoria: resp.subcategoria.categoria.nome,
        }))

        return new Response(JSON.stringify({ message: `Transações da empresa: ${empresaSelecionada.nome}`, transacoes}), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

}
