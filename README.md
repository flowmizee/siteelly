# The Black Barber PRO

Landing page moderna e responsiva desenvolvida para a barbearia "The Black Barber". O projeto inclui um sistema de agendamento integrado ao Google Sheets e um consultor de estilo via IA.

## 🚀 Tecnologias Utilizadas

- **React 18/19** (Frontend)
- **Vite** (Build Tool)
- **Tailwind CSS** (Estilização via CDN/Config)
- **Google Apps Script** (Backend Serverless para Agendamentos)
- **Lucide React** (Ícones)
- **Google Gemini AI** (Consultor de Estilo)

## 🛠️ Funcionalidades

1.  **Agendamento Online**:
    - Seleção de datas e horários disponíveis.
    - Integração em tempo real com Google Sheets via API.
    - Validação de conflitos de horário.
    
2.  **Catálogo de Serviços**:
    - Seleção de serviços (Corte, Barba, etc.).
    - Cálculo automático do total.
    - Geração de QR Code Pix (Estático/Simulado) para pagamento.

3.  **Consultor de Estilo IA**:
    - Chatbot integrado para sugestões de cortes baseados no perfil do cliente.

## 📦 Como rodar localmente

1.  Clone o repositório:
    ```bash
    git clone https://github.com/SEU-USUARIO/the-black-barber.git
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

## 📝 Configuração do Backend (Google Sheets)

Este projeto se comunica com um script hospedado no Google Apps Script.
- O endpoint está configurado em `components/Contact.tsx`.
- A planilha utilizada como banco de dados recebe os agendamentos e gerencia a disponibilidade.

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usá-lo e modificá-lo.
