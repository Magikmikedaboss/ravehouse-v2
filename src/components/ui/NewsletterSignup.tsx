// src/components/ui/NewsletterSignup.tsx
// Phase 1: Reusable email capture component

'use client';

import { useState } from 'react';
import { Button } from './Button';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // TODO: Implement newsletter signup API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Join The Circuit</h3>
      <p className="text-sm text-white/70">
        Get exclusive content, early access, and underground updates.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
          required
        />
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Joining...' : 'Join'}
        </Button>
      </form>

      {status === 'success' && (
        <p className="text-green-400 text-sm">Welcome to The Circuit! 🎉</p>
      )}
    </div>
  );
}