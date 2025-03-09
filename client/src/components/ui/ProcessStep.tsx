
import React from 'react';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  delay?: number;
}

const ProcessStep: React.FC<ProcessStepProps> = ({
  number,
  title,
  description,
  icon: Icon,
  className,
  delay = 0
}) => {
  return (
    <div 
      className={cn(
        'flex gap-6 opacity-0 animate-on-scroll animate-fade-up',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative shrink-0">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold text-lg">
          {number}
        </div>
        {number < 4 && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-border hidden md:block" />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-accent" />
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep;
