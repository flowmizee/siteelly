import React, { useState, useMemo } from 'react';
import { Sparkles, Heart, ShoppingBag, Check, Copy, ChevronRight, Zap, X, Maximize2, ChevronLeft } from 'lucide-react';

/**
 * Calcula o CRC16 CCITT (0xFFFF) necessário para o padrão Pix EMV
 */
const crc16 = (buffer: string) => {
  let crc = 0xFFFF;
  for (let i = 0; i < buffer.length; i++) {
    let c = buffer.charCodeAt(i);
    crc ^= c << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = (crc << 1);
      }
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
};

/**
 * Formata um campo no padrão EMV (ID + Tamanho + Valor)
 */
const formatField = (id: string, value: string) => {
  const len = value.length.toString().padStart(2, '0');
  return `${id}${len}${value}`;
};

/**
 * Gera o payload do Pix Copia e Cola dinamicamente do zero
 * Chave Pix (Celular): +5594992460677
 */
const generatePixCode = (amount: number) => {
  if (amount <= 0) return "";
  
  const amountStr = amount.toFixed(2);
  const key = "+5594992460677"; // Chave celular no formato internacional exigido pelo Banco Central
  const name = "ANTONIO RENIMAR PINHEIRO";
  const city = "SAO PAULO";
  const txtId = "ELLYSTUDIO";

  // Montagem do Payload seguindo rigorosamente o padrão BR Code / EMV
  let payload = 
    "000201" + // Payload Format Indicator
    formatField("26", "0014br.gov.bcb.pix" + formatField("01", key)) + // Merchant Account Information
    "52040000" + // Merchant Category Code
    "5303986" +  // Transaction Currency (BRL)
    formatField("54", amountStr) + // Transaction Amount
    "5802BR" + // Country Code
    formatField("59", name) + // Merchant Name
    formatField("60", city) + // Merchant City
    formatField("62", formatField("05", txtId)) + // Additional Data (TXID)
    "6304"; // CRC16 Indicator

  const crc = crc16(payload);
  return `${payload}${crc}`;
};

interface ServiceItem {
  id: string;
  name: string;
  price: number;
  images: string[];
}

const Services: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showPixPayment, setShowPixPayment] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const servicesList: ServiceItem[] = [
    { 
      id: 'manicure-35', 
      name: 'Manicure', 
      price: 35.00, 
      images: [
        "https://i.postimg.cc/7PzFh6S0/IMG_20260206_212713.jpg", 
        "https://i.postimg.cc/zDhsvBTW/IMG_20260206_212737.jpg", 
        "https://i.postimg.cc/44cDydpp/IMG_20260206_212754.jpg", 
        "https://i.postimg.cc/xjmw8CLJ/IMG_20260206_212819.jpg"
      ] 
    },
    { 
      id: 'brown-lamination', 
      name: 'Brown Lamination', 
      price: 120.00, 
      images: ["https://i.postimg.cc/rshxMcV7/IMG-20260206-213234.jpg"] 
    },
    { 
      id: 'henna', 
      name: 'Design com Henna', 
      price: 60.00, 
      images: ["https://i.postimg.cc/Y9rv9VsQ/IMG-20260206-213427.jpg"] 
    },
    { 
      id: 'manicure-60', 
      name: 'Manicures Especial', 
      price: 59.99, 
      images: ["https://i.postimg.cc/pdxTG4xS/IMG-20260206-213649.jpg"] 
    },
    { 
      id: 'massagem-ventosa', 
      name: 'Massagem, Drenagem e Ventosaterapia', 
      price: 149.00, 
      images: [
        "https://i.postimg.cc/jqNjTR5J/IMG_20260206_213828.jpg", 
        "https://i.postimg.cc/3rpwh3RB/IMG_20260206_213845.jpg"
      ] 
    },
    { 
      id: 'cabelos', 
      name: 'Cabelos', 
      price: 199.00, 
      images: [
        "https://i.postimg.cc/pXWMSvn5/IMG_20260206_214157.jpg", 
        "https://i.postimg.cc/dtscfFTd/IMG_20260206_214222.jpg"
      ] 
    },
    { 
      id: 'penteados', 
      name: 'Penteados Modelos', 
      price: 150.00, 
      images: [
        "https://i.postimg.cc/0Nm4QXJc/IMG_20260206_214456.jpg", 
        "https://i.postimg.cc/GpYf2gsS/IMG_20260206_214514.jpg", 
        "https://i.postimg.cc/1z6dt7N7/IMG_20260206_214526.jpg", 
        "https://i.postimg.cc/mrMnDpF5/IMG_20260206_214545.jpg"
      ] 
    },
    { 
      id: 'cilios-fio', 
      name: 'Cílios Fio a Fio', 
      price: 120.00, 
      images: ["https://i.postimg.cc/J4GP0dwW/IMG_20260206_214957.jpg"] 
    },
    { 
      id: 'cilios-6d', 
      name: 'Cílios 6D', 
      price: 180.00, 
      images: ["https://i.postimg.cc/4NmByFCg/IMG_20260206_215027.jpg"] 
    },
    { 
      id: 'cilios-5d', 
      name: 'Cílios 5D', 
      price: 180.00, 
      images: ["https://i.postimg.cc/T3x002Lf/IMG_20260206_215325.jpg"] 
    },
    { 
      id: 'brasileiro', 
      name: 'Brasileiro Marcante', 
      price: 180.00, 
      images: ["https://i.postimg.cc/K85NHXLd/IMG_20260206_215349.jpg"] 
    },
    { 
      id: 'extensao-classico', 
      name: 'Extensão de Cílios Clássico', 
      price: 130.00, 
      images: ["https://i.postimg.cc/Sx4ddQ2Q/IMG_20260206_215412.jpg"] 
    },
  ];

  const toggleService = (id: string) => {
    if (showPixPayment) setShowPixPayment(false);
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const total = useMemo(() => {
    return servicesList
      .filter(s => selectedServices.includes(s.id))
      .reduce((acc, curr) => acc + curr.price, 0);
  }, [selectedServices, servicesList]);

  const pixCode = useMemo(() => generatePixCode(total), [total]);

  const handleCopyPix = () => {
    if (!pixCode) return;
    navigator.clipboard.writeText(pixCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="servicos" className="py-24 bg-black">
      {/* Lightbox Modal */}
      {fullscreenImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in" onClick={() => setFullscreenImage(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-gold-500 transition-colors z-[110]">
            <X size={32} />
          </button>
          <img 
            src={fullscreenImage} 
            alt="Fullscreen View" 
            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-gold-500 uppercase tracking-[0.4em] mb-4">Nossos Serviços</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white font-display">Menu de Beleza e Bem-Estar</h3>
        </div>

        {/* Categories Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-neutral-900/40 p-8 rounded-3xl border border-white/5 hover:border-gold-500/40 transition-all group backdrop-blur-sm">
            <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 mb-6 group-hover:bg-gold-500 group-hover:text-black transition-all">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-display">Cílios & Sobrancelhas</h3>
            <p className="text-neutral-500 text-sm">Extensões, lamination e design especializado para um olhar marcante.</p>
          </div>

          <div className="bg-neutral-900/40 p-8 rounded-3xl border border-white/5 hover:border-gold-500/40 transition-all group backdrop-blur-sm">
            <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 mb-6 group-hover:bg-gold-500 group-hover:text-black transition-all">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-display">Corpo & Estética</h3>
            <p className="text-neutral-500 text-sm">Massagens relaxantes, drenagem linfática e terapias como ventosaterapia.</p>
          </div>

          <div className="bg-neutral-900/40 p-8 rounded-3xl border border-white/5 hover:border-gold-500/40 transition-all group backdrop-blur-sm">
            <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 mb-6 group-hover:bg-gold-500 group-hover:text-black transition-all">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-display">Cabelos & Unhas</h3>
            <p className="text-neutral-500 text-sm">Penteados profissionais e manicure de alto padrão para todas as ocasiões.</p>
          </div>
        </div>

        <div id="selecao-servicos" className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto scroll-mt-28">
          <div className="flex-1 bg-neutral-900/50 rounded-3xl p-8 border border-white/5">
             <div className="flex items-center justify-between mb-10">
               <div>
                <h3 className="text-2xl font-bold text-white font-display">Personalize seu cuidado</h3>
                <p className="text-neutral-500 text-sm mt-1">Clique na foto para ampliar ou selecione o serviço e faça o pagamento.</p>
               </div>
               <span className="text-[10px] text-gold-500 bg-gold-500/10 px-4 py-1.5 rounded-full uppercase tracking-widest font-black border border-gold-500/20">
                 Catálogo Studio
               </span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {servicesList.map((service) => (
                 <div 
                   key={service.id}
                   className={`flex flex-col rounded-3xl border transition-all duration-300 overflow-hidden ${
                     selectedServices.includes(service.id)
                       ? 'bg-gold-500/10 border-gold-500 shadow-xl shadow-gold-500/10'
                       : 'bg-black/40 border-white/5 hover:border-white/20'
                   }`}
                 >
                   {/* Scrollable Gallery */}
                   <div className="relative h-56 w-full bg-neutral-800 overflow-hidden group/img">
                      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full">
                        {service.images.map((img, i) => (
                          <div key={i} className="flex-none w-full h-full snap-center relative">
                            <img 
                              src={img} 
                              alt={`${service.name} ${i + 1}`} 
                              className="w-full h-full object-cover"
                            />
                            <button 
                              onClick={(e) => { e.stopPropagation(); setFullscreenImage(img); }}
                              className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity"
                            >
                              <Maximize2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                      {service.images.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {service.images.map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                          ))}
                        </div>
                      )}
                      {service.images.length > 1 && (
                        <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                          <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white/50">
                            <ChevronLeft size={16} />
                          </div>
                        </div>
                      )}
                   </div>

                   <div 
                    onClick={() => toggleService(service.id)}
                    className="p-6 cursor-pointer"
                   >
                     <div className="flex justify-between items-start mb-4">
                       <h4 className="text-lg font-bold text-white font-display leading-tight">{service.name}</h4>
                       <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ml-4 ${
                         selectedServices.includes(service.id) ? 'bg-gold-500 border-gold-500 text-black' : 'border-neutral-700 bg-transparent'
                       }`}>
                         {selectedServices.includes(service.id) && <Check size={14} strokeWidth={4} />}
                       </div>
                     </div>
                     <div className="flex items-center justify-between">
                        <span className="text-gold-500 font-bold text-xl font-display">
                          R$ {service.price.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Pague Online</span>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="lg:w-96">
            <div className="bg-neutral-900 rounded-3xl border border-white/10 sticky top-24 overflow-hidden shadow-2xl">
              <div className="p-8 bg-white/5 border-b border-white/5">
                <h3 className="text-xl font-bold text-white flex items-center gap-3 font-display">
                  <ShoppingBag size={22} className="text-gold-500" />
                  Pagamento
                </h3>
              </div>

              <div className="p-8">
                {selectedServices.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-700">
                      <ShoppingBag size={24} />
                    </div>
                    <p className="text-neutral-500 text-sm italic leading-relaxed">
                      Selecione seus serviços preferidos e faça o pagamento.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-8">
                    {servicesList.filter(s => selectedServices.includes(s.id)).map(item => (
                      <div key={item.id} className="flex justify-between text-sm text-neutral-300">
                        <span className="max-w-[70%]">{item.name}</span>
                        <span className="font-bold whitespace-nowrap">R$ {item.price.toFixed(2).replace('.', ',')}</span>
                      </div>
                    ))}
                    <div className="border-t border-white/10 my-6 pt-6 flex justify-between items-center">
                      <span className="text-white font-bold uppercase tracking-widest text-xs">Subtotal</span>
                      <span className="text-3xl font-bold text-gold-500 font-display">
                        R$ {total.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                )}

                {!showPixPayment ? (
                  <button
                    onClick={() => setShowPixPayment(true)}
                    disabled={total === 0}
                    className="w-full bg-gold-500 hover:bg-gold-400 disabled:bg-neutral-800 disabled:text-neutral-600 disabled:cursor-not-allowed text-black font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-gold-500/20 uppercase tracking-widest text-xs"
                  >
                    FECHAR PEDIDO
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <div className="animate-fade-in-up">
                    <div className="bg-white p-6 rounded-2xl mb-6 shadow-inner">
                      <div className="aspect-square bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-center relative overflow-hidden">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(pixCode)}`}
                          alt="QR Code Pix"
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                    </div>
                    
                    <p className="text-xs text-center text-neutral-400 mb-6 leading-relaxed">
                      Realize o pagamento e envie o comprovante pelo nosso WhatsApp.
                    </p>

                    <button
                      onClick={handleCopyPix}
                      className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 mb-4 active:scale-95 text-sm"
                    >
                      {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                      {copied ? "Pix Copiado!" : "Copiar Código Pix"}
                    </button>

                    <button
                      onClick={() => setShowPixPayment(false)}
                      className="w-full text-neutral-500 hover:text-white text-xs uppercase tracking-widest font-bold py-2 transition-colors"
                    >
                      Voltar ao Menu
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;