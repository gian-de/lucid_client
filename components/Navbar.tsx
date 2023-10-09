"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return null;
  }

  if (pathname.includes("/studio")) {
    return null;
  }

  return (
    <nav className="fixed top-0 z-20 flex items-center justify-center w-full h-20 mx-auto space-x-40 text-2xl font-semibold tracking-wider bg-emerald-700 text-slate-50">
      <Link href="/">Home</Link>
      <Link href="/import">Import</Link>
      <Link href="/midnight">Midnight</Link>
    </nav>
  );
};

export default Navbar;
