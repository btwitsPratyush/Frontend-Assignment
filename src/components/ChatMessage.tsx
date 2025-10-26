import { Message } from '@/contexts/ChatContext';
import { Sparkles, Paperclip } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className="py-6 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {message.role === 'assistant' ? (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm font-medium">
                LC
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pt-1">
            <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>

            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {message.attachments.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm"
                  >
                    <Paperclip className="w-4 h-4 text-muted-foreground" />
                    <span className="flex-1 truncate">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(0)}KB
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
