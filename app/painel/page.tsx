import { getPendentes } from "../lib/n8n";
import { aprovar } from "../actions";

export default async function Home() {
  const pendentes = await getPendentes();

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="font-display text-2xl text-pine mb-1">Pendentes</h1>
      <p className="text-sm text-ink/50 mb-8">
        {pendentes.length === 0
          ? "Nenhum agendamento aguardando aprovação"
          : `${pendentes.length} agendamento${pendentes.length > 1 ? "s" : ""} aguardando aprovação`}
      </p>

      {pendentes.length > 0 && (
        <div className="divide-y divide-ink/10">
          {pendentes.map((agendamento) => (
            <div
              key={agendamento.id}
              className="border-l-4 border-clay pl-4 py-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-ink">
                  {agendamento.nome_tutor} — {agendamento.nome_pet} (
                  {agendamento.especie})
                </p>
                <p className="text-sm text-ink/60">
                  {agendamento.servico_desejado}
                </p>
                <p className="text-sm text-ink/40">
                  {agendamento.data_hora_sugerida}
                </p>
              </div>

              <form action={aprovar}>
                <input type="hidden" name="id" value={agendamento.id} />
                <button
                  type="submit"
                  className="bg-honey text-ink px-4 py-2 rounded-sm text-sm font-medium hover:bg-honey/90"
                >
                  Aprovar
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
