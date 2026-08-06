'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowDownToLine, Loader2, MapPin, Send } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { toast } from 'sonner';

import { Magnetic } from '@/components/shared/magnetic';
import { Reveal } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { Button } from '@/components/ui/button';
import { Input, Label, Textarea } from '@/components/ui/input';
import { SITE } from '@/constants/site';
import { contactSchema, type ContactInput } from '@/lib/contact-schema';
import { fadeUp, slideInRight } from '@/lib/motion';

const CHANNELS = [
  {
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: HiOutlineEnvelope,
  },
  {
    label: 'LinkedIn',
    value: 'in/bnitinsnkr',
    href: SITE.socials.linkedin,
    icon: FaLinkedinIn,
  },
  {
    label: 'GitHub',
    value: 'bnithinsnkr',
    href: SITE.socials.github,
    icon: FaGithub,
  },
];

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '', company: '' },
  });

  const onSubmit = async (values: ContactInput) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? 'Something went wrong. Please try again.');
      }

      toast.success('Message sent', {
        description: 'Thanks for reaching out — I’ll get back to you shortly.',
      });
      reset();
    } catch (error) {
      toast.error('Could not send message', {
        description:
          error instanceof Error ? error.message : `Please email ${SITE.email} directly.`,
      });
    }
  };

  return (
    <section id="contact" aria-label="Contact" className="relative py-section">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora absolute inset-0 opacity-80" />
      </div>

      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s talk about what you’re building."
          description="Open to Generative AI, Applied AI and senior full-stack roles. The fastest route is the form — everything lands in the same inbox."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-12">
          {/* Form */}
          <Reveal variants={fadeUp}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="glass-floating edge-light relative rounded-3xl p-7 sm:p-9"
            >
              {/* Honeypot — real people never see it, bots fill it in. */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="company">Company</label>
                <input id="company" tabIndex={-1} autoComplete="off" {...register('company')} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" htmlFor="name" error={errors.name?.message}>
                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    {...register('name')}
                  />
                </Field>

                <Field label="Email" htmlFor="email" error={errors.email?.message}>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email)}
                    {...register('email')}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Subject" htmlFor="subject" error={errors.subject?.message}>
                  <Input
                    id="subject"
                    placeholder="Role, project or question"
                    aria-invalid={Boolean(errors.subject)}
                    {...register('subject')}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Message" htmlFor="message" error={errors.message?.message}>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="A couple of sentences on what you have in mind."
                    aria-invalid={Boolean(errors.message)}
                    {...register('message')}
                  />
                </Field>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 aria-hidden className="animate-spin" />
                    ) : (
                      <Send aria-hidden />
                    )}
                    {isSubmitting ? 'Sending…' : 'Send message'}
                  </Button>
                </Magnetic>

                <p className="text-[12px] text-silver-dim">
                  Or email{' '}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-electric-300 underline-offset-4 transition-colors duration-300 ease-spring hover:text-electric-200 hover:underline"
                  >
                    {SITE.email}
                  </a>
                </p>
              </div>
            </form>
          </Reveal>

          {/* Details */}
          <Reveal variants={slideInRight}>
            <div className="flex h-full flex-col gap-5">
              <div className="glass-raised edge-light rounded-3xl p-6">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-silver-dim">
                  Direct channels
                </h3>
                <ul className="mt-5 space-y-4">
                  {CHANNELS.map(({ label, value, href, icon: Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="group flex items-center gap-3.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.04] text-electric-300 transition-[border-color,transform] duration-300 ease-spring group-hover:-translate-y-0.5 group-hover:border-electric/40">
                          <Icon aria-hidden className="size-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-silver-dim">
                            {label}
                          </span>
                          <span className="block truncate text-sm text-silver-bright">{value}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-raised edge-light rounded-3xl p-6">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-silver-dim">
                  Availability
                </h3>
                <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-silver">
                  <span className="relative mt-[0.45em] flex size-1.5 shrink-0">
                    <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-electric" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-electric" />
                  </span>
                  {SITE.availability}
                </p>
                <p className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-silver-dim">
                  <MapPin aria-hidden className="size-3.5 text-electric-400" />
                  {SITE.location}
                </p>
              </div>

              <div className="glass-raised edge-light flex flex-1 flex-col justify-between gap-5 rounded-3xl p-6">
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-silver-dim">
                    Résumé
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-silver-muted">
                    Full experience, project detail and the complete technology list — one page,
                    PDF.
                  </p>
                </div>
                <Button asChild variant="secondary" className="w-full">
                  <a href={SITE.resumePath} download={SITE.resumeFileName}>
                    <ArrowDownToLine aria-hidden />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? (
        <p role="alert" className="text-[12px] text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
