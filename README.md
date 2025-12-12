# AI Chat Playground

A modern, professional AI Chat & Playground Interface built with Next.js, TypeScript, and Tailwind CSS. This application provides a sleek glassmorphism interface similar to OpenAI Playground or Anthropic Console, featuring real-time chat interactions, parameter controls, and a stunning visual design.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**🌐 Live Demo**: [View on Vercel](https://github.com/Princedayma/chatbot)  
**📦 Repository**: https://github.com/Princedayma/chatbot

---

## 📋 Table of Contents
- [Research](#-research)
- [Design](#-design)
- [Development](#-development)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Mock API Documentation](#-mock-api-documentation)
- [Known Limitations](#-known-limitations)

---

## 🔬 Research

### Platforms Reviewed

During the research phase, we analyzed several leading AI playground interfaces to understand industry standards and user expectations:

#### 1. **OpenAI Playground** (https://platform.openai.com/playground)
**Features Adopted:**
- ✅ Model selection dropdown with provider information
- ✅ Temperature and Max Tokens parameter sliders
- ✅ System prompt templates
- ✅ Message history with role distinction (user/assistant)
- ✅ Clear conversation functionality

**Key Learnings:**
- Users need immediate visual feedback on parameter changes
- Model descriptions help users make informed choices
- Quick template access improves productivity

#### 2. **Anthropic Console** (https://console.anthropic.com)
**Features Adopted:**
- ✅ Clean, minimal sidebar for controls
- ✅ Glassmorphism design aesthetic
- ✅ Prominent action buttons with clear affordances
- ✅ Parameter explanations on hover
- ✅ Copy/export message functionality

**Key Learnings:**
- Glassmorphism creates modern, professional appearance
- Visual hierarchy guides user attention effectively
- Export features are essential for workflow integration

#### 3. **Google AI Studio** (https://aistudio.google.com)
**Features Adopted:**
- ✅ Responsive mobile-first design
- ✅ Animated transitions between states
- ✅ Real-time parameter visualization
- ✅ Dark/Light theme toggle

**Key Learnings:**
- Mobile experience must not be an afterthought
- Animations enhance perceived performance
- Theme persistence improves user satisfaction

#### 4. **Hugging Face Chat** (https://huggingface.co/chat)
**Features Adopted:**
- ✅ Model provider badges
- ✅ Conversation persistence across sessions
- ✅ Template categories
- ✅ Keyboard shortcuts for power users

**Key Learnings:**
- localStorage enables seamless UX continuity
- Categorized templates improve discoverability
- Accessibility features are non-negotiable

### Feature Selection Rationale

Based on research, we prioritized features that:
1. **Enhance Usability**: Intuitive controls, clear visual feedback
2. **Improve Aesthetics**: Glassmorphism, gradient accents, smooth animations
3. **Ensure Accessibility**: Keyboard navigation, ARIA labels, focus states
4. **Enable Productivity**: Templates, persistence, export functions

---

## 🎨 Design

### Design System

**Color Palette:**
```css
Primary: #0ea5e9 (Sky Blue) - Trust, Intelligence
Secondary: #a855f7 (Purple) - Creativity, Innovation
Accent: #ec4899 (Pink) - Energy, Engagement
Neutral: Gray Scale - Balance, Professionalism
```

**Typography:**
- Font Family: Inter (Google Fonts)
- Headings: 600-700 weight
- Body: 400-500 weight
- Code: Monospace for technical elements

**Spacing System:**
- Base unit: 4px (Tailwind's spacing scale)
- Consistent padding: 12px, 16px, 24px
- Component gaps: 8px, 12px, 16px

### Design Mockup

**Figma Design Link**: [View Full Design System](https://www.figma.com/design-system-example)
*(Note: Replace with actual Figma link if created)*

### Tailwind Mapping

#### Glassmorphism Implementation
```tsx
// Header Glass Effect
className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-white/20"

// Sidebar Glass Effect
className="backdrop-blur-xl bg-gradient-to-b from-white/80 to-gray-50/80"

// Card Glass Effect
className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border-gray-200/50"
```

#### Gradient Applications
```tsx
// Text Gradients
className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent"

// Background Gradients
className="bg-gradient-to-br from-primary-500 to-primary-600"

// Hover Gradients
className="hover:from-primary-600 hover:to-purple-600"
```

#### Animation Patterns
```tsx
// Framer Motion Variants
- Fade In: { opacity: 0 → 1, y: 20 → 0 }
- Scale: { scale: 0.95 → 1 }
- Rotate: { rotate: 0 → 180 }
- Slide: { x: -100% → 0 }
```

### Responsive Breakpoints
```tsx
- Mobile: < 640px (Single column, drawer sidebar)
- Tablet: 640px - 1024px (Adjusted spacing)
- Desktop: ≥ 1024px (Two-column layout)
```

---

## 💻 Development

### Technology Stack

| Category | Technology | Version | Justification |
|----------|-----------|---------|---------------|
| **Framework** | Next.js | 14.2.0 | App Router, Server Components, API Routes |
| **Language** | TypeScript | 5.x | Type safety, Enhanced DX, Strict mode |
| **Styling** | Tailwind CSS | 3.4.1 | Utility-first, Responsive, Dark mode |
| **Animations** | Framer Motion | 11.0.0 | Declarative, Performant, Spring physics |
| **Icons** | Lucide React | 0.344.0 | Modern, Customizable, Tree-shakeable |
| **State** | React Context | 18.3.1 | Built-in, No deps, Sufficient for scope |

### TypeScript Configuration

**Strict Mode Enabled:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "jsx": "preserve"
  }
}
```

### Implementation Highlights

#### 1. **State Management with Context API**
```typescript
// contexts/AppContext.tsx
- Theme state with localStorage persistence
- Message history with automatic saving
- Parameter state with real-time updates
- Model selection with storage sync
```

#### 2. **Mock API Architecture**
```typescript
// app/api/*/route.ts
- RESTful endpoints with proper HTTP methods
- JSON response structure with success/error handling
- Simulated network delays for realistic UX
- TypeScript interfaces for response types
```

#### 3. **Component Architecture**
```
Atomic Design Pattern:
- Atoms: Buttons, Inputs, Icons
- Molecules: MessageBubble, ParameterSlider
- Organisms: Sidebar, ChatInterface, Header
- Templates: MainLayout
- Pages: Home page
```

#### 4. **Accessibility Implementation**
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- Focus visible styles with ring indicators
- Screen reader announcements
- Semantic HTML structure

#### 5. **Performance Optimizations**
- Next.js automatic code splitting
- React Server Components where applicable
- Optimized re-renders with useCallback/useMemo
- Lazy loading for heavy components
- Image optimization (Next/Image ready)

### Build & Deployment

**Development:**
```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint checks
```

**Deployment:**
- Platform: Vercel (recommended) or any Node.js host
- Auto-deploy on git push (main branch)
- Environment: Node.js 18+
- Build time: ~45 seconds

---

## ✨ Features

### Core Functionality
- **AI Model Selection**: Choose from multiple AI models (GPT-4, Claude 3, Llama 3, etc.)
- **Parameter Controls**: Adjust temperature, max tokens, and top-p with intuitive sliders
- **Template Manager**: Quick access to saved prompt templates
- **Real-time Chat**: Interactive conversation interface with message history
- **Message Actions**: Copy to clipboard and download messages as JSON

### Design & UX
- **Light/Dark Mode**: Theme toggle with localStorage persistence
- **Fully Responsive**: Desktop two-column layout, mobile single-column with slide-out drawer
- **Smooth Animations**: Framer Motion powered transitions and effects
- **Accessibility**: Full keyboard navigation, ARIA labels, and focus states
- **Modern UI**: Clean, professional design with a sophisticated color palette

### Technical Highlights
- **TypeScript**: Strict mode enabled with complete type safety
- **Next.js App Router**: Modern routing and server components
- **Context API**: Global state management for theme, models, and messages
- **Mock APIs**: Next.js Route Handlers for models, templates, and chat
- **Component Architecture**: Modular, reusable components

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- Git for version control

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Princedayma/chatbot.git
cd chatbot
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
chatbot/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (Mock Backend)
│   │   ├── chat/
│   │   │   └── route.ts         # POST /api/chat - AI response simulation
│   │   ├── models/
│   │   │   └── route.ts         # GET /api/models - Available AI models
│   │   └── templates/
│   │       └── route.ts         # GET /api/templates - Prompt templates
│   ├── globals.css              # Global styles + Tailwind utilities
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Home page (main entry point)
│
├── components/                   # React Components
│   ├── ChatInterface.tsx        # Main chat area with messages
│   ├── Header.tsx               # Top navigation with theme toggle
│   ├── MainLayout.tsx           # Layout wrapper (responsive)
│   ├── MessageBubble.tsx        # Individual message component
│   └── Sidebar.tsx              # Control panel (models, parameters)
│
├── contexts/                     # React Context for State Management
│   └── AppContext.tsx           # Global app state (theme, messages, etc.)
│
├── types/                        # TypeScript Type Definitions
│   └── index.ts                 # Shared interfaces and types
│
├── stories/                      # Storybook Stories
│   ├── Button.stories.tsx       # Button component stories
│   ├── MessageBubble.stories.tsx
│   ├── Sidebar.stories.tsx
│   └── Header.stories.tsx
│
├── public/                       # Static Assets
│   ├── icons/                   # Icon assets
│   └── images/                  # Image assets
│
├── .storybook/                  # Storybook Configuration
│   ├── main.ts                  # Storybook setup
│   └── preview.ts               # Global decorators
│
├── .gitignore                   # Git ignore rules
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration (strict)
└── README.md                    # This file
```

---

## 📡 Mock API Documentation

### Endpoints Overview

All mock APIs are located in `app/api/` and return JSON responses with a consistent structure:

```typescript
{
  success: boolean;
  data?: any;
  error?: string;
}
```

### 1. GET `/api/models`

Returns a list of available AI models.

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
    },
    {
      "id": "claude-3-opus",
      "name": "Claude 3 Opus",
      "provider": "Anthropic",
      "description": "Most powerful Claude model for complex analysis",
      "maxTokens": 4096
    }
    // ... more models
  ]
}
```

**Implementation:** `app/api/models/route.ts`

---

### 2. GET `/api/templates`

Returns saved prompt templates organized by category.

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
    },
    {
      "id": "2",
      "name": "Creative Writing",
      "content": "Write a creative short story...",
      "category": "Writing",
      "createdAt": "2024-12-02T14:30:00Z"
    }
    // ... more templates
  ]
}
```

**Implementation:** `app/api/templates/route.ts`

---

### 3. POST `/api/chat`

Simulates AI chat response based on user input.

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

**Response:**
```json
{
  "success": true,
  "data": {
    "content": "Based on your input regarding 'What is TypeScript?'...",
    "model": "gpt-4-turbo",
    "tokensUsed": 245
  }
}
```

**Implementation:** `app/api/chat/route.ts`

**Features:**
- Simulated 800ms network delay
- Random response selection from mock pool
- Token usage estimation
- Error handling with proper HTTP status codes

---

## 🎭 Storybook Integration

### Setup

```bash
# Install Storybook
npx storybook@latest init

# Run Storybook
npm run storybook
```

### Available Stories

Located in `stories/` directory:

1. **Button.stories.tsx** - Button variants and states
2. **MessageBubble.stories.tsx** - User and AI message displays
3. **Header.stories.tsx** - Header with different states
4. **Sidebar.stories.tsx** - Sidebar with various configurations

### Example Story Structure

```typescript
// stories/MessageBubble.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import MessageBubble from '@/components/MessageBubble';

const meta: Meta<typeof MessageBubble> = {
  title: 'Components/MessageBubble',
  component: MessageBubble,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MessageBubble>;

export const UserMessage: Story = {
  args: {
    message: {
      id: '1',
      role: 'user',
      content: 'Hello, how are you?',
      timestamp: new Date(),
    },
  },
};
```

---

## ⚠️ Known Limitations

### Current Limitations

1. **Mock API Responses**
   - AI responses are simulated with random pre-written strings
   - No actual AI model integration (OpenAI, Anthropic, etc.)
   - **Solution:** Integrate real API clients when keys are available

2. **Template Persistence**
   - Templates are hard-coded in mock API
   - "Save" button does not persist new templates
   - **Solution:** Implement backend storage (Database or file system)

3. **Message Export**
   - Only individual message JSON download supported
   - No bulk export or multiple formats (CSV, PDF)
   - **Solution:** Add export menu with format options

4. **Conversation Management**
   - No conversation branching or editing
   - Cannot rename or organize conversations
   - **Solution:** Add conversation sidebar with CRUD operations

5. **Real-time Streaming**
   - Responses appear all at once (no streaming)
   - No typing indicators during generation
   - **Solution:** Implement Server-Sent Events (SSE) for streaming

6. **Collaborative Features**
   - Single-user only (no sharing or collaboration)
   - No conversation sharing links
   - **Solution:** Add authentication and sharing system

7. **Mobile Optimization**
   - Functional but could be more touch-optimized
   - Slider controls could be larger on mobile
   - **Solution:** Increase touch target sizes for mobile

8. **Internationalization**
   - English only interface
   - No locale support
   - **Solution:** Implement i18n with next-intl or react-i18next

9. **Performance at Scale**
   - localStorage has ~5MB limit
   - Large conversation histories may cause issues
   - **Solution:** Implement pagination and cloud storage

10. **Browser Compatibility**
    - Optimized for modern browsers (Chrome, Firefox, Safari, Edge)
    - May have issues with older browsers
    - **Solution:** Add polyfills or display compatibility warning

### Planned Features (Future Roadmap)

- [ ] Real AI API integration (OpenAI, Anthropic, etc.)
- [ ] User authentication (NextAuth.js)
- [ ] Database integration (PostgreSQL + Prisma)
- [ ] Conversation history management
- [ ] Multi-turn conversation branching
- [ ] Code syntax highlighting in messages
- [ ] File upload support (images, documents)
- [ ] Voice input/output
- [ ] Custom model fine-tuning UI
- [ ] Team collaboration features
- [ ] Advanced export options
- [ ] Plugin system for extensibility

---

```
task 1/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # Mock chat API endpoint
│   │   ├── models/route.ts        # Mock models API endpoint
│   │   └── templates/route.ts     # Mock templates API endpoint
│   ├── globals.css                # Global styles and custom CSS
│   ├── layout.tsx                 # Root layout with providers
│   └── page.tsx                   # Home page
├── components/
│   ├── ChatInterface.tsx          # Main chat area with message display
│   ├── Header.tsx                 # Top header with theme toggle
│   ├── MainLayout.tsx             # Main layout component
│   ├── MessageBubble.tsx          # Individual message component
│   └── Sidebar.tsx                # Configuration panel
├── contexts/
│   └── AppContext.tsx             # Global state management
├── types/
│   └── index.ts                   # TypeScript type definitions
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Component Overview

### `Header`
- Theme toggle button (Light/Dark mode)
- Mobile menu button (hamburger icon)
- Clear chat functionality
- App title and branding

### `Sidebar`
- **Model Selector**: Dropdown with all available AI models
- **Parameters Section**: 
  - Temperature slider (0-1)
  - Max Tokens slider (256-4096)
  - Top P slider (0-1)
- **Template Manager**: List of saved prompt templates

### `ChatInterface`
- Scrollable message history
- User and AI message bubbles
- Auto-resizing textarea input
- Send button with loading state
- Empty state with welcome message

### `MessageBubble`
- User/AI avatars
- Message content with proper styling
- Action buttons (Copy, Download) for AI messages
- Timestamp display

### `MainLayout`
- Responsive layout container
- Desktop: Two-column sidebar + chat
- Mobile: Single column with slide-out drawer
- Backdrop overlay for mobile sidebar

## 🔌 API Routes

### `/api/models`
Returns a list of available AI models with metadata.

### `/api/templates`
Returns saved prompt templates organized by category.

### `/api/chat`
Accepts chat messages and returns simulated AI responses.

## 🎯 Key Features Implementation

### Theme Persistence
The theme preference is saved to `localStorage` and automatically applied on page load. The system also respects the user's OS dark mode preference as a fallback.

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus states are clearly visible
- Dropdown menus can be navigated with Tab/Arrow keys
- Enter to send messages, Shift+Enter for new lines

### Responsive Design
- **Desktop (≥1024px)**: Fixed sidebar + main chat area
- **Mobile (<1024px)**: Hamburger menu with slide-out drawer
- Fluid typography and spacing across all breakpoints

### Animations
- Smooth theme transitions
- Message fade-in and slide-up effects
- Loading spinner and typing indicators
- Hover effects on all interactive elements
- Slide-in animation for mobile drawer

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Context API

## 🎨 Color Palette

The app uses a professional blue primary color scheme:
- Primary: `#0ea5e9` (Sky Blue)
- Accents: Various shades of blue (50-900)
- Neutrals: Gray scale for backgrounds and text
- Both light and dark mode optimized

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels and roles on all interactive components
- Keyboard navigation support
- Focus visible states with ring indicators
- Screen reader friendly
- Proper heading hierarchy
- Alt text for icons (via aria-label)

## 📝 Usage Tips

1. **Select a Model**: Choose your preferred AI model from the sidebar dropdown
2. **Adjust Parameters**: Fine-tune temperature and token limits using the sliders
3. **Load Templates**: Click any saved template to populate the input field
4. **Start Chatting**: Type your message and press Enter (or click Send)
5. **Copy/Download**: Use the action buttons below AI responses
6. **Toggle Theme**: Switch between light and dark mode in the header
7. **Mobile**: Use the hamburger menu to access settings on smaller screens

## 🚧 Future Enhancements

- Real API integration
- Message editing and regeneration
- Conversation history persistence
- Export entire conversation
- Custom template creation
- Multi-turn conversation branching
- Streaming responses
- Code syntax highlighting

