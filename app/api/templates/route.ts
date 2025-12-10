import { NextResponse } from 'next/server';
import { PromptTemplate } from '@/types';

const mockTemplates: PromptTemplate[] = [
  {
    id: '1',
    name: 'Code Review',
    content: 'Please review the following code and provide feedback on:\n1. Code quality and best practices\n2. Potential bugs or issues\n3. Performance optimizations\n4. Security concerns\n\n```\n// Paste your code here\n```',
    category: 'Development',
    createdAt: '2024-12-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Creative Writing',
    content: 'Write a creative short story with the following elements:\n- Setting: [Describe the setting]\n- Characters: [List main characters]\n- Theme: [What\'s the central theme?]\n- Tone: [Serious, humorous, mysterious, etc.]\n\nPlease make it engaging and approximately 500 words.',
    category: 'Writing',
    createdAt: '2024-12-02T14:30:00Z',
  },
  {
    id: '3',
    name: 'Data Analysis',
    content: 'Analyze the following dataset and provide insights:\n\n1. Key trends and patterns\n2. Statistical summary\n3. Correlations between variables\n4. Actionable recommendations\n\n[Paste your data or describe your dataset here]',
    category: 'Analytics',
    createdAt: '2024-12-03T09:15:00Z',
  },
  {
    id: '4',
    name: 'Explain Like I\'m 5',
    content: 'Explain the following concept in simple terms that a 5-year-old could understand:\n\n[Your complex topic here]\n\nUse analogies, simple language, and examples from everyday life.',
    category: 'Education',
    createdAt: '2024-12-04T16:45:00Z',
  },
  {
    id: '5',
    name: 'Debugging Assistant',
    content: 'I\'m encountering an error in my code. Here\'s the context:\n\n**Error Message:**\n```\n[Paste error message here]\n```\n\n**Code:**\n```\n[Paste relevant code here]\n```\n\n**What I\'ve tried:**\n- [List what you\'ve attempted]\n\nPlease help me identify the issue and suggest a solution.',
    category: 'Development',
    createdAt: '2024-12-05T11:20:00Z',
  },
  {
    id: '6',
    name: 'Brainstorm Ideas',
    content: 'Help me brainstorm creative ideas for:\n\n**Topic:** [Describe your topic]\n**Goal:** [What do you want to achieve?]\n**Constraints:** [Any limitations or requirements?]\n**Target Audience:** [Who is this for?]\n\nPlease provide at least 10 diverse and innovative ideas.',
    category: 'Creative',
    createdAt: '2024-12-06T13:00:00Z',
  },
];

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 150));
  
  return NextResponse.json({
    success: true,
    data: mockTemplates,
  });
}
