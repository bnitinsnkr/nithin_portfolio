'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Every variant carries hover, focus-visible, active and disabled states.
 * Transitions are restricted to transform / opacity / colour — never `all`.
 */
const buttonVariants = cva(
  [
    'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full',
    'font-medium tracking-tight',
    'transition-[transform,box-shadow,background-color,border-color,color,opacity]',
    'duration-300 ease-spring',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
    'disabled:pointer-events-none disabled:opacity-45',
    'active:scale-[0.975]',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-coral-600 text-white shadow-glow hover:bg-coral-700 hover:shadow-[0_0_0_1px_rgba(255,90,54,0.4),0_12px_40px_-8px_rgba(255,90,54,0.6)]',
        secondary:
          'border border-line bg-ink-50 text-ink-900 shadow-soft hover:border-line-strong hover:bg-ink-100',
        ghost:
          'text-ink-600 hover:bg-ink-50 hover:text-ink-900',
        outline:
          'border border-coral/35 bg-coral/[0.06] text-coral-700 hover:border-coral/60 hover:bg-coral/[0.12]',
        link: 'h-auto rounded-none p-0 text-coral-600 underline-offset-4 hover:text-coral-700 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-[13px] [&_svg]:size-4',
        md: 'h-11 px-5 text-sm [&_svg]:size-4',
        lg: 'h-[3.25rem] px-7 text-[15px] [&_svg]:size-[18px]',
        icon: 'size-11 [&_svg]:size-[18px]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
