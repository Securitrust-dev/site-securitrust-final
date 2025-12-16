"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

interface VideoSource {
  src: string;
  type: string;
}

interface VideoBackgroundProps {
  /** An array of video sources for the video element. */
  videoSources: VideoSource[];
  /** A URL for a poster image to display before the video loads. */
  posterImage: string;
  /**
   * The mode of the video player.
   * 'background': Autoplays, loops, is muted, and has no controls. For silent, decorative backgrounds.
   * 'featured': Shows controls on hover/pause, does not autoplay. For primary video content.
   * @default 'background'
   */
  mode?: "background" | "featured";
  /** Optional additional class names for the container. */
  className?: string;
  /** Optional children to render on top of the video and overlay. */
  children?: React.ReactNode;
}

/**
 * A responsive video background component that displays a video with an optional overlay and controls,
 * adhering to modern best practices for performance and user experience.
 */
export default function VideoBackground({
  videoSources,
  posterImage,
  mode = "background",
  className = "",
  children,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(mode === "background");
  const [volume, setVolume] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Sync React state with the imperative video element's muted property
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Attempt to play the video for 'background' mode on mount
  useEffect(() => {
    if (mode === "background" && videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false); // Autoplay was prevented by the browser
      });
    }
  }, [mode]);

  const handlePlayPause = useCallback(() => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, []);

  const handleMuteToggle = useCallback(() => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    // If unmuting when volume was 0, restore it to a sensible default
    if (!newMutedState && videoRef.current && videoRef.current.volume === 0) {
      videoRef.current.volume = 0.5;
      setVolume(0.5);
    }
  }, [isMuted]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newVolume = parseFloat(e.target.value);
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  }, []);

  const handleFullscreen = useCallback(() => {
    const element = containerRef.current;
    if (!element) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) { // Safari
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) { // IE11
      (element as any).msRequestFullscreen();
    }
  }, []);

  const controlsClassName = `absolute bottom-5 left-5 right-5 z-[4] flex items-center gap-4 text-white transition-opacity duration-300 ease-in-out ${
    isHovered || !isPlaying ? "opacity-100" : "opacity-0"
  }`;
  
  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-black ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm animate-pulse z-0" />
      )}

      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
        poster={posterImage}
        playsInline
        loop={mode === "background"}
        autoPlay={mode === "background"}
        muted={mode === "background"} // Natively mute for background mode to ensure autoplay
        preload="metadata"
        onLoadedData={() => {
          setIsLoading(false);
          if (videoRef.current) {
            setIsPlaying(!videoRef.current.paused);
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onVolumeChange={() => {
          if (videoRef.current) {
            setVolume(videoRef.current.volume);
            setIsMuted(videoRef.current.muted || videoRef.current.volume === 0);
          }
        }}
      >
        {videoSources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent z-[2]" />

      {children && <div className="relative z-[3] h-full w-full">{children}</div>}

      {mode === "featured" && (
        <div className={controlsClassName}>
          <button
            onClick={handlePlayPause}
            className="p-2 rounded-full hover:bg-white/20 focus-visible:bg-white/20 transition-colors outline-none"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause size={20} className="fill-white" /> : <Play size={20} className="fill-white" />}
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleMuteToggle}
              className="p-2 rounded-full hover:bg-white/20 focus-visible:bg-white/20 transition-colors outline-none"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-white/30 rounded-full appearance-none cursor-pointer accent-white"
              aria-label="Volume control"
            />
          </div>

          <div className="ml-auto">
            <button
              onClick={handleFullscreen}
              className="p-2 rounded-full hover:bg-white/20 focus-visible:bg-white/20 transition-colors outline-none"
              aria-label="Toggle fullscreen"
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}