"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Hook pour détecter quand l'utilisateur scrolle vers le bas
 * Utilise l'Intersection Observer API
 */
export function useInfiniteScroll(
  onLoadMore: () => void,
  isLoading: boolean = false
) {
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerTarget.current) return;
    if (isLoading) return; // Évite les appels multiples en parallèle

    const observer = new IntersectionObserver(
      (entries) => {
        // Si l'élément devient visible et qu'on ne charge pas déjà
        if (entries[0].isIntersecting && !isLoading) {
          onLoadMore();
        }
      },
      {
        threshold: 0.1, // Déclenche quand 10% de l'élément est visible
        rootMargin: "100px", // Charge 100px avant d'atteindre le bottom
      }
    );

    observer.observe(observerTarget.current);

    return () => {
      observer.disconnect();
    };
  }, [onLoadMore, isLoading]);

  return observerTarget;
}
