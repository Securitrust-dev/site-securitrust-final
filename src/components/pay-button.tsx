'use client';

import { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PayButtonProps {
  plan: string;
  amount: number;
  email: string;
  name: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function PayButton({
  plan,
  amount,
  email,
  name,
  disabled = false,
  className = '',
  children
}: PayButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = async () => {
    // Validation
    if (!email || !name) {
      toast.error('Email et nom requis pour le paiement');
      return;
    }

    if (!plan || !amount) {
      toast.error('Formule et montant requis');
      return;
    }

    setIsProcessing(true);
    toast.info('Création de la session de paiement...');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          amount,
          email,
          name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la création de la session');
      }

      if (data.url) {
        // Gérer la compatibilité iframe
        const isInIframe = window.self !== window.top;
        if (isInIframe) {
          window.parent.postMessage(
            { type: 'OPEN_EXTERNAL_URL', data: { url: data.url } },
            '*'
          );
        } else {
          window.location.href = data.url;
        }
      } else {
        throw new Error('URL de paiement manquante');
      }
    } catch (error: any) {
      console.error('Erreur paiement:', error);
      toast.error(error.message || 'Erreur lors de la création du paiement');
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={disabled || isProcessing}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isProcessing ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Traitement...
        </>
      ) : (
        <>
          {children || 'Payer maintenant'}
          <Lock className="w-4 h-4" />
        </>
      )}
    </button>
  );
}
