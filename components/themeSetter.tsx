"use client";
import { useEffect } from "react";

export default function LightModeSetter() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("light");
    html.classList.remove("dark");
    // light mode also applies the mix-blend-difference class to the header and footer
    document.querySelector("header")?.classList.add("mix-blend-difference");
    document.querySelector("footer")?.classList.add("mix-blend-difference");
    return () => {
      html.classList.remove("light");
    };
  }, []);
  return null;
}

export function DarkModeSetter() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("dark");
    html.classList.remove("light");
    return () => {
      html.classList.remove("dark");
    };
  }, []);
  return null;
}