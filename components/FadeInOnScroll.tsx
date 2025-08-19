'use client';

import { useEffect, useRef, HTMLAttributes, ReactNode } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
} & HTMLAttributes<HTMLDivElement>;

export default function FadeInOnScroll({ children, className, delay = 0 }: Props) {
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
          scrollTrigger: {
            trigger: el.current,
            start: 'top 95%',   // triggers when element enters
            toggleActions: 'play none none none',
            once: true,         // only fire once
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={el}
      className={className}
      style={{ opacity: 0, transform: 'translateY(30px)' }}
    >
      {children}
    </div>
  );
}
