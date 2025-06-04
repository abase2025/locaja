# 📋 Formulário de Aluguel ASSINAJA - Veículos e Imóveis

Um formulário online completo e profissional para contratos de aluguel de veículos e imóveis, desenvolvido em React com funcionalidades avançadas de geração de PDF e impressão. Apresentado pela marca **ASSINAJA**.

## ✨ Características

### 🎯 Funcionalidades Principais
- **Formulário Dinâmico**: Campos condicionais que aparecem baseados no tipo de aluguel selecionado
- **Validação Automática**: Validação de CPF, formatação automática de campos
- **Busca de CEP**: Integração com API ViaCEP para preenchimento automático de endereços
- **Geração de PDF**: Exportação do formulário preenchido em formato PDF
- **Impressão Direta**: Funcionalidade de impressão otimizada
- **Responsivo**: Interface adaptada para desktop e dispositivos móveis
- **Marca ASSINAJA**: Logo profissional integrada ao design

### 📝 Campos Incluídos

#### Dados Pessoais (Locador e Locatário)
- Nome completo
- CPF (com validação)
- RG
- Telefone (com máscara)
- Email
- Endereço completo (com busca automática por CEP)

#### Dados do Veículo (quando selecionado)
- Marca e modelo
- Ano de fabricação
- Placa
- Cor
- Tipo de combustível

#### Dados do Imóvel (quando selecionado)
- Tipo de imóvel
- Endereço completo
- Área em m²
- Número de quartos e banheiros

#### Dados do Contrato
- Valor do aluguel
- Datas de início e término
- Dia de vencimento
- Observações adicionais

## 🚀 Como Usar

### Pré-requisitos
- Node.js 18+ 
- pnpm (recomendado) ou npm

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/formulario-aluguel.git
cd formulario-aluguel
```

2. Instale as dependências:
```bash
pnpm install
# ou
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
pnpm run dev
# ou
npm run dev
```

4. Acesse `http://localhost:5173` no seu navegador

### Build para Produção

```bash
pnpm run build
# ou
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

## 🛠️ Tecnologias Utilizadas

- **React 19** - Framework principal
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework CSS para estilização
- **jsPDF** - Geração de documentos PDF
- **html2canvas** - Captura de tela para PDF
- **React Input Mask** - Máscaras para campos de entrada

## 📱 Responsividade

O formulário foi desenvolvido com design responsivo, garantindo uma experiência otimizada em:
- 📱 Smartphones
- 📱 Tablets
- 💻 Desktops
- 🖥️ Monitores grandes

## 🎨 Design

- **Interface Limpa**: Design corporativo e profissional
- **Cores Harmônicas**: Paleta de cores azul e cinza
- **Ícones Intuitivos**: Emojis e ícones para melhor UX
- **Animações Suaves**: Transições e hover effects
- **Tipografia Legível**: Fontes otimizadas para leitura

## 📄 Funcionalidades de Exportação

### PDF
- Geração automática de PDF com layout otimizado
- Suporte a múltiplas páginas
- Qualidade alta para impressão
- Nome do arquivo: `contrato-aluguel.pdf`

### Impressão
- Layout otimizado para impressão
- Ocultação automática de botões na versão impressa
- Suporte a diferentes tamanhos de papel

## 🔧 Personalização

O formulário pode ser facilmente personalizado:

1. **Cores**: Modifique as classes Tailwind no arquivo `App.jsx`
2. **Campos**: Adicione ou remova campos no estado `formData`
3. **Validações**: Implemente novas validações nas funções correspondentes
4. **Layout**: Ajuste a estrutura dos componentes

## 📋 Estrutura do Projeto

```
formulario-aluguel/
├── public/
├── src/
│   ├── components/
│   │   └── ui/          # Componentes UI do shadcn
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos principais
│   ├── index.css        # Estilos globais
│   └── main.jsx         # Ponto de entrada
├── package.json
├── vite.config.js
└── README.md
```

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões:

1. Abra uma [issue](https://github.com/seu-usuario/formulario-aluguel/issues)
2. Descreva o problema detalhadamente
3. Inclua screenshots se necessário

## 🎯 Roadmap

- [ ] Integração com banco de dados
- [ ] Sistema de autenticação
- [ ] Templates de contrato personalizáveis
- [ ] Assinatura digital
- [ ] Notificações por email
- [ ] Dashboard administrativo

## 📊 Status do Projeto

✅ **Concluído** - Pronto para uso em produção

---

Desenvolvido com ❤️ para facilitar a criação de contratos de aluguel profissionais.

