# AI Chat Playground

A modern, professional AI Chat & Playground Interface built with Next.js, TypeScript, and Tailwind CSS. This application provides a sleek interface similar to OpenAI Playground or Anthropic Console.

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

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

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

