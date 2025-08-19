'use client'
import { useEffect, useState } from 'react'; // gonna use useEffect to detect dark mode
import Image from 'next/image' 

export default function Footer() {
  const [naytechLogo, setNaytechLogo] = useState("/naytech-logo.png"); // default logo path
  
  useEffect(() => {
    const html = document.documentElement;
    const isDarkMode = html.classList.contains("dark");

    if (isDarkMode) {
      setNaytechLogo("/naytech-logo-white.svg");
    } else {
      setNaytechLogo("/naytech-logo-white-inverse.svg");
    }
  }, []);

  return <footer className="fixed w-full bottom-0 py-3">
    <div className="container-large m-auto body-font flex items-center gap-10">
      {/* <Link href="mailto:gabrielnathan@hotmail.co.uk" className="button-lotus">Contact Gabriel</Link> */}
      <span className="text-xs">&copy; Tundra {new Date().getFullYear()}</span>
      <span className="text-xs flex items-center gap-1">Partner of &nbsp;
        <Image src={ naytechLogo } alt="Naytech" width={100} height={32} />
      </span>
    </div>
  </footer>
}