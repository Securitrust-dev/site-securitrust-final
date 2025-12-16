'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CheckCircle, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ESignatureEmbedProps {
  companyName: string;
  email: string;
  siret?: string;
}

export function ESignatureEmbed({ companyName, email, siret }: ESignatureEmbedProps) {
  const router = useRouter();
  const [signUrl, setSignUrl] = useState<string | null>(null);
  const [contractId, setContractId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSigned, setIsSigned] = useState(false);

  useEffect(() => {
    const createContract = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/esignatures/sign-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyName,
            email,
            siret,
          }),
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("L'API n'a pas répondu correctement (Erreur 404 ou 500)");
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erreur lors de la création du contrat');
        }

        if (data.success && data.url) {
          setSignUrl(data.url);
          setContractId(data.contractId);
        } else {
          throw new Error('URL de signature non disponible');
        }
      } catch (err: any) {
        console.error('Erreur création contrat:', err);
        setError(err.message || 'Erreur lors de la création du contrat');
      } finally {
        setLoading(false);
      }
    };

    if (companyName && email) {
      createContract();
    }
  }, [companyName, email, siret]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'signed' || event.data?.status === 'signed' || event.data?.type === 'contract_signed' || event.data?.event === 'signed') {
        setIsSigned(true);
        sessionStorage.setItem('propositionSigned', 'true');
        toast.success('Contrat signé avec succès !');
        setTimeout(() => router.push('/proposition'), 2000);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [router]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-zinc-900/50 border border-white/10 p-12 text-center">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mx-auto mb-4" />
        <p className="text-zinc-400">Préparation de votre contrat sécurisé...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-900/10 border border-red-500/20 p-8 text-center">
        <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
        <p className="text-red-300 mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="text-sm underline text-red-400">Réessayer</button>
      </div>
    );
  }

  if (isSigned) {
    return (
      <div className="rounded-2xl bg-green-900/10 border border-green-500/20 p-12 text-center">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white">Félicitations !</h3>
        <p className="text-green-300 mt-2">Signature validée. Redirection en cours...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-zinc-900/50 border border-white/10 overflow-hidden flex flex-col h-[800px]">
      <div className="bg-zinc-900 p-4 border-b border-white/10 flex justify-between items-center">
        <div>
          <h3 className="text-white font-medium">Contrat à signer</h3>
          <p className="text-xs text-zinc-500">ID: {contractId?.slice(0, 8)}...</p>
        </div>
        
        {signUrl && (
          <a 
            href={signUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded transition"
          >
            <ExternalLink size={14} />
            Ouvrir en plein écran
          </a>
        )}
      </div>
      
      {signUrl && (
        <div className="flex-1 bg-white w-full h-full relative">
          <div className="absolute inset-0 flex items-center justify-center z-0 text-black/50">
            Chargement du document...
          </div>
          <iframe
            src={signUrl}
            className="absolute inset-0 w-full h-full z-10"
            frameBorder="0"
            allow="camera; microphone"
          />
        </div>
      )}
    </div>
  );
}
