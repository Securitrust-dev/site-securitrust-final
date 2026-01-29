import { X } from 'lucide-react';
import Image from 'next/image';

interface ProposalHeaderProps {
  clientName: string;
}

export function ProposalHeader({ clientName }: ProposalHeaderProps) {
  return (
    <div className="w-full bg-[#02040a] py-12 px-6 relative z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-8 md:gap-16">
        {/* Client Name */}
        <div className="text-white text-3xl md:text-5xl font-light tracking-wider lowercase">
          {clientName || 'Client'}
        </div>

        {/* Separator X */}
        <div className="flex items-center justify-center">
          <X className="w-8 h-8 md:w-12 md:h-12 text-white font-thin stroke-[0.5] opacity-60" />
        </div>

        {/* SecuriTrust Logo */}
        <div className="flex items-center">
          <Image 
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-SecuriTrust-bleu-blanc-1764601146487.png?width=8000&height=8000&resize=contain"
            alt="SecuriTrust Logo"
            width={240}
            height={70}
            className="h-8 md:h-14 w-auto brightness-0 invert"
          />
        </div>
      </div>
    </div>
  );
}
