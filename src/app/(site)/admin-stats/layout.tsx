import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Dashboard',
};

export default function AdminStatsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
