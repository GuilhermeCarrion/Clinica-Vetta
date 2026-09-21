import { getHistorico } from "../../lib/n8n";

const statusColor: Record<string, string> = {
  Coletando: "border-moss",
  Pendente: "border-clay",
  Confirmado: "border-pine",
};

const statusLabel: Record<string, string> = {
  Coletando: "Em conversa",
  Pendente: "Aguardando aprovação",
  Confirmado: "Confirmado",
};
export default async function Historico() {
  const agendamentos = await getHistorico();

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="font-display text-2xl text-pine mb-8">Historico</h1>

      {agendamentos.length === 0 ? (
        <p className="text-ink/50 text-sm">
          Nenhum agendamento registrado ainda.
        </p>
      ) : (
        <div className="divide-y divide-ink/10">
          {agendamentos.map((agendamento) => (
            <div
              key={agendamento.id}
              className={`border-l-4 pl-4 py-4 ${statusColor[agendamento.status] ?? "border-ink/20"}`}
            >
              <div className="flex justify-between items-baseline">
                <p className="font-medium text-ink">
                  {agendamento.nome_tutor || "—"} —{" "}
                  {agendamento.nome_pet || "—"} ({agendamento.especie || "—"})
                </p>
                <span className="text-xs text-ink/50">
                  {statusLabel[agendamento.status] ?? agendamento.status}
                </span>
              </div>
              <p className="text-sm text-ink/60">
                {agendamento.servico_desejado || "—"}
              </p>
              <p className="text-sm text-ink/40">
                {agendamento.data_hora_sugerida || "—"}
              </p>
              <p className="text-xs text-ink/30 mt-1">
                Registrado em{" "}
                {new Date(agendamento.criado_em).toLocaleString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
