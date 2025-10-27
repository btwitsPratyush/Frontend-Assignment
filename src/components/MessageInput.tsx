import { useState, KeyboardEvent } from 'react';
import { Paperclip, Smile, Send, X } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const MessageInput = () => {
  const { sendMessage } = useChat();
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<{ id: string; name: string; size: number }[]>([]);

  const handleSend = () => {
    if (input.trim() || attachments.length > 0) {
      sendMessage(input, attachments.length > 0 ? attachments : undefined);
      setInput('');
      setAttachments([]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachment = () => {
    // Simulate file attachment
    const mockFile = {
      id: Date.now().toString(),
      name: 'image.png',
      size: 123456,
      url: 'https://via.placeholder.com/150', // Placeholder image URL
      type: 'image/png',
    };
    setAttachments([...attachments, mockFile]);
  };

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter((f) => f.id !== id));
  };

  return (
    <div className="border-t bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="mb-3 p-3 bg-muted/50 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Paperclip className="w-3.5 h-3.5" />
              <span>Attached Files</span>
              <button
                onClick={() => setAttachments([])}
                className="ml-auto text-primary hover:text-primary/80"
              >
                Clear
              </button>
            </div>
            {attachments.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 px-3 py-2 bg-background rounded border text-sm"
              >
                <Paperclip className="w-4 h-4 text-muted-foreground" />
                <span className="flex-1 truncate">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(0)}KB
                </span>
                <button
                  onClick={() => removeAttachment(file.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="relative flex items-end gap-2">
          <div className="flex-1 relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me a question..."
              className="min-h-[52px] max-h-[200px] resize-none pr-24 py-3"
              rows={1}
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleAttachment}
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Smile className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() && attachments.length === 0}
            size="icon"
            className="h-[52px] w-[52px] rounded-full"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>

        <div className="mt-2 text-xs text-center text-muted-foreground">
          {input.length}/1000
        </div>
      </div>
    </div>
  );
};
