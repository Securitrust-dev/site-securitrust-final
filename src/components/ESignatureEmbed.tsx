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
            console.log('📝 URL de signature reçue:', data.url);
            console.log('🆔 Contract ID:', data.contractId);
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

    useEffect(() => {
      if (!contractId || isSigned) return;

      const checkContractStatus = async () => {
        try {
          const response = await fetch(`/api/esignatures/sign-url?contractId=${contractId}`);
          if (!response.ok) return;

          const data = await response.json();
          console.log('📊 Réponse API complète:', data);
          console.log('📊 Statut du contrat:', data.contract?.status);
          
          // Vérifier le statut du contrat dans la réponse de l'API
          const contractStatus = data.contract?.status;
          
          if (data.success && (contractStatus === 'completed' || contractStatus === 'signed')) {
            setIsSigned(true);
            sessionStorage.setItem('propositionSigned', 'true');
            toast.success('Contrat signé avec succès !');
            setTimeout(() => router.push('/proposition'), 2000);
          } else if (contractStatus === 'sent' || contractStatus === 'pending') {
            console.log('⏳ En attente de signature');
          } else {
            console.log('📋 Statut actuel:', contractStatus);
          }
        } catch (error) {
          console.error('Erreur vérification statut:', error);
        }
      };

      const interval = setInterval(checkContractStatus, 5000);
      checkContractStatus();
      return () => clearInterval(interval);
    }, [contractId, isSigned, router]);

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
      <div className="rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-12 text-center space-y-8">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto">
            <ExternalLink className="w-12 h-12 text-cyan-400" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-white">
              Votre contrat est prêt
            </h3>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Cliquez sur le bouton ci-dessous pour ouvrir votre contrat et apposer votre signature électronique sécurisée
            </p>
            {contractId && (
              <p className="text-xs text-zinc-600 font-mono">
                ID: {contractId.slice(0, 8)}...
              </p>
            )}
          </div>

          {signUrl && (
            <div className="flex flex-col items-center gap-4">
              <a 
                href={signUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 text-white text-lg font-bold rounded-xl transition-all transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/50"
              >
                <ExternalLink size={24} />
                Ouvrir et signer mon contrat
              </a>
              <p className="text-xs text-zinc-500">
                Le document s'ouvrira dans un nouvel onglet
              </p>
            </div>
          )}

          <div className="pt-8 border-t border-white/5">
            <p className="text-sm text-zinc-500 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Une fois signé, revenez ici pour continuer vers le paiement
            </p>
          </div>
        </div>
      </div>
    );
}
