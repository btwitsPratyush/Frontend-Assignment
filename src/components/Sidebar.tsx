import { Home, FolderOpen, Clock, Compass, Search, Rocket, ChevronDown, ChevronUp } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import logoImage from '@/assets/logo.png';
import userAvatar from '@/assets/user-avatar.jpg';

export const Sidebar = () => {
  const { chatHistory, sidebarCollapsed } = useChat();

  const navItems = [
    { icon: Home, label: 'Home', shortcut: '⌘ H', active: true },
    { icon: FolderOpen, label: 'Library', shortcut: '⌘ T', active: false },
    { icon: Clock, label: 'History', shortcut: '⌘ G', active: false },
    { icon: Compass, label: 'Explore', shortcut: '⌘ L', active: false },
  ];

  if (sidebarCollapsed) {
    return (
      <div className="w-16 border-r bg-[hsl(var(--sidebar-bg))] flex flex-col items-center py-4 gap-4">
        <img src={logoImage} alt="Inteliq" className="w-9 h-9 rounded-lg" />
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
              item.active ? 'text-primary' : 'text-[hsl(var(--icon-gray))] hover:bg-[hsl(var(--sidebar-hover))]'
            )}
          >
            <item.icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="w-80 border-r bg-[hsl(var(--sidebar-bg))] flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 flex items-center gap-3">
        <img src={logoImage} alt="Inteliq" className="h-9 w-auto" />
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search for chats..."
            className="pl-9 bg-background border-border"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="px-2 pb-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm',
              item.active
                ? 'bg-background text-primary font-medium'
                : 'text-[hsl(var(--icon-gray))] hover:bg-[hsl(var(--sidebar-hover))]'
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="flex-1 text-left">{item.label}</span>
            <span className="text-xs text-muted-foreground">{item.shortcut}</span>
          </button>
        ))}
      </div>

      {/* Recent Chats */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-4 pb-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Recent Chats
          </h3>
        </div>
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-0.5 pb-4">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-[hsl(var(--sidebar-hover))] transition-colors text-sm text-foreground/80 truncate"
              >
                {chat.title}
              </button>
            ))}
            <button className="w-full text-left px-3 py-2 text-sm text-primary font-medium">
              View All →
            </button>
          </div>
        </ScrollArea>
      </div>

      {/* Try Pro */}
      <div className="px-4 py-2">
        <div className="bg-gradient-to-br from-[#F8F9FC] to-[#F0F4FF] rounded-lg p-3 mb-3 flex items-center justify-between border border-[#EBEBEB]">
          <div>
            <h3 className="text-base font-bold leading-tight">Try Pro!</h3>
            <p className="text-sm text-muted-foreground">Upgrade for smarter AI and more...</p>
          </div>
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Rocket className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* User Profile */}
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[hsl(var(--sidebar-hover))] transition-colors">
          <img 
            src={userAvatar} 
            alt="Lawrence Cruz" 
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="flex-1 text-left text-sm font-medium">Lawrence Cruz</span>
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-col">
            <ChevronUp className="w-4 h-4" />
            <ChevronDown className="w-4 h-4 -mt-1" />
          </div>
        </button>
      </div>
    </div>
  );
};
