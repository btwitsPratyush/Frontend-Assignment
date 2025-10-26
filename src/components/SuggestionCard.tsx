import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SuggestionCardProps {
  title: string;
  variant?: 'blue' | 'purple' | 'pink';
  onClick: () => void;
}

export const SuggestionCard = ({ title, variant = 'blue', onClick }: SuggestionCardProps) => {
  const gradients = {
    blue: 'from-blue-500/10 to-blue-600/5',
    purple: 'from-purple-500/10 to-purple-600/5',
    pink: 'from-pink-500/10 to-pink-600/5',
  };

  const iconColors = {
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    pink: 'text-pink-600',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative p-6 rounded-2xl border bg-gradient-to-br transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1 hover:border-primary/30',
        'text-left w-full group',
        gradients[variant]
      )}
    >
      <div className="absolute top-4 right-4">
        <Sparkles className={cn('w-5 h-5', iconColors[variant])} />
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed pr-8">
        {title}
      </p>
    </button>
  );
};
