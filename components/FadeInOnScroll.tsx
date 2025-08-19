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
            start: 'top bottom',  // element’s top hits bottom of viewport
            // start: 'top+=100 bottom', // top of el +100 hits bottom of viewport
            // end: 'bottom bottom', // keep it valid until bottom aligns with bottom
            // toggleActions: 'play none none none', // don't really need this
            once: true,
          }
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
