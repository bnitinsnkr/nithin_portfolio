import { z } from 'zod';

/**
 * Shared between the client form and the API route so validation cannot drift
 * between the two — the server re-validates rather than trusting the client.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(80, 'That name is a little long.'),
  email: z.string().trim().email('Please enter a valid email address.').max(160),
  subject: z
    .string()
    .trim()
    .min(3, 'A short subject helps.')
    .max(140, 'Please keep the subject under 140 characters.'),
  message: z
    .string()
    .trim()
    .min(20, 'A couple of sentences, please — at least 20 characters.')
    .max(4000, 'Please keep the message under 4000 characters.'),
  /** Honeypot. Any value means a bot filled a field humans never see. */
  company: z.string().max(0, 'Rejected.').optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
