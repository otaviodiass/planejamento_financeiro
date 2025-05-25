import { buscarCategorias } from '@/services/empresaService';

export async function GET() {
    const categorias = await buscarCategorias()

    if (categorias) {
        return new Response(JSON.stringify({ categorias }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}