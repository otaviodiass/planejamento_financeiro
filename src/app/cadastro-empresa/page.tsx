"use client"
function Formulario() {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const data = {
            nome: formData.get('nome'),
            cnpj: formData.get('cnpj'),
            representante: formData.get('representante'),
        };

        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${baseUrl}/api/empresa`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        const result = await response.json()
        console.log(result)
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg transition-all">
            
            <h2 className="text-center text-2xl font-bold text-[#1E3A8A] mb-6">Cadastro de Empresa</h2>
            
            <div className="mb-4">
                <label htmlFor='nome' className="text-gray-700 font-medium text-lg block mb-2">Nome</label>
                <input 
                    type="text" 
                    id='nome'
                    name='nome'
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
            </div>
            <div className="mb-4">
                <label htmlFor='cnpj' className="text-gray-700 font-medium text-lg block mb-2">CNPJ</label>
                <input 
                    type="text" 
                    id='cnpj'
                    name='cnpj'
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
            </div>
            <div className="mb-4">
                <label htmlFor='representante' className="text-gray-700 font-medium text-lg block mb-2">Representante</label>
                <input 
                    type="text" 
                    id='representante'
                    name='representante'
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
            </div>
            <button className="w-full bg-[#1E3A8A] text-white text-lg font-semibold py-3 px-4 rounded-lg hover:bg-[#3B82F6] transition-colors duration-300">
                Enviar
            </button>
        </form>
    )
}

export default function CadastroEmpresa() {
    return (
        <div className="flex items-start justify-center min-h-[calc(100vh-5rem)] bg-[#F9FAFB]">
            <Formulario/>
        </div>
    )
}