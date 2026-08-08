import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 ease-spring',
  {
    variants: {
      variant: {
        default: 'border-line bg-ink-50 text-ink-600',
        accent: 'border-coral/30 bg-coral/10 text-coral-700',
        cyan: 'border-amber/25 bg-amber/10 text-amber-600',
        outline: 'border-line-strong bg-transparent text-ink-500',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
