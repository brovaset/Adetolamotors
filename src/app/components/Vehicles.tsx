import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Vehicles() {
  const { t } = useLanguage();

  const vehicles = [
    {
      name: 'Toyota RAV4',
      years: '2010-2016',
      image: 'https://images.unsplash.com/photo-1617600346256-af3cd5b16a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjBSQVY0JTIwU1VWfGVufDF8fHx8MTc3MTYxMjM3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Toyota Corolla',
      years: '2003-2010+',
      image: 'https://images.unsplash.com/photo-1763268265028-1631360c07dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjBDb3JvbGxhJTIwc2VkYW58ZW58MXx8fHwxNzcxNTQ5Mzg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Toyota Matrix',
      years: '2007-2025',
      image: 'https://images.unsplash.com/photo-1720545044233-d2ac77fa6030?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjB3YWdvbiUyMGNvbXBsZXRlJTIwY2FyfGVufDF8fHx8MTc3MTYxOTU1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Pontiac',
      years: '2007-2025',
      image: 'https://images.unsplash.com/photo-1658479202733-6ee950b78dbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQb250aWFjJTIwY29tcGFjdCUyMFNVViUyMGZyb250JTIwdmlld3xlbnwxfHx8fDE3NzE2MjA5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Toyota Highlander',
      years: '2012-2016',
      image: 'https://images.unsplash.com/photo-1610855143470-0967a7348972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjBIaWdobGFuZGVyJTIwU1VWfGVufDF8fHx8MTc3MTUyNjU1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Toyota Yaris Sedan',
      years: '2007, 2016',
      image: 'https://images.unsplash.com/photo-1749058983469-11eaef8d7bc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjBZYXJpcyUyMHNlZGFufGVufDF8fHx8MTc3MTYxODY5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Mazda CX-5',
      years: '2013-2016',
      image: 'https://images.unsplash.com/photo-1557800524-af842580933c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYXpkYSUyMENYNSUyMFNVVnxlbnwxfHx8fDE3NzE2MTg2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Lexus RX330',
      years: '2004-2005',
      image: 'https://images.unsplash.com/photo-1702757329625-79a1fce52614?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMZXh1cyUyMFJYJTIwZGVhbGVyc2hpcCUyMHN0b2NrJTIwcGhvdG98ZW58MXx8fHwxNzcxNjIwNzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Lexus RX350',
      years: '2010-2016',
      image: 'https://images.unsplash.com/photo-1742941129482-843e7492aa0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMZXh1cyUyMFJYJTIwbHV4dXJ5JTIwdmVoaWNsZXxlbnwxfHx8fDE3NzE2MTkzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Lexus GX460',
      years: '2010-2016',
      image: 'https://images.unsplash.com/photo-1759355787078-9ce9fde2503a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMZXh1cyUyMEdYNDYwJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzcxNjIwMDA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="vehicles" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
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