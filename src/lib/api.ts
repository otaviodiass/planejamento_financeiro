const BASE_URL = 'http://localhost:3000/api/empresa/'

export async function buscarTransacaoEmpresa(id: string) {
    const response = await fetch(`${BASE_URL}${id}/lancamentos`)
    return await response.json()
}