'use client';

import { Shield } from 'lucide-react';

interface InfographicProps {
  title: string;
  cve?: string;
  cvss?: string;
  summary: string;
  impacts: string[];
  action: string;
  source?: string;
}

export default function ArticleInfographic({
  title,
  cve,
  cvss,
  summary,
  impacts,
  action,
  source,
}: InfographicProps) {
  return (
    <div className="my-10 w-full">
      <div
        className="relative mx-auto max-w-[800px] overflow-hidden rounded-2xl border border-orange-500/20"
        style={{
          background: '#0a0a0a',
          boxShadow: '0 0 40px rgba(255, 90, 0, 0.08), inset 0 0 80px rgba(255, 90, 0, 0.03)',
        }}
      >
        {/* Corner geometric accents */}
        <div className="pointer-events-none absolute left-4 top-4 h-6 w-6" aria-hidden="true">
          <div className="absolute bottom-0 left-0 h-full w-[1px] bg-orange-500/40" />
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-orange-500/40" />
        </div>
        <div className="pointer-events-none absolute right-4 top-4 h-6 w-6" aria-hidden="true">
          <div className="absolute bottom-0 right-0 h-full w-[1px] bg-orange-500/40" />
          <div className="absolute bottom-0 right-0 h-[1px] w-full bg-orange-500/40" />
        </div>
        <div className="pointer-events-none absolute bottom-4 left-4 h-6 w-6" aria-hidden="true">
          <div className="absolute right-0 top-0 h-full w-[1px] bg-orange-500/40" />
          <div className="absolute right-0 top-0 h-[1px] w-full bg-orange-500/40" />
        </div>
        <div className="pointer-events-none absolute bottom-4 right-4 h-6 w-6" aria-hidden="true">
          <div className="absolute left-0 top-0 h-full w-[1px] bg-orange-500/40" />
          <div className="absolute left-0 top-0 h-[1px] w-full bg-orange-500/40" />
        </div>

        {/* Fine horizontal rule below header area */}
        <div className="mx-8 h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

        <div className="px-8 pb-8 pt-8">
          {/* ===== 1. HEADER: Tags ===== */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            {cve && (
              <span className="inline-block rounded border border-orange-500/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-400">
                [ {cve} ]
              </span>
            )}
            {cvss && (
              <span className="inline-block rounded border border-red-500/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-400">
                [ SCORE {cvss} - CRITIQUE ]
              </span>
            )}
          </div>

          {/* ===== 1. Main Title ===== */}
          <h2 className="mb-6 text-center text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl md:text-3xl">
            {title}
          </h2>

          {/* Thin separator */}
          <div className="mx-auto mb-6 h-[1px] w-2/3 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

          {/* ===== 2. Executive Summary ===== */}
          <p className="mb-8 text-center text-base leading-relaxed text-gray-100 sm:text-lg">
            {summary}
          </p>

          {/* ===== 3. Impact Analysis ===== */}
          <div className="mb-8">
            <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-widest text-white">
              IMPACTS POUR LES ORGANISATIONS
            </h3>
            <ul className="mx-auto max-w-xl space-y-3">
              {impacts.map((impact, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-gray-100">
                  <span className="mt-0.5 shrink-0 text-orange-400">&#9656;</span>
                  <span>{impact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== 4. Action Line ===== */}
          <div className="mb-4 text-center">
            <span className="inline-block text-base font-bold uppercase tracking-wider text-orange-400 sm:text-lg">
              &#9654; {action}
            </span>
          </div>

          {/* ===== Source + Logo row ===== */}
          <div className="flex items-end justify-between pt-4">
            {source ? (
              <span className="text-xs text-gray-500">Source : {source}</span>
            ) : (
              <span />
            )}
            {/* Orange shield logo (bottom-right) */}
            <div className="flex items-center gap-1.5 opacity-80">
              <Shield className="h-5 w-5 text-orange-500" />
              <span className="text-xs font-semibold text-orange-400">SECURITRUST</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}