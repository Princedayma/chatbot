import { NextResponse } from 'next/server';
import { AIModel } from '@/types';

const mockModels: AIModel[] = [
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    description: 'Most capable GPT-4 model with 128K context window',
    maxTokens: 4096,
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: 'High intelligence model for complex tasks',
    maxTokens: 4096,
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    description: 'Most powerful Claude model for complex analysis',
    maxTokens: 4096,
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    description: 'Balanced performance and speed',
    maxTokens: 4096,
  },
  {
    id: 'llama-3-70b',
    name: 'Llama 3 70B',
    provider: 'Meta',
    description: 'Open-source large language model',
    maxTokens: 4096,
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'Mistral AI',
    description: 'Powerful multilingual model',
    maxTokens: 4096,
  },
];

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return NextResponse.json({
    success: true,
    data: mockModels,
  });
}
