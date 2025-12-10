import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, model, parameters } = body;

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock AI response
    const mockResponses = [
      `Based on your input regarding "${message.substring(0, 50)}...", I can provide a comprehensive analysis. This is a simulated response from ${model}.`,
      `That's an interesting question! Let me break this down for you: ${message.substring(0, 30)}... requires careful consideration of multiple factors.`,
      `I understand you're asking about: "${message.substring(0, 40)}...". Here's what I think based on the parameters you've set (temperature: ${parameters.temperature}, max tokens: ${parameters.maxTokens}).`,
      `Great question! From the perspective of ${model}, here's my analysis of your query...`,
      `Thank you for that input. Let me process your request about "${message.substring(0, 35)}..." and provide a detailed response.`,
    ];

    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    return NextResponse.json({
      success: true,
      data: {
        content: randomResponse,
        model,
        tokensUsed: Math.floor(Math.random() * 500) + 100,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
