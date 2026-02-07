import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIStyleConsultant from './components/AIStyleConsultant';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200 selection:bg-gold-500 selection:text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <AIStyleConsultant />
    </div>
  );
};

export default App;