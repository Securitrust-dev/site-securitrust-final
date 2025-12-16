'use client';

export const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 1 }}>
      <div className="aurora-container">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
        <div className="aurora aurora-4"></div>
      </div>
      <style jsx>{`
        .aurora-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          filter: blur(60px);
        }
        .aurora {
          position: absolute;
          width: 100%;
          height: 60%;
          opacity: 0.4;
          mix-blend-mode: screen;
        }
        .aurora-1 {
          background: linear-gradient(180deg, transparent, #00d4ff, transparent);
          top: 20%;
          animation: aurora-move-1 8s ease-in-out infinite;
        }
        .aurora-2 {
          background: linear-gradient(180deg, transparent, #7b2ff7, transparent);
          top: 30%;
          animation: aurora-move-2 10s ease-in-out infinite;
        }
        .aurora-3 {
          background: linear-gradient(180deg, transparent, #00ff88, transparent);
          top: 25%;
          animation: aurora-move-3 12s ease-in-out infinite;
        }
        .aurora-4 {
          background: linear-gradient(180deg, transparent, #ff6b9d, transparent);
          top: 35%;
          animation: aurora-move-4 9s ease-in-out infinite;
        }
        @keyframes aurora-move-1 {
          0%, 100% { transform: translateX(-20%) translateY(0) rotate(-5deg) scaleY(1); }
          50% { transform: translateX(20%) translateY(-10%) rotate(5deg) scaleY(1.2); }
        }
        @keyframes aurora-move-2 {
          0%, 100% { transform: translateX(20%) translateY(0) rotate(3deg) scaleY(1); }
          50% { transform: translateX(-20%) translateY(10%) rotate(-3deg) scaleY(0.8); }
        }
        @keyframes aurora-move-3 {
          0%, 100% { transform: translateX(-10%) translateY(5%) rotate(-2deg) scaleY(0.9); }
          50% { transform: translateX(10%) translateY(-5%) rotate(2deg) scaleY(1.1); }
        }
        @keyframes aurora-move-4 {
          0%, 100% { transform: translateX(15%) translateY(-5%) rotate(4deg) scaleY(1); }
          50% { transform: translateX(-15%) translateY(5%) rotate(-4deg) scaleY(1.3); }
        }
      `}</style>
    </div>
  );
};