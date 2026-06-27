import { useState, useRef, useEffect } from "react";
import { useChat } from "@/features/ai/application";
import { Spinner } from "@/shared/ui";

interface ChatWindowProps {
  api: string;
  title?: string;
  placeholder?: string;
}

export function ChatWindow({
  api,
  title = "Asistente AI",
  placeholder = "Escribe tu mensaje...",
}: ChatWindowProps) {
  const [input, setInput] = useState("");
  const { messages, status, sendMessage } = useChat({ api });
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === "loading") return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col rounded-xl border bg-white shadow-sm">
      <header className="border-b px-4 py-3 font-medium text-surface-900">
        {title}
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="py-8 text-center text-sm text-surface-400">
            ¿En qué puedo ayudarte?
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-accent text-white"
                  : "bg-surface-100 text-surface-900"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {status === "loading" && (
          <div className="flex justify-start">
            <div className="rounded-xl bg-surface-100 px-4 py-3">
              <Spinner size="sm" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={status === "loading"}
            className="flex-1 rounded-lg border border-surface-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading" || !input.trim()}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-50"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
