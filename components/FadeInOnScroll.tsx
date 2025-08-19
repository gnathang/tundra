'use client';

// also gonna import HTMLAttributes and ReactNode for better type definitions
import { useEffect, useRef, HTMLAttributes, ReactNode } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode
  delay?: number;
} & HTMLAttributes<HTMLDivElement>; // extend all normal div props

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
        overwrite: 'auto', // ensures previous tweens don’t block
        force3D: true, // improves rendering
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
