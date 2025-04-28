import TabelaLancamentos from "@/app/componentes/TabelaLancamentos"

interface Props {
    params: { id: string }
}

interface Transacao {
  id: number,
  valor: number,
  data: string,
  descricao: string | null,
  subcategoria: string,
  categoria: string,
}

const dadosMock = [
    {
      tipoCategoria: 'Receita',
      subCategoriaTipo: 'PIX',
      valorTransacao: 500,
      dataTransacao: '2025-01-10'
    },
    {
      tipoCategoria: 'Receita',
      subCategoriaTipo: 'PIX',
      valorTransacao: 200,
      dataTransacao: '2025-02-10'
    },
    {
      tipoCategoria: 'Receita',
      subCategoriaTipo: 'Crédito',
      valorTransacao: 150,
      dataTransacao: '2025-01-20'
    },
    {
      tipoCategoria: 'Custo Fixo',
      subCategoriaTipo: 'Aluguel',
      valorTransacao: 1000,
      dataTransacao: '2025-01-01'
    },
    {
        tipoCategoria: 'Custo Variável',
        subCategoriaTipo: 'Imposto',
        valorTransacao: 1000,
        dataTransacao: '2025-11-01'
      }
  ]

// function formatarDados(empresa: any) {
//     let dadosFormatados: any = []
//     console.log(empresa)
//     const receitas = empresa.receitas
//     const custosFixos = empresa.custosFixos
//     const custosVariaveis = empresa.custosVariaveis

//     // const { receitas, custosFixos, custosVariaveis } = empresa
//     if (receitas.length > 0 || custosFixos.length > 0 || custosVariaveis.length > 0) {
//         receitas.forEach(item => {dadosFormatados.push(item)})
//         custosFixos.forEach(custoFixo => {dadosFormatados.push(custoFixo)})
//         custosVariaveis.forEach(custoVariavel => {dadosFormatados.push(custoVariavel)})
//     }
//     // } else if (custosFixos.length > 0) {
//     //     custosFixos.forEach(custoFixo => {dadosFormatados.push(custoFixo)})
//     // } else if (custosVariaveis.length > 0) {
//     //     custosVariaveis.forEach(custoVariavel => {dadosFormatados.push(custoVariavel)})
//     // }

//     return dadosFormatados
// }

async function buscarEmpresaPorId(id: string) {
    const response = await fetch(`http://localhost:3000/api/empresa/${id}/lancamentos`)
    // const data: { message: string; empresa: Empresa[] } = await response.json()
    const data: { message: string; transacoes: Transacao[] } = await response.json()
    return data.transacoes
}

export default async function PaginaInsercao({ params }: Props) {
    const { id } = await params
    const dados = await buscarEmpresaPorId(id)
    // const dadosFormatados = formatarDados(dados)
    // console.log(dadosFormatados)
    return (
        <div className="flex justify-center">
            <TabelaLancamentos dados={dados}></TabelaLancamentos>
        </div>
    )
}
