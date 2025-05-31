import { TooltipProps } from 'recharts'

const TooltipCustomizado = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const receita = payload.find(p => p.dataKey === 'receita')?.value ?? 0
    const custoFixo = payload.find(p => p.dataKey === 'custoFixo')?.value ?? 0
    const custoVariavel = payload.find(p => p.dataKey === 'custoVariavel')?.value ?? 0
    const margemLucro = payload[0].payload.margemLucro ?? 0

    return (
      <div className="bg-white border border-gray-300 rounded-md p-3 text-sm shadow-md">
        <p className="font-semibold">{label}</p>
        <p className="text-green-600">Receita: R$ {Number(receita).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        <p className="text-blue-600">Custo Fixo: R$ {Number(custoFixo).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        <p className="text-orange-600">Custo Variável: R$ {Number(custoVariavel).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        <hr className="my-1"/>
        <p className="text-purple-700 font-semibold">Margem Lucro: {Number(margemLucro).toFixed(2)}%</p>
      </div>
    )
  }

  return null
}

export default TooltipCustomizado