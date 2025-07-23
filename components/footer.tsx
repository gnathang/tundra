'use client'
import Image from 'next/image'

export default function Footer() {
  return <footer className="fixed w-full bottom-0 py-3">
    <div className="container-large m-auto body-font flex gap-10">
      {/* <Link href="mailto:gabrielnathan@hotmail.co.uk" className="button-lotus">Contact Gabriel</Link> */}
      <span className="text-xs">&copy; Tundra {new Date().getFullYear()}</span>
      <span className="text-xs flex gap-1">In assocation with &nbsp;<Image src="/naytech-logo.png" alt="Naytech" width={100} height={32} /></span>
    </div>
  </footer>
}