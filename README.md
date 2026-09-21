# Clínica Vetta — Agendamento automatizado com IA

Sistema de atendimento e agendamento para uma clínica veterinária. Um chatbot com IA conversa com o cliente, extrai os dados do agendamento e mantém o contexto entre mensagens; um painel administrativo permite à equipe aprovar os agendamentos pendentes e consultar o histórico completo.

Projeto desenvolvido para a disciplina de automação com n8n, no curso de Análise e Desenvolvimento de Sistemas (UniSalesiano).

## Como funciona

**Fluxo A — Atendimento (n8n)**
O cliente conversa em linguagem natural pelo chat do site. Cada mensagem passa por um workflow n8n que:

1. Busca, no Google Sheets, se já existe uma conversa em andamento para aquele telefone
2. Envia a mensagem (mais o contexto já coletado) para um modelo de IA via [Groq](https://groq.com/), que extrai os dados do agendamento em formato estruturado
3. Se algum dado obrigatório estiver faltando, responde ao cliente pedindo o que falta e salva o progresso na planilha com status `Coletando`
4. Quando os dados estão completos, grava o agendamento com status `Pendente` e confirma com o cliente

A IA também recebe a data/hora atual e a lista de serviços da clínica a cada execução, então ela recusa datas no passado e serviços que a clínica não oferece.

**Fluxo B — Painel administrativo (n8n + Next.js)**
Em vez de um app de chat corporativo (que exigiria conta Google Workspace), a gestão é feita por um painel web próprio. Três workflows n8n expõem uma API simples que o painel consome:

| Rota         | Método | Função                                              |
| ------------ | ------ | --------------------------------------------------- |
| `/pendentes` | GET    | Lista agendamentos aguardando aprovação             |
| `/aprovar`   | POST   | Muda o status de um agendamento para `Confirmado`   |
| `/historico` | GET    | Lista todos os agendamentos, mais recentes primeiro |

## Stack

- **Automação / backend:** n8n (self-hosted, Docker)
- **IA:** Groq API (`openai/gpt-oss-20b`), com saída estruturada via JSON Schema
- **Banco de dados:** Google Sheets
- **Frontend:** Next.js (App Router, TypeScript), Tailwind CSS v4
- **Comunicação frontend ↔ backend:** Server Actions e Server Components do Next.js, autenticados por header

## Estrutura do repositório

```
painel-vet/
├── workflow/              # exports dos workflows do n8n (JSON)
│   ├── atendimento-vet.json
│   ├── pendentes.json
│   ├── aprovar.json
│   └── historico.json
├── src/
│   ├── app/
│   │   ├── page.tsx            # landing (escolha cliente/equipe)
│   │   ├── chat/page.tsx       # chat do cliente
│   │   ├── painel/
│   │   │   ├── layout.tsx      # sidebar da área administrativa
│   │   │   ├── page.tsx        # lista de pendentes
│   │   │   └── historico/page.tsx
│   │   └── actions.ts          # Server Actions (aprovar, enviar mensagem)
│   └── lib/
│       └── n8n.ts              # camada de acesso à API do n8n
├── .env.example
└── README.md
```

## Planilha (Google Sheets)

Aba `Agendamentos`, com as colunas:

```
id | status | telefone | nome_tutor | nome_pet | especie | servico_desejado | data_hora_sugerida | resumo_conversa | criado_em
```

`status` assume três valores: `Coletando` (conversa em andamento), `Pendente` (aguardando aprovação da equipe) e `Confirmado` (aprovado).

## Rodando o projeto localmente

### 1. n8n

- Suba uma instância local de n8n (Docker)
- Importe os 4 workflows da pasta `workflow/` (menu `⋯` → _Import from File_)
- Configure as credenciais em cada workflow:
  - **Google Sheets OAuth2** (Sheets + Drive API habilitadas no Google Cloud Console)
  - **Groq API key** ([console.groq.com/keys](https://console.groq.com/keys))
  - **Header Auth** para os endpoints `/pendentes`, `/aprovar` e `/historico` (gere uma chave própria)
- Crie a planilha do Google Sheets com a aba e colunas descritas acima
- Publique (ative) os 4 workflows

### 2. Frontend

```bash
npm install
cp .env.example .env.local
# preencha N8N_BASE_URL e N8N_API_KEY no .env.local
npm run dev
```

Acesse `http://localhost:3000`.

## Variáveis de ambiente

| Variável       | Descrição                                                                      |
| -------------- | ------------------------------------------------------------------------------ |
| `N8N_BASE_URL` | URL base dos webhooks de produção do n8n (ex: `http://localhost:5678/webhook`) |
| `N8N_API_KEY`  | Valor da credencial Header Auth configurada nos workflows administrativos      |

## Notas

- As credenciais reais (Groq, Google Sheets, Header Auth) não fazem parte deste repositório — apenas a estrutura dos workflows. Configure as suas próprias ao importar.
- O prompt da IA (system message do node de IA no Fluxo A) concentra as regras de negócio: serviços oferecidos, validação de data e tom da conversa — é o primeiro lugar a ajustar para mudar o comportamento do atendimento.
