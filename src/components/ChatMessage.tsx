import { Message } from '@/contexts/ChatContext';
import { Paperclip } from 'lucide-react';
import userAvatar from '@/assets/user-avatar.jpg'; // Import the user avatar image
import inteliqLogo from '/public/favicon.png'; // Import the favicon as Inteliq logo

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
              <img src={inteliqLogo} alt="Inteliq Logo" className="w-8 h-8 rounded-full" />
            ) : (
              <img src={userAvatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
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
                    {file.type.startsWith('image/') ? (
                      <img src={file.url} alt={file.name} className="max-w-full h-auto rounded-lg" />
                    ) : (
                      <>
                        <Paperclip className="w-4 h-4 text-muted-foreground" />
                        <span className="flex-1 truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(0)}KB
                        </span>
                      </>
                    )}
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
