import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Hook para animar elementos conforme entram na viewport.
 * Evita conflito de refs externas e é totalmente independente.
 * 
 * @param {number} threshold - Percentual de visibilidade necessário (0–1)
 * @param {boolean} triggerOnce - Se `true`, a animação ocorre apenas na primeira vez
 */
const useViewAnimation = (threshold = 0.2, triggerOnce = true) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const setRef = useCallback((node: HTMLElement | null) => {
    // Remove observador anterior
    if (observerRef.current && elementRef.current) {
      observerRef.current.unobserve(elementRef.current);
    }

    // Se o novo nó for válido, começa a observar
    if (node) {
      elementRef.current = node;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) observer.unobserve(entry.target);
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        },
        { threshold }
      );

      observer.observe(node);
      observerRef.current = observer;
    }
  }, [threshold, triggerOnce]);

  useEffect(() => {
    return () => {
      if (observerRef.current && elementRef.current) {
        observerRef.current.unobserve(elementRef.current);
      }
    };
  }, []);

  return { ref: setRef, isVisible };
};

export default useViewAnimation;