import { X } from 'lucide-react';
import Image from 'next/image';

interface ProposalHeaderProps {
  clientName: string;
}

export function ProposalHeader({ clientName }: ProposalHeaderProps) {
  return (
    <div className="w-full bg-[#011C1C] py-12 px-6 relative z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-8 md:gap-16">
        {/* Client Name */}
        <div className="text-white text-4xl md:text-6xl font-light tracking-wider lowercase">
          {clientName || 'Client'}
        </div>

        {/* Separator X */}
        <div className="flex items-center justify-center">
          <X className="w-12 h-12 md:w-20 md:h-20 text-white font-thin stroke-[0.5] opacity-80" />
        </div>

        {/* SecuriTrust Logo */}
        <div className="flex items-center">
          <Image 
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-SecuriTrust-bleu-blanc-1764601146487.png?width=8000&height=8000&resize=contain"
            alt="SecuriTrust Logo"
            width={280}
            height={80}
            className="h-10 md:h-16 w-auto brightness-0 invert"
          />
        </div>
      </div>
    </div>
  );
}
