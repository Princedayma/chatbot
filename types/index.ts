export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens: number;
}

export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
  createdAt: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
}

export interface AppState {
  theme: 'light' | 'dark';
  selectedModel: AIModel | null;
  parameters: ChatParameters;
  messages: Message[];
  isSidebarOpen: boolean;
}

export interface AppContextType extends AppState {
  setTheme: (theme: 'light' | 'dark') => void;
  setSelectedModel: (model: AIModel) => void;
  setParameters: (parameters: Partial<ChatParameters>) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  toggleSidebar: () => void;
}
