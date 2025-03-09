import React from 'react';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  className,
  delay = 0
}) => {
  return (
    <div 
      className={cn(
        'hover-scale p-6 rounded-xl bg-white border border-border shadow-xs',
        'opacity-0 animate-on-scroll animate-fade-up',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
