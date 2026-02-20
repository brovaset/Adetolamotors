import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    home: 'Home',
    about: 'About',
    services: 'Services',
    vehicles: 'Vehicles',
    contact: 'Contact',
    
    // Hero
    heroTitle: 'Your Gateway to Affordable Quality Cars',
    heroSubtitle: 'From USA to Benin - Premium Used Cars at Unbeatable Prices',
    requestVehicle: 'Request a Vehicle',
    browseInventory: 'Browse Inventory',
    
    // Stats
    yearsExperience: 'Years Experience',
    carsSold: 'Cars Delivered',
    happyClients: 'Happy Clients',
    
    // About
    aboutTitle: 'Why Choose ADETOLA MOTORS?',
    aboutText: 'We specialize in sourcing quality pre-owned vehicles from the United States and delivering them directly to Benin. We ensure every car meets strict quality standards while keeping prices affordable for our valued customers.',
    
    // Features
    qualityTitle: 'Quality Assured',
    qualityText: 'Every vehicle undergoes thorough inspection',
    affordableTitle: 'Affordable Prices',
    affordableText: 'Best market rates with no hidden fees',
    reliableTitle: 'Reliable Shipping',
    reliableText: 'Safe and timely delivery to Benin',
    supportTitle: '24/7 Support',
    supportText: 'Dedicated team ready to assist you',
    
    // How it Works
    howItWorksTitle: 'How It Works',
    step1Title: 'Choose Your Vehicle',
    step1Text: 'Browse our inventory or request a specific model',
    step2Title: 'Get a Quote',
    step2Text: 'Receive transparent pricing including all costs',
    step3Title: 'Secure Payment',
    step3Text: 'Make payment through our secure channels',
    step4Title: 'Delivery',
    step4Text: 'We handle shipping and customs clearance',
    
    // Vehicles
    vehiclesTitle: 'Featured Vehicles',
    vehiclesSubtitle: 'Explore our selection of quality pre-owned cars',
    viewDetails: 'View Details',
    mileage: 'miles',
    
    // Contact Form
    contactTitle: 'Request Your Vehicle',
    contactSubtitle: 'Fill out the form below and we\'ll get back to you within 24 hours',
    fullName: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    vehicleType: 'Vehicle Type Interested In',
    vehiclePlaceholder: 'e.g., Toyota Camry 2018, Honda Accord...',
    budget: 'Budget Range (USD)',
    budgetPlaceholder: 'e.g., $5,000 - $10,000',
    message: 'Additional Information',
    messagePlaceholder: 'Tell us more about your requirements...',
    submit: 'Submit Request',
    submitting: 'Submitting...',
    sendViaEmail: 'Send via Email',
    sendViaWhatsApp: 'Send via WhatsApp',
    
    // Footer
    footerAbout: 'About Us',
    footerAboutText: 'ADETOLA MOTORS is your trusted partner in importing quality used cars from the USA to Benin.',
    footerQuickLinks: 'Quick Links',
    footerServices: 'Our Services',
    footerContact: 'Contact Info',
    footerAddress: 'Cotonou, Benin',
    footerRights: 'All rights reserved.',
    
    // Success/Error
    successMessage: 'Thank you! Your request has been submitted successfully. We will contact you soon.',
    errorMessage: 'Something went wrong. Please try again.',
  },
  fr: {
    // Header
    home: 'Accueil',
    about: 'À Propos',
    services: 'Services',
    vehicles: 'Véhicules',
    contact: 'Contact',
    
    // Hero
    heroTitle: 'Votre Passerelle vers des Voitures de Qualité Abordables',
    heroSubtitle: 'Des USA au Bénin - Voitures d\'Occasion Premium à Prix Imbattables',
    requestVehicle: 'Demander un Véhicule',
    browseInventory: 'Parcourir l\'Inventaire',
    
    // Stats
    yearsExperience: 'Ans d\'Expérience',
    carsSold: 'Voitures Livrées',
    happyClients: 'Clients Satisfaits',
    
    // About
    aboutTitle: 'Pourquoi Choisir ADETOLA MOTORS?',
    aboutText: 'Nous nous spécialisons dans l\'approvisionnement de véhicules d\'occasion de qualité en provenance des États-Unis et leur livraison directe au Bénin. Nous veillons à ce que chaque voiture réponde à des normes de qualité strictes tout en maintenant des prix abordables pour nos précieux clients.',
    
    // Features
    qualityTitle: 'Qualité Assurée',
    qualityText: 'Chaque véhicule subit une inspection approfondie',
    affordableTitle: 'Prix Abordables',
    affordableText: 'Meilleurs tarifs du marché sans frais cachés',
    reliableTitle: 'Livraison Fiable',
    reliableText: 'Livraison sûre et ponctuelle au Bénin',
    supportTitle: 'Support 24/7',
    supportText: 'Équipe dédiée prête à vous assister',
    
    // How it Works
    howItWorksTitle: 'Comment Ça Marche',
    step1Title: 'Choisissez Votre Véhicule',
    step1Text: 'Parcourez notre inventaire ou demandez un modèle spécifique',
    step2Title: 'Obtenez un Devis',
    step2Text: 'Recevez une tarification transparente incluant tous les coûts',
    step3Title: 'Paiement Sécurisé',
    step3Text: 'Effectuez le paiement via nos canaux sécurisés',
    step4Title: 'Livraison',
    step4Text: 'Nous gérons l\'expédition et le dédouanement',
    
    // Vehicles
    vehiclesTitle: 'Véhicules en Vedette',
    vehiclesSubtitle: 'Explorez notre sélection de voitures d\'occasion de qualité',
    viewDetails: 'Voir Détails',
    mileage: 'miles',
    
    // Contact Form
    contactTitle: 'Demandez Votre Véhicule',
    contactSubtitle: 'Remplissez le formulaire ci-dessous et nous vous recontacterons dans les 24 heures',
    fullName: 'Nom Complet',
    email: 'Adresse Email',
    phone: 'Numéro de Téléphone',
    vehicleType: 'Type de Véhicule Souhaité',
    vehiclePlaceholder: 'ex: Toyota Camry 2018, Honda Accord...',
    budget: 'Fourchette Budgétaire (USD)',
    budgetPlaceholder: 'ex: $5,000 - $10,000',
    message: 'Informations Supplémentaires',
    messagePlaceholder: 'Parlez-nous de vos besoins...',
    submit: 'Soumettre la Demande',
    submitting: 'Envoi en cours...',
    sendViaEmail: 'Envoyer par Email',
    sendViaWhatsApp: 'Envoyer par WhatsApp',
    
    // Footer
    footerAbout: 'À Propos de Nous',
    footerAboutText: 'ADETOLA MOTORS est votre partenaire de confiance pour l\'importation de voitures d\'occasion de qualité des États-Unis au Bénin.',
    footerQuickLinks: 'Liens Rapides',
    footerServices: 'Nos Services',
    footerContact: 'Informations de Contact',
    footerAddress: 'Cotonou, Bénin',
    footerRights: 'Tous droits réservés.',
    
    // Success/Error
    successMessage: 'Merci! Votre demande a été soumise avec succès. Nous vous contacterons bientôt.',
    errorMessage: 'Une erreur s\'est produite. Veuillez réessayer.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}