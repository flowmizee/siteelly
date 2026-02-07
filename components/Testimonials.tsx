import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      text: "O melhor corte que já fiz! A Elly tem uma sensibilidade incrível para entender o que combina com o nosso rosto.",
      author: "Mariana Santos",
      role: "Cliente desde 2021"
    },
    {
      text: "Um studio completo e impecável. Faço minhas mechas aqui e o cabelo continua saudável e brilhante. Atendimento nota 10.",
      author: "Carla Oliveira",
      role: "Empresária"
    },
    {
      text: "Minha autoestima mudou depois que conheci o Studio. O design de sobrancelha e a limpeza de pele são maravilhosos!",
      author: "Fernanda Lima",
      role: "Cliente Fiel"
    }
  ];

  return (
    <section className="py-24 bg-studio-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-gold-500 uppercase tracking-[0.4em] mb-4">Experiências</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white font-display">O que dizem nossas clientes</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reviews.map((review, index) => (
            <div key={index} className="bg-neutral-900/50 p-10 rounded-3xl relative border border-white/5 backdrop-blur-sm group hover:border-gold-500/20 transition-all">
              <Quote className="absolute top-10 right-10 text-gold-500/10 w-16 h-16 group-hover:text-gold-500/20 transition-all" />
              <p className="text-neutral-300 mb-8 relative z-10 italic text-lg leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center font-bold text-black shadow-lg">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold font-display">{review.author}</h4>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;