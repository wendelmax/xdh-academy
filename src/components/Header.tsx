"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

interface NavItem {
  href: string;
  label: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Sobre XGH",
    items: [
      { href: "/o-que-e-xgh", label: "O que é XGH" },
      { href: "/manifesto", label: "Manifesto" },
      { href: "/principios", label: "Princípios" },
      { href: "/boas-praticas", label: "POC, MVP e Agilidade" },
    ],
  },
  {
    label: "Certificação",
    items: [
      { href: "/certificacao", label: "Fazer Exame" },
      { href: "/badges", label: "Meus Certificados" },
      { href: "/validar", label: "Validar Certificado" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideDropdowns = Object.values(dropdownRefs.current).every(
        (ref) => !ref || !ref.contains(target)
      );
      if (isOutsideDropdowns) setOpenGroup(null);
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    if (openGroup || mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openGroup, mobileMenuOpen]);

  const isActive = (href: string) => pathname === href;
  const isGroupActive = (group: NavGroup) =>
    group.items.some((item) => isActive(item.href));
  const navLinkClass = (active: boolean) =>
    active
      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white";
  const navItemClass = (active: boolean) =>
    active
      ? "bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-white"
      : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white";

  return (
    <header className="border-b border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-tight text-neutral-900 dark:text-white"
        >
          <Image
            src="/xgh-certificacao-badge.png"
            alt="Logo XGH Academy"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 object-contain"
          />
          <span>XGH Academy</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${navLinkClass(isActive("/"))}`}
          >
            Início
          </Link>
          {navGroups.map((group) => (
            <div
              key={group.label}
              className="relative"
              ref={(el) => {
                dropdownRefs.current[group.label] = el;
              }}
            >
              <button
                onClick={() =>
                  setOpenGroup(openGroup === group.label ? null : group.label)
                }
                className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${navLinkClass(isGroupActive(group))}`}
              >
                {group.label}
                <svg
                  className={`h-3 w-3 transition-transform ${
                    openGroup === group.label ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openGroup === group.label && (
                <div className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenGroup(null)}
                      className={`block px-4 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${navItemClass(isActive(item.href))}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="relative md:hidden" ref={mobileMenuRef}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            aria-label="Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          {mobileMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium transition-colors first:rounded-t-lg ${navItemClass(isActive("/"))}`}
              >
                Início
              </Link>
              {navGroups.map((group) => (
                <div key={group.label}>
                  <div className="border-t border-neutral-200 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                    {group.label}
                  </div>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors last:rounded-b-lg ${navItemClass(isActive(item.href))}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
