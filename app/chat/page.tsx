"use client";

import { useState } from "react";
import { enviarMensagemChat } from "../actions";

type Mensagem = {
  autor: "cliente" | "clinica";
  texto: string;
};

function PawIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <ellipse cx="12" cy="15" rx="6" ry="5" />
      <ellipse cx="5" cy="8" rx="2.2" ry="3" />
      <ellipse cx="10.5" cy="5.5" rx="2.2" ry="3" />
      <ellipse cx="15.5" cy="5.5" rx="2.2" ry="3" />
      <ellipse cx="19" cy="8" rx="2.2" ry="3" />
    </svg>
  );
}

export default function ChatCliente() {
  const [telefone, setTelefone] = useState("");
  const [telefoneConfirmado, setTelefoneConfirmado] = useState(false);
  const [inputTelefone, setInputTelefone] = useState("");

  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [input, setInput] = useState("");
  const [enviando, setEnviando] = useState(false);

  function handleConfirmarTelefone(e: React.FormEvent) {
    e.preventDefault();
    const apenasDigitos = inputTelefone.replace(/\D/g, ""); // remove tudo que não é número
    if (apenasDigitos.length < 10) return; // validação simples de tamanho mínimo
    setTelefone(apenasDigitos);
    setTelefoneConfirmado(true);
  }

  async function handleEnviar(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || enviando) return;

    const texto = input;
    setMensagens((atual) => [...atual, { autor: "cliente", texto }]);
    setInput("");
    setEnviando(true);

    try {
      const { resposta } = await enviarMensagemChat(telefone, texto);
      setMensagens((atual) => [
        ...atual,
        { autor: "clinica", texto: resposta },
      ]);
    } catch {
      setMensagens((atual) => [
        ...atual,
        { autor: "clinica", texto: "Erro ao enviar. Tente de novo." },
      ]);
    } finally {
      setEnviando(false);
    }
  }

  // Portão: sem telefone confirmado, nem monta o chat
  if (!telefoneConfirmado) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-paper">
        <div className="text-moss mb-4">
          <PawIcon />
        </div>
        <h1 className="font-display text-2xl text-pine mb-1">Clínica Vetta</h1>
        <p className="text-ink/50 text-sm mb-6 text-center max-w-xs">
          Informe seu telefone para iniciar o atendimento
        </p>
        <form
          onSubmit={handleConfirmarTelefone}
          className="flex flex-col gap-3 w-full max-w-xs"
        >
          <input
            value={inputTelefone}
            onChange={(e) => setInputTelefone(e.target.value)}
            placeholder="(18) 99999-8888"
            className="border border-ink/20 rounded-sm px-3 py-2 text-sm bg-paper focus:outline-none focus:border-moss"
          />
          <button
            type="submit"
            className="bg-honey text-ink px-4 py-2 rounded-sm text-sm font-medium hover:bg-honey/90"
          >
            Entrar no chat
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="h-screen flex flex-col bg-paper max-w-md mx-auto">
      <header className="flex items-center gap-2 px-6 py-4 border-b border-ink/10 text-pine">
        <PawIcon />
        <h1 className="font-display text-lg">Clínica Vetta</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {mensagens.length === 0 && (
          <p className="text-ink/40 text-sm">
            Envie uma mensagem para começar...
          </p>
        )}
        {mensagens.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-2.5 text-sm ${
              m.autor === "cliente"
                ? "bg-moss text-paper ml-auto rounded-l-md rounded-tr-md"
                : "bg-paper border border-ink/15 text-ink rounded-r-md rounded-tl-md"
            }`}
          >
            {m.texto}
          </div>
        ))}
        {enviando && <p className="text-ink/40 text-sm">Digitando...</p>}
      </div>

      <form
        onSubmit={handleEnviar}
        className="flex gap-2 px-6 py-4 border-t border-ink/10"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-ink/20 rounded-sm px-3 py-2 text-sm bg-paper focus:outline-none focus:border-moss"
          placeholder="Digite sua mensagem..."
        />
        <button
          type="submit"
          disabled={enviando}
          className="bg-honey text-ink px-4 py-2 rounded-sm text-sm font-medium hover:bg-honey/90 disabled:opacity-50"
        >
          Enviar
        </button>
      </form>
    </main>
  );
}
