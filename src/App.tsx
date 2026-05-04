import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  Server, 
  Code2, 
  ShoppingCart, 
  Cloud, 
  Globe, 
  Linkedin, 
  Github, 
  Mail, 
  Phone,
  Check,
  MessageSquare,
  X,
  Send,
  User,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

// --- Components ---

const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder 
}: { 
  options: string[], 
  value: string, 
  onChange: (val: string) => void, 
  placeholder: string 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-bg-page/50 border ${isOpen ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border-subtle hover:border-border-strong'} rounded-xl py-3 px-4 text-sm text-left flex items-center justify-between transition-all outline-none`}
      >
        <span className={value ? "text-text-primary" : "text-text-muted"}>
          {value || placeholder}
        </span>
        <ChevronDown size={16} className={`text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full left-0 right-0 mt-2 bg-bg-card border border-border-strong rounded-xl shadow-huge z-50 overflow-hidden backdrop-blur-md"
          >
            <div className="py-1">
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-sm text-left transition-colors flex items-center justify-between ${
                    value === opt 
                      ? 'bg-primary/10 text-primary font-bold' 
                      : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                  }`}
                >
                  {opt}
                  {value === opt && <Check size={14} className="text-primary" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactDrawer = ({ isOpen, onClose, initialService }: { isOpen: boolean, onClose: () => void, initialService?: string }) => {
  const [formState, setFormState] = useState({ name: '', email: '', service: initialService || '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialService) setFormState(prev => ({ ...prev, service: initialService }));
  }, [initialService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-bg-card border-l border-border-strong p-8 sm:p-10 shadow-huge z-[101] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-text-primary">Get in Touch</h2>
                <p className="text-sm text-text-muted">Tell us about your next big project</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-text-muted"
              >
                <X size={20} />
              </button>
            </div>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-[60%] flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-2">
                  <Check size={32} />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Message Received!</h3>
                <p className="text-text-secondary text-sm">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted ml-1">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Zahid Hasan"
                      className="w-full bg-bg-page/50 border border-border-subtle rounded-xl py-3 pl-10 pr-4 text-sm text-text-primary focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all outline-none hover:border-border-strong"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input 
                      required
                      type="email" 
                      placeholder="zahid@example.com"
                      className="w-full bg-bg-page/50 border border-border-subtle rounded-xl py-3 pl-10 pr-4 text-sm text-text-primary focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all outline-none hover:border-border-strong"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted ml-1">How can we help?</label>
                  <CustomSelect 
                    placeholder="Select a service"
                    value={formState.service}
                    options={[
                      "Frontend Development",
                      "Backend & API",
                      "Full-Stack Solution",
                      "E-Commerce / CMS",
                      "DevOps & Cloud"
                    ]}
                    onChange={(val) => setFormState({ ...formState, service: val })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted ml-1">Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Briefly describe your project goals..."
                    className="w-full bg-bg-page/50 border border-border-subtle rounded-xl py-3 px-4 text-sm text-text-primary focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all outline-none resize-none hover:border-border-strong"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-bg-page font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-bg-page/30 border-t-bg-page rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-12 pt-10 border-t border-border-strong grid grid-cols-1 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Email Us</p>
                  <p className="text-sm text-text-primary">hello@optmizy.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Call Us</p>
                  <p className="text-sm text-text-primary">+8801838354548</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CanvasBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; vx: number; vy: number; size: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.5;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }
      draw() {
        ctx!.fillStyle = 'rgba(145, 213, 31, 0.15)';
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const init = () => {
      resize();
      particles = [];
      const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 18000), 100);
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx!.strokeStyle = `rgba(145, 213, 31, ${0.1 * (1 - dist / 150)})`;
            ctx!.lineWidth = 0.5; ctx!.beginPath();
            ctx!.moveTo(p.x, p.y); ctx!.lineTo(p2.x, p2.y); ctx!.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    init(); animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// --- Data Ecosystem ---

const services = [
  {
    icon: <Layers className="text-primary" />,
    tech: "React, Next.js, Vue.js, Angular",
    title: "Modern Frontend Development",
    items: [
      "Pixel-Perfect UI/UX Implementation",
      "Single Page Applications (SPA)",
      "Next.js Server-Side Rendering (SSR)",
      "API & Backend Integration",
      "Performance Optimization"
    ],
    accent: "bg-primary/10 border-primary/20",
    hoverAccent: "accent-primary"
  },
  {
    icon: <Server className="text-primary" />,
    tech: "Node.js, Python, FastAPI, Golang",
    title: "Scalable Backend & API Solutions",
    items: [
      "RESTful & GraphQL API Development",
      "Secure Auth & Authorization",
      "Microservices Architecture",
      "High-Performance Computing",
      "Third-Party Integrations"
    ],
    accent: "bg-primary/5 border-primary/10",
    hoverAccent: "accent-primary"
  },
  {
    icon: <Code2 className="text-secondary" />,
    tech: "Laravel, MySQL, PostgreSQL, Firebase",
    title: "Full-Stack PHP & Laravel Development",
    items: [
      "Custom Enterprise Web Applications",
      "Advanced Admin Dashboards",
      "Custom CRM & ERP Systems",
      "Database Design & Optimization",
      "Legacy Code Modernization"
    ],
    accent: "bg-secondary/10 border-secondary/20",
    hoverAccent: "accent-secondary"
  },
  {
    icon: <ShoppingCart className="text-accent" />,
    tech: "WordPress, Shopify, Strapi, Contentful",
    title: "E-Commerce & Headless CMS",
    items: [
      "Custom E-Commerce Storefronts",
      "Payment Gateway Integration",
      "Headless CMS Architecture",
      "Product & Inventory Management",
      "SEO-Optimized CMS Setup"
    ],
    accent: "bg-accent/10 border-accent/20",
    hoverAccent: "accent-accent"
  },
  {
    icon: <Cloud className="text-primary" />,
    tech: "AWS, Docker, CI/CD, Kubernetes",
    title: "DevOps & Cloud Infrastructure",
    items: [
      "Cloud Infrastructure Setup",
      "CI/CD Pipeline Automation",
      "Containerization with Docker",
      "Server Security",
      "Monitoring & Logging"
    ],
    accent: "bg-primary/10 border-primary/20",
    hoverAccent: "accent-primary"
  }
];

const processSteps = [
  { id: 1, title: "Discovery", desc: "Research, planning & requirements gathering.", color: "bg-primary" },
  { id: 2, title: "Design", desc: "UX/UI architecture & interactive prototypes.", color: "bg-secondary" },
  { id: 3, title: "Development", desc: "Agile coding, integration & code reviews.", color: "bg-primary" },
  { id: 4, title: "Deployment", desc: "Testing, QA & production launch.", color: "bg-secondary" },
  { id: 5, title: "Support", desc: "Optimization, maintenance & scaling.", color: "bg-primary-dark" },
];

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const openContact = (service?: string) => {
    setSelectedService(service);
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-bg-page flex flex-col items-center py-6 sm:py-12 md:py-20 px-4 relative overflow-hidden">
      <CanvasBackground />
      <div className="noise" />

      <div className="w-full max-w-[210mm] relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="proposal-page anim-main w-full min-h-[297mm] p-6 sm:p-12 md:p-20 flex flex-col relative overflow-hidden"
          id="proposal-content"
        >
          {/* Background Glows */}
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />

          {/* ── HEADER ──────────────────────────── */}
          <header className="flex flex-wrap items-center justify-between gap-6 pt-2 pb-5 mb-8 border-b border-border-strong relative">
            <div className="space-y-1">
              <div className="logo-container" id="brand-logo-container">
                <div className="o-icon" />
                <h1 className="logo-text">ptmizy</h1>
              </div>
              <p className="text-text-muted font-bold text-[9px] tracking-[0.3em] uppercase ml-1 opacity-60">Digital Innovation Studio</p>
            </div>
            <div className="hidden sm:block h-0.5 w-32 bg-primary rounded-full absolute -bottom-px left-0 shadow-[0_0_15px_rgba(145,213,31,0.4)]" />
          </header>

          {/* ── INTRO ───────────────────────────── */}
          <section className="mb-8 px-1">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-4">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="anim-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight leading-tight"
              >
                Optmizy Services Overview
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="anim-para text-sm sm:text-base text-text-secondary max-w-3xl font-normal leading-relaxed text-left opacity-90"
            >
              From pixel-perfect frontends to reliable cloud infrastructure, we build end-to-end software solutions that are scalable, secure, and built for real-world performance.
              Our focus is turning ideas into fast, modern, and production-ready digital products. We leverage cutting-edge technologies and optimized workflows to ensure your business stays ahead in the digital landscape.
            </motion.p>
          </section>

          {/* ── SERVICES ────────────────────────── */}
          <div className="grid grid-cols-1 gap-5 flex-grow">
            {services.map((service, idx) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className={`service-card p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row gap-5 sm:gap-8 relative group overflow-hidden transition-all duration-500 ease-out hover:scale-[1.01] hover:shadow-xl hover:bg-bg-elevated/60 ${service.hoverAccent}`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border border-white/5 ${service.accent}`}>
                  {React.cloneElement(service.icon as React.ReactElement<any>, { size: 24 })}
                </div>
                <div className="space-y-3 flex-grow">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-secondary block">{service.tech}</span>
                      <h3 className="text-xl font-bold text-text-primary font-brand">{service.title}</h3>
                    </div>
                    <motion.button
                      whileHover={{ x: 3 }}
                      onClick={() => openContact(service.title.split(' ')[0])} 
                      className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Inquire now <ArrowRight size={10} />
                    </motion.button>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-text-secondary font-medium">
                        <Check className="w-3 h-3 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── PROCESS ──────────────────────────── */}
          <section className="mt-20 pt-10 border-t border-dashed border-white/5">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-extrabold text-text-primary font-brand tracking-tight">
                Our Process
              </h2>
              <div className="flex-grow h-px bg-white/5" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {processSteps.map((step, idx) => (
                <motion.div 
                  key={step.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  className="bg-[#0c121e] border border-white/5 p-4 sm:p-5 lg:p-6 rounded-xl flex flex-col items-start min-h-[180px] sm:min-h-[200px] w-full"
                >
                  <div className={`${step.color} w-8 sm:w-9 h-8 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-black text-bg-page mb-4 sm:mb-6 shadow-xl shrink-0`}>
                    {step.id}
                  </div>
                  <h4 className="text-sm sm:text-lg font-bold text-text-primary mb-2 leading-tight w-full break-words whitespace-normal hyphens-auto">
                    {step.title}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed font-medium opacity-60">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── FOOTER ──────────────────────────── */}
          <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 px-1 pb-4">
            <p className="text-[11px] font-medium text-text-muted/40 tracking-tight whitespace-nowrap">
              © 2026 Optmizy Software Agency
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex items-center gap-6 md:gap-10">
                <a href="mailto:hello@optmizy.com" className="flex items-center gap-2 text-text-muted/60 hover:text-primary transition-colors text-[11px] font-bold">
                  <Mail size={14} className="opacity-30" /> hello@optmizy.com
                </a>
                <a href="tel:+8801838354548" className="flex items-center gap-2 text-text-muted/60 hover:text-primary transition-colors text-[11px] font-bold">
                  <Phone size={14} className="opacity-30" /> +8801838354548
                </a>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="h-4 w-px bg-white/10 hidden md:block" />
                <div className="flex items-center gap-5">
                  <a href="https://www.optmizy.com" target="_blank" rel="noreferrer" className="text-text-muted/40 hover:text-primary transition-all">
                    <Globe size={18} />
                  </a>
                  <a href="https://linkedin.com/company/optmizy" target="_blank" rel="noreferrer" className="text-text-muted/40 hover:text-primary transition-all">
                    <Linkedin size={18} />
                  </a>
                  <a href="https://github.com/optmizy" target="_blank" rel="noreferrer" className="text-text-muted/40 hover:text-primary transition-all">
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </div>
          </footer>

          {/* Floating depth elements */}
          <div className="absolute top-[20%] left-[-5%] w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse pointer-events-none" />
          <div className="absolute top-[60%] right-[-5%] w-32 h-32 bg-secondary/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.button 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => openContact()}
        className="fixed bottom-8 right-8 w-14 h-14 sm:w-16 sm:h-16 bg-primary text-bg-page rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(145,213,31,0.5)] z-50 group"
      >
        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </motion.button>

      <ContactDrawer 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        initialService={selectedService}
      />
    </div>
  );
}
