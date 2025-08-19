'use client';

import { useEffect, useRef, HTMLAttributes, ReactNode } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  delay?: number;
} & HTMLAttributes<HTMLDivElement>;

export default function FadeInOnScroll({ children, delay = 0 }: Props) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: 'power2.out',
          overwrite: 'auto',
          force3D: true,
          scrollTrigger: {
            trigger: el.current,
            start: 'top 95%',   // fire earlier (when element is just entering)
            end: 'bottom 85%',  // keeps it safe for last element
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    // force ScrollTrigger to recalc after layout shift
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={el} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
