import { empresas } from "../../dbfake/db";

export async function GET() {
    return new Response(JSON.stringify({ message: 'Deu certo!', empresas }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request) {
    const { nome, cnpj } = await request.json()

    const novaEmpresa = {
        id: empresas.length + 1,
        nome,
        cnpj,
        receitas: [], 
        custosFixos: [], 
        custosVariaveis: []
    }

    empresas.push(novaEmpresa)

    return new Response(JSON.stringify(novaEmpresa), {
        status: 201
    })
}

export { empresas }