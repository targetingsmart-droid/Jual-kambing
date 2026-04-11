import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/#katalog", label: "Katalog" },
  { href: "/#fasilitas", label: "Fasilitas" },
  { href: "/#kontak", label: "Hubungi Kami" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "shadow-lg border-primary-100 bg-white"
            : "shadow-none border-transparent bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <ShoppingBag className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-serif text-2xl font-bold text-primary">
                GoatShop
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-primary font-medium text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg border border-gray-300 bg-white text-gray-700"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[9999]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          {/* Side panel */}
          <div className="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col">
            {/* Close button */}
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-serif text-lg font-bold text-primary">
                Menu
              </span>
              <button
                className="p-2 rounded-lg border border-gray-300 text-gray-700"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-4 text-lg font-medium text-gray-800 hover:text-primary hover:bg-primary-50 transition-colors border-b border-gray-50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                GoatShop - Kambing Kurban Premium
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
