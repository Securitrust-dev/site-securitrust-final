"use client";

import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";

const CyberScene = lazy(() => import("@/components/accueil-v2/cyber-scene"));

// Ajout à l'intégration (absent de l'export) : sans WebGL, ou si la scène échoue, la 3D n'est
// pas affichée et le reste de la page continue de fonctionner. Dans l'export, l'erreur
// « Error creating WebGL context » vidait toute la page.
function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { /* scène décorative : on la retire sans bloquer la page */ }
  render() { return this.state.failed ? null : this.props.children; }
}

export function CyberVisual() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(hasWebGL()), []);
  return mounted ? <SceneBoundary><Suspense fallback={null}><CyberScene /></Suspense></SceneBoundary> : null;
}
