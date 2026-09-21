"use server";

import { revalidatePath } from "next/cache";
import { aprovarAgendamento, enviarMensagem } from "./lib/n8n";

export async function aprovar(formData: FormData) {
  const id = formData.get("id") as string;
  await aprovarAgendamento(id);
  revalidatePath("/");
}

export async function enviarMensagemChat(telefone: string, mensagem: string) {
  return enviarMensagem(telefone, mensagem);
}
