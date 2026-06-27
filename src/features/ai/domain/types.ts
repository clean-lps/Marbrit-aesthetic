export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
}

export interface AgentConfig {
  apiUrl: string;
  apiKey?: string;
  model?: string;
  systemPrompt?: string;
  temperature?: number;
}

export interface ToolCall {
  name: string;
  arguments: Record<string, unknown>;
}

export type AgentStatus = "idle" | "loading" | "streaming" | "error";
