'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import MessageBubble from './MessageBubble';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatInterface() {
  const { messages, addMessage, selectedModel, parameters } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const icons = ['💬', '🚀', '💭', '🤖', ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Animate icon rotation
  useEffect(() => {
    if (messages.length === 0) {
      const interval = setInterval(() => {
        setCurrentIconIndex((prev) => (prev + 1) % icons.length);
      }, 2000); // Change icon every 2 seconds

      return () => clearInterval(interval);
    }
  }, [messages.length, icons.length]);

  // Listen for template load events
  useEffect(() => {
    const handleLoadTemplate = (event: Event) => {
      const customEvent = event as CustomEvent;
      setInputValue(customEvent.detail);
      textareaRef.current?.focus();
    };

    window.addEventListener('loadTemplate', handleLoadTemplate);
    return () => window.removeEventListener('loadTemplate', handleLoadTemplate);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputValue]);

  const handleSend = async () => {
    if (!inputValue.trim() || !selectedModel || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    // Add user message
    addMessage({
      role: 'user',
      content: userMessage,
    });

    // Simulate AI response
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          model: selectedModel.id,
          parameters,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        addMessage({
          role: 'assistant',
          content: data.data.content,
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-3 max-w-md px-4">
              <div className="text-6xl mb-4 relative h-20 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIconIndex}
                    initial={{ scale: 0, opacity: 0, rotateY: -180 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    exit={{ scale: 0, opacity: 0, rotateY: 180 }}
                    transition={{ 
                      duration: 0.6,
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                  >
                    {icons[currentIconIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                AI Chat Playground
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Start a conversation with your selected AI model. Configure parameters in the sidebar
                and choose from saved templates to get started quickly.
              </p>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </AnimatePresence>
        )}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-gray-700 dark:text-gray-300 animate-spin" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  selectedModel
                    ? 'Type your message... (Shift+Enter for new line)'
                    : 'Please select a model first'
                }
                disabled={!selectedModel || isLoading}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                rows={1}
                aria-label="Message input"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || !selectedModel || isLoading}
              className="px-5 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
            {selectedModel ? (
              <>Using {selectedModel.name} • {parameters.temperature} temp • {parameters.maxTokens} tokens</>
            ) : (
              'Select a model to start chatting'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
