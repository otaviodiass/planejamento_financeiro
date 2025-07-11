import FormularioInsercao from "@/app/componentes/FormularioInsercao"

// interface Props {
//     params: { id: string }
// }

export default async function PaginaInsercao({ params }: any) {
    const { id } = params
    return (
        <FormularioInsercao params={{id}}></FormularioInsercao>
    )
}
