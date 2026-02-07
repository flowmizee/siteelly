import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIStyleConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Olá! Sou seu Guia de Estilo no Studio Elly Oliveira. Para eu te sugerir o melhor look: qual o seu tipo de cabelo e o formato do seu rosto?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.toLowerCase();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setIsLoading(true);

    setTimeout(() => {
      let response = "Que maravilha! Para o seu perfil, eu recomendaria um corte com camadas para dar leveza e uma hidratação profunda. Vamos agendar uma avaliação?";
      
      if (userMessage.includes('redondo')) {
        response = "Para rostos redondos, cortes com camadas desfiadas ou um Long Bob com as pontas frontais alongadas ajudam a alongar a silhueta facial de forma elegante.";
      } else if (userMessage.includes('oval')) {
        response = "O rosto oval é muito versátil! Você fica ótima tanto com cortes curtos (Pixie) quanto com longos ondulados. É o formato ideal para ousar!";
      } else if (userMessage.includes('quadrado')) {
        response = "Para suavizar os traços de um rosto quadrado, recomendo franjas laterais e cortes com ondas suaves, evitando linhas muito retas na altura do maxilar.";
      } else if (userMessage.includes('crespo') || userMessage.includes('cacheado')) {
        response = "Para seus cachos, o corte a seco com técnicas de visagismo é essencial para controlar o volume e definir a forma. Hidratação é a nossa prioridade número um!";
      } else if (userMessage.includes('pele') || userMessage.includes('limpeza')) {
        response = "Nossa limpeza de pele profunda utiliza protocolos de desincrustação e nutrição que deixam o rosto radiante. Ideal para fazer uma vez por mês!";
      } else if (userMessage.includes('sobrancelha')) {
        response = "O design de sobrancelhas aqui no Studio foca no mapeamento facial para encontrar o arco perfeito que valoriza o seu olhar de forma natural.";
      }

      setMessages(prev => [...prev, { role: 'model', text: response }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="bg-black border border-white/10 rounded-3xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden flex flex-col pointer-events-auto animate-fade-in-up h-[500px] backdrop-blur-xl">
          <div className="bg-neutral-900/80 p-5 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gold-500 rounded-full text-black">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm font-display">Visagismo Especializado</h3>
                <span className="text-[10px] text-green-500 flex items-center gap-1 uppercase tracking-widest font-bold">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Consultora Online
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-black/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-gold-500 text-black rounded-br-none font-bold shadow-lg shadow-gold-500/10' 
                    : 'bg-neutral-900 text-neutral-200 rounded-bl-none border border-white/5'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-neutral-900 rounded-2xl rounded-bl-none px-5 py-3 border border-white/5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-5 bg-neutral-900/80 border-t border-white/5">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ex: Qual corte combina com rosto oval?"
                className="w-full bg-black text-white rounded-2xl pl-5 pr-14 py-4 text-xs focus:outline-none focus:ring-1 focus:ring-gold-500/30 border border-white/5"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-gold-500 text-black rounded-xl hover:bg-gold-400 disabled:opacity-50 transition-colors shadow-lg"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[9px] text-neutral-600 mt-3 text-center uppercase tracking-[0.2em] font-bold">Consultoria de Beleza por Elly Oliveira</p>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-gold-500 hover:bg-gold-400 text-black p-5 rounded-full shadow-2xl shadow-gold-500/30 transition-all transform hover:scale-110 flex items-center justify-center group"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute right-full mr-6 bg-white text-black px-4 py-2 rounded-xl text-xs font-black shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest border border-gold-500/20">
            Dúvidas de Estilo?
          </span>
        )}
      </button>
    </div>
  );
};

export default AIStyleConsultant;