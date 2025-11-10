import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-semibold">Privacy Policy</h1>
        </div>

        <div className="prose prose-slate">
          <p>
            CalcPro respects your privacy. This application does not collect personal data unless explicitly provided
            (for example, via a feedback or contact form).
          </p>
          <p>
            We store no user data on the client by default. If you integrate external services (analytics, crash
            reporting), make sure to disclose them and obtain consent where required.
          </p>
          <h3>Data</h3>
          <p>
            No personally-identifiable information (PII) is collected by the calculators. Calculations are performed
            locally in the browser and not transmitted to a server.
          </p>
          <h3>Contact</h3>
          <p>If you have privacy concerns, please contact the project maintainer.</p>
        </div>
      </motion.div>
    </div>
  );
}
