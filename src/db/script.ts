import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

async function main() {
    // para adicionar dados no banco
    // const empresa = await prisma.empresa.create({
    //     data: {
    //         nome: 'InovaCorp',
    //         cnpj: '98765432000101',
    //         representante: 'João',
    //     },
    // })
    // console.log(empresa)

    // para consultar dados
    // const empresas = await prisma.empresa.findMany()
    // console.log(empresas)

    // const categoria = await prisma.categoria.createMany({
    //     data: [{
    //         nome: 'Receita',
    //         tipo: 'RECEITA',
    //     }, {
    //         nome: 'Custo Variável',
    //         tipo: 'CUSTO_VARIAVEL'
    //     }, {
    //         nome: 'Custo Fixo',
    //         tipo: 'CUSTO_FIXO'
    //     }
    // ]
    // })
    // const subcategoria = await prisma.subcategoria.createMany({
    //     data: [{
    //             nome: 'Dinheiro',
    //             categoriaId: 1
    //         }, {
    //             nome: 'Débito',
    //             categoriaId: 1
    //         }
    //     ]
    // })

    // const transacao = await prisma.empresa.findUnique({
    //   where: {
    //     id: 1
    //   },
    //   include: {
    //     transacoes: true
    //   }
    // })
    // console.log(transacao)

    const transacoes = await prisma.transacao.findMany({
      where: {
        empresaId: 1
      }
    })

    console.log(transacoes)

    // const trasacoes = await prisma.transacao.createMany({
    //     data: [{
    //         data: formatarData('2025-02-10'),
    //         empresaId: 1,
    //         subcategoriaId: 1,
    //         valor: 300.50
    //     }, {
    //         data: formatarData('2025-05-10'),
    //         empresaId: 1,
    //         subcategoriaId: 2,
    //         valor: 560.50
    //     }, {
    //         data: formatarData('2025-03-10'),
    //         empresaId: 1,
    //         subcategoriaId: 3,
    //         valor: 475.50
    //     }, {
    //         data: formatarData('2025-12-10'),
    //         empresaId: 1,
    //         subcategoriaId: 4,
    //         valor: 932.59
    //     }]
    // })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

function formatarData(data: string) {
    return new Date(`${data}T00:00:00.000Z`)
}