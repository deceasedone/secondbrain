
import React from 'react';
import { cn } from '../../lib/utils';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
  className?: string;
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  avatarUrl,
  className,
  delay = 0
}) => {
  return (
    <div 
      className={cn(
        'flex flex-col gap-4 p-6 rounded-xl bg-white border border-border shadow-xs',
        'opacity-0 animate-on-scroll animate-fade-up hover-scale',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <Quote className="w-8 h-8 text-accent/30" />
      <p className="text-foreground italic">{quote}</p>
      <div className="flex items-center gap-3 mt-2">
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={author} 
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent font-medium">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
