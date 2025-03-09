
import React, { useState } from 'react';
import { cn } from '../../lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
  withRipple?: boolean;
}

const AnimatedButton = ({
  className,
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  withRipple = true,
  ...props
}: AnimatedButtonProps) => {
  const [ripples, setRipples] = useState<{ left: number; top: number; id: number }[]>([]);
  let rippleCount = 0;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!withRipple) return;
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;
    
    rippleCount++;
    const newRipple = { left, top, id: rippleCount };
    
    setRipples([...ripples, newRipple]);
    
    setTimeout(() => {
      setRipples(ripples => ripples.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-primary/20 bg-transparent text-foreground hover:bg-secondary',
    ghost: 'bg-transparent text-foreground hover:bg-secondary'
  };

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-5 text-base',
    lg: 'h-12 px-8 text-lg'
  };

  return (
    <button
      className={cn(
        'relative overflow-hidden rounded-md font-medium transition-all duration-300 ease-in-out',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        'shadow-xs hover:shadow-md',
        'transform hover:-translate-y-0.5',
        'active:translate-y-0',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      {withRipple && ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="animate-ripple absolute rounded-full bg-white/30"
          style={{
            left: ripple.left,
            top: ripple.top,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </button>
  );
};

export default AnimatedButton;
