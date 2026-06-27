import { useState, useCallback, useRef } from "react";
import type { Message, AgentStatus } from "@/features/ai/domain";

interface UseChatOptions {
  api: string;
  headers?: Record<string, string>;
  onError?: (error: Error) => void;
}

interface UseChatReturn {
  messages: Message[];
  status: AgentStatus;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
}

export function useChat({
  api,
  headers,
  onError,
}: UseChatOptions): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<AgentStatus>("idle");
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || status === "loading") return;

      abortRef.current?.abort();
      abortRef.current = new AbortController();

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setStatus("loading");

      try {
        const response = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map(({ role, content }) => ({
              role,
              content,
            })),
          }),
          signal: abortRef.current.signal,
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const data = await response.json();

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.content ?? data.text ?? JSON.stringify(data),
          createdAt: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setStatus("idle");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("error");
        onError?.(error instanceof Error ? error : new Error(String(error)));
      }
    },
    [api, headers, messages, status, onError],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setStatus("idle");
  }, []);

  return { messages, status, sendMessage, clearMessages };
}
