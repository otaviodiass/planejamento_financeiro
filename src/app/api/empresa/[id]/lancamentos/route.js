import { empresas } from "../../../../dbfake/db"

function buscarEmpresaPorId(idEmpresa) {
    idEmpresa = typeof idEmpresa !== 'number' ? parseInt(idEmpresa) : idEmpresa
    if (isNaN(idEmpresa)) return null
    return empresas.find(empresa => empresa.id === idEmpresa)
}

export async function POST(request, { params }) {
    const { id } = await params
    const {tipoCategoria, subCategoriaTipo, valorTransacao, dataTransacao } = await request.json()
    const empresa = buscarEmpresaPorId(id)

    if (empresa) {
        if (tipoCategoria === 'Receita') {
            empresa.receitas.push({tipoCategoria, subCategoriaTipo, valorTransacao, dataTransacao})
        } else if (tipoCategoria === 'Custo Fixo') {
            empresa.custosFixos.push({tipoCategoria, subCategoriaTipo, valorTransacao, dataTransacao})
        } else if (tipoCategoria === 'Custo Variável') {
            empresa.custosVariaveis.push({tipoCategoria, subCategoriaTipo, valorTransacao, dataTransacao})
        } else {
            return new Response(JSON.stringify({ message: `Categoria: ${tipoCategoria} inválida!` }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            })
        }

        return new Response(JSON.stringify({ message: `Dados de ${tipoCategoria} adicionados para a ${empresa.nome}`, empresa }), {
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
    const empresaSelecionada = await buscarEmpresaPorId(id)
    console.log(typeof empresaSelecionada)

    return new Response(JSON.stringify({ message: `ID recebido ${id}`, empresa: empresaSelecionada}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
