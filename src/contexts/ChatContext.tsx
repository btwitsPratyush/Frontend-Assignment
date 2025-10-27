import React, { createContext, useContext, useState } from 'react';

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
  isTyping: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const PREDEFINED_RESPONSES = [
  "That's an interesting question! Based on what you've asked, here's what I can tell you...",
  "I'd be happy to help you with that. Let me break this down for you...",
  "Great question! Here's my perspective on this topic...",
  "I understand what you're looking for. Let me provide you with a detailed response...",
  "Thanks for asking! Here's a comprehensive answer to your query...",
  "Ah, another query for my boundless wisdom. Lay it on me.", // Sarcastic
  "Just when I thought I could take a coffee break... What's up?", // Funny
  "My circuits are buzzing with anticipation for your next brilliant question.", // Sarcastic
  "Processing... just kidding, I'm always ready. What do you need?", // Funny
];

const GREETING_RESPONSES = [
  "Hello there! I'm Inteliq Chat Assistant developed by Pratyush. How can I assist you today?",
  "Hi! Ready to dive into some knowledge? What's on your mind?",
  "Greetings, human! How may I illuminate your digital day?",
  "Hey! I'm here to help. Or, you know, just chat. Whatever.", // Funny
  "Well, hello. Didn't see you there. Just kidding, I see everything. What's up?", // Sarcastic
  "Another day, another delightful interaction. How can I be of service?", // Sarcastic
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

export const ChatProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory] = useState<ChatHistory[]>(SAMPLE_CHAT_HISTORY);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeChat, setActiveChat] = useState(false);
  const [selectedModel, setSelectedModel] = useState("ChatGPT 4"); // Initialize with a default model
  const [isTyping, setIsTyping] = useState(false);

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
    setIsTyping(true); // Set isTyping to true when message is sent

    // Simulate AI response after a short delay
    setTimeout(() => {
      // Simulate typing indicator here if desired
      const isGreeting = content.toLowerCase().includes('hi') || content.toLowerCase().includes('hello');
      const responseArray = isGreeting ? GREETING_RESPONSES : PREDEFINED_RESPONSES;
      const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false); // Set isTyping to false after AI responds
    }, 2500); // 2.5 second delay for lazy loading
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const newChat = () => {
    setMessages([]);
    setActiveChat(false);
  };

  const contextValue: ChatContextType = {
    messages,
    chatHistory,
    sidebarCollapsed,
    activeChat,
    selectedModel,
    sendMessage,
    toggleSidebar,
    setSelectedModel,
    newChat,
    isTyping,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
