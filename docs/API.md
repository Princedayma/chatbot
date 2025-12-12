# API Documentation

Complete documentation for all mock API endpoints in the AI Chat Playground.

## Base URL
```
http://localhost:3000/api
```

## Authentication
No authentication required (mock API).

---

## Endpoints

### 1. Get AI Models

Retrieves a list of available AI models.

**Endpoint:** `GET /api/models`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "gpt-4-turbo",
      "name": "GPT-4 Turbo",
      "provider": "OpenAI",
      "description": "Most capable GPT-4 model with 128K context window",
      "maxTokens": 4096
    }
  ]
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique model identifier |
| name | string | Display name |
| provider | string | Model provider (OpenAI, Anthropic, etc.) |
| description | string | Model capabilities description |
| maxTokens | number | Maximum output tokens |

---

### 2. Get Prompt Templates

Retrieves saved prompt templates.

**Endpoint:** `GET /api/templates`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Code Review",
      "content": "Please review the following code...",
      "category": "Development",
      "createdAt": "2024-12-01T10:00:00Z"
    }
  ]
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique template identifier |
| name | string | Template name |
| content | string | Template prompt content |
| category | string | Template category |
| createdAt | string | ISO 8601 timestamp |

---

### 3. Send Chat Message

Sends a message and receives AI response.

**Endpoint:** `POST /api/chat`

**Request Body:**
```json
{
  "message": "What is TypeScript?",
  "model": "gpt-4-turbo",
  "parameters": {
    "temperature": 0.7,
    "maxTokens": 2048,
    "topP": 1
  }
}
```

**Request Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| message | string | Yes | User message content |
| model | string | Yes | Selected model ID |
| parameters | object | Yes | Generation parameters |
| parameters.temperature | number | Yes | 0-1, controls randomness |
| parameters.maxTokens | number | Yes | Max response length |
| parameters.topP | number | Yes | Nucleus sampling parameter |

**Response:**
```json
{
  "success": true,
  "data": {
    "content": "TypeScript is a strongly typed programming language...",
    "model": "gpt-4-turbo",
    "tokensUsed": 245
  }
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| content | string | AI response message |
| model | string | Model that generated response |
| tokensUsed | number | Estimated tokens consumed |

**Error Response:**
```json
{
  "success": false,
  "error": "Failed to process chat request"
}
```

---

## Rate Limiting
No rate limiting (mock API).

## Simulated Delays
- `/api/models`: 100ms
- `/api/templates`: 150ms
- `/api/chat`: 800ms

## Future Enhancements
When integrating real APIs:
- Add authentication headers
- Implement rate limiting
- Add request validation
- Support streaming responses
- Add error codes and detailed messages
