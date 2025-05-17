'use client';
import { formatarValor } from '@/utils/validation';
import React from 'react';
import { useState } from 'react';

const tipoOptions = ['Receita', 'Custo Variável', 'Custo Fixo']
type Tipo = typeof tipoOptions[number]

const subCategorias: Record<Tipo, string[]> = {
    'Receita': ['Dinheiro', 'Débito', 'Crédito', 'Crediário', 'Pix', 'Cheque'],
    'Custo Variável': [
        'Custo da Mercadoria Vendida', 
        'Impostos - Simples Nacional', 
        'Despesas com Comissões',
        'Despesas com Produtos',
        'ICMS Difal',
        'Juros Antecipação',
        'Tarifa Boleto',
        'Comissão'
    ],
    'Custo Fixo': [
        'Salários Funcionários', 
        'Recolhimento de FGTS',
        '13º e Férias',
        'Acertos e Rescisões',
        'Pro labores',
        'Padaria',
        'Frete',
        'Serasa',
        'Água',
        'Energia',
        'Internet',
        'Sistema',
        'Honorarios Contábeis',
        'Viagens',
        'Plano de Saúde',
        'Despesas com Veículos: Combustíveis',
        'Despesas com Veículos: IPVA + Licenciamento',
        'Despesas com Veículos: Manutenção',
        'Despesas com Veículos: Multas',
        'Uniforme',
        'Exames Admissionais /Demissionais /Periódicos',
        'Sindicato - Empresa',
        'Sindicato - Funcinários',
        'Alimentação - Funcionários',
        'Associação de Classes',
        'Material de limpeza, higiene, mercado, escritório',
        'Conservação das Instalações',
        'Tarifas Bancarias',
        'Aluguel Sistema de Informação',
        'Despesas de Viagem',
        'Lazer - Sócios e Funcionários',
        'Seguro - Predial',
        'Doação e Brindes',
        'Vigilancia',
        'Publicidade',
        'Caixinha',
        'Gráfica',
        'CIEE',
        'Seguro Loja',
        'Seguro Carro'
    ],
}

export default function FormularioInsercao({ params }: { params: { id: string } }) {
    const id = params.id
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const form = event.currentTarget as HTMLFormElement

        const formData = new FormData(form)
        const data = {
            subCategoria : formData.get('subCategoria'),
            valor : valor,
            dataTransacao : formData.get('data') 
        }
  
        const response = await fetch(`http://localhost:3000/api/empresa/${id}/lancamentos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        const result = await response.json()
        console.log(result)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valorFormatado = formatarValor(event.target.value)
        const { numeroExibir, numero } = valorFormatado
        setValorExibir(numeroExibir)
        setValor(numero)
    }

    const [tipo, setTipo] = useState<Tipo>('')
    const [subCategoria, setSubCategoria] = useState('')
    const [valor, setValor] = useState(0)
    const [valorExibir, setValorExibir] = useState('')
    const [data, setData] = useState('')

    return (
        <form 
            onSubmit={handleSubmit} 
            className='space-y-6 p-6 bg-white shadow rounded-md max-w-md mx-auto mt-10'
        >
            <h2 className='text-2xl font-bold text-center '>Inserir Transação</h2>

            <div>
                <label htmlFor='tipo' className='block font-medium mb-1'>Tipo</label>
                <select
                    name='tipo'
                    value={tipo} 
                    onChange={(e) => {
                        setTipo(e.target.value)
                        setSubCategoria('')
                    }}
                    className='w-full border px-3 py-2 rounded'
                >
                    <option value="">Selecione o tipo</option>
                    {tipoOptions.map(opt => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>

            {
                tipo && (
                    <div>
                        <label htmlFor='subCategoria' className='block font-medium mb-1'>SubTipo</label>
                        <select
                            name='subCategoria'
                            value={subCategoria} 
                            onChange={(e) => {
                                setSubCategoria(e.target.value)
                                
                            }}
                            className='w-full border px-3 py-2 rounded'
                        >
                            <option value="">Selecione o SubTipo</option>
                            {subCategorias[tipo]?.map(opt => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>
                )
            }

            <div>
                <label htmlFor='valor' className='block font-medium mb-1'>Valor</label>
                <input
                    name='valor'
                    type='text'
                    inputMode='numeric'
                    value={valorExibir}
                    step='0.01'
                    min='0'
                    className='w-full border px-3 py-2 rounded'
                    onChange={handleChange}
                    placeholder='R$ 0,00'
                >
                </input>
            </div>

            <div>
                <label htmlFor='data' className='block font-medium mb-1'>Data</label>
                <input
                    value={data}
                    name='data'
                    type='date'
                    className='w-full border px-3 py-2 rounded'
                    onChange={(e) => setData(e.target.value)}
                >
                </input>
            </div>

            <button className="w-full bg-[#1E3A8A] text-white text-lg font-semibold py-3 px-4 rounded-lg hover:bg-[#3B82F6] transition-colors duration-300">
                Enviar
            </button>       
        </form>
    )
}
