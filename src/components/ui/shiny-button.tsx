'use client';

interface ShinyButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const ShinyButton = ({ children, href, onClick, className = '' }: ShinyButtonProps) => {
  const buttonContent = (
    <button className={`shiny-cta focus:outline-none ${className}`} onClick={onClick}>
      <span>{children}</span>
    </button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block bg-transparent">
        {buttonContent}
      </a>
    );
  }

  return <div className="inline-block bg-transparent">{buttonContent}</div>;
};