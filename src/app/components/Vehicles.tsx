import React from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VEHICLES } from '../data/inventory';

export function Vehicles() {
  const { t } = useLanguage();

  const vehicles = VEHICLES;

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="vehicles" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black">
            {t('vehiclesTitle')}
          </h2>
          <p className="text-lg text-gray-600">{t('vehiclesSubtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-green-600">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
                  <ImageWithFallback
                    src={vehicle.image}
                    alt={`${vehicle.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-black">
                    {vehicle.name}
                  </h3>

                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                      <Calendar className="w-4 h-4 text-gray-700" />
                      <span className="text-sm font-medium text-gray-700">{vehicle.years}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}