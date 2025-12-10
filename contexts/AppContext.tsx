'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContextType, AIModel, ChatParameters, Message } from '@/types';

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultParameters: ChatParameters = {
  temperature: 0.7,
  maxTokens: 2048,
  topP: 1,
};

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [parameters, setParametersState] = useState<ChatParameters>(defaultParameters);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setThemeState(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setThemeState(initialTheme);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const setParameters = (newParameters: Partial<ChatParameters>) => {
    setParametersState(prev => ({ ...prev, ...newParameters }));
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const value: AppContextType = {
    theme,
    selectedModel,
    parameters,
    messages,
    isSidebarOpen,
    setTheme,
    setSelectedModel,
    setParameters,
    addMessage,
    clearMessages,
    toggleSidebar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
