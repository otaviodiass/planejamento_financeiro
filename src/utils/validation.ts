export function formatarData(data: string) {
    return new Date(`${data}T00:00:00.000Z`)
}

export function validarId(id: number | string) {
    id = typeof id === 'string' ? parseInt(id) : id
    if (isNaN(id) || id <= 0) {
        throw new Error('ID inválido');
      }
    return id
}

export function formatarValor(valor: string) {
    const somenteNumeros = valor.replace(/\D/g, '')

    const numero = parseFloat(somenteNumeros) / 100

    if (isNaN(numero)) return {numeroExibir: '', numero}

    const numeroExibir = numero.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    return { numeroExibir, numero }
}