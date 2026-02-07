import React from 'react';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-studio-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="absolute -inset-4 border border-gold-500/20 rounded-3xl translate-x-6 translate-y-6"></div>
             <video 
               src="https://files.catbox.moe/vinrbn.mp4" 
               poster="https://i.postimg.cc/Z5D1Myrm/IMG-20260206-222810.jpg"
               className="relative rounded-3xl shadow-2xl w-full object-cover h-[600px] border border-white/5"
               autoPlay
               muted
               loop
               playsInline
             />
          </div>
          
          <div>
            <h2 className="text-sm font-bold text-gold-500 uppercase tracking-[0.3em] mb-4">O Studio</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 font-display leading-tight">Excelência em cada detalhe, cuidado em cada toque.</h3>
            
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
              O Studio de Beleza Elly Oliveira nasceu da passion em elevar a autoestima feminina. Localizado no coração de Parauapebas, oferecemos um refúgio de sofisticação e bem-estar.
            </p>
            
            <p className="text-neutral-400 text-lg leading-relaxed">
              Comandado pela especialista Elly Oliveira, nosso studio foca em resultados de alto padrão, utilizando apenas os melhores protocolos e produtos internacionais para garantir que você saia não apenas mais bonita, mas renovada.
            </p>

            <div className="mt-12 flex gap-12 border-t border-white/5 pt-10">
               <div>
                 <span className="block text-4xl font-black text-gold-500 font-display">10+</span>
                 <span className="text-xs text-neutral-500 uppercase tracking-widest mt-1 block">Anos de Histórias</span>
               </div>
               <div>
                 <span className="block text-4xl font-black text-gold-500 font-display">5k+</span>
                 <span className="text-xs text-neutral-500 uppercase tracking-widest mt-1 block">Transformações</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;