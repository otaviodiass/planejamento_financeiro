import { prisma } from '@/lib/prisma'
import { formatarData } from '@/utils/validation';

interface Empresa {
    nome: string;
    cnpj: string;
    representante: string;
}

interface Transacao {
    subCategoria: string;
    valor: number;
    dataTransacao: string;
    descricao: string;
}

interface TransacaoDois {
  id: number
  valor: number
  data: string
  descricao: string | null
  categoria: string
  subcategoria: string
}

async function buscarSubCategoriaPorNome(nome: string) {
    const subCategoriaId = await prisma.subcategoria.findFirst({
        where: {
            nome: nome
        }, 
        select: {
            id: true
        }
    })

    return subCategoriaId?.id || null
}

export async function buscarEmpresas() {
    return await prisma.empresa.findMany()
}

export async function buscarEmpresaId(id: number) {
    return await prisma.empresa.findUnique({
        where: { id }
    })
}

export async function buscarTransacoesEmpresa(id: number) {
    return await prisma.transacao.findMany({
        where: {
        empresaId: id
        },
        include: {
            subcategoria: {
                select: {
                    nome: true,
                    categoria: {
                        select: {
                            nome: true
                        }
                    }
                }
            }
        }
    })
}

export async function criarEmpresa(dadosEmpresa: Empresa) {
    const { nome, cnpj, representante } = dadosEmpresa

    return await prisma.empresa.create({
        data: {
            nome,
            cnpj,
            representante
        }
    })
}

export async function criarTransacao(id: number, dadosTransacao: Transacao) {
    const { subCategoria, valor, dataTransacao } = dadosTransacao
    const subCategoriaId = await buscarSubCategoriaPorNome(subCategoria)
    
    if (!subCategoriaId) {
        throw new Error('Subcategoria não encontrada');
    }

    return await prisma.transacao.create({
        data: {
            data: formatarData(dataTransacao),
            valor: valor,
            subcategoriaId: subCategoriaId,
            empresaId: id,
        }
    })
}

export async function editarEmpresa(id: number, dadosNovosEmpresa: Empresa) {
    const empresaAtualizada = await prisma.empresa.update({
        where: { id },
        data: {
            nome: dadosNovosEmpresa.nome,
            cnpj: dadosNovosEmpresa.cnpj,
            representante: dadosNovosEmpresa.representante
        }
    })

    return empresaAtualizada
}

export async function buscarTransacao(idTransacao:number) {
    const transacao = await prisma.transacao.findFirst({
        where: { id: idTransacao },
        include: {
            subcategoria: {
                include: {
                    categoria: true
                }
            }
        }
    })

    console.log('transacao', transacao)

    return transacao
}


export async function editarTransacao(id: number, dadosTransacao: TransacaoDois) {
    const transacaoAtualizada = await prisma.transacao.update({
        where: { id: id },
        data: {
            descricao: dadosTransacao.descricao,
            valor: dadosTransacao.valor,
            data: new Date(dadosTransacao.data),
        }
    })

    return transacaoAtualizada
}

export async function deletarTransacao(id: number) {
    const transacao = await prisma.transacao.delete({
        where: { id: id }
    })

    return transacao
}