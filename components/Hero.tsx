import React from 'react';
import { Calendar, Sparkles, Heart, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const whatsappUrl = "https://wa.me/559491722306?text=Olá!%20Gostaria%20de%20agendar%20um%20horário%20no%20Studio%20Elly%20Oliveira.";

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); 
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-[position:20%_center] bg-no-repeat scale-105"
        style={{
          backgroundImage: 'url("https://i.postimg.cc/tRtGCwNd/Mulher-voce-e-forca-coragem-e-luz-Nao-permita-que-o-mundo-diminua-o-brilho-que-ha-em-voce-Sua-v.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 mb-6 animate-pulse">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Experiência Premium em Parauapebas</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] mb-8 font-display">
            Corte certo. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              Estilo que impõe respeito.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-300 mb-10 font-light max-w-xl leading-relaxed">
            Especialista em valorizar sua beleza através de técnicas modernas de estética avançada e cuidados capilares profissionais.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mb-16">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-full transition-all transform hover:scale-105 shadow-xl shadow-gold-500/20"
            >
              Agendar Experiência
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>

            <a 
              href="#servicos" 
              onClick={(e) => handleScrollTo(e, 'servicos')}
              className="inline-flex items-center justify-center px-10 py-5 bg-white/5 border border-white/10 hover:border-gold-500/50 text-white font-bold rounded-full transition-all backdrop-blur-sm hover:bg-white/10"
            >
              Ver Procedimentos
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/10 pt-10">
            <div className="flex items-center gap-4 text-neutral-300">
              <div className="p-3 bg-white/5 rounded-2xl text-gold-500 border border-white/5">
                <Calendar size={22} />
              </div>
              <span className="font-semibold text-sm tracking-wide">Horários Exclusivos</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-300">
              <div className="p-3 bg-white/5 rounded-2xl text-gold-500 border border-white/5">
                <Sparkles size={22} />
              </div>
              <span className="font-semibold text-sm tracking-wide">Produtos Importados</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-300">
              <div className="p-3 bg-white/5 rounded-2xl text-gold-500 border border-white/5">
                <Heart size={22} />
              </div>
              <span className="font-semibold text-sm tracking-wide">Cuidado Humanizado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;