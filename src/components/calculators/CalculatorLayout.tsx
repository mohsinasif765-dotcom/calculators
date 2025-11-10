import { motion } from 'motion/react';
import { LucideIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface ContentSection {
  introduction: string;
  howToUse: string[];
  formula: string;
  useCases: Array<{
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

interface CalculatorLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  calculator: React.ReactNode;
  content: ContentSection;
  gradient: string;
}

export default function CalculatorLayout({
  title,
  description,
  icon: Icon,
  calculator,
  content,
  gradient,
}: CalculatorLayoutProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 px-4 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-6 shadow-xl`}
            >
              <Icon className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="mb-4 bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {description}
            </p>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-400/10 rounded-full blur-3xl" />
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 md:p-10"
          >
            {calculator}
          </motion.div>
        </div>
      </section>

      {/* Content Wrapper */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">What is this Calculator?</h2>
            <p className="text-slate-600 leading-relaxed">{content.introduction}</p>
          </motion.div>

          {/* How to Use */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6">How to Use This Calculator</h2>
            <div className="space-y-4">
              {content.howToUse.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center shadow-lg`}>
                    {index + 1}
                  </div>
                  <p className="text-slate-600 pt-1">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Formula */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">Formula & Methodology</h2>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200">
              <pre className="text-slate-700 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {content.formula}
              </pre>
            </div>
          </motion.div>

          {/* Use Cases */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6">Common Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-shadow"
                >
                  <h3 className="mb-2 text-slate-900">{useCase.title}</h3>
                  <p className="text-slate-600">{useCase.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {content.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-white"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-left text-slate-900">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedFaq === index ? 'auto' : 0,
                      opacity: expandedFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-slate-50 text-slate-600 border-t border-slate-200">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
