export type Agendamento = {
  id: string;
  status: "Coletando" | "Pendente" | "Confirmado";
  telefone: string;
  nome_tutor: string;
  nome_pet: string;
  especie: string;
  servico_desejado: string;
  data_hora_sugerida: string;
  resumo_conversa: string;
  criado_em: string;
};

const BASE_URL = process.env.N8N_BASE_URL;
const API_KEY = process.env.N8N_API_KEY;

async function n8nFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}/${path}`, {
    ...options,
    headers: {
      "api-chat-next": API_KEY!,
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Erro ${res.status} ao chamar ${path}`);
  }

  return res.json();
}

export function getPendentes(): Promise<Agendamento[]> {
  return n8nFetch("pendentes");
}

export function getHistorico(): Promise<Agendamento[]> {
  return n8nFetch("historico");
}

export function aprovarAgendamento(id: string): Promise<{ sucesso: boolean }> {
  return n8nFetch("aprovar", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
}

export function enviarMensagem(
  telefone: string,
  mensagem: string,
): Promise<{ resposta: string }> {
  return n8nFetch("atendimento-vet", {
    method: "POST",
    body: JSON.stringify({ telefone, mensagem }),
  });
}
