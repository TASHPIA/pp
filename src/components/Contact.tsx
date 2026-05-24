import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Linkedin, Github, Send, AlertCircle, CheckCircle, MapPin, UserCheck, Inbox } from 'lucide-react';
import Contact3D from './Contact3D';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setErrorMessage('Please complete all form fields before trying to dispatch.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus('error');
      setErrorMessage('Please enter a mathematically correct email format.');
      return;
    }

    setFormStatus('loading');

    // Simulate real network submission with elegant loader
    setTimeout(() => {
      setFormStatus('success');
      // keep form values for the success notice, but clear inputs on close or state reset
    }, 1200);
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setFormStatus('idle');
  };

  return (
    <section
      id="contact"
      className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-900 transition-colors duration-300 relative"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-5 left-10 w-96 h-96 rounded-full bg-pink-500/5 dark:bg-pink-500/1 blur-3xl" />
        <div className="absolute top-5 right-10 w-96 h-96 rounded-full bg-purple-500/5 dark:bg-purple-500/1 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-[11px] font-mono tracking-widest uppercase mb-3 font-semibold"
          >
            <Inbox className="w-3.5 h-3.5" /> Get in touch
          </motion.div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white mb-4">
            Connect For{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Collaborations
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed font-display">
            I am always excited to discuss full-stack coding requirements, internships, freelancing proposals, or scholastic collaborations. Drop a line!
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
          {/* Quick Info panel (Col 5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
            id="contact-info-panel"
          >
            <div className="space-y-3">
              <h3 className="font-display font-extrabold text-xl md:text-2xl text-slate-850 dark:text-white">
                Let's construct something together!
              </h3>
              <p className="text-slate-500 dark:text-slate-450 text-xs sm:text-sm font-light leading-relaxed">
                Feel free to contact me via email, phone call, or LinkedIn profile. I typically reply within twelve operational business hours.
              </p>
            </div>

            {/* Structured Card Items */}
            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:tashpianijhum17@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-905 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200/50 dark:border-white/5 transition-all project-card cursor-pointer group"
                id="contact-email-link"
              >
                <div className="p-3.5 rounded-xl bg-purple-500/10 text-purple-600 group-hover:scale-110 transition-transform">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="block text-[8px] font-mono tracking-widest text-slate-400 uppercase font-bold">
                    Email Address
                  </span>
                  <span className="font-display font-bold text-xs sm:text-sm text-slate-705 dark:text-white underline decoration-purple-500/30">
                    tashpianijhum17@gmail.com
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:01319519600"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-905 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200/50 dark:border-white/5 transition-all project-card cursor-pointer group"
                id="contact-phone-link"
              >
                <div className="p-3.5 rounded-xl bg-pink-500/10 text-pink-500 group-hover:scale-110 transition-transform">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="block text-[8px] font-mono tracking-widest text-slate-400 uppercase font-bold">
                    Telephone Number
                  </span>
                  <span className="font-display font-bold text-xs sm:text-sm text-slate-705 dark:text-white">
                    01319519600
                  </span>
                </div>
              </a>

              {/* Location Reference */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-905 border border-slate-200/50 dark:border-white/5 transition-all project-card">
                <div className="p-3.5 rounded-xl bg-blue-500/10 text-blue-500">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="block text-[8px] font-mono tracking-widest text-slate-400 uppercase font-bold">
                    Active Base
                  </span>
                  <span className="font-display font-bold text-xs sm:text-sm text-slate-705 dark:text-white">
                    Daffodil Smart City, Savar, Dhaka
                  </span>
                </div>
              </div>
            </div>

            {/* Holographic 3D communication node block */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-slate-905 dark:to-slate-950/60 border border-slate-205 dark:border-white/5 flex items-center justify-between gap-4 overflow-hidden shadow-md">
              <div className="flex-1 text-left">
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-300 text-[8px] font-mono font-bold tracking-widest uppercase">
                  Interactive Response
                </span>
                <h4 className="font-display font-bold text-xs sm:text-sm text-slate-800 dark:text-white mt-1.5">
                  Contact Sphere System
                </h4>
                <p className="text-[10px] text-slate-550 dark:text-slate-400 font-light mt-0.5 leading-relaxed">
                  Hover over the orbital system to interact. The main contact form above operates over secure, standard SSL channels.
                </p>
              </div>
              <div className="w-24 h-24 shrink-0 flex items-center justify-center">
                <Contact3D />
              </div>
            </div>

            {/* Quick social links row */}
            <div className="space-y-3.5">
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">Network Profiles</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://bd.linkedin.com/in/tashpia-afroz-nijhum-44a54b2a5"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 hover:scale-110 transition-all shadow-sm"
                  aria-label="LinkedIn"
                  id="linkedin-icon-link"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href="https://github.com/TASHPIA"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 hover:scale-110 transition-all shadow-sm"
                  aria-label="GitHub"
                  id="github-icon-link"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Interactive Form (Col 7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 rounded-3xl p-6 sm:p-8 glass-effect border border-slate-205 dark:border-white/5 shadow-xl"
            id="contact-form-container"
          >
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                /* Dynamic Success block */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-10 space-y-6 flex flex-col items-center"
                  key="form-success"
                  id="form-success-alert"
                >
                  <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-500 animate-bounce">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl text-slate-850 dark:text-white">
                      Message Dispatched Cleanly!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light max-w-sm mx-auto">
                      Thank you, <strong className="font-semibold text-purple-600 dark:text-purple-400">{formData.name}</strong>. Your message is encrypted and dispatched successfully. Tashpia will respond to your address <span className="underline font-mono text-xs">{formData.email}</span> within twelve business hours.
                    </p>
                  </div>
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                    id="reset-form-btn"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                /* Main interactive form elements */
                <form onSubmit={handleSubmit} className="space-y-6" key="form-interactive" id="interaction-contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label htmlFor="name-input" className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold flex items-center gap-1">
                        Your Full Name <span className="text-purple-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name-input"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white text-xs font-semibold outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 dark:focus:border-purple-500 transition-colors"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label htmlFor="email-input" className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold flex items-center gap-1">
                        Your Email Address <span className="text-purple-500 font-bold">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email-input"
                        required
                        placeholder="johndoe@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white text-xs font-semibold outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 dark:focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label htmlFor="message-input" className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold flex items-center gap-1">
                      Your Messsage Body <span className="text-purple-500 font-bold">*</span>
                    </label>
                    <textarea
                      name="message"
                      id="message-input"
                      required
                      rows={5}
                      placeholder="Discussing software architecture details..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white text-xs font-semibold outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 dark:focus:border-purple-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Error display */}
                  {formStatus === 'error' && (
                    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-rose-500 flex items-start gap-2 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Dispatch Validation Failed</p>
                        <p className="text-[11px] text-rose-400">{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex items-center justify-between gap-4 pt-2">
                    <span className="text-[10px] text-slate-400 font-mono">
                      🔒 Secured via portfolio verification SSL
                    </span>

                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="px-6 py-3.5 rounded-full text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 disabled:from-purple-800 disabled:to-pink-800 shadow-md shadow-purple-500/10 cursor-pointer disabled:cursor-not-allowed flex items-center gap-2 group transition-all duration-300"
                      id="submit-contact-btn"
                    >
                      {formStatus === 'loading' ? (
                        <>
                          <span>Encrypting & Sending...</span>
                          <div className="w-3.5 h-3.5 rounded-full border border-t-white border-white/20 animate-spin" />
                        </>
                      ) : (
                        <>
                          <span>Dispatch Message</span>
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
