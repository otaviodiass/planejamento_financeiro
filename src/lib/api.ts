// const BASE_URL = 'http://localhost:3000/api/empresa/'
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function buscarTransacaoEmpresa(id: string) {
    const response = await fetch(`${baseUrl}/api/empresa/${id}/lancamentos`)
    return await response.json()
}