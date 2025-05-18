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

  // const transacoes = await prisma.transacao.findMany({
  //   where: {
  //     empresaId: 1
  //   }
  // })

  // console.log(transacoes)

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

  // const subcategoria = await prisma.subcategoria.createMany({
  //   data: [{
  //     nome: 'Plano de Saúde',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Despesas com Veículos: Combustíveis',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Despesas com Veículos: IPVA + Licenciamento',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Despesas com Veículos: Manutenção',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Despesas com Veículos: Multas',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Uniforme',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Exames Admissionais /Demissionais /Periódicos',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Sindicato - Empresa',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Sindicato - Funcinários',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Alimentação - Funcionários',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Associação de Classes',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Material de limpeza, higiene, mercado, escritório',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Conservação das Instalações',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Tarifas Bancarias',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Aluguel Sistema de Informação',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Despesas de Viagem',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Lazer - Sócios e Funcionários',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Seguro - Predial',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Doação e Brindes',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Vigilancia',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Publicidade',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Caixinha',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Gráfica',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'CIEE',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Seguro Loja',
  //     categoriaId: 3
  //   },
  //   {
  //     nome: 'Seguro Carro',
  //     categoriaId: 3
  //   }
  //   ]
  // })

//   const trasacoesFixo = await prisma.transacao.createMany({
// data: [{
//     data: formatarData('2025-09-10'),
//     empresaId: 1,
//     subcategoriaId: 8,
//     valor: 17248.25
// }, {
//     data: formatarData('2025-09-10'),
//     empresaId: 1,
//     subcategoriaId: 9,
//     valor: 1721.56
// }, {
//     data: formatarData('2025-09-10'),
//     empresaId: 1,
//     subcategoriaId: 17,
//     valor: 3669.01
// }, {
//     data: formatarData('2025-09-10'),
//     empresaId: 1,
//     subcategoriaId: 18,
//     valor: 0.00
// }, {
//     data: formatarData('2025-09-10'),
//     empresaId: 1,
//     subcategoriaId: 19,
//     valor: 13500.00
// }, {
//     data: formatarData('2025-09-10'),
//     empresaId: 1,
//     subcategoriaId: 20,
//     valor: 450.00
// }, {
//     data: formatarData('2025-09-10'),
//     empresaId: 1,
//     subcategoriaId: 21,
//     valor: 306.63
// }, {
//     data: formatarData('2025-09-10'),
//     empresaId: 1,
//     subcategoriaId: 22,
//     valor: 86.98
// }, {
//     data: formatarData('2025-09-10'),
//     empresaId: 1,
//     subcategoriaId: 23,
//     valor: 30.00
// }, {
//     data: formatarData('2025-09-10'),
//     empresaId: 1,
//     subcategoriaId: 24,
//     valor: 500.00
// }, {
//     data: formatarData('2025-09-10'),
//     empresaId: 1,
//     subcategoriaId: 25,
//     valor: 134.00
// }, {
//     data: formatarData('2025-09-10'),
//     empresaId: 1,
//     subcategoriaId: 26,
//     valor: 522.90
// }, {
//     data: formatarData('2025-09-10'),
//     empresaId: 1,
//     subcategoriaId: 27,
//     valor: 900.00
// }, {
//     data: formatarData('2025-09-10'),
//     empresaId: 1,
//     subcategoriaId: 28,
//     valor: 470.00
// }, {
//     data: formatarData('2025-09-10'),
//     empresaId: 1,
//     subcategoriaId: 29,
//     valor: 2154.06
// }]

//   })



//   const trasacoesVariaveis = await prisma.transacao.createMany({
// data: [{
//     data: formatarData('2025-12-10'),
//     empresaId: 1,
//     subcategoriaId: 8,
//     valor: 17771.01
// }, {
//     data: formatarData('2025-12-10'),
//     empresaId: 1,
//     subcategoriaId: 9,
//     valor: 2235.02
// }, {
//     data: formatarData('2025-12-10'),
//     empresaId: 1,
//     subcategoriaId: 17,
//     valor: 7490.57
// }, {
//     data: formatarData('2025-12-10'),
//     empresaId: 1,
//     subcategoriaId: 18,
//     valor: 0.00
// }, {
//     data: formatarData('2025-12-10'),
//     empresaId: 1,
//     subcategoriaId: 19,
//     valor: 13500.00
// }, {
//     data: formatarData('2025-12-10'),
//     empresaId: 1,
//     subcategoriaId: 20,
//     valor: 450.00
// }, {
//     data: formatarData('2025-12-10'),
//     empresaId: 1,
//     subcategoriaId: 21,
//     valor: 0.00
// }, {
//     data: formatarData('2025-12-10'),
//     empresaId: 1,
//     subcategoriaId: 22,
//     valor: 86.98
// }, {
//     data: formatarData('2025-12-10'),
//     empresaId: 1,
//     subcategoriaId: 23,
//     valor: 30.00
// }, {
//     data: formatarData('2025-12-10'),
//     empresaId: 1,
//     subcategoriaId: 24,
//     valor: 500.00
// }, {
//     data: formatarData('2025-12-10'),
//     empresaId: 1,
//     subcategoriaId: 25,
//     valor: 134.00
// }, {
//     data: formatarData('2025-12-10'),
//     empresaId: 1,
//     subcategoriaId: 26,
//     valor: 522.90
// }, {
//     data: formatarData('2025-12-10'),
//     empresaId: 1,
//     subcategoriaId: 27,
//     valor: 900.00
// }, {
//     data: formatarData('2025-12-10'),
//     empresaId: 1,
//     subcategoriaId: 28,
//     valor: 470.00
// }, {
//     data: formatarData('2025-12-10'),
//     empresaId: 1,
//     subcategoriaId: 29,
//     valor: 1532.06
// }]


//   })




//   const trasacoesRenda = await prisma.transacao.createMany({
// data: [{
//     data: formatarData('2025-10-10'),
//     empresaId: 1,
//     subcategoriaId: 1,
//     valor: 72151.01
// }, {
//     data: formatarData('2025-10-10'),
//     empresaId: 1,
//     subcategoriaId: 2,
//     valor: 12263.00
// }, {
//     data: formatarData('2025-10-10'),
//     empresaId: 1,
//     subcategoriaId: 3,
//     valor: 118323.86
// }, {
//     data: formatarData('2025-10-10'),
//     empresaId: 1,
//     subcategoriaId: 4,
//     valor: 139930.76
// }, {
//     data: formatarData('2025-10-10'),
//     empresaId: 1,
//     subcategoriaId: 10,
//     valor: 70206.69
// }, {
//     data: formatarData('2025-10-10'),
//     empresaId: 1,
//     subcategoriaId: 11,
//     valor: 0.00
// }]


//   })
  
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