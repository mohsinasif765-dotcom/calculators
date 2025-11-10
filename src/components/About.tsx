import { motion } from 'motion/react';
import { Info } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white">
            <Info className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-semibold">About CalcPro</h1>
        </div>

        <div className="prose prose-slate">
          <p>
            CalcPro is a collection of professional calculators for finance, health and everyday use. We build fast,
            accurate tools to help you plan and make decisions with confidence.
          </p>
          <p>
            This project is lightweight, built with React and Vite, and provides offline-friendly calculator pages for
            common use-cases like mortgages, SIP returns, compound interest and more.
          </p>
          <h3>Our values</h3>
          <ul>
            <li>Accuracy — formulas and results are computed using industry-standard methods.</li>
            <li>Performance — fast, minimal UI with accessibility in mind.</li>
            <li>Privacy — we do not collect personal data by default.</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
