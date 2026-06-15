import { motion, AnimatePresence } from "framer-motion";

export default function PrivacyModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 sm:inset-x-auto sm:top-20 sm:max-w-2xl sm:mx-auto z-50 overflow-y-auto rounded-2xl glass shadow-2xl"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Privacy Policy</h2>
                <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all" aria-label="Close">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <p><strong className="text-gray-900 dark:text-white">Last Updated:</strong> June 15, 2026</p>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">1. Information We Collect</h3>
                <p>When you use our contact form or subscribe to our newsletter, we collect personal information including your name, email address, institution, and any message content you provide. We use this data solely to respond to your inquiries and provide you with relevant research updates.</p>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">2. How We Use Your Data</h3>
                <p>Your personal data is used exclusively for: (a) responding to contact submissions, (b) sending newsletters and research updates if subscribed, (c) improving our services through aggregate analytics. We never sell, rent, or share your personal data with third parties for marketing purposes.</p>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">3. Data Storage & Security</h3>
                <p>All data is stored in secure databases with encryption at rest. We implement industry-standard security measures including SSL/TLS encryption for data in transit, rate limiting on API endpoints, and regular security audits. Data is retained only as long as necessary to fulfill the purposes described in this policy.</p>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">4. Your Rights</h3>
                <p>You have the right to: (a) access your personal data held by us, (b) request correction of inaccurate data, (c) request deletion of your data, (d) withdraw consent for newsletter subscriptions at any time, (e) request a copy of your data in a portable format. To exercise these rights, contact us at privacy@crispr-labs.com.</p>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">5. Cookies</h3>
                <p>We use essential cookies for site functionality and non-essential analytics cookies with your consent. You can manage cookie preferences through your browser settings. No cookies are used for tracking or advertising purposes.</p>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">6. Third-Party Services</h3>
                <p>We do not use third-party analytics, advertising, or tracking services. Our site is self-hosted and does not embed external content that would share your data with third parties.</p>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">7. Contact</h3>
                <p>For privacy-related inquiries, contact our Data Protection Officer at privacy@crispr-labs.com or write to CRISPR Labs, 1 Main Street, Cambridge, MA 02142.</p>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">8. Changes to This Policy</h3>
                <p>We may update this privacy policy from time to time. Material changes will be communicated via our newsletter or a prominent notice on our website. Continued use of the site after changes constitutes acceptance of the updated policy.</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
