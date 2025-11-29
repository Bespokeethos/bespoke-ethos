import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#scores", label: "Scores" },
    { href: "#calendar", label: "Calendar" },
    { href: "#about", label: "About" },
  ];

  return (
    <header className="border-b-4 border-black bg-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo/Title */}
        <div className="font-black text-xl md:text-2xl uppercase tracking-tighter">
          <Link href="/" className="hover:text-[#FF00D6] transition-colors">
            AI Research Assistant
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            if (link.href.startsWith("#")) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-bold text-sm uppercase hover:text-[#FF00D6] transition-colors"
                >
                  {link.label}
                </a>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className="font-bold text-sm uppercase hover:text-[#FF00D6] transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="#start"
            className="brutal-btn py-2 px-4 text-sm font-bold bg-yellow-300"
          >
            Start a Gauntlet
          </a>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t-4 border-black bg-white">
          <nav className="flex flex-col items-center gap-4 px-4 py-6">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith("#");
              const commonProps = {
                className: "font-bold text-lg uppercase hover:text-[#FF00D6] transition-colors",
                onClick: () => setIsOpen(false),
              } as const;

              if (isHash) {
                return (
                  <a key={link.label} href={link.href} {...commonProps}>
                    {link.label}
                  </a>
                );
              }

              return (
                <Link key={link.label} href={link.href} {...commonProps}>
                  {link.label}
                </Link>
              );
            })}
             <a
              href="#start"
              className="brutal-btn py-3 px-6 text-base font-bold bg-yellow-300 mt-4"
              onClick={() => setIsOpen(false)}
            >
              Start a Gauntlet
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
