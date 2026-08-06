import * as React from 'react';

import { cn } from '@/lib/utils';

const fieldStyles = [
  'w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3',
  'text-sm text-silver-bright placeholder:text-silver-dim',
  'shadow-glass backdrop-blur-sm',
  'transition-[border-color,box-shadow,background-color] duration-300 ease-spring',
  'hover:border-line-strong',
  'focus:border-electric/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-electric/25',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'aria-[invalid=true]:border-destructive/60 aria-[invalid=true]:focus:ring-destructive/25',
].join(' ');

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => (
    <input ref={ref} type={type} className={cn(fieldStyles, className)} {...props} />
  ),
);
Input.displayName = 'Input';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(fieldStyles, 'min-h-32 resize-y', className)} {...props} />
));
Textarea.displayName = 'Textarea';

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'font-mono text-[11px] uppercase tracking-[0.18em] text-silver-muted',
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = 'Label';

export { Input, Label, Textarea };
