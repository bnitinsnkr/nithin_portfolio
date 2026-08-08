import * as React from 'react';

import { cn } from '@/lib/utils';

const fieldStyles = [
  'w-full rounded-xl border border-line bg-ink-50 px-4 py-3',
  'text-sm text-ink-900 placeholder:text-ink-400',
  'shadow-soft backdrop-blur-sm',
  'transition-[border-color,box-shadow,background-color] duration-300 ease-spring',
  'hover:border-line-strong',
  'focus:border-coral/50 focus:bg-ink-50 focus:outline-none focus:ring-2 focus:ring-coral/25',
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
        'font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500',
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = 'Label';

export { Input, Label, Textarea };
