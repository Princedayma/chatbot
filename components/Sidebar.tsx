'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Save, Sparkles } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { AIModel, PromptTemplate } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar() {
  const { selectedModel, setSelectedModel, parameters, setParameters } = useApp();
  const [models, setModels] = useState<AIModel[]>([]);
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch models
    fetch('/api/models')
      .then(res => res.json())
      .then(data => {
        setModels(data.data);
        if (data.data.length > 0 && !selectedModel) {
          setSelectedModel(data.data[0]);
        }
      });

    // Fetch templates
    fetch('/api/templates')
      .then(res => res.json())
      .then(data => setTemplates(data.data));
  }, [selectedModel, setSelectedModel]);

  const handleTemplateClick = (template: PromptTemplate) => {
    // This would populate the prompt editor - we'll handle this in the chat interface
    const event = new CustomEvent('loadTemplate', { detail: template.content });
    window.dispatchEvent(event);
  };

  return (
    <div className="h-full flex flex-col backdrop-blur-xl bg-gradient-to-b from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-950/80 border-r border-white/20 dark:border-gray-700/30 shadow-xl">
      <div className="p-6 space-y-6 overflow-y-auto flex-1 scrollbar-thin">
        {/* Model Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-2"
        >
          <label 
            htmlFor="model-select" 
            className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent"
          >
            <Sparkles className="w-4 h-4 text-primary-500 dark:text-primary-400" />
            AI Model
          </label>
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              id="model-select"
              onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
              className="w-full px-4 py-3 text-left bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-600/50 rounded-xl hover:bg-white/80 dark:hover:bg-gray-800/80 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-300"
              aria-haspopup="listbox"
              aria-expanded={isModelDropdownOpen}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {selectedModel?.name || 'Select a model'}
                  </div>
                  {selectedModel && (
                    <div className="text-xs text-primary-600 dark:text-primary-400 mt-0.5 font-medium">
                      {selectedModel.provider}
                    </div>
                  )}
                </div>
                <motion.div
                  animate={{ rotate: isModelDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </div>
            </motion.button>

            <AnimatePresence>
              {isModelDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 w-full mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-2xl max-h-64 overflow-y-auto scrollbar-thin"
                  role="listbox"
                >
                  {models.map((model, index) => (
                    <motion.button
                      key={model.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                      onClick={() => {
                        setSelectedModel(model);
                        setIsModelDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 ${
                        selectedModel?.id === model.id ? 'bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/30 dark:to-purple-900/30 border-l-4 border-primary-500' : ''
                      } ${index === 0 ? 'rounded-t-xl' : ''} ${index === models.length - 1 ? 'rounded-b-xl' : ''}`}
                      role="option"
                      aria-selected={selectedModel?.id === model.id}
                    >
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {model.name}
                      </div>
                      <div className="text-xs text-primary-600 dark:text-primary-400 mt-0.5 font-medium">
                        {model.provider}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {model.description}
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Parameters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
        >
          <h3 className="text-sm font-semibold bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
            Parameters
          </h3>

          {/* Temperature */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="space-y-2 p-3 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center justify-between">
              <label 
                htmlFor="temperature-slider" 
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Temperature
              </label>
              <input
                type="number"
                value={parameters.temperature}
                onChange={(e) => setParameters({ temperature: parseFloat(e.target.value) })}
                min="0"
                max="1"
                step="0.1"
                className="w-16 px-2 py-1 text-sm text-center font-semibold bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 text-primary-600 dark:text-primary-400"
                aria-label="Temperature value"
              />
            </div>
            <input
              id="temperature-slider"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={parameters.temperature}
              onChange={(e) => setParameters({ temperature: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gradient-to-r from-primary-200 to-purple-200 dark:from-primary-800 dark:to-purple-800 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Temperature slider"
            />
          </motion.div>

          {/* Max Tokens */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="space-y-2 p-3 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center justify-between">
              <label 
                htmlFor="maxTokens-slider" 
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Max Tokens
              </label>
              <input
                type="number"
                value={parameters.maxTokens}
                onChange={(e) => setParameters({ maxTokens: parseInt(e.target.value) })}
                min="256"
                max="4096"
                step="256"
                className="w-20 px-2 py-1 text-sm text-center font-semibold bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-600 dark:text-purple-400"
                aria-label="Max tokens value"
              />
            </div>
            <input
              id="maxTokens-slider"
              type="range"
              min="256"
              max="4096"
              step="256"
              value={parameters.maxTokens}
              onChange={(e) => setParameters({ maxTokens: parseInt(e.target.value) })}
              className="w-full h-2 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Max tokens slider"
            />
          </motion.div>

          {/* Top P */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="space-y-2 p-3 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center justify-between">
              <label 
                htmlFor="topP-slider" 
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Top P
              </label>
              <input
                type="number"
                value={parameters.topP}
                onChange={(e) => setParameters({ topP: parseFloat(e.target.value) })}
                min="0"
                max="1"
                step="0.1"
                className="w-16 px-2 py-1 text-sm text-center font-semibold bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-indigo-600 dark:text-indigo-400"
                aria-label="Top P value"
              />
            </div>
            <input
              id="topP-slider"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={parameters.topP}
              onChange={(e) => setParameters({ topP: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gradient-to-r from-indigo-200 to-blue-200 dark:from-indigo-800 dark:to-blue-800 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Top P slider"
            />
          </motion.div>
        </motion.div>

        {/* Template Manager */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-3 pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
              Saved Templates
            </h3>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
              aria-label="Save current prompt as template"
            >
              <Save className="w-3.5 h-3.5 inline mr-1" />
              Save
            </motion.button>
          </div>

          <div className="space-y-2">
            {templates.map((template, index) => (
              <motion.button
                key={template.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTemplateClick(template)}
                className="w-full px-4 py-3 text-left bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-primary-900/30 dark:hover:to-purple-900/30 border border-gray-200/50 dark:border-gray-700/50 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 group shadow-sm hover:shadow-md"
              >
                <div className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {template.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 mt-1 font-medium transition-colors">
                  {template.category}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
