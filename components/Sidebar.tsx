'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Save } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { AIModel, PromptTemplate } from '@/types';

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
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      <div className="p-6 space-y-6 overflow-y-auto flex-1">
        {/* Model Selector */}
        <div className="space-y-2">
          <label 
            htmlFor="model-select" 
            className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
          >
            AI Model
          </label>
          <div className="relative">
            <button
              id="model-select"
              onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
              className="w-full px-4 py-3 text-left bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
              aria-haspopup="listbox"
              aria-expanded={isModelDropdownOpen}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {selectedModel?.name || 'Select a model'}
                  </div>
                  {selectedModel && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {selectedModel.provider}
                    </div>
                  )}
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    isModelDropdownOpen ? 'transform rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            {isModelDropdownOpen && (
              <div 
                className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-auto"
                role="listbox"
              >
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model);
                      setIsModelDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                      selectedModel?.id === model.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                    }`}
                    role="option"
                    aria-selected={selectedModel?.id === model.id}
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {model.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {model.provider}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {model.description}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Parameters Section */}
        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Parameters
          </h3>

          {/* Temperature */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label 
                htmlFor="temperature-slider" 
                className="text-sm text-gray-600 dark:text-gray-300"
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
                className="w-16 px-2 py-1 text-sm text-center bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
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
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Temperature slider"
            />
          </div>

          {/* Max Tokens */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label 
                htmlFor="maxTokens-slider" 
                className="text-sm text-gray-600 dark:text-gray-300"
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
                className="w-20 px-2 py-1 text-sm text-center bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
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
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Max tokens slider"
            />
          </div>

          {/* Top P */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label 
                htmlFor="topP-slider" 
                className="text-sm text-gray-600 dark:text-gray-300"
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
                className="w-16 px-2 py-1 text-sm text-center bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
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
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Top P slider"
            />
          </div>
        </div>

        {/* Template Manager */}
        <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Saved Templates
            </h3>
            <button
              className="px-3 py-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Save current prompt as template"
            >
              <Save className="w-4 h-4 inline mr-1" />
              Save
            </button>
          </div>

          <div className="space-y-2">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateClick(template)}
                className="w-full px-3 py-2.5 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 group"
              >
                <div className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {template.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {template.category}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
