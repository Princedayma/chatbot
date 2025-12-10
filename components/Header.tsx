'use client';

import React from 'react';
import { Sun, Moon, Menu, X, Trash2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { motion } from 'framer-motion';

export default function Header() {
  const { theme, setTheme, isSidebarOpen, toggleSidebar, clearMessages, messages } = useApp();

  const handleClearChat = () => {
    if (messages.length > 0 && confirm('Are you sure you want to clear all messages?')) {
      clearMessages();
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section - Mobile Menu + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              AI Playground
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              Powered by Predusk Technology 
            </p>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Clear Chat Button */}
          {messages.length > 0 && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={handleClearChat}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Clear all messages"
              title="Clear chat"
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.div>
          </button>
        </div>
      </div>
    </header>
  );
}
