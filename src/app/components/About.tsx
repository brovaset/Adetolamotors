import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, DollarSign, Ship, Headphones } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function About() {
  const { t } = useLanguage();

  const features = [
    {
      icon: ShieldCheck,
      title: t('qualityTitle'),
      description: t('qualityText'),
    },
    {
      icon: DollarSign,
      title: t('affordableTitle'),
      description: t('affordableText'),
    },
    {
      icon: Ship,
      title: t('reliableTitle'),
      description: t('reliableText'),
    },
    {
      icon: Headphones,
      title: t('supportTitle'),
      description: t('supportText'),
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-black">
            {t('aboutTitle')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('aboutText')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 h-full border-2 border-gray-200 hover:border-green-600">
                <div className="inline-flex p-3 rounded-lg bg-green-600 mb-4 shadow-lg">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}