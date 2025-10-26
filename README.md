# Inteliq - AI Chat Assistant

A beautiful, responsive chat interface built with React, TypeScript, and Tailwind CSS, inspired by modern AI chat applications.

## Features

- Pixel-perfect UI** - Matches the Figma design specifications
- Real-time Chat** - Instant message sending with simulated AI responses
- File Attachments** - Support for attaching files to messages
- Responsive Design** - Works seamlessly from desktop to tablet
- Quick Suggestions** - Pre-defined prompts for faster interactions
- Chat History** - Persistent chat history in sidebar
- Collapsible Sidebar** - Maximize chat space when needed
- State Management** - Efficient React Context for global state

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (customized for the design)
- **State Management**: React Context API
- **Icons**: Lucide React
- **Build Tool**: Vite

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm installed
- Git (optional, for cloning)

### Installation

1. Clone or download the project:
```bash
git clone <repository-url>
cd <project-name>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn UI components
│   ├── ChatArea.tsx     # Main chat container
│   ├── ChatMessage.tsx  # Individual message component
│   ├── MessageInput.tsx # Chat input with attachments
│   ├── Sidebar.tsx      # Collapsible navigation sidebar
│   └── SuggestionCard.tsx # Quick prompt cards
├── contexts/
│   └── ChatContext.tsx  # Global chat state management
├── pages/
│   ├── Index.tsx        # Main chat page
│   └── NotFound.tsx     # 404 page
├── lib/
│   └── utils.ts         # Utility functions
├── index.css            # Design system & global styles
└── App.tsx              # Root application component
```

## Design Adherence

### Colors
- Primary Blue: `hsl(217, 91%, 60%)` - Used for CTAs and brand elements
- Background: White with subtle gray tones
- Sidebar: Light gray background `hsl(0, 0%, 98%)`
- Text: Dark gray `hsl(220, 13%, 18%)`

### Typography
- Clean, modern sans-serif font
- Hierarchy: h1 (3xl-4xl), body (sm), labels (xs)
- Font weights: Regular (400), Medium (500), Semibold (600), Bold (700)

### Spacing & Layout
- Sidebar: 320px (80rem) collapsed to 64px (16rem)
- Max content width: 768px (3xl)
- Consistent padding: 16px-24px
- Border radius: 12px-16px for cards

### Component Behavior
- Smooth transitions (300ms)
- Hover states on interactive elements
- Active states for navigation items
- Loading states for AI responses

## Functionality

### Chat Flow
1. **New Chat Screen**: Greeting with suggestion cards
2. **Send Message**: User types and sends (Enter or click send button)
3. **Active Chat**: Messages appear in conversation view
4. **AI Response**: Simulated response after 1 second delay

### State Management
The app uses React Context to manage:
- Messages array (user and assistant messages)
- Chat history (recent conversations)
- Sidebar collapsed state
- Active chat status
- Selected AI model

### File Attachments
- Click paperclip icon to add files
- Files display in message with name and size
- Can remove individual attachments before sending

## Responsive Behavior

- **Desktop (1024px+)**: Full sidebar visible
- **Tablet (768px-1024px)**: Sidebar collapsible via menu button
- **Layout**: Flexbox-based responsive grid
- **Typography**: Scales down on smaller screens

## Trade-offs & Decisions

1. **No Backend**: As specified, all chat functionality is client-side with simulated responses
2. **shadcn/ui vs MUI**: shadcn/ui and Tailwind were chosen for their flexibility and modern design capabilities. The components were customized to match the design requirements perfectly
3. **Context vs Zustand**: Used React Context for simplicity - Zustand would be better for larger apps
4. **File Upload**: Simulated file attachments (no actual upload) since no backend is required
5. **Animations**: Kept subtle to maintain performance while adding polish

## Code Quality

-  TypeScript for type safety
-  Functional components with hooks
-  Reusable, logical component structure
-  Clean, readable code with comments
-  Proper prop types and interfaces
-  Consistent naming conventions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Real backend integration with API
- Message persistence (localStorage/database)
- Multiple chat sessions
- Message editing and deletion
- Code syntax highlighting
- Image generation
- Voice input
- Dark mode toggle
- Keyboard shortcuts
- Message search

## License

This project is created as a frontend assignment and is for demonstration purposes.

## Support

For questions or issues, please refer to the project documentation or contact developer.
