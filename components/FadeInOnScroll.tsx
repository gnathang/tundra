'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  delay?: number;
};

export default function FadeInOnScroll({ children, delay = 0 }: Props) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!el.current) return;

    gsap.fromTo(
      el.current,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [delay]);

  return (
    <div ref={el} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
