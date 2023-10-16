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

  const navLinks = [
    // {
    //   id: 1,
    //   name: "Home",
    //   slug: "/",
    // },
    {
      id: 2,
      name: "Import",
      slug: "/",
    },
    // {
    //   id: 3,
    //   name: "Midnight",
    //   slug: "/midnight",
    // },
  ];

  return (
    <nav className="fixed top-0 z-20 flex items-center justify-center w-full h-16 mx-auto space-x-40 bg-emerald-700">
      {/* {navLinks.map((link) => (
        <Link
          key={link.id}
          href={link.slug}
          className={`${
            pathname == link.slug ? "text-red-500" : ""
          } text-2xl font-semibold tracking-tight uppercase text-slate-50`}
        >
          {link.name}
        </Link>
      ))} */}
      <span className="text-xl italic text-slate-50">- favio828</span>
    </nav>
  );
};

export default Navbar;
