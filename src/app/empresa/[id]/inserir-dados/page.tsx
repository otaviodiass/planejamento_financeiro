import FormularioInsercao from "@/app/componentes/FormularioInsercao"

interface Props {
    params: { id: string }
}

export default async function PaginaInsercao({ params }: Props) {
    const { id } = await params
    return (
        <FormularioInsercao params={{id}}></FormularioInsercao>
    )
}
