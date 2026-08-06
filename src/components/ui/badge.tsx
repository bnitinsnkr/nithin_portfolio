import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 ease-spring',
  {
    variants: {
      variant: {
        default: 'border-line bg-white/[0.04] text-silver',
        accent: 'border-electric/30 bg-electric/10 text-electric-200',
        cyan: 'border-cyanide/25 bg-cyanide/10 text-cyanide-400',
        outline: 'border-line-strong bg-transparent text-silver-muted',
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
