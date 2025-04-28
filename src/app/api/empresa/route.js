import { buscarEmpresas, criarEmpresa } from '@/services/empresaService';

export async function GET() {

    const empresas = await buscarEmpresas()

    return new Response(JSON.stringify({ message: 'Deu certo!', empresas }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request) {
    const dadosEmpresa = await request.json()

    const novaEmpresa = await criarEmpresa(dadosEmpresa)

    return new Response(JSON.stringify(novaEmpresa), {
        status: 201
    })
}
