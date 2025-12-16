"use client";

import Image from "next/image";
import { Share, Lock } from "lucide-react";

const FloatingBadge = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="group relative flex h-10 items-center gap-0 overflow-hidden rounded-xl border border-white/5 bg-[#171717] p-1 px-2 shadow-[0_10px_40px_rgba(0,0,0,0.15),0_2px_8px_rgba(0,0,0,0.1)] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255,255,255,0.07),rgba(255,255,255,0))]"></div>
        <a href="/" className="flex items-center gap-1 transition-opacity hover:opacity-80">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/8aebdc26-3d06-42e3-bb7c-f1c035c7f99b-aura-build/assets/svgs/logo-aura-gray-1.svg"
            alt="Aura Logo"
            width={20}
            height={20}
            className="h-5 w-5 mix-blend-screen"
          />
          <span className="mr-2 text-[11px] font-medium text-[#d4d4d4]">
            Made in Aura
          </span>
        </a>
        <div className="pointer-events-none ml-0 flex max-w-0 -translate-x-1 transform-gpu items-center gap-3 overflow-hidden opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:ml-3 group-hover:max-w-[1000px] group-hover:translate-x-0 group-hover:pointer-events-auto group-hover:opacity-100">
          <div className="h-4 w-px transform-gpu scale-y-50 bg-white/10 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-hover:opacity-100"></div>

          <button className="hidden h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-white/10 sm:flex">
            <span className="relative flex h-4 w-4 shrink-0 overflow-hidden rounded-full bg-neutral-700">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/8aebdc26-3d06-42e3-bb7c-f1c035c7f99b-aura-build/assets/images/images_1.png"
                alt="User Avatar"
                width={16}
                height={16}
                className="aspect-square h-full w-full object-cover"
              />
            </span>
          </button>
          
          <button className="hidden h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-white/10 sm:flex">
            <Share className="h-4 w-4 text-neutral-400" />
          </button>
          
          <div className="flex h-6 cursor-not-allowed items-center rounded-md px-2 text-[11px] text-neutral-400 opacity-50">
            <Lock className="mr-1 h-3 w-3" />
            Remix
          </div>
          
          <div className="h-4 w-px bg-white/10"></div>
          
          <div className="flex items-center">
            <button className="flex h-6 items-center rounded-md bg-white/20 px-2 text-[11px] text-neutral-400 transition-colors">
              Preview
            </button>
            <div className="flex h-6 cursor-not-allowed items-center rounded-md px-2 text-[11px] text-neutral-400 opacity-50">
              <Lock className="mr-1 h-3.5 w-3.5" />
              Code
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FloatingBadge;