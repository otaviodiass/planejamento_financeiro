import { empresas } from "../../../dbfake/db"

function buscarEmpresaPorId(idEmpresa) {
    return empresas.find(empresa => empresa.id === idEmpresa)
}

export async function GET(request, { params }) {
    const { id } = await params
    const idEmpresa = parseInt(id)

    const empresaSelecionada = buscarEmpresaPorId(idEmpresa)

    return new Response(JSON.stringify({ message: 'Deu certo!', empresa: empresaSelecionada }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export { empresas }