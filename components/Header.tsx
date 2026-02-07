import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const whatsappUrl = "https://wa.me/559491722306?text=Olá!%20Gostaria%20de%20agendar%20um%20horário%20no%20Studio%20Elly%20Oliveira.";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'O Studio', href: '#sobre' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Portfólio', href: '#galeria' },
    { name: 'Agendar', href: whatsappUrl, isExternal: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string, isExternal?: boolean }) => {
    if (link.isExternal) return;
    
    e.preventDefault();
    const targetId = link.href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="p-2 bg-gold-500 rounded-full text-black group-hover:bg-gold-400 transition-colors">
            <Sparkles size={20} />
          </div>
          <span className="text-lg font-bold tracking-widest uppercase text-white">
            STUDIO DE BELEZA <span className="text-gold-500">ELLY OLIVEIRA</span>
          </span>
        </div>

        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              onClick={(e) => handleNavClick(e, link)}
              className="text-xs font-semibold uppercase tracking-widest text-gray-300 hover:text-gold-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <button 
          className="md:hidden text-white hover:text-gold-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-t border-neutral-800 shadow-xl">
          <div className="flex flex-col py-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="px-6 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-neutral-900 hover:text-gold-500 transition-colors border-b border-neutral-800/50 last:border-0"
                onClick={(e) => handleNavClick(e, link)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;