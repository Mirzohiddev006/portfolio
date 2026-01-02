import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Form data:', data);
      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="font-mono text-sm text-[#00ff41] tracking-widest">05. // GET IN TOUCH</span>
          <h2 className="font-display text-4xl md:text-5xl text-white mt-4" style={{ textShadow: '0 0 10px #00ff41' }}>CONTACT ME</h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto mt-6" />
          <p className="font-body text-gray-400 mt-6 max-w-2xl mx-auto">Have a project in mind? Feel free to reach out.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.form initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)} className="bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 p-8 rounded-xl space-y-6">
            
            <div>
              <label className="block font-mono text-sm text-[#00ff41] mb-2">// NAME</label>
              <input {...register('name')} type="text" placeholder="Your Name"
                className={`w-full px-4 py-3 bg-black/50 border ${errors.name ? 'border-red-500' : 'border-[#00ff41]/30'} rounded-lg font-body text-white placeholder-gray-500 focus:border-[#00ff41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] focus:outline-none transition-all`} />
              {errors.name && <p className="mt-1 font-mono text-xs text-red-400">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block font-mono text-sm text-[#00ff41] mb-2">// EMAIL</label>
              <input {...register('email')} type="email" placeholder="your@email.com"
                className={`w-full px-4 py-3 bg-black/50 border ${errors.email ? 'border-red-500' : 'border-[#00ff41]/30'} rounded-lg font-body text-white placeholder-gray-500 focus:border-[#00ff41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] focus:outline-none transition-all`} />
              {errors.email && <p className="mt-1 font-mono text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block font-mono text-sm text-[#00ff41] mb-2">// SUBJECT</label>
              <input {...register('subject')} type="text" placeholder="Project Inquiry"
                className={`w-full px-4 py-3 bg-black/50 border ${errors.subject ? 'border-red-500' : 'border-[#00ff41]/30'} rounded-lg font-body text-white placeholder-gray-500 focus:border-[#00ff41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] focus:outline-none transition-all`} />
              {errors.subject && <p className="mt-1 font-mono text-xs text-red-400">{errors.subject.message}</p>}
            </div>

            <div>
              <label className="block font-mono text-sm text-[#00ff41] mb-2">// MESSAGE</label>
              <textarea {...register('message')} rows={5} placeholder="Tell me about your project..."
                className={`w-full px-4 py-3 bg-black/50 border ${errors.message ? 'border-red-500' : 'border-[#00ff41]/30'} rounded-lg font-body text-white placeholder-gray-500 focus:border-[#00ff41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] focus:outline-none transition-all resize-none`} />
              {errors.message && <p className="mt-1 font-mono text-xs text-red-400">{errors.message.message}</p>}
            </div>

            <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className={`w-full py-4 font-mono text-sm tracking-wider border rounded-lg transition-all ${isSubmitting ? 'border-gray-500 text-gray-500' : 'border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41]/10 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]'}`}>
              {isSubmitting ? 'TRANSMITTING...' : '[ SEND MESSAGE ]'}
            </motion.button>

            {submitStatus === 'success' && <p className="text-center font-mono text-sm text-[#00ff41]">✓ Message sent!</p>}
            {submitStatus === 'error' && <p className="text-center font-mono text-sm text-red-400">✗ Error. Try again.</p>}
          </motion.form>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="space-y-8">
            <div className="bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 p-8 rounded-xl">
              <h3 className="font-display text-2xl text-white mb-6">LET'S BUILD SOMETHING <span className="text-[#00ff41]">AMAZING</span></h3>
              <p className="font-body text-gray-400 mb-8">I'm available for freelance work and full-time opportunities.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#00ff41]/30 rounded-lg text-[#00ff41]">📍</div>
                  <div><p className="font-mono text-xs text-gray-500">LOCATION</p><p className="font-body text-white">Tashkent, Uzbekistan</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#00ff41]/30 rounded-lg text-[#00ff41]">✉️</div>
                  <div><p className="font-mono text-xs text-gray-500">EMAIL</p><p className="font-body text-white">mirzohid@example.com</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#00ff41]/30 rounded-lg text-[#00ff41]">🕐</div>
                  <div><p className="font-mono text-xs text-gray-500">TIMEZONE</p><p className="font-body text-white">GMT+5 (Uzbekistan)</p></div>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 p-8 rounded-xl">
              <h4 className="font-mono text-sm text-[#00ff41] mb-6">// CONNECT WITH ME</h4>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: 'GitHub', url: 'https://github.com' },
                  { name: 'LinkedIn', url: 'https://linkedin.com' },
                  { name: 'Telegram', url: 'https://t.me' },
                ].map((social) => (
                  <motion.a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -5 }}
                    className="px-4 py-2 border border-[#00ff41]/30 rounded-lg text-gray-400 hover:text-[#00ff41] hover:border-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all font-mono text-sm">
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#0f0f0f] border-b border-[#00ff41]/10">
                <span className="w-3 h-3 rounded-full bg-red-500/80" /><span className="w-3 h-3 rounded-full bg-yellow-500/80" /><span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 font-mono text-xs text-gray-500">terminal</span>
              </div>
              <div className="p-4 font-mono text-sm">
                <p className="text-gray-500">$ contact --status</p>
                <p className="text-[#00ff41] mt-1">✓ Online and ready to collaborate</p>
                <p className="text-gray-500 mt-2">$ response_time --avg</p>
                <p className="text-[#00ffff] mt-1">&lt; 24 hours</p>
                <p className="text-gray-400 mt-2 animate-pulse">█</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
