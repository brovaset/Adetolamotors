import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, ChevronDown, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { VEHICLES } from '../data/inventory';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Message {
  id: string;
  from: 'bot' | 'user';
  text: string;
  quickReplies?: string[];
  showInventory: boolean;
  time: Date;
}

const TRIGGERS: Record<string, string> = {
  'See our vehicles': 'vehicle',
  'Pricing info': 'price',
  'Pricing & budget': 'price',
  'How to order': 'how to order',
  'Contact us': 'contact',
  'Get a quote': 'price',
  'Request a vehicle': 'vehicle',
  'See vehicles': 'vehicle',
  'Voir nos véhicules': 'véhicule',
  'Prix & budget': 'prix',
  'Comment commander': 'comment commander',
  'Nous contacter': 'contacter',
  'Obtenir un devis': 'prix',
  'Demander un véhicule': 'véhicule',
  'Voir les véhicules': 'véhicule',
  'Info prix': 'prix',
};

interface BotReply {
  text: string;
  quick: string[];
  showInventory: boolean;
}

function getBotReply(input: string, lang: 'en' | 'fr'): BotReply {
  const s = input.toLowerCase();
  const isVehicle = /vehicle|voiture|vehicule|car|inventory|stock|available|toyota|lexus|mazda|pontiac|rav4|corolla|highlander|yaris|matrix|rx330|rx350|gx460|cx.?5/.test(s);
  const isPrice   = /price|prix|cost|cout|how much|combien|budget|afford|cher|rate|tarif|usd|\$/.test(s);
  const isOrder   = /order|commander|process|step|etape|get started|commencer|book|reserve/.test(s);
  const isContact = /contact|joindre|whatsapp|email|phone|telephone|call|appeler|address|adresse/.test(s);
  const isPayment = /pay|payer|payment|paiement|bank|transfer|wire|virement|zelle/.test(s);
  const isGreet   = /hi|hello|hey|bonjour|salut|good morning|good afternoon/.test(s);

  if (lang === 'en') {
    if (isVehicle) return {
      text: `🚗 Here's our full inventory — **${VEHICLES.length} vehicles** ready to export to Benin:`,
      quick: ['Request a vehicle', 'Pricing info', 'Contact us'],
      showInventory: true,
    };
    if (isPrice) return {
      text: "💰 Our prices vary by model:\n\n• Economy sedans: **$3,000–$6,000**\n• Compact SUVs: **$5,000–$10,000**\n• Full-size SUVs / Lexus: **$8,000–$18,000**",
      quick: ['See our vehicles', 'Contact us', 'How to order'],
      showInventory: false,
    };
    if (isOrder) return {
      text: "📋 How to order:\n\n1. 🔍 Browse our vehicles\n2. 📞 Contact us\n3. 💳 Make payment\n4. 🚢 We handle delivery to Benin",
      quick: ['See our vehicles', 'Contact us', 'Pricing info'],
      showInventory: false,
    };
    if (isContact) return {
      text: "📞 Reach us:\n\n• **WhatsApp:** +1 (917) 244-1816\n• **Email:** adetola.llc@gmail.com\n• **Location:** New York, USA 🇺🇸",
      quick: ['See our vehicles', 'How to order', 'Pricing info'],
      showInventory: false,
    };
    if (isPayment) return {
      text: "💳 Payment options:\n\n• **Bank Wire Transfer**\n• **Zelle** (US customers)",
      quick: ['See our vehicles', 'Contact us', 'How to order'],
      showInventory: false,
    };
    if (isGreet) return {
      text: "👋 Hello! Welcome to **ADETOLA MOTORS**! How can I help you today?",
      quick: ['See our vehicles', 'Pricing & budget', 'How to order', 'Contact us'],
      showInventory: false,
    };
    return {
      text: "🤔 Our team can help!\n\n• Fill the **contact form** on this page\n• **WhatsApp:** +1 (917) 244-1816\n• **Email:** adetola.llc@gmail.com",
      quick: ['See our vehicles', 'How to order', 'Contact us'],
      showInventory: false,
    };
  } else {
    if (isVehicle) return {
      text: `🚗 Voici notre inventaire — **${VEHICLES.length} véhicules** disponibles:`,
      quick: ['Demander un véhicule', 'Info prix', 'Nous contacter'],
      showInventory: true,
    };
    if (isPrice) return {
      text: "💰 Nos prix varient selon le modèle:\n\n• Berlines: **3 000–6 000 $**\n• SUV compacts: **5 000–10 000 $**\n• Grand SUV / Lexus: **8 000–18 000 $**",
      quick: ['Voir nos véhicules', 'Nous contacter', 'Comment commander'],
      showInventory: false,
    };
    if (isOrder) return {
      text: "📋 Commander en 4 étapes:\n\n1. 🔍 Parcourez l'inventaire\n2. 📞 Contactez-nous\n3. 💳 Paiement\n4. 🚢 Livraison au Bénin",
      quick: ['Voir nos véhicules', 'Nous contacter', 'Info prix'],
      showInventory: false,
    };
    if (isContact) return {
      text: "📞 Nous joindre:\n\n• **WhatsApp:** +1 (917) 244-1816\n• **Email:** adetola.llc@gmail.com\n• **Adresse:** New York, USA 🇺🇸",
      quick: ['Voir nos véhicules', 'Comment commander', 'Info prix'],
      showInventory: false,
    };
    if (isPayment) return {
      text: "💳 Options de paiement:\n\n• **Virement bancaire**\n• **Zelle** (clients USA)",
      quick: ['Voir nos véhicules', 'Nous contacter', 'Comment commander'],
      showInventory: false,
    };
    if (isGreet) return {
      text: "👋 Bonjour! Bienvenue chez **ADETOLA MOTORS**! Comment puis-je vous aider?",
      quick: ['Voir nos véhicules', 'Prix & budget', 'Comment commander', 'Nous contacter'],
      showInventory: false,
    };
    return {
      text: "🤔 Notre équipe peut vous aider!\n\n• Formulaire de **contact** sur cette page\n• **WhatsApp:** +1 (917) 244-1816",
      quick: ['Voir nos véhicules', 'Comment commander', 'Nous contacter'],
      showInventory: false,
    };
  }
}

function Markdown({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i, arr) => (
        <span key={i}>
          {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )}
          {i < arr.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

function VehicleGrid({ lang, onInquire }: { lang: 'en' | 'fr'; onInquire: () => void }) {
  return (
    <div style={{ width: '100%', marginTop: '8px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {VEHICLES.map((v, i) => (
          <div
            key={i}
            style={{
              background: '#fff',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ width: '100%', height: '80px', background: '#f3f4f6', overflow: 'hidden' }}>
              <ImageWithFallback
                src={v.image}
                alt={v.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{ padding: '8px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#111827', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {v.name}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '3px' }}>
                <Calendar style={{ width: '10px', height: '10px', color: '#9ca3af', flexShrink: 0 }} />
                <span style={{ fontSize: '10px', color: '#6b7280' }}>{v.years}</span>
              </div>
              <button
                onClick={onInquire}
                style={{
                  marginTop: '6px',
                  width: '100%',
                  fontSize: '10px',
                  fontWeight: 600,
                  background: '#16a34a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '5px 0',
                  cursor: 'pointer',
                }}
              >
                {lang === 'fr' ? 'Demander' : 'Inquire'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>
        {lang === 'fr' ? `${VEHICLES.length} véhicules disponibles` : `${VEHICLES.length} vehicles available`}
      </p>
    </div>
  );
}

export function Chatbot() {
  const { language } = useLanguage();
  const lang = language as 'en' | 'fr';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const greetMsg = lang === 'fr'
    ? "👋 Bonjour! Bienvenue chez **ADETOLA MOTORS**! Comment puis-je vous aider aujourd'hui?"
    : "👋 Hello! Welcome to **ADETOLA MOTORS**! How can I help you today?";
  const greetQuick = lang === 'fr'
    ? ['Voir nos véhicules', 'Prix & budget', 'Comment commander', 'Nous contacter']
    : ['See our vehicles', 'Pricing & budget', 'How to order', 'Contact us'];

  const openChat = () => {
    setIsOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      setTimeout(() => {
        setMessages([{
          id: '1', from: 'bot', text: greetMsg,
          quickReplies: greetQuick, showInventory: false, time: new Date(),
        }]);
      }, 300);
    }
  };

  const pushBot = (reply: BotReply) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        from: 'bot',
        text: reply.text,
        quickReplies: reply.quick,
        showInventory: reply.showInventory,
        time: new Date(),
      }]);
    }, 700 + Math.random() * 400);
  };

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    setMessages(prev => [...prev, {
      id: Date.now().toString(), from: 'user',
      text: text.trim(), showInventory: false, time: new Date(),
    }]);
    setInput('');
    pushBot(getBotReply(text.trim(), lang));
  };

  const handleQuickReply = (label: string) => {
    if (isTyping) return;
    const trigger = TRIGGERS[label] || label;
    setMessages(prev => [...prev, {
      id: Date.now().toString(), from: 'user',
      text: label, showInventory: false, time: new Date(),
    }]);
    pushBot(getBotReply(trigger, lang));
  };

  const handleInquire = () => {
    setIsOpen(false);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const chatTitle    = lang === 'fr' ? 'Assistant ADETOLA' : 'ADETOLA Assistant';
  const chatSubtitle = lang === 'fr' ? 'Généralement en ligne' : 'Usually online';
  const placeholder  = lang === 'fr' ? 'Tapez votre message...' : 'Type your message...';

  const chatWindowStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '96px',
    right: '16px',
    zIndex: 90,
    width: 'min(calc(100vw - 2rem), 360px)',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', duration: 0.3 }}
            style={chatWindowStyle}
          >
            {/* Header */}
            <div style={{
              flexShrink: 0,
              background: 'linear-gradient(to right, #15803d, #16a34a)',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: '36px', height: '36px', background: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Bot style={{ width: '20px', height: '20px', color: '#fff' }} />
                  </div>
                  <span style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: '10px', height: '10px', background: '#86efac',
                    borderRadius: '50%', border: '2px solid #15803d',
                  }} />
                </div>
                <div>
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: '14px', margin: 0 }}>{chatTitle}</p>
                  <p style={{ color: '#bbf7d0', fontSize: '11px', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{
                      width: '6px', height: '6px', background: '#86efac',
                      borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite',
                    }} />
                    {chatSubtitle}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', padding: '6px', borderRadius: '8px' }}
                >
                  <ChevronDown style={{ width: '20px', height: '20px' }} />
                </button>
                <button
                  onClick={() => { setIsOpen(false); setMessages([]); setHasOpened(false); }}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', padding: '6px', borderRadius: '8px' }}
                >
                  <X style={{ width: '20px', height: '20px' }} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#f9fafb' }}>
              <AnimatePresence initial={false}>
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: 'flex', gap: '8px', flexDirection: msg.from === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-start' }}
                  >
                    {/* Avatar */}
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                      background: msg.from === 'bot' ? '#16a34a' : '#374151',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px',
                    }}>
                      {msg.from === 'bot'
                        ? <Bot style={{ width: '14px', height: '14px', color: '#fff' }} />
                        : <User style={{ width: '14px', height: '14px', color: '#fff' }} />
                      }
                    </div>

                    {/* Content */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      alignItems: msg.from === 'user' ? 'flex-end' : 'flex-start',
                      flex: msg.from === 'bot' && msg.showInventory ? 1 : undefined,
                      maxWidth: msg.from === 'bot' && msg.showInventory ? undefined : '78%',
                    }}>
                      {/* Bubble */}
                      <div style={{
                        padding: '10px 14px',
                        borderRadius: msg.from === 'bot' ? '16px 16px 16px 4px' : '16px 4px 16px 16px',
                        background: msg.from === 'bot' ? '#fff' : '#16a34a',
                        color: msg.from === 'bot' ? '#1f2937' : '#fff',
                        fontSize: '13px',
                        lineHeight: 1.5,
                        boxShadow: msg.from === 'bot' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                        border: msg.from === 'bot' ? '1px solid #f3f4f6' : 'none',
                      }}>
                        <Markdown text={msg.text} />
                      </div>

                      {/* Vehicle grid */}
                      {msg.from === 'bot' && msg.showInventory && (
                        <VehicleGrid lang={lang} onInquire={handleInquire} />
                      )}

                      {/* Quick replies */}
                      {msg.from === 'bot' && msg.quickReplies && msg.quickReplies.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {msg.quickReplies.map((qr, i) => (
                            <button
                              key={i}
                              onClick={() => handleQuickReply(qr)}
                              style={{
                                fontSize: '12px',
                                padding: '6px 12px',
                                borderRadius: '999px',
                                border: '2px solid #16a34a',
                                color: '#15803d',
                                background: '#fff',
                                cursor: 'pointer',
                                fontWeight: 500,
                              }}
                            >
                              {qr}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', background: '#16a34a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Bot style={{ width: '14px', height: '14px', color: '#fff' }} />
                  </div>
                  <div style={{
                    background: '#fff', borderRadius: '16px 16px 16px 4px',
                    padding: '12px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    border: '1px solid #f3f4f6', display: 'flex', gap: '4px', alignItems: 'center',
                  }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.13 }}
                        style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ flexShrink: 0, padding: '12px', background: '#fff', borderTop: '1px solid #e5e7eb' }}>
              <form
                onSubmit={e => { e.preventDefault(); sendMessage(input); }}
                style={{ display: 'flex', gap: '8px' }}
              >
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={placeholder}
                  style={{
                    flex: 1, height: '40px', padding: '0 12px', borderRadius: '12px',
                    border: '1px solid #d1d5db', fontSize: '16px', outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  style={{
                    width: '40px', height: '40px', borderRadius: '12px', border: 'none',
                    background: input.trim() && !isTyping ? '#16a34a' : '#d1d5db',
                    color: '#fff', cursor: input.trim() && !isTyping ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                >
                  <Send style={{ width: '16px', height: '16px' }} />
                </button>
              </form>
              <p style={{ textAlign: 'center', color: '#d1d5db', fontSize: '10px', marginTop: '6px', marginBottom: 0 }}>
                ADETOLA MOTORS • Virtual Assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={isOpen ? () => setIsOpen(false) : openChat}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        style={{
          position: 'fixed', bottom: '20px', right: '16px', zIndex: 90,
          width: '56px', height: '56px', borderRadius: '50%',
          background: '#16a34a', border: 'none', color: '#fff',
          boxShadow: '0 8px 24px rgba(22,163,74,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.div key="x"  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.12 }}>
                <X style={{ width: '24px', height: '24px' }} />
              </motion.div>
            : <motion.div key="mc" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.12 }}>
                <MessageCircle style={{ width: '24px', height: '24px' }} />
              </motion.div>
          }
        </AnimatePresence>

        {!hasOpened && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: 'absolute', top: '-4px', right: '-4px',
              width: '18px', height: '18px', background: '#ef4444',
              borderRadius: '50%', border: '2px solid #fff',
              color: '#fff', fontSize: '9px', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >1</motion.span>
        )}
      </motion.button>
    </>
  );
}