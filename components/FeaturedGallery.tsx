import React from 'react';

const FeaturedGallery: React.FC = () => {
  const images = [
    "https://i.postimg.cc/Px5qqsFN/1770476306793_7547f5b7_43cb_494e_8224_25b688eee388_1.jpg",
    "https://i.postimg.cc/Y9CSSKyF/1770476306793_7547f5b7_43cb_494e_8224_25b688eee388_2.jpg",
    "https://i.postimg.cc/rmwppXYx/1770476306793_7547f5b7_43cb_494e_8224_25b688eee388_3.jpg",
    "https://i.postimg.cc/d1V00PSR/1770476306793_7547f5b7_43cb_494e_8224_25b688eee388_4.jpg",
    "https://i.postimg.cc/G2mppwSy/1770476306793_7547f5b7_43cb_494e_8224_25b688eee388_5.jpg",
    "https://i.postimg.cc/fLqRt260/1770476306793_7547f5b7_43cb_494e_8224_25b688eee388_6.jpg"
  ];

  return (
    <section className="w-full bg-black overflow-hidden border-y border-white/5">
      <div className="flex flex-col gap-0">
        {images.map((src, index) => (
          <div 
            key={index} 
            className="w-full overflow-hidden group relative"
          >
            <img 
              src={src} 
              alt={`Trabalho Studio ${index + 1}`} 
              className="w-full h-auto block object-cover transition-transform duration-1000"
              loading="lazy"
            />
            {/* Overlay sutil ao passar o mouse para profundidade visual */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedGallery;