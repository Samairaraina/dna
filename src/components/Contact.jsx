import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { supabase } from "../lib/supabase.js";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const form = e.target;
    const data = {
      name: form.firstName.value + " " + form.lastName.value,
      email: form.email.value,
      message: form.message.value,
    };
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) throw new Error("Invalid email format.");

      const { error } = await supabase.from("contacts").insert(data);
      if (error) throw new Error(error.message);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();
    setNewsletterMsg("");
    setNewsletterStatus("");
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) throw new Error("Invalid email format.");

      const { data: existing } = await supabase
        .from("newsletter_subscribers")
        .select("id")
        .eq("email", email)
        .single();
      if (existing) throw new Error("This email is already subscribed.");

      const { error } = await supabase.from("newsletter_subscribers").insert({ email });
      if (error) throw new Error(error.message);
      setNewsletterMsg("Successfully subscribed!");
      setNewsletterStatus("success");
      setEmail("");
    } catch (err) {
      setNewsletterMsg(err.message);
      setNewsletterStatus("error");
    }
  };

  return (
    <section id="contact" className="section-padding bg-gray-50/50 dark:bg-gray-900/50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-crispr-600 dark:text-crispr-400 mb-4">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Contact & <span className="gradient-text">Collaboration</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Partner with us to advance CRISPR optimization research and bring gene editing therapies to patients worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Send a Message</h3>
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-crispr-100 dark:bg-crispr-900/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-crispr-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Our team will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">{error}</div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="firstName" placeholder="First Name" required
                    className="w-full px-4 py-3 rounded-xl glass text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-aqua-400/50" />
                  <input type="text" name="lastName" placeholder="Last Name" required
                    className="w-full px-4 py-3 rounded-xl glass text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-aqua-400/50" />
                </div>
                <input type="email" name="email" placeholder="Email Address" required
                  className="w-full px-4 py-3 rounded-xl glass text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-aqua-400/50" />
                <input type="text" name="institution" placeholder="Institution / Organization"
                  className="w-full px-4 py-3 rounded-xl glass text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-aqua-400/50" />
                <select name="inquiryType"
                  className="w-full px-4 py-3 rounded-xl glass text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-aqua-400/50">
                  <option value="">Select inquiry type</option>
                  <option value="research">Research Partnership</option>
                  <option value="commercial">Commercial Collaboration</option>
                  <option value="clinical">Clinical Trial Inquiry</option>
                  <option value="press">Press / Media</option>
                  <option value="other">Other</option>
                </select>
                <textarea name="message" rows={4} placeholder="Your message..." required
                  className="w-full px-4 py-3 rounded-xl glass text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-aqua-400/50 resize-none" />
                <button type="submit" disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-crispr-500 to-aqua-500 text-white font-semibold shadow-lg shadow-crispr-500/25 hover:shadow-xl hover:shadow-crispr-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50">
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Research Partnerships</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                We collaborate with leading academic institutions, biotech companies, and research organizations
                worldwide. Join us in advancing CRISPR optimization.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Academic Collaborations", desc: "Joint research projects and pre-clinical studies" },
                  { label: "Industry Partnerships", desc: "Co-development of therapeutic candidates" },
                  { label: "Clinical Trials", desc: "Phase I-III trial partnerships" },
                  { label: "Technology Licensing", desc: "Access our CRISPR optimization platforms" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-aqua-400 mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Stay Updated</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Subscribe to our newsletter for the latest CRISPR research, breakthroughs, and collaboration opportunities.
              </p>
              {newsletterMsg && (
                <div className={`mb-3 text-sm ${newsletterStatus === "success" ? "text-crispr-500" : "text-red-500"}`}>
                  {newsletterMsg}
                </div>
              )}
              <form onSubmit={handleNewsletter} className="flex gap-3">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email" required
                  className="flex-1 px-4 py-3 rounded-xl glass text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-aqua-400/50" />
                <button type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-crispr-500 to-aqua-500 text-white font-medium shadow-lg hover:shadow-xl transition-all">
                  Subscribe
                </button>
              </form>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5 text-aqua-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>contact@crispr-labs.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5 text-aqua-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Cambridge, MA · San Francisco, CA · London, UK</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5 text-aqua-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (617) 555-0158</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
