import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500 mb-6">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2 text-slate-600">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-cyan-400 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-300 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
