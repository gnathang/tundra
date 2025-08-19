'use client';

import { useEffect, HTMLAttributes, ReactNode } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
} & HTMLAttributes<HTMLDivElement>;

export default function FadeInOnScroll({ children, className, delay = 0 }: Props) {
  useEffect(() => {
    // batch all .fade-in elements together
    ScrollTrigger.batch('.fade-in', {
      interval: 0.1, // time window for batching (0.1s)
      batchMax: 3,   // max elements animated together
      start: 'top 95%',
      once: true,    // only run once
      onEnter: batch => {
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          delay,
        });
      },
    });

    // recalc when layout shifts
    ScrollTrigger.refresh();
  }, [delay]);

  return (
    <div className={`fade-in ${className || ''}`} style={{ opacity: 0, transform: 'translateY(30px)' }}>
      {children}
    </div>
  );
}
