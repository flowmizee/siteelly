import React from 'react';
import { Instagram, MessageCircle, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  const instagramLink = "https://www.instagram.com/ellyoliveira_studiodebeleza?igsh=MWl0dDJ2ODBkNDU0Zw==";

  return (
    <footer id="contato-final" className="bg-black py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <Sparkles className="text-gold-500" size={24}/>
              <span className="text-2xl font-bold tracking-widest uppercase text-white font-display">
                ELLY <span className="text-gold-500">OLIVEIRA</span>
              </span>
            </div>
            <p className="text-neutral-500 text-xs tracking-widest mt-2 uppercase">
              Beleza que inspira, cuidado que transforma.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
             <div className="flex gap-8">
               <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-gold-500 hover:border-gold-500/50 transition-all">
                 <span className="sr-only">Instagram</span>
                 <Instagram size={20} />
               </a>
               <a href="https://wa.me/559491722306" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-gold-500 hover:border-gold-500/50 transition-all">
                 <span className="sr-only">WhatsApp</span>
                 <MessageCircle size={20} />
               </a>
             </div>
             <span className="text-[10px] text-neutral-600 uppercase tracking-[0.3em] font-black mt-2">Parauapebas - Pará</span>
          </div>

          <div className="text-center md:text-right">
             <p className="text-neutral-500 text-[10px] uppercase tracking-widest leading-relaxed">
               © {new Date().getFullYear()} Studio Elly Oliveira <br/> Todos os direitos reservados.
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;