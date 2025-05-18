import { buscarEmpresaId, editarEmpresa } from '@/services/empresaService'
import { validarId } from '@/utils/validation';

export async function GET(request, { params }) {
    const { id } = await params
    const idEmpresa = validarId(id)

    const empresaSelecionada = await buscarEmpresaId(idEmpresa)

    return new Response(JSON.stringify({ message: 'Deu certo!', empresa: empresaSelecionada }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function PUT(request, { params }) {
    const { id } = await params
    const idEmpresa = validarId(id)
    const dadosNovosEmpresa = await request.json()
    console.log('aqui')

    const empresaAtualizada = await editarEmpresa(idEmpresa, dadosNovosEmpresa)

    return new Response(JSON.stringify({ message: 'Deu certo!', empresa: empresaAtualizada }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
