export function getAnoMes(data: string):string {
    const date = new Date(data)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}
  
export function formatarMesAno(anoMes: string) {
    const [ano, mes] = anoMes.split('-')
    const data = new Date(Number(ano), Number(mes) - 1)
    return data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
}