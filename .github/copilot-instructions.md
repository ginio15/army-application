# Copilot Instructions for Army Application

## Project Overview
This is a React + TypeScript application for army document registration and protocol management. The system handles different types of military documents (common, signals, confidential) in both incoming and outgoing categories.

## Key Features
- **Bilingual Support**: Greek (primary) and English languages with TranslationService
- **Document Categories**: Common, Signals, and Confidential documents (incoming/outgoing)
- **Protocol Management**: Auto-generated protocol and draft numbers
- **Office Distribution**: Multi-office document routing system
- **Responsive UI**: Tailwind CSS with mobile-first design

## Technology Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (client-side)
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support

## Code Style & Patterns

### TypeScript Guidelines
- Use strict typing - avoid `any` type (existing issues being addressed)
- Define interfaces for all props and data structures
- Use union types for enums (e.g., `RegistrationCategory`, `Office`)
- Import types with proper type imports when needed

### React Component Patterns
- Use functional components with hooks
- Props interfaces should be defined above the component
- Use descriptive prop and state variable names
- Follow the existing pattern of `const ComponentName: React.FC<Props> = ({ ... }) => { ... }`

### State Management
- Use React's built-in state management (useState, useEffect)
- DatabaseService singleton pattern for data operations
- TranslationService singleton for i18n

### Styling Conventions
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design patterns
- Consistent spacing using Tailwind's spacing scale
- Use slate colors for neutral elements, blue for primary actions
- Button styles: consistent padding, hover effects, focus rings

### File Organization
```
src/
├── components/          # React components
├── services/           # Business logic and external integrations
├── types/             # TypeScript type definitions
├── App.tsx            # Main application component
└── main.tsx          # Application entry point
```

## Domain-Specific Context

### Document Types
- **Common Documents**: Standard military correspondence
- **Signals**: Communication/telecommunications documents  
- **Confidential**: Classified military documents

### Greek Military Context
- Protocol numbers follow military standards
- Office names are in Greek (e.g., "1ο ΓΡΑΦΕΙΟ", "ΓΔΥ")
- Field labels change based on document type (issuer, subject variations)

### Translation Keys
- Use the pattern `category.fieldName` for translation keys
- Special handling for signals vs confidential vs common document fields
- Greek is the primary language, English is secondary

## Component Guidelines

### Form Components
- Use controlled components with proper validation
- Required fields validation based on document category
- Date inputs should default to current date for entry dates
- Length validation (255 chars max for text fields)

### Confirmation Screens
- Show protocol/draft numbers prominently
- Display all entered data in organized sections
- Include category-specific field labels

### Navigation
- Consistent back/cancel button behavior
- Loading states for async operations
- Language toggle in header

## Development Practices

### Error Handling
- Use try-catch blocks for async operations
- Show user-friendly error messages via TranslationService
- Console.error for debugging information

### Performance
- Lazy load components where appropriate
- Minimize re-renders with proper dependency arrays
- Use the existing singleton services pattern

### Testing Considerations
- Components should be testable in isolation
- Mock the singleton services in tests
- Test both Greek and English language variants

## Common Pitfalls to Avoid
- Don't use `any` type - define proper interfaces
- Don't hardcode Greek/English text - use TranslationService
- Don't break the existing category-based field label logic
- Don't modify the protocol number generation logic without understanding military requirements
- Always handle loading and error states in async operations

## When Adding New Features
1. Consider bilingual impact (add translations to both languages)
2. Follow existing TypeScript patterns and interfaces
3. Test with different document categories
4. Ensure responsive design works across devices
5. Add proper error handling and loading states
6. Update type definitions if adding new data structures

## Database Integration
- Use DatabaseService singleton for all data operations
- Handle Supabase connection errors gracefully
- Follow existing patterns for registration creation and retrieval
- Respect the existing data structure and relationships