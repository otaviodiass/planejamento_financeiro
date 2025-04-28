import { buscarEmpresaId } from '@/services/empresaService'
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
