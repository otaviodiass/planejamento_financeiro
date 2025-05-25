import { buscarSubcategorias } from '@/services/empresaService';

export async function GET() {
    const subcategorias = await buscarSubcategorias()

    if (subcategorias) {
        return new Response(JSON.stringify({ subcategorias }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}