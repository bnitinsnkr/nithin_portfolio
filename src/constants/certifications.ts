import type { Certification } from '@/types';

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'aws-devops-pro',
    name: 'AWS Certified DevOps Engineer',
    issuer: 'Amazon Web Services',
    vendor: 'aws',
    level: 'Professional',
  },
  {
    id: 'aws-developer',
    name: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    vendor: 'aws',
    level: 'Associate',
  },
  {
    id: 'azure-admin',
    name: 'Microsoft Certified: Azure Administrator',
    issuer: 'Microsoft',
    vendor: 'azure',
    level: 'Associate',
  },
  {
    id: 'oci-ai',
    name: 'Oracle Cloud Infrastructure AI Foundations',
    issuer: 'Oracle',
    vendor: 'oracle',
    level: 'Associate',
  },
  {
    id: 'google-genai',
    name: '5-Day Generative AI Intensive',
    issuer: 'Google',
    vendor: 'google',
    level: 'Program',
  },
];

export const VENDOR_META: Record<
  Certification['vendor'],
  { label: string; from: string; to: string }
> = {
  aws: { label: 'AWS', from: 'rgba(255,153,0,0.22)', to: 'rgba(255,153,0,0)' },
  azure: { label: 'Azure', from: 'rgba(255,90,54,0.26)', to: 'rgba(255,90,54,0)' },
  oracle: { label: 'Oracle', from: 'rgba(248,90,90,0.20)', to: 'rgba(248,90,90,0)' },
  google: { label: 'Google', from: 'rgba(255,158,44,0.24)', to: 'rgba(255,158,44,0)' },
};
