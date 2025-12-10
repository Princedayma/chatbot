'use client';

import React from 'react';
import { Copy, Download, User, Sparkles } from 'lucide-react';
import { Message } from '@/types';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(message, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `message-${message.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
            isUser
              ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white'
              : 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white'
          }`}
          aria-label={isUser ? 'User avatar' : 'AI assistant avatar'}
        >
          {isUser ? (
            <User className="w-5 h-5" strokeWidth={2.5} />
          ) : (
            <Sparkles className="w-5 h-5" strokeWidth={2.5} />
          )}
        </div>

        {/* Message Content */}
        <div className="flex flex-col gap-2">
          <div
            className={`px-4 py-3 rounded-2xl ${
              isUser
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          </div>

          {/* Action Buttons - Only for AI messages */}
          {!isUser && (
            <div className="flex gap-2 ml-1">
              <button
                onClick={handleCopy}
                className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Copy message to clipboard"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownload}
                className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Download message as JSON"
                title="Download as JSON"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Timestamp */}
          <div
            className={`text-xs text-gray-500 dark:text-gray-400 ${isUser ? 'text-right' : 'text-left'} px-1`}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
