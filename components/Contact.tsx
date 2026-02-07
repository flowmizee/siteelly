import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contato" className="py-24 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-gold-500 uppercase tracking-[0.4em] mb-4">Onde Estamos</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white font-display">Visite o nosso Studio</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left pt-10">
          <div className="flex flex-col items-center md:items-start group transition-all">
            <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center text-gold-500 mb-6 group-hover:bg-gold-500 group-hover:text-black transition-all">
              <MapPin size={28}/>
            </div>
            <h3 className="text-white font-bold mb-3 font-display text-xl">Nossa Localização</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              6ª Av. Inglaterra, 111 – Novo Horizonte <br/> 
              Parauapebas – PA
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start group transition-all">
            <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center text-gold-500 mb-6 group-hover:bg-gold-500 group-hover:text-black transition-all">
              <Clock size={28}/>
            </div>
            <h3 className="text-white font-bold mb-3 font-display text-xl">Horários</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Segunda a Sábado <br/> 
              08:00 às 18:00
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start group transition-all">
            <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center text-gold-500 mb-6 group-hover:bg-gold-500 group-hover:text-black transition-all">
              <Phone size={28}/>
            </div>
            <h3 className="text-white font-bold mb-3 font-display text-xl">Contato Direto</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              <a 
                href="https://wa.me/559491722306" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gold-500 transition-colors font-bold text-lg"
              >
                (94) 9172-2306
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;