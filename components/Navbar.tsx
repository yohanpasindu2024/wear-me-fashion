"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const cartItemsCount = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "New & Featured", href: "/store" },
    { name: "Men", href: "/store" },
    { name: "Women", href: "/store" },
    { name: "Accessories", href: "/store" },
    { name: "Contact", href: "/contact" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For now just route to store, in a real app would append ?q=searchQuery
      router.push("/store");
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent text-white" // We might want it transparent on hero, but let's make it background to be safe
      )}
    >
      <div className={cn(
        "absolute inset-0 z-[-1] transition-colors duration-300", 
        !isScrolled && pathname === "/" ? "bg-black/20" : "bg-background/90 backdrop-blur-md border-b"
      )} />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className={cn(
              "font-serif text-3xl font-bold uppercase tracking-tighter",
              !isScrolled && pathname === "/" ? "text-white" : "text-foreground"
            )}>
              Outlyn
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-bold uppercase tracking-wider transition-colors relative group",
                  !isScrolled && pathname === "/" 
                    ? "text-gray-200 hover:text-white" 
                    : "text-muted-foreground hover:text-foreground",
                  pathname === link.href && isScrolled && "text-foreground"
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="underline"
                    className={cn(
                      "absolute left-0 top-full block h-[2px] w-full",
                      !isScrolled && pathname === "/" ? "bg-white" : "bg-foreground"
                    )}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            {/* Search Toggle */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSearchSubmit}
                    className="absolute right-8 top-1/2 -translate-y-1/2"
                  >
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={cn(
                        "h-10 w-full rounded-full border px-4 pr-10 text-sm focus:outline-none focus:ring-2",
                        !isScrolled && pathname === "/" 
                          ? "bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:ring-white/50" 
                          : "bg-muted border-border text-foreground focus:ring-foreground/20"
                      )}
                    />
                    <button type="submit" className="hidden">Submit</button>
                  </motion.form>
                )}
              </AnimatePresence>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={cn(
                  "transition-colors z-10",
                  !isScrolled && pathname === "/" ? "text-white hover:text-gray-300" : "text-foreground hover:text-gray-600"
                )}
                aria-label="Search"
              >
                {isSearchOpen ? <X size={24} /> : <Search size={24} />}
              </button>
            </div>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={cn(
                  "transition-colors",
                  !isScrolled && pathname === "/" ? "text-white hover:text-gray-300" : "text-foreground hover:text-gray-600"
                )}
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            )}

            {/* Cart Icon */}
            <Link
              href="/checkout"
              className={cn(
                "relative transition-colors",
                !isScrolled && pathname === "/" ? "text-white hover:text-gray-300" : "text-foreground hover:text-gray-600"
              )}
            >
              <ShoppingBag size={24} />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-[6px] py-[2px] text-[10px] font-bold leading-none text-white bg-red-600 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "md:hidden transition-colors",
                !isScrolled && pathname === "/" ? "text-white hover:text-gray-300" : "text-foreground hover:text-gray-600"
              )}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background border-b overflow-hidden relative z-50 text-foreground"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              <form onSubmit={handleSearchSubmit} className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-muted border border-border rounded-full py-3 px-5 text-base focus:outline-none focus:border-foreground"
                  />
                  <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search size={20} />
                  </button>
                </div>
              </form>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-4 text-2xl font-serif font-bold uppercase tracking-tight border-b border-border/50 hover:pl-2 transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
