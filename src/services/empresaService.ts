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
