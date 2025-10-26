import { useChat } from '@/contexts/ChatContext';
import { SuggestionCard } from './SuggestionCard';
import { ChatMessage } from './ChatMessage';
import { MessageInput } from './MessageInput';
import { Share2, HelpCircle, ChevronDown, Menu, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export const ChatArea = () => {
  const { messages, activeChat, selectedModel, toggleSidebar, newChat, sendMessage } = useChat();

  const suggestions = [
    { title: 'Give me a concise summary of this meeting transcript', variant: 'blue' as const },
    { title: 'Write a product description for a minimalist smartwatch', variant: 'purple' as const },
    { title: 'Provide a polite response to a customer asking for a refund', variant: 'pink' as const },
  ];

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="border-b bg-background px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors">
            <span className="text-sm font-medium">{selectedModel}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Share2 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="w-11 h-11 rounded-lg p-3">
            <HelpCircle className="w-5 h-5" />
          </Button>
          <Button onClick={newChat} className="gap-2">
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1">
          {!activeChat ? (
            // New Chat View
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
              <div className="text-center mb-12">
                <div className="mb-4 text-4xl">👋</div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">Hi Laurence!</h1>
                <p className="text-xl sm:text-2xl text-foreground/70">
                  What do you want to learn today?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suggestions.map((suggestion, index) => (
                  <SuggestionCard
                    key={index}
                    title={suggestion.title}
                    variant={suggestion.variant}
                    onClick={() => sendMessage(suggestion.title)}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Active Chat View
            <div className="divide-y">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Input */}
        <MessageInput />
      </div>
    </div>
  );
};
