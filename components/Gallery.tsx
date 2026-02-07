import React from 'react';

const Gallery: React.FC = () => {
  const instagramLink = "https://www.instagram.com/ellyoliveira_studiodebeleza?igsh=MWl0dDJ2ODBkNDU0Zw==";

  const images = [
    "https://i.postimg.cc/q7xvKwfM/611274587_18439273207101321_1188049271465715853_n.jpg",
    "https://i.postimg.cc/1tR5rFPy/610839839_18440108332101321_7413976725594734924_n.jpg",
    "https://i.postimg.cc/RFCVLt9m/590426487_18435302362101321_3897339110247163519_n.jpg",
    "https://i.postimg.cc/j5qd4fKr/571135299_18429433150101321_653529544185464980_n.jpg",
    "https://i.postimg.cc/sXfD4Wyj/548539881_18421362751101321_8744365847603069675_n.jpg",
    "https://i.postimg.cc/j5qd4fK0/559339744_18424819765101321_5069455768314426132_n.jpg",
  ];

  return (
    <section id="galeria" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-sm font-bold text-gold-500 uppercase tracking-[0.4em] mb-4">Portfólio</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white font-display">Nossas Transformações</h3>
          </div>
          <a 
            href={instagramLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gold-500 font-bold uppercase tracking-widest text-xs hover:text-gold-400 mt-6 md:mt-0 border-b border-gold-500/30 pb-2 transition-all"
          >
            Siga-nos no Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <a 
              key={index} 
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-3xl aspect-[4/5] border border-white/5 shadow-2xl block cursor-pointer"
            >
              <img 
                src={src} 
                alt={`Transformação ${index + 1}`} 
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <span className="text-white font-bold tracking-[0.2em] uppercase text-xs">
                  Ver no Instagram
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;