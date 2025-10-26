import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: { id: string; name: string; size: number }[];
}

export interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  chatHistory: ChatHistory[];
  sidebarCollapsed: boolean;
  activeChat: boolean;
  selectedModel: string;
  sendMessage: (content: string, attachments?: { id: string; name: string; size: number }[]) => void;
  toggleSidebar: () => void;
  setSelectedModel: (model: string) => void;
  newChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const PREDEFINED_RESPONSES = [
  "That's an interesting question! Based on what you've asked, here's what I can tell you...",
  "I'd be happy to help you with that. Let me break this down for you...",
  "Great question! Here's my perspective on this topic...",
  "I understand what you're looking for. Let me provide you with a detailed response...",
  "Thanks for asking! Here's a comprehensive answer to your query..."
];

const SAMPLE_CHAT_HISTORY: ChatHistory[] = [
  {
    id: '1',
    title: 'Write a Shakespearean sonnet about a cat that...',
    lastMessage: 'Write a Shakespearean sonnet about a cat that loves to nap',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '2',
    title: 'If cereal commercials were directed by Christo...',
    lastMessage: 'If cereal commercials were directed by Christopher Nolan',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: '3',
    title: 'Renewable Energy Trends',
    lastMessage: 'What are the latest trends in renewable energy?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '4',
    title: 'Describe a medieval jousting tournament wher...',
    lastMessage: 'Describe a medieval jousting tournament where knights ride llamas',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: '5',
    title: 'What would a job interview be like if aliens wer...',
    lastMessage: 'What would a job interview be like if aliens were the interviewers?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
  },
  {
    id: '6',
    title: 'Generate a rap battle between a sentient toaste...',
    lastMessage: 'Generate a rap battle between a sentient toaster and an AI-powered microwave',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    id: '7',
    title: 'What if oxygen was actually a hallucinogen, and...',
    lastMessage: 'What if oxygen was actually a hallucinogen and reality is different?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: '8',
    title: 'Pitch a reality TV show where ghosts haunt infl...',
    lastMessage: 'Pitch a reality TV show where ghosts haunt influencers',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory] = useState<ChatHistory[]>(SAMPLE_CHAT_HISTORY);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeChat, setActiveChat] = useState(false);
  const [selectedModel, setSelectedModel] = useState('ChatGPT 4');

  const sendMessage = (content: string, attachments?: { id: string; name: string; size: number }[]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      attachments,
    };

    setMessages((prev) => [...prev, userMessage]);
    setActiveChat(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const randomResponse = PREDEFINED_RESPONSES[Math.floor(Math.random() * PREDEFINED_RESPONSES.length)];
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const newChat = () => {
    setMessages([]);
    setActiveChat(false);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        chatHistory,
        sidebarCollapsed,
        activeChat,
        selectedModel,
        sendMessage,
        toggleSidebar,
        setSelectedModel,
        newChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
