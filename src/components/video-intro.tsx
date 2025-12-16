'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

export const VideoIntro = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startVideo = async () => {
      try {
        video.volume = 1.0;
        video.muted = true;
        
        await video.play();
        setIsLoading(false);
        
        // Unmute instantanément après le démarrage
        setTimeout(() => {
          video.muted = false;
          setIsMuted(false);
        }, 10);
      } catch (error) {
        console.log('Autoplay attempt:', error);
        try {
          video.muted = true;
          await video.play();
          setIsLoading(false);
        } catch (e) {
          console.error('Playback failed:', e);
          setIsLoading(false);
        }
      }
    };

    video.addEventListener('canplay', startVideo, { once: true });

    const enableAudio = () => {
      if (video.muted) {
        video.muted = false;
        video.volume = 1.0;
        setIsMuted(false);
      }
    };

    document.addEventListener('click', enableAudio, { once: true });
    document.addEventListener('touchstart', enableAudio, { once: true });

    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
      video.removeEventListener('canplay', startVideo);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      videoRef.current.volume = newMutedState ? 0 : 1.0;
      setIsMuted(newMutedState);
      
      if (videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  };

  if (!isVisible) return null;

  // Always show minimized video in top right
  return (
    <div className="fixed top-24 right-8 z-[100] w-80 h-48 rounded-xl overflow-hidden shadow-2xl border-2 border-cyan-500/30 animate-in slide-in-from-right duration-500">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#02040a] z-10">
          <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
        </div>
      )}
      
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      >
        <source
          src="https://qfihegeffntsxrwhvnlm.supabase.co/storage/v1/object/sign/Video_securitrust/pentest_au_resultat.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYzAxOTEwZS02NzNlLTQ3ZmUtYTFjMC01MzlmYmQxOTczNTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJWaWRlb19zZWN1cml0cnVzdC9wZW50ZXN0X2F1X3Jlc3VsdGF0Lm1wNCIsImlhdCI6MTc2NDg0NTYwOSwiZXhwIjoyMDgwMjA1NjA5fQ.fnyqdUFT2bx3pEyY82QSUmcW4JHj85k-3SRb1PMG-oM"
          type="video/mp4"
        />
      </video>
      
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={toggleMute}
          className="p-2 text-white/70 hover:text-white bg-black/50 backdrop-blur-sm rounded-lg transition-all"
          aria-label={isMuted ? "Activer le son" : "Couper le son"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <button
          onClick={handleClose}
          className="p-2 text-white/70 hover:text-white bg-black/50 backdrop-blur-sm rounded-lg transition-all"
          aria-label="Fermer"
        >
          ×
        </button>
      </div>
    </div>
  );
};