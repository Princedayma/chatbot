# Contributing to AI Chat Playground

Thank you for your interest in contributing to the AI Chat Playground! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Git for version control
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/chatbot.git
   cd chatbot
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Run Storybook (for component development)**
   ```bash
   npm run storybook
   ```

## Development Workflow

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or updates

Example: `feature/add-export-functionality`

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing patterns
   - Add comments for complex logic

3. **Test your changes**
   ```bash
   npm run dev       # Manual testing
   npm run build     # Ensure build works
   npm run lint      # Check for linting errors
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "✨ Add your feature description"
   ```

   **Commit Message Convention:**
   - ✨ `:sparkles:` - New feature
   - 🐛 `:bug:` - Bug fix
   - 📝 `:memo:` - Documentation
   - ♻️ `:recycle:` - Refactoring
   - 💄 `:lipstick:` - UI/styling
   - ⚡ `:zap:` - Performance
   - ✅ `:white_check_mark:` - Tests

## Coding Standards

### TypeScript

- Use strict mode (already configured)
- Define types for all props and functions
- Avoid `any` type unless absolutely necessary
- Use interfaces for object shapes

```typescript
// ✅ Good
interface Props {
  message: string;
  count: number;
}

// ❌ Bad
const props: any = { ... }
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper naming conventions

```typescript
// ✅ Good
export default function MessageBubble({ message }: Props) {
  // Component logic
}

// ❌ Bad
const comp = (props) => { ... }
```

### Styling

- Use Tailwind CSS utility classes
- Follow existing design patterns
- Maintain consistent spacing
- Ensure dark mode compatibility

```tsx
// ✅ Good
<div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg">

// ❌ Bad
<div style={{ padding: '8px 16px' }}>
```

### File Organization

```
components/
  ├── ComponentName.tsx      # Component file
  └── types.ts               # If component has complex types

stories/
  └── ComponentName.stories.tsx  # Storybook stories
```

## Submitting Changes

### Pull Request Process

1. **Update your branch**
   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git rebase main
   ```

2. **Push to your fork**
   ```bash
   git push origin your-branch
   ```

3. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Storybook updated
- [ ] Build passes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style
- [ ] Comments added for complex code
- [ ] No console.log statements
- [ ] TypeScript types are correct
```

## Reporting Issues

### Bug Reports

Include:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser/OS information

### Feature Requests

Include:
- Clear use case
- Proposed solution
- Alternative approaches considered
- Any relevant mockups or examples

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

Thank you for contributing! 🎉
