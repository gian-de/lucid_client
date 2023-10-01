"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 z-20 flex items-center justify-center w-full h-20 mx-auto space-x-40 text-2xl font-semibold tracking-wider bg-red-500">
      <Link href="/">Import</Link>
      <Link href="/midnight">Midnight</Link>
    </nav>
  );
};

export default Navbar;
