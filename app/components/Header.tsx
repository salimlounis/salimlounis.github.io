"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [menuOpen]);

  return (
    <header className="full fixed white">
      <div className="wrapper header">
        <Link href="/" className="logo">
          Salim Lounis
        </Link>
        <nav className={`menu ${menuOpen ? "active" : ""}`}>
          <ul className={menuOpen ? "active" : ""}>
            <li>
              <Link
                className={path === "/" ? "active" : ""}
                href="/"
                onClick={() => setMenuOpen(false)}
              >
                Projets/
              </Link>
            </li>
            <li>
              <Link
                className={path === "/about" ? "active" : ""}
                href="/about"
                onClick={() => setMenuOpen(false)}
              >
                À propos/
              </Link>
            </li>
          </ul>
        </nav>
        <div
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <i className="ri-menu-line menu-toggle-icon"></i>
          <i className="ri-close-large-line menu-toggle-icon"></i>
        </div>
      </div>
    </header>
  );
}
