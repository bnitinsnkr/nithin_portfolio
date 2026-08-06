import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number into an inclusive range. */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/** Map a value from one range onto another. */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

/**
 * Format a metric for display. Keeps one decimal place only when the source
 * value actually has one (99.9% stays 99.9%, 91% never becomes 91.0%).
 */
export const formatMetric = (value: number, prefix = '', suffix = '') => {
  const body = Number.isInteger(value) ? value.toString() : value.toFixed(1);
  return `${prefix}${body}${suffix}`;
};
