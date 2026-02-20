import React from 'react';
import { motion } from 'motion/react';
import { Search, FileText, CreditCard, Package } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      title: t('step1Title'),
      description: t('step1Text'),
    },
    {
      icon: FileText,
      title: t('step2Title'),
      description: t('step2Text'),
    },
    {
      icon: CreditCard,
      title: t('step3Title'),
      description: t('step3Text'),
    },
    {
      icon: Package,
      title: t('step4Title'),
      description: t('step4Text'),
    },
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-black">
            {t('howItWorksTitle')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-green-600">
                <div className="flex flex-col items-center text-center">
                  <div className="relative inline-flex p-4 rounded-full bg-green-600 mb-4 shadow-lg">
                    <step.icon className="w-8 h-8 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-black">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}