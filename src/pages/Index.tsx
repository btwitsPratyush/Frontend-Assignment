import { ChatProvider } from '@/contexts/ChatContext';
import { Sidebar } from '@/components/Sidebar';
import { ChatArea } from '@/components/ChatArea';

const Index = () => {
  return (
    <ChatProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <ChatArea />
      </div>
    </ChatProvider>
  );
};

export default Index;
