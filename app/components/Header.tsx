"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

  return (
    <header className="full fixed white">
      <div className="wrapper header">
        <Link href="/" className="logo">
          Salim Lounis
        </Link>
        <nav className="menu">
          <ul>
            <li>
              <Link className={path === "/" ? "active" : ""} href="/">
                Works/
              </Link>
            </li>
            <li>
              <Link className={path === "/about" ? "active" : ""} href="/about">
                About/
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
