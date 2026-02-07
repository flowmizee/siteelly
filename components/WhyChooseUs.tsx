import React from 'react';
import { Award, ShieldCheck, Sparkles, Heart } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Award className="w-8 h-8 text-gold-500" />,
      title: "Profissionalismo",
      description: "Técnicas avançadas e anos de formação na área da beleza."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-gold-500" />,
      title: "Biossegurança",
      description: "Higiene rigorosa e materiais descartáveis ou esterilizados."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-gold-500" />,
      title: "Marcas Premium",
      description: "Uso exclusivo de produtos das melhores marcas mundiais."
    },
    {
      icon: <Heart className="w-8 h-8 text-gold-500" />,
      title: "Bem-estar",
      description: "Ambiente climatizado e relaxante para o seu momento."
    }
  ];

  return (
    <section className="py-24 bg-studio-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-gold-500 uppercase tracking-[0.4em] mb-4">Diferenciais</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white font-display">Por que nos escolher?</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-10 bg-neutral-900/40 rounded-3xl border border-white/5 hover:border-gold-500/30 transition-all hover:-translate-y-2">
              <div className="mb-6 p-4 bg-black rounded-2xl border border-white/5 shadow-xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display">{feature.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;