import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, XCircle, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

export function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleType: '',
    budget: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Create email content
    const subject = encodeURIComponent(`Vehicle Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Vehicle Type: ${formData.vehicleType}\n` +
      `Budget: ${formData.budget}\n\n` +
      `Message:\n${formData.message}`
    );

    // Open email client
    window.location.href = `mailto:adetola.llc@gmail.com?subject=${subject}&body=${body}`;

    // Show success message
    setStatus('success');

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        vehicleType: '',
        budget: '',
        message: '',
      });
      setStatus('idle');
    }, 3000);
  };

  const handleWhatsAppSubmit = () => {
    // Create WhatsApp message
    const message = encodeURIComponent(
      `Hello ADETOLA MOTORS! I'm interested in requesting a vehicle.\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Vehicle Type: ${formData.vehicleType}\n` +
      `Budget: ${formData.budget}\n\n` +
      `Message:\n${formData.message}`
    );

    // Open WhatsApp
    window.open(`https://wa.me/19172441816?text=${message}`, '_blank');

    // Show success message
    setStatus('success');

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        vehicleType: '',
        budget: '',
        message: '',
      });
      setStatus('idle');
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black">
            {t('contactTitle')}
          </h2>
          <p className="text-lg text-gray-600">{t('contactSubtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-2xl border-2 border-gray-200 p-8 md:p-12"
        >
          {status === 'success' ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('successMessage')}
              </h3>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('fullName')}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'submitting'}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'submitting'}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={status === 'submitting'}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">{t('budget')}</Label>
                  <Input
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder={t('budgetPlaceholder')}
                    disabled={status === 'submitting'}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleType">{t('vehicleType')}</Label>
                <Input
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  placeholder={t('vehiclePlaceholder')}
                  required
                  disabled={status === 'submitting'}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t('message')}</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('messagePlaceholder')}
                  rows={5}
                  disabled={status === 'submitting'}
                  className="resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex-1 h-14 text-lg bg-green-600 hover:bg-green-700 text-white"
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t('submitting')}
                    </span>
                  ) : (
                    <>
                      <Send className="mr-2 w-5 h-5" />
                      {t('sendViaEmail')}
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  disabled={status === 'submitting' || !formData.name || !formData.vehicleType}
                  className="flex-1 h-14 text-lg bg-[#25D366] hover:bg-[#20BA5A] text-white"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  {t('sendViaWhatsApp')}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}