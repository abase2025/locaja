import { useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import logoAssinaja from './assets/logo-assinaja.png'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    tipoAluguel: '',
    // Dados do Locador
    locadorNome: '',
    locadorCpf: '',
    locadorRg: '',
    locadorTelefone: '',
    locadorEmail: '',
    locadorCep: '',
    locadorLogradouro: '',
    locadorNumero: '',
    locadorComplemento: '',
    locadorBairro: '',
    locadorCidade: '',
    locadorEstado: '',
    locadorPais: 'Brasil',
    // Dados do Locatário
    locatarioNome: '',
    locatarioCpf: '',
    locatarioRg: '',
    locatarioTelefone: '',
    locatarioEmail: '',
    locatarioCep: '',
    locatarioLogradouro: '',
    locatarioNumero: '',
    locatarioComplemento: '',
    locatarioBairro: '',
    locatarioCidade: '',
    locatarioEstado: '',
    locatarioPais: 'Brasil',
    // Dados do Veículo
    veiculoMarca: '',
    veiculoModelo: '',
    veiculoAno: '',
    veiculoPlaca: '',
    veiculoCor: '',
    veiculoCombustivel: '',
    // Dados do Imóvel
    imovelTipo: '',
    imovelCep: '',
    imovelLogradouro: '',
    imovelNumero: '',
    imovelComplemento: '',
    imovelBairro: '',
    imovelCidade: '',
    imovelEstado: '',
    imovelPais: 'Brasil',
    imovelArea: '',
    imovelQuartos: '',
    imovelBanheiros: '',
    // Dados do Contrato
    valorAluguel: '',
    dataInicio: '',
    dataTermino: '',
    diaVencimento: '',
    observacoes: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatCpf = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  const formatTelefone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  }

  const formatCep = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  }

  const formatValor = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d)(\d{2})$/, '$1,$2')
      .replace(/(?=(\d{3})+(\D))\B/g, '.')
  }

  const buscarCep = async (cep, tipo) => {
    const cepLimpo = cep.replace(/\D/g, '')
    if (cepLimpo.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        const data = await response.json()
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            [`${tipo}Logradouro`]: data.logradouro,
            [`${tipo}Bairro`]: data.bairro,
            [`${tipo}Cidade`]: data.localidade,
            [`${tipo}Estado`]: data.uf
          }))
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
      }
    }
  }

  const gerarPdf = async () => {
    const elemento = document.getElementById('formulario-conteudo')
    
    // Temporariamente ocultar os botões
    const botoes = document.querySelector('.botoes-acao')
    if (botoes) botoes.style.display = 'none'
    
    try {
      const canvas = await html2canvas(elemento, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      
      let position = 0
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      
      pdf.save('contrato-aluguel.pdf')
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Erro ao gerar PDF. Tente novamente.')
    } finally {
      // Restaurar os botões
      if (botoes) botoes.style.display = 'flex'
    }
  }

  const imprimir = () => {
    window.print()
  }

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"
  const cardClass = "bg-white rounded-lg shadow-lg p-6 mb-6"
  const buttonClass = "px-6 py-3 rounded-md font-medium transition-colors duration-200"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <img 
              src={logoAssinaja} 
              alt="ASSINAJA" 
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Formulário de Aluguel
          </h1>
          <p className="text-lg text-gray-600">
            Veículos e Imóveis - Contrato Completo
          </p>
        </div>

        <div id="formulario-conteudo">
          {/* Tipo de Aluguel */}
          <div className={cardClass}>
            <h2 className="text-xl font-semibold mb-4 text-blue-800">📋 Tipo de Aluguel</h2>
            <p className="text-gray-600 mb-4">Selecione o tipo de bem que será alugado</p>
            <div className="flex gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="tipoAluguel"
                  value="veiculo"
                  checked={formData.tipoAluguel === 'veiculo'}
                  onChange={(e) => handleInputChange('tipoAluguel', e.target.value)}
                  className="mr-2 w-4 h-4 text-blue-600"
                />
                <span className="text-lg">🚗 Veículo</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="tipoAluguel"
                  value="imovel"
                  checked={formData.tipoAluguel === 'imovel'}
                  onChange={(e) => handleInputChange('tipoAluguel', e.target.value)}
                  className="mr-2 w-4 h-4 text-blue-600"
                />
                <span className="text-lg">🏠 Imóvel</span>
              </label>
            </div>
          </div>

          {/* Dados do Locador */}
          <div className={cardClass}>
            <h2 className="text-xl font-semibold mb-4 text-blue-800">👤 Dados do Locador (Proprietário)</h2>
            <p className="text-gray-600 mb-4">Informações da pessoa que está alugando o bem</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass}>Nome Completo *</label>
                <input
                  type="text"
                  value={formData.locadorNome}
                  onChange={(e) => handleInputChange('locadorNome', e.target.value)}
                  className={inputClass}
                  placeholder="Nome completo do locador"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  value={formData.locadorEmail}
                  onChange={(e) => handleInputChange('locadorEmail', e.target.value)}
                  className={inputClass}
                  placeholder="email@exemplo.com"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className={labelClass}>CPF *</label>
                <input
                  type="text"
                  value={formData.locadorCpf}
                  onChange={(e) => handleInputChange('locadorCpf', formatCpf(e.target.value))}
                  className={inputClass}
                  placeholder="000.000.000-00"
                  maxLength="14"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>RG *</label>
                <input
                  type="text"
                  value={formData.locadorRg}
                  onChange={(e) => handleInputChange('locadorRg', e.target.value)}
                  className={inputClass}
                  placeholder="00.000.000-0"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Telefone *</label>
                <input
                  type="text"
                  value={formData.locadorTelefone}
                  onChange={(e) => handleInputChange('locadorTelefone', formatTelefone(e.target.value))}
                  className={inputClass}
                  placeholder="(00) 00000-0000"
                  maxLength="15"
                  required
                />
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 mb-3">📍 Endereço do Locador</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className={labelClass}>CEP *</label>
                <input
                  type="text"
                  value={formData.locadorCep}
                  onChange={(e) => {
                    const valor = formatCep(e.target.value)
                    handleInputChange('locadorCep', valor)
                    buscarCep(valor, 'locador')
                  }}
                  className={inputClass}
                  placeholder="00000-000"
                  maxLength="9"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Logradouro *</label>
                <input
                  type="text"
                  value={formData.locadorLogradouro}
                  onChange={(e) => handleInputChange('locadorLogradouro', e.target.value)}
                  className={inputClass}
                  placeholder="Rua, Avenida, etc."
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className={labelClass}>Número *</label>
                <input
                  type="text"
                  value={formData.locadorNumero}
                  onChange={(e) => handleInputChange('locadorNumero', e.target.value)}
                  className={inputClass}
                  placeholder="123"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Complemento</label>
                <input
                  type="text"
                  value={formData.locadorComplemento}
                  onChange={(e) => handleInputChange('locadorComplemento', e.target.value)}
                  className={inputClass}
                  placeholder="Apto, Bloco, etc."
                />
              </div>
              <div>
                <label className={labelClass}>Bairro *</label>
                <input
                  type="text"
                  value={formData.locadorBairro}
                  onChange={(e) => handleInputChange('locadorBairro', e.target.value)}
                  className={inputClass}
                  placeholder="Nome do bairro"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Cidade *</label>
                <input
                  type="text"
                  value={formData.locadorCidade}
                  onChange={(e) => handleInputChange('locadorCidade', e.target.value)}
                  className={inputClass}
                  placeholder="Nome da cidade"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Estado *</label>
                <input
                  type="text"
                  value={formData.locadorEstado}
                  onChange={(e) => handleInputChange('locadorEstado', e.target.value)}
                  className={inputClass}
                  placeholder="SP, RJ, MG, etc."
                  maxLength="2"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>País *</label>
                <input
                  type="text"
                  value={formData.locadorPais}
                  onChange={(e) => handleInputChange('locadorPais', e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Dados do Locatário */}
          <div className={cardClass}>
            <h2 className="text-xl font-semibold mb-4 text-blue-800">👥 Dados do Locatário (Inquilino)</h2>
            <p className="text-gray-600 mb-4">Informações da pessoa que está alugando o bem</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass}>Nome Completo *</label>
                <input
                  type="text"
                  value={formData.locatarioNome}
                  onChange={(e) => handleInputChange('locatarioNome', e.target.value)}
                  className={inputClass}
                  placeholder="Nome completo do locatário"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  value={formData.locatarioEmail}
                  onChange={(e) => handleInputChange('locatarioEmail', e.target.value)}
                  className={inputClass}
                  placeholder="email@exemplo.com"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className={labelClass}>CPF *</label>
                <input
                  type="text"
                  value={formData.locatarioCpf}
                  onChange={(e) => handleInputChange('locatarioCpf', formatCpf(e.target.value))}
                  className={inputClass}
                  placeholder="000.000.000-00"
                  maxLength="14"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>RG *</label>
                <input
                  type="text"
                  value={formData.locatarioRg}
                  onChange={(e) => handleInputChange('locatarioRg', e.target.value)}
                  className={inputClass}
                  placeholder="00.000.000-0"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Telefone *</label>
                <input
                  type="text"
                  value={formData.locatarioTelefone}
                  onChange={(e) => handleInputChange('locatarioTelefone', formatTelefone(e.target.value))}
                  className={inputClass}
                  placeholder="(00) 00000-0000"
                  maxLength="15"
                  required
                />
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 mb-3">📍 Endereço do Locatário</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className={labelClass}>CEP *</label>
                <input
                  type="text"
                  value={formData.locatarioCep}
                  onChange={(e) => {
                    const valor = formatCep(e.target.value)
                    handleInputChange('locatarioCep', valor)
                    buscarCep(valor, 'locatario')
                  }}
                  className={inputClass}
                  placeholder="00000-000"
                  maxLength="9"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Logradouro *</label>
                <input
                  type="text"
                  value={formData.locatarioLogradouro}
                  onChange={(e) => handleInputChange('locatarioLogradouro', e.target.value)}
                  className={inputClass}
                  placeholder="Rua, Avenida, etc."
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className={labelClass}>Número *</label>
                <input
                  type="text"
                  value={formData.locatarioNumero}
                  onChange={(e) => handleInputChange('locatarioNumero', e.target.value)}
                  className={inputClass}
                  placeholder="123"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Complemento</label>
                <input
                  type="text"
                  value={formData.locatarioComplemento}
                  onChange={(e) => handleInputChange('locatarioComplemento', e.target.value)}
                  className={inputClass}
                  placeholder="Apto, Bloco, etc."
                />
              </div>
              <div>
                <label className={labelClass}>Bairro *</label>
                <input
                  type="text"
                  value={formData.locatarioBairro}
                  onChange={(e) => handleInputChange('locatarioBairro', e.target.value)}
                  className={inputClass}
                  placeholder="Nome do bairro"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Cidade *</label>
                <input
                  type="text"
                  value={formData.locatarioCidade}
                  onChange={(e) => handleInputChange('locatarioCidade', e.target.value)}
                  className={inputClass}
                  placeholder="Nome da cidade"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Estado *</label>
                <input
                  type="text"
                  value={formData.locatarioEstado}
                  onChange={(e) => handleInputChange('locatarioEstado', e.target.value)}
                  className={inputClass}
                  placeholder="SP, RJ, MG, etc."
                  maxLength="2"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>País *</label>
                <input
                  type="text"
                  value={formData.locatarioPais}
                  onChange={(e) => handleInputChange('locatarioPais', e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Dados do Veículo - Condicional */}
          {formData.tipoAluguel === 'veiculo' && (
            <div className={cardClass}>
              <h2 className="text-xl font-semibold mb-4 text-blue-800">🚗 Dados do Veículo</h2>
              <p className="text-gray-600 mb-4">Informações detalhadas do veículo a ser alugado</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Marca *</label>
                  <input
                    type="text"
                    value={formData.veiculoMarca}
                    onChange={(e) => handleInputChange('veiculoMarca', e.target.value)}
                    className={inputClass}
                    placeholder="Toyota, Honda, Ford, etc."
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Modelo *</label>
                  <input
                    type="text"
                    value={formData.veiculoModelo}
                    onChange={(e) => handleInputChange('veiculoModelo', e.target.value)}
                    className={inputClass}
                    placeholder="Corolla, Civic, Focus, etc."
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Ano *</label>
                  <input
                    type="number"
                    value={formData.veiculoAno}
                    onChange={(e) => handleInputChange('veiculoAno', e.target.value)}
                    className={inputClass}
                    placeholder="2020"
                    min="1900"
                    max="2030"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Placa *</label>
                  <input
                    type="text"
                    value={formData.veiculoPlaca}
                    onChange={(e) => handleInputChange('veiculoPlaca', e.target.value.toUpperCase())}
                    className={inputClass}
                    placeholder="ABC-1234"
                    maxLength="8"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Cor *</label>
                  <input
                    type="text"
                    value={formData.veiculoCor}
                    onChange={(e) => handleInputChange('veiculoCor', e.target.value)}
                    className={inputClass}
                    placeholder="Branco, Preto, Prata, etc."
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className={labelClass}>Combustível *</label>
                <select
                  value={formData.veiculoCombustivel}
                  onChange={(e) => handleInputChange('veiculoCombustivel', e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Selecione o tipo de combustível</option>
                  <option value="flex">Flex (Gasolina/Álcool)</option>
                  <option value="gasolina">Gasolina</option>
                  <option value="alcool">Álcool</option>
                  <option value="diesel">Diesel</option>
                  <option value="eletrico">Elétrico</option>
                  <option value="hibrido">Híbrido</option>
                </select>
              </div>
            </div>
          )}

          {/* Dados do Imóvel - Condicional */}
          {formData.tipoAluguel === 'imovel' && (
            <div className={cardClass}>
              <h2 className="text-xl font-semibold mb-4 text-blue-800">🏠 Dados do Imóvel</h2>
              <p className="text-gray-600 mb-4">Informações detalhadas do imóvel a ser alugado</p>
              
              <div className="mb-4">
                <label className={labelClass}>Tipo de Imóvel *</label>
                <select
                  value={formData.imovelTipo}
                  onChange={(e) => handleInputChange('imovelTipo', e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Selecione o tipo de imóvel</option>
                  <option value="casa">Casa</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="sala-comercial">Sala Comercial</option>
                  <option value="galpao">Galpão</option>
                  <option value="terreno">Terreno</option>
                  <option value="chacara">Chácara</option>
                  <option value="sitio">Sítio</option>
                </select>
              </div>

              <h4 className="font-semibold text-gray-900 mb-3">📍 Endereço do Imóvel</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className={labelClass}>CEP *</label>
                  <input
                    type="text"
                    value={formData.imovelCep}
                    onChange={(e) => {
                      const valor = formatCep(e.target.value)
                      handleInputChange('imovelCep', valor)
                      buscarCep(valor, 'imovel')
                    }}
                    className={inputClass}
                    placeholder="00000-000"
                    maxLength="9"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Logradouro *</label>
                  <input
                    type="text"
                    value={formData.imovelLogradouro}
                    onChange={(e) => handleInputChange('imovelLogradouro', e.target.value)}
                    className={inputClass}
                    placeholder="Rua, Avenida, etc."
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Número *</label>
                  <input
                    type="text"
                    value={formData.imovelNumero}
                    onChange={(e) => handleInputChange('imovelNumero', e.target.value)}
                    className={inputClass}
                    placeholder="123"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Complemento</label>
                  <input
                    type="text"
                    value={formData.imovelComplemento}
                    onChange={(e) => handleInputChange('imovelComplemento', e.target.value)}
                    className={inputClass}
                    placeholder="Apto, Bloco, etc."
                  />
                </div>
                <div>
                  <label className={labelClass}>Bairro *</label>
                  <input
                    type="text"
                    value={formData.imovelBairro}
                    onChange={(e) => handleInputChange('imovelBairro', e.target.value)}
                    className={inputClass}
                    placeholder="Nome do bairro"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Cidade *</label>
                  <input
                    type="text"
                    value={formData.imovelCidade}
                    onChange={(e) => handleInputChange('imovelCidade', e.target.value)}
                    className={inputClass}
                    placeholder="Nome da cidade"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Estado *</label>
                  <input
                    type="text"
                    value={formData.imovelEstado}
                    onChange={(e) => handleInputChange('imovelEstado', e.target.value)}
                    className={inputClass}
                    placeholder="SP, RJ, MG, etc."
                    maxLength="2"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>País *</label>
                  <input
                    type="text"
                    value={formData.imovelPais}
                    onChange={(e) => handleInputChange('imovelPais', e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Área (m²)</label>
                  <input
                    type="number"
                    value={formData.imovelArea}
                    onChange={(e) => handleInputChange('imovelArea', e.target.value)}
                    className={inputClass}
                    placeholder="100"
                    min="1"
                  />
                </div>
                <div>
                  <label className={labelClass}>Número de Quartos</label>
                  <input
                    type="number"
                    value={formData.imovelQuartos}
                    onChange={(e) => handleInputChange('imovelQuartos', e.target.value)}
                    className={inputClass}
                    placeholder="3"
                    min="0"
                  />
                </div>
                <div>
                  <label className={labelClass}>Número de Banheiros</label>
                  <input
                    type="number"
                    value={formData.imovelBanheiros}
                    onChange={(e) => handleInputChange('imovelBanheiros', e.target.value)}
                    className={inputClass}
                    placeholder="2"
                    min="0"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Dados do Contrato */}
          <div className={cardClass}>
            <h2 className="text-xl font-semibold mb-4 text-blue-800">📄 Dados do Contrato</h2>
            <p className="text-gray-600 mb-4">Informações sobre valores, datas e condições do aluguel</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass}>Valor do Aluguel (R$) *</label>
                <input
                  type="text"
                  value={formData.valorAluguel}
                  onChange={(e) => handleInputChange('valorAluguel', 'R$ ' + formatValor(e.target.value.replace('R$ ', '')))}
                  className={inputClass}
                  placeholder="R$ 1.500,00"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Dia de Vencimento *</label>
                <input
                  type="number"
                  value={formData.diaVencimento}
                  onChange={(e) => handleInputChange('diaVencimento', e.target.value)}
                  className={inputClass}
                  placeholder="10"
                  min="1"
                  max="31"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass}>Data de Início *</label>
                <input
                  type="date"
                  value={formData.dataInicio}
                  onChange={(e) => handleInputChange('dataInicio', e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Data de Término *</label>
                <input
                  type="date"
                  value={formData.dataTermino}
                  onChange={(e) => handleInputChange('dataTermino', e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className={labelClass}>Observações</label>
              <textarea
                value={formData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                className={inputClass}
                placeholder="Informações adicionais sobre o contrato..."
                rows={4}
              />
            </div>
          </div>

          {/* Resumo do Contrato */}
          <div className={cardClass}>
            <h2 className="text-xl font-semibold mb-4 text-blue-800">📋 Resumo do Contrato</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Tipo:</strong> {formData.tipoAluguel === 'veiculo' ? '🚗 Veículo' : formData.tipoAluguel === 'imovel' ? '🏠 Imóvel' : 'Não selecionado'}</p>
              <p><strong>Locador:</strong> {formData.locadorNome || 'Não informado'}</p>
              <p><strong>Locatário:</strong> {formData.locatarioNome || 'Não informado'}</p>
              <p><strong>Valor:</strong> {formData.valorAluguel || 'Não informado'}</p>
              <p><strong>Período:</strong> {formData.dataInicio && formData.dataTermino ? `${formData.dataInicio} até ${formData.dataTermino}` : 'Não informado'}</p>
              <p><strong>Data de geração:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="botoes-acao flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={gerarPdf}
            className={`${buttonClass} bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2`}
          >
            <span>📄</span>
            Salvar em PDF
          </button>
          
          <button
            onClick={imprimir}
            className={`${buttonClass} bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center gap-2`}
          >
            <span>🖨️</span>
            Imprimir
          </button>
        </div>

        {/* Rodapé */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <div className="flex items-center justify-center mb-2">
            <img 
              src={logoAssinaja} 
              alt="ASSINAJA" 
              className="h-8 w-auto opacity-60"
            />
          </div>
          <p>Formulário de Aluguel - Gerado automaticamente</p>
          <p>Data de geração: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>

      {/* Estilos para impressão */}
      <style jsx>{`
        @media print {
          .botoes-acao {
            display: none !important;
          }
          body {
            background: white !important;
          }
          .bg-gradient-to-br {
            background: white !important;
          }
        }
      `}</style>
    </div>
  )
}

export default App

