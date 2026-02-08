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
    { role: 'model', text: 'Olá! É um prazer te atender 💖\n\nMe conta: o que você está buscando hoje? Pode ser uma mudança no visual, tratamento capilar, estética, ou até uma dúvida sobre qual procedimento combina mais com você?' }
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
      let response = "Para dúvidas específicas ou atendimento personalizado, entre em contato diretamente pelo nosso WhatsApp disponível no site. Será um prazer te atender 💖";
      
      // Lógica Baseada na Base de Conhecimento fornecida
      
      // SOBRE O STUDIO
      if (userMessage.includes('onde fica') || userMessage.includes('endereço') || userMessage.includes('localização')) {
        response = "Estamos localizados na 6ª Av. Inglaterra, 111 – Novo Horizonte, em Parauapebas – PA.";
      } else if (userMessage.includes('horário') || userMessage.includes('aberto') || userMessage.includes('funciona')) {
        response = "Funcionamos de segunda a sábado, das 08:00 às 18:00.";
      } else if (userMessage.includes('agendar') || userMessage.includes('marcar') || userMessage.includes('como faço')) {
        response = "Você pode agendar diretamente pelo WhatsApp ou escolhendo o serviço no site e seguindo para o pagamento.";
      }
      
      // TERAPIA CAPILAR
      else if (userMessage.includes('queda') || userMessage.includes('cabelo caindo')) {
        response = "Sim. Trabalhamos com terapia capilar usando técnicas modernas para tratar problemas do couro cabeludo e fortalecer os fios.";
      } else if (userMessage.includes('terapia capilar')) {
        if (userMessage.includes('estética')) {
          response = "Não. A terapia capilar também cuida da saúde do couro cabeludo e pode ajudar em casos de oleosidade, queda e enfraquecimento capilar.";
        } else if (userMessage.includes('avaliação') || userMessage.includes('precisa')) {
          response = "Sim. Sempre analisamos o couro cabeludo e a necessidade do cliente antes de indicar o tratamento ideal.";
        } else {
          response = "A Terapia Capilar é incrível para tratar queda, oleosidade excessiva ou sensibilidade. Usamos técnicas modernas para devolver a saúde ao seu couro cabeludo!";
        }
      }
      
      // SERVIÇOS
      else if (userMessage.includes('serviços') || userMessage.includes('o que você faz') || userMessage.includes('oferecem')) {
        response = "Trabalhamos com terapia capilar, cílios, sobrancelhas, estética corporal, massagens, drenagem, ventosaterapia, manicure, cabelos e penteados.";
      } else if (userMessage.includes('cílios') || userMessage.includes('extensão')) {
        if (userMessage.includes('nunca fiz') || userMessage.includes('qual é melhor') || userMessage.includes('indica')) {
           response = "Depende muito do efeito que você quer alcançar e do seu estilo. Para te indicar o melhor com segurança, me chama no WhatsApp disponível no site 💖";
        } else {
           response = "Sim. Trabalhamos com fio a fio, clássico, 5D, 6D e técnicas de destaque para o olhar.";
        }
      } else if (userMessage.includes('sobrancelha') || userMessage.includes('henna') || userMessage.includes('lamination')) {
        response = "Sim. Temos design com henna e também brow lamination.";
      }
      
      // ESTÉTICA CORPORAL
      else if (userMessage.includes('drenagem') || userMessage.includes('massagem')) {
        if (userMessage.includes('qual') || userMessage.includes('melhor')) {
          response = "Isso depende do seu objetivo e da sua necessidade atual. Para te indicar o melhor com precisão, me chama no WhatsApp disponível no site 💖";
        } else {
          response = "Sim. Trabalhamos com drenagem linfática, massagens relaxantes e ventosaterapia.";
        }
      } else if (userMessage.includes('ventosa')) {
        response = "Normalmente não dói. Pode causar leve pressão na pele, mas é um procedimento seguro e controlado.";
      }
      
      // PAGAMENTO
      else if (userMessage.includes('pagar') || userMessage.includes('pagamento')) {
        response = "Sim. Você pode selecionar o serviço no site e realizar o pagamento online.";
      } else if (userMessage.includes('pix')) {
        response = "Sim, aceitamos PIX e outras formas de pagamento conforme disponibilidade no atendimento.";
      }
      
      // QUALIDADE E DIFERENCIAIS
      else if (userMessage.includes('diferencial') || userMessage.includes('por que')) {
        response = "Trabalhamos com atendimento humanizado, técnicas modernas, produtos importados e protocolos de alto padrão.";
      } else if (userMessage.includes('esterilizados') || userMessage.includes('limpeza') || userMessage.includes('biossegurança')) {
        response = "Sim. Seguimos rigorosamente normas de biossegurança, com materiais descartáveis ou esterilizados.";
      } else if (userMessage.includes('qualidade') || userMessage.includes('produtos') || userMessage.includes('marcas')) {
        response = "Sim. Trabalhamos apenas com marcas premium e produtos importados para garantir resultados de alto nível.";
      } else if (userMessage.includes('elly') || userMessage.includes('quem é') || userMessage.includes('profissional')) {
        response = "O studio é comandado pela especialista Elly Oliveira, com anos de experiência na área da beleza.";
      } else if (userMessage.includes('resultados') || userMessage.includes('fotos') || userMessage.includes('instagram')) {
        response = "Sim. Temos portfólio e também transformações disponíveis no Instagram.";
      }
      
      // CONSULTA PERSONALIZADA (RECOMENDAÇÕES)
      else if (userMessage.includes('melhor para mim') || userMessage.includes('qual serviço') || userMessage.includes('o que você indica')) {
        response = "Isso pode variar de acordo com o que você deseja melhorar ou transformar. Para te orientar com mais precisão e de forma personalizada, me chama no WhatsApp disponível no site 💖";
      } else if (userMessage.includes('cabelo fraco') || userMessage.includes('fortalecimento')) {
        response = "Existem protocolos específicos para fortalecimento e recuperação dos fios. Para avaliarmos melhor seu caso, me chama no WhatsApp disponível no site 💖";
      } else if (userMessage.includes('mudar') || userMessage.includes('visual')) {
        response = "Podemos te orientar com base no resultado que você deseja alcançar. Para uma orientação personalizada, me chama no WhatsApp disponível no site 💖";
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
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm font-display">Consultoria de Beleza Personalizada</h3>
                <span className="text-[10px] text-green-500 flex items-center gap-1 uppercase tracking-widest font-bold">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Atendimento Online Exclusivo
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
                <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
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
                placeholder="Ex: Qual o endereço de vocês?"
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
            Dúvidas? Fale comigo!
          </span>
        )}
      </button>
    </div>
  );
};

export default AIStyleConsultant;