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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/50 shadow-sm px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section - Mobile Menu + Title */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-gray-700 dark:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-xl backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm"
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            aria-expanded={isSidebarOpen}
          >
            <motion.div
              animate={{ rotate: isSidebarOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
              AI Playground
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block font-medium">
              Powered by Predusk Technology 
            </p>
          </motion.div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Clear Chat Button */}
          {messages.length > 0 && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearChat}
              className="p-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
              aria-label="Clear all messages"
              title="Clear chat"
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>
          )}

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2.5 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
