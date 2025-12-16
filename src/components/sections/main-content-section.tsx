import React from 'react';

interface MainContentSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const MainContentSection = ({ children, className, ...props }: MainContentSectionProps) => {
  const classes = [
    'relative z-20', // Stacking context for layering above backgrounds
    'mx-auto flex w-full max-w-[1200px] flex-col items-center', // Layout, sizing, and alignment
    'px-4 md:px-6 lg:px-8', // Responsive horizontal padding
    'py-16 md:py-24', // Vertical padding for the section
    'space-y-8 md:space-y-12 lg:space-y-16', // Responsive vertical spacing between child elements
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <main className={classes} {...props}>
      {children}
    </main>
  );
};

export default MainContentSection;