"use client";

import React, { useState } from 'react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to subscribe');
    }
  };

  return (
    <section className="bg-[#FFD700] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-black">
            Užsiprenumeruokite ELNIS naujienlaiškį
          </h2>
          <div className="relative max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Įveskite savo el.pašto adresą"
                  className="w-full px-6 py-4 rounded-full text-gray-800 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  disabled={status === 'loading' || status === 'success'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="absolute right-0 px-6 py-2 bg-[#FF4500] hover:bg-[#FF5722] text-white rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-200 flex items-center gap-2 border-2 border-black transform translate-x-[20%] shadow-[4px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    'Siunčiama...'
                  ) : status === 'success' ? (
                    'Prenumeruota ✓'
                  ) : (
                    <>
                      Prenumeruoti
                      <span className="text-xl leading-none">→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
            {status === 'error' && (
              <p className="mt-4 text-red-600 text-sm">{errorMessage}</p>
            )}
            {status === 'success' && (
              <p className="mt-4 text-green-700 text-sm">
                Ačiū! Patikrinkite savo el. paštą prenumeracijai patvirtinti.
              </p>
            )}
          </div>
          <p className="mt-6 text-sm text-gray-800 max-w-2xl mx-auto">
            Užsiprenumeruokite elnis.lt naujienlaiškį ir gaukite informaciją apie 
            naujausius straipsnius, naujas darbo pozicijas ir kt. aktualią 
            informaciją.
          </p>
        </div>
      </div>
    </section>
  );
}; 