import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { HowItWorks } from './components/HowItWorks';
import { Vehicles } from './components/Vehicles';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <About />
          <HowItWorks />
          <Vehicles />
          <ContactForm />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </LanguageProvider>
  );
}