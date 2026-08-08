import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "../../lib/contactSchema";

const TELEGRAM_USERNAME = "Mirzohid_006_09_09";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // The bot token lives only on the server, so the browser just posts
      // the form to our own endpoint and lets it talk to Telegram.
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Message could not be delivered.");
      }

      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Contact form error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Error sending message. Please try again."
      );
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-3 sm:px-4 md:px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="font-mono text-xs sm:text-sm text-[#00ff41] tracking-wider sm:tracking-widest">
            05. // GET IN TOUCH
          </span>
          <h2
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mt-2 sm:mt-3 md:mt-4 px-2"
            style={{ textShadow: "0 0 10px #00ff41" }}
          >
            CONTACT ME
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto mt-3 sm:mt-4 md:mt-6" />
          <p className="font-body text-gray-400 text-sm sm:text-base mt-4 sm:mt-5 md:mt-6 max-w-2xl mx-auto px-4">
            Have a project in mind? Send it over — it lands straight in my
            Telegram.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <motion.form
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 p-4 sm:p-6 md:p-8 rounded-xl space-y-4 sm:space-y-5 md:space-y-6"
          >
            <div>
              <label className="block font-mono text-xs sm:text-sm text-[#00ff41] mb-1.5 sm:mb-2">
                // NAME
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="Your Name"
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border ${
                  errors.name ? "border-red-500" : "border-[#00ff41]/30"
                } rounded-lg font-body text-sm sm:text-base text-white placeholder-gray-500 focus:border-[#00ff41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] focus:outline-none transition-all`}
              />
              {errors.name && (
                <p className="mt-1 font-mono text-[10px] xs:text-xs text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-mono text-xs sm:text-sm text-[#00ff41] mb-1.5 sm:mb-2">
                // EMAIL
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="your@email.com"
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border ${
                  errors.email ? "border-red-500" : "border-[#00ff41]/30"
                } rounded-lg font-body text-sm sm:text-base text-white placeholder-gray-500 focus:border-[#00ff41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] focus:outline-none transition-all`}
              />
              {errors.email && (
                <p className="mt-1 font-mono text-[10px] xs:text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-mono text-xs sm:text-sm text-[#00ff41] mb-1.5 sm:mb-2">
                // SUBJECT
              </label>
              <input
                {...register("subject")}
                type="text"
                placeholder="Project Inquiry"
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border ${
                  errors.subject ? "border-red-500" : "border-[#00ff41]/30"
                } rounded-lg font-body text-sm sm:text-base text-white placeholder-gray-500 focus:border-[#00ff41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] focus:outline-none transition-all`}
              />
              {errors.subject && (
                <p className="mt-1 font-mono text-[10px] xs:text-xs text-red-400">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-mono text-xs sm:text-sm text-[#00ff41] mb-1.5 sm:mb-2">
                // MESSAGE
              </label>
              <textarea
                {...register("message")}
                rows={5}
                placeholder="Tell me about your project..."
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border ${
                  errors.message ? "border-red-500" : "border-[#00ff41]/30"
                } rounded-lg font-body text-sm sm:text-base text-white placeholder-gray-500 focus:border-[#00ff41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] focus:outline-none transition-all resize-none`}
              />
              {errors.message && (
                <p className="mt-1 font-mono text-[10px] xs:text-xs text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Honeypot: invisible to people, irresistible to spam bots. */}
            <input
              {...register("website")}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 sm:py-4 font-mono text-xs sm:text-sm tracking-wider border rounded-lg transition-all ${
                isSubmitting
                  ? "border-gray-500 text-gray-500"
                  : "border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41]/10 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]"
              }`}
            >
              {isSubmitting ? "TRANSMITTING..." : "[ SEND MESSAGE ]"}
            </motion.button>

            {submitStatus === "success" && (
              <p className="text-center font-mono text-xs sm:text-sm text-[#00ff41]">
                ✓ Message delivered to my Telegram!
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-center font-mono text-xs sm:text-sm text-red-400">
                ✗ {errorMessage || "Error. Try again."}
              </p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 p-4 sm:p-6 md:p-8 rounded-xl">
              <h3 className="font-display text-xl sm:text-2xl text-white mb-4 sm:mb-5 md:mb-6">
                LET'S BUILD SOMETHING{" "}
                <span className="text-[#00ff41]">AMAZING</span>
              </h3>
              <p className="font-body text-gray-400 text-sm sm:text-base mb-6 sm:mb-7 md:mb-8">
                I'm available for freelance work and full-time opportunities.
              </p>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[#00ff41]/30 rounded-lg text-[#00ff41] text-sm sm:text-base">
                    📍
                  </div>
                  <div>
                    <p className="font-mono text-[10px] xs:text-xs text-gray-500">
                      LOCATION
                    </p>
                    <p className="font-body text-white text-sm sm:text-base">
                      Tashkent, Uzbekistan
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[#00ff41]/30 rounded-lg text-[#00ff41] text-sm sm:text-base">
                    ✉️
                  </div>
                  <div>
                    <p className="font-mono text-[10px] xs:text-xs text-gray-500">
                      EMAIL
                    </p>
                    <p className="font-body text-white text-xs sm:text-sm md:text-base break-all">
                      ibrohimjonovm2006@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[#00ff41]/30 rounded-lg text-[#00ff41] text-sm sm:text-base">
                    ✈️
                  </div>
                  <div>
                    <p className="font-mono text-[10px] xs:text-xs text-gray-500">
                      TELEGRAM
                    </p>
                    <a
                      href={`https://t.me/${TELEGRAM_USERNAME}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-white text-sm sm:text-base hover:text-[#00ff41] transition-colors"
                    >
                      @{TELEGRAM_USERNAME}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[#00ff41]/30 rounded-lg text-[#00ff41] text-sm sm:text-base">
                    🕐
                  </div>
                  <div>
                    <p className="font-mono text-[10px] xs:text-xs text-gray-500">
                      TIMEZONE
                    </p>
                    <p className="font-body text-white text-sm sm:text-base">
                      GMT+5 (Uzbekistan)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 p-4 sm:p-6 md:p-8 rounded-xl">
              <h4 className="font-mono text-xs sm:text-sm text-[#00ff41] mb-4 sm:mb-5 md:mb-6">
                // CONNECT WITH ME
              </h4>
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                {[
                  { name: "GitHub", url: "https://github.com/Mirzohiddev006" },
                  {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/in/mirzohid-ibrohimjonov",
                  },
                  {
                    name: "Telegram",
                    url: `https://t.me/${TELEGRAM_USERNAME}`,
                  },
                  {
                    name: "Instagram",
                    url: "https://www.instagram.com/mirzohid.006.09",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 border border-[#00ff41]/30 rounded-lg text-gray-400 hover:text-[#00ff41] hover:border-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all font-mono text-xs sm:text-sm"
                  >
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#0f0f0f] border-b border-[#00ff41]/10">
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500/80" />
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 sm:ml-4 font-mono text-[10px] xs:text-xs text-gray-500">
                  terminal
                </span>
              </div>
              <div className="p-3 sm:p-4 font-mono text-xs sm:text-sm">
                <p className="text-gray-500">$ contact --status</p>
                <p className="text-[#00ff41] mt-1">
                  ✓ Online and ready to collaborate
                </p>
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
