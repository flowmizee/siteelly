import React, { useState, useMemo } from 'react';
import { Sparkles, Heart, ShoppingBag, Check, Copy, ChevronRight, Zap, X, Maximize2 } from 'lucide-react';

/**
 * Cálculo do CRC16 padrão CCITT (0xFFFF) para conformidade com o padrão Pix do Banco Central.
 */
const calculateCRC16 = (payload: string): string => {
  let crc = 0xFFFF;
  const polynomial = 0x1021;

  for (let i = 0; i < payload.length; i++) {
    crc ^= (payload.charCodeAt(i) << 8);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ polynomial) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
};

/**
 * Formata um campo EMV no padrão ID + Tamanho + Valor.
 */
const formatEMVField = (id: string, value: string): string => {
  const size = value.length.toString().padStart(2, '0');
  return `${id}${size}${value}`;
};

/**
 * Limpa e normaliza o texto para o padrão ASCII exigido pelo Pix.
 */
const cleanString = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
};

/**
 * Gera o código Pix Copia e Cola Estático (BR Code).
 * Configuração: Sem Valor, Sem TXID, Chave 98981420070.
 */
const generatePurePixCode = (): string => {
  const key = "98981420070";
  const merchantName = cleanString("ELLY OLIVEIRA STUDIO").substring(0, 25);
  const merchantCity = cleanString("PARAUAPEBAS");

  // Merchant Account Information (ID 26)
  const gui = formatEMVField("00", "BR.GOV.BCB.PIX");
  const keyField = formatEMVField("01", key);
  const merchantAccountInfo = formatEMVField("26", gui + keyField);

  // Montagem do Payload Base (Sem Tag 54 de valor e Tag 62 de TXID conforme pedido)
  const payloadBase = 
    "000201" +                          // Payload Format Indicator
    merchantAccountInfo +               // Informações da conta
    "52040000" +                        // Merchant Category Code
    "5303986" +                         // Moeda (BRL)
    "5802BR" +                          // Código do país
    formatEMVField("59", merchantName) + // Nome do recebedor
    formatEMVField("60", merchantCity) + // Cidade
    "6304";                             // CRC Tag (Início)

  return `${payloadBase}${calculateCRC16(payloadBase)}`;
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
    { id: 'brown-lamination', name: 'Brown Lamination', price: 120.00, images: ["https://i.postimg.cc/rshxMcV7/IMG-20260206-213234.jpg"] },
    { id: 'henna', name: 'Design com Henna', price: 60.00, images: ["https://i.postimg.cc/Y9rv9VsQ/IMG-20260206-213427.jpg"] },
    { id: 'manicure-60', name: 'Manicures Especial', price: 59.99, images: ["https://i.postimg.cc/pdxTG4xS/IMG-20260206-213649.jpg"] },
    { id: 'massagem-ventosa', name: 'Massagem e Ventosaterapia', price: 149.00, images: ["https://i.postimg.cc/jqNjTR5J/IMG_20260206_213828.jpg"] },
    { id: 'cabelos', name: 'Cabelos', price: 199.00, images: ["https://i.postimg.cc/pXWMSvn5/IMG_20260206_214157.jpg"] },
    { id: 'penteados', name: 'Penteados', price: 150.00, images: ["https://i.postimg.cc/0Nm4QXJc/IMG_20260206_214456.jpg"] },
    { id: 'cilios-fio', name: 'Cílios Fio a Fio', price: 120.00, images: ["https://i.postimg.cc/J4GP0dwW/IMG_20260206_214957.jpg"] },
    { id: 'cilios-6d', name: 'Cílios 6D', price: 180.00, images: ["https://i.postimg.cc/4NmByFCg/IMG_20260206_215027.jpg"] },
    { id: 'cilios-5d', name: 'Cílios 5D', price: 180.00, images: ["https://i.postimg.cc/T3x002Lf/IMG_20260206_215325.jpg"] },
    { id: 'brasileiro', name: 'Brasileiro Marcante', price: 180.00, images: ["https://i.postimg.cc/K85NHXLd/IMG_20260206_215349.jpg"] },
    { id: 'extensao-classico', name: 'Extensão Clássica', price: 130.00, images: ["https://i.postimg.cc/Sx4ddQ2Q/IMG_20260206_215412.jpg"] },
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
  }, [selectedServices]);

  const pixCode = useMemo(() => generatePurePixCode(), []);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="servicos" className="py-24 bg-black">
      {fullscreenImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in" onClick={() => setFullscreenImage(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-gold-500 transition-colors z-[110]">
            <X size={32} />
          </button>
          <img src={fullscreenImage} alt="View" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-gold-500 uppercase tracking-[0.4em] mb-4">Nossos Serviços</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white font-display">Menu de Beleza e Bem-Estar</h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
          <div className="flex-1 bg-neutral-900/50 rounded-3xl p-8 border border-white/5">
             <div className="flex items-center justify-between mb-10">
               <div>
                <h3 className="text-2xl font-bold text-white font-display">Personalize seu cuidado</h3>
                <p className="text-neutral-500 text-sm mt-1">Selecione o serviço para calcular o valor e gerar o pagamento.</p>
               </div>
               <span className="text-[10px] text-gold-500 bg-gold-500/10 px-4 py-1.5 rounded-full uppercase tracking-widest font-black border border-gold-500/20">Studio Catálogo</span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {servicesList.map((service) => (
                 <div 
                   key={service.id}
                   className={`flex flex-col rounded-3xl border transition-all duration-300 overflow-hidden ${
                     selectedServices.includes(service.id) ? 'bg-gold-500/10 border-gold-500 shadow-xl shadow-gold-500/10' : 'bg-black/40 border-white/5 hover:border-white/20'
                   }`}
                 >
                   <div className="relative h-56 w-full bg-neutral-800 overflow-hidden group/img">
                      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full">
                        {service.images.map((img, i) => (
                          <div key={i} className="flex-none w-full h-full snap-center relative">
                            <img src={img} alt={service.name} className="w-full h-full object-cover" />
                            <button onClick={() => setFullscreenImage(img)} className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity">
                              <Maximize2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                   </div>

                   <div onClick={() => toggleService(service.id)} className="p-6 cursor-pointer">
                     <div className="flex justify-between items-start mb-4">
                       <h4 className="text-lg font-bold text-white font-display leading-tight">{service.name}</h4>
                       <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                         selectedServices.includes(service.id) ? 'bg-gold-500 border-gold-500 text-black' : 'border-neutral-700'
                       }`}>
                         {selectedServices.includes(service.id) && <Check size={14} strokeWidth={4} />}
                       </div>
                     </div>
                     <span className="text-gold-500 font-bold text-xl font-display">R$ {service.price.toFixed(2).replace('.', ',')}</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="lg:w-96">
            <div className="bg-neutral-900 rounded-3xl border border-white/10 sticky top-24 overflow-hidden shadow-2xl">
              <div className="p-8 bg-white/5 border-b border-white/5">
                <h3 className="text-xl font-bold text-white flex items-center gap-3 font-display">
                  <ShoppingBag size={22} className="text-gold-500" /> Pagamento
                </h3>
              </div>

              <div className="p-8">
                {selectedServices.length === 0 ? (
                  <p className="text-center py-10 text-neutral-500 text-sm italic">Selecione seus serviços para continuar.</p>
                ) : (
                  <div className="space-y-4 mb-8">
                    {servicesList.filter(s => selectedServices.includes(s.id)).map(item => (
                      <div key={item.id} className="flex justify-between text-sm text-neutral-300">
                        <span>{item.name}</span>
                        <span className="font-bold">R$ {item.price.toFixed(2).replace('.', ',')}</span>
                      </div>
                    ))}
                    <div className="border-t border-white/10 pt-6 flex justify-between items-center">
                      <span className="text-white font-bold uppercase tracking-widest text-xs">Total Sugerido</span>
                      <span className="text-3xl font-bold text-gold-500 font-display">R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                )}

                {!showPixPayment ? (
                  <button onClick={() => setShowPixPayment(true)} disabled={total === 0} className="w-full bg-gold-500 hover:bg-gold-400 disabled:bg-neutral-800 disabled:text-neutral-600 text-black font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl uppercase tracking-widest text-xs">
                    FINALIZAR PEDIDO <ChevronRight size={18} />
                  </button>
                ) : (
                  <div className="animate-fade-in-up">
                    <div className="bg-white p-6 rounded-2xl mb-6 flex justify-center shadow-inner">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(pixCode)}`}
                        alt="Pix QR Code"
                        className="w-48 h-48 object-contain"
                      />
                    </div>
                    
                    <p className="text-[10px] text-center text-neutral-400 mb-6 leading-relaxed uppercase tracking-widest">
                      Chave Pix: <strong>98981420070</strong><br/>
                      Ao pagar, digite o valor: <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
                    </p>

                    <button onClick={handleCopyPix} className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 mb-4 text-sm">
                      {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                      {copied ? "Código Copiado!" : "Copiar Pix Copia e Cola"}
                    </button>

                    <button onClick={() => setShowPixPayment(false)} className="w-full text-neutral-500 hover:text-white text-xs uppercase tracking-widest font-bold py-2 transition-colors">
                      Voltar e Ajustar
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