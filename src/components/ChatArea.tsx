import { useChat } from '@/contexts/ChatContext';
import { SuggestionCard } from './SuggestionCard';
import { ChatMessage } from './ChatMessage';
import { MessageInput } from './MessageInput';
import { Share2, HelpCircle, ChevronDown, Menu, Plus, Mail, Link2, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from 'react';
import chatGPTLogo from '@/assets/AI-model.png';

// Typing Indicator Component
const TypingIndicator = () => {
  return (
    <div className="px-4 sm:px-6 py-8 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }}></div>
          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '1s' }}></div>
          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '1s' }}></div>
        </div>
      </div>
    </div>
  );
};

export const ChatArea = () => {
  const { messages, activeChat, selectedModel, toggleSidebar, newChat, sendMessage, setSelectedModel, isTyping } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    { title: 'Give me a concise summary of this meeting transcript', variant: 'blue' as const },
    { title: 'Write a product description for a minimalist smartwatch', variant: 'purple' as const },
    { title: 'Provide a polite response to a customer asking for a refund', variant: 'pink' as const },
  ];

  // Auto-scroll to bottom when messages change or typing status changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleShare = (platform: string) => {
    const currentUrl = window.location.href;
    const shareText = 'Check out this chat conversation!';
    
    switch(platform) {
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(currentUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
        break;
      case 'x':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(currentUrl);
        alert('Link copied to clipboard!');
        break;
    }
  };

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
          <img src={chatGPTLogo} alt="ChatGPT Logo" className="max-w-[160px] max-h-[160px] object-contain" />
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => handleShare('email')} className="gap-3 cursor-pointer">
                <Mail className="w-4 h-4" />
                <span>Share via Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('facebook')} className="gap-3 cursor-pointer">
                <Facebook className="w-4 h-4" />
                <span>Share on Facebook</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('x')} className="gap-3 cursor-pointer">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>Share on X</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('linkedin')} className="gap-3 cursor-pointer">
                <Linkedin className="w-4 h-4" />
                <span>Share on LinkedIn</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('whatsapp')} className="gap-3 cursor-pointer">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Share on WhatsApp</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('copy')} className="gap-3 cursor-pointer">
                <Link2 className="w-4 h-4" />
                <span>Copy Link</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
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
            <div>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        {/* Input */}
        <MessageInput />
      </div>
    </div>
  );
};