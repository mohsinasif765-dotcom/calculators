import { useState } from 'react';
import { motion } from 'motion/react';
import { Percent } from 'lucide-react';
import CalculatorLayout from './CalculatorLayout';

export default function PercentageCalculator() {
  const [value1, setValue1] = useState(50);
  const [value2, setValue2] = useState(200);
  const [percentage, setPercentage] = useState(25);
  const [increase, setIncrease] = useState(10);

  const calculator = (
    <div className="space-y-8">
      {/* Basic Percentage */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200">
        <h3 className="mb-4">What is {percentage}% of {value2}?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">Percentage (%)</label>
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-2">Of Value</label>
            <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>
        <motion.div
          key={percentage + value2}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-6 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white text-center"
        >
          <div className="text-sm opacity-90 mb-2">Result</div>
          <div className="text-4xl">{((percentage * value2) / 100).toFixed(2)}</div>
        </motion.div>
      </div>

      {/* Percentage of what */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200">
        <h3 className="mb-4">{value1} is what percent of {value2}?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">Value 1</label>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-2">Value 2</label>
            <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 outline-none transition-colors"
            />
          </div>
        </div>
        <motion.div
          key={value1 + value2}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-6 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-center"
        >
          <div className="text-sm opacity-90 mb-2">Result</div>
          <div className="text-4xl">{((value1 / value2) * 100).toFixed(2)}%</div>
        </motion.div>
      </div>

      {/* Percentage Increase */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200">
        <h3 className="mb-4">Increase {value1} by {increase}%</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">Original Value</label>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-2">Increase (%)</label>
            <input
              type="number"
              value={increase}
              onChange={(e) => setIncrease(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 outline-none transition-colors"
            />
          </div>
        </div>
        <motion.div
          key={value1 + increase}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white text-center">
            <div className="text-sm opacity-90 mb-2">Increase Amount</div>
            <div className="text-2xl">{((value1 * increase) / 100).toFixed(2)}</div>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white text-center">
            <div className="text-sm opacity-90 mb-2">Final Value</div>
            <div className="text-2xl">{(value1 + (value1 * increase) / 100).toFixed(2)}</div>
          </div>
        </motion.div>
      </div>

      {/* Percentage Decrease */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200">
        <h3 className="mb-4">Decrease {value1} by {increase}%</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">Original Value</label>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-cyan-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-2">Decrease (%)</label>
            <input
              type="number"
              value={increase}
              onChange={(e) => setIncrease(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-cyan-500 outline-none transition-colors"
            />
          </div>
        </div>
        <motion.div
          key={value1 + increase + 'decrease'}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-center">
            <div className="text-sm opacity-90 mb-2">Decrease Amount</div>
            <div className="text-2xl">{((value1 * increase) / 100).toFixed(2)}</div>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-center">
            <div className="text-sm opacity-90 mb-2">Final Value</div>
            <div className="text-2xl">{(value1 - (value1 * increase) / 100).toFixed(2)}</div>
          </div>
        </motion.div>
      </div>

      {/* Percentage Change */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200">
        <h3 className="mb-4">Percentage Change from {value1} to {value2}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">Original Value</label>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-2">New Value</label>
            <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 outline-none transition-colors"
            />
          </div>
        </div>
        <motion.div
          key={value1 + value2 + 'change'}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-6 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 text-white text-center"
        >
          <div className="text-sm opacity-90 mb-2">Percentage Change</div>
          <div className="text-4xl">
            {(((value2 - value1) / value1) * 100).toFixed(2)}%
            <span className="text-lg ml-2">
              {value2 > value1 ? '↑' : value2 < value1 ? '↓' : '→'}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const content = {
    introduction: `The Percentage Calculator is a versatile tool for all your percentage calculation needs. Whether you're calculating discounts, tips, tax amounts, grade percentages, or analyzing financial data, this calculator provides instant, accurate results for multiple percentage scenarios.`,
    
    howToUse: [
      'Choose the type of percentage calculation you need',
      'Enter the relevant values in the input fields',
      'Results update automatically as you type',
      'Use different sections for different calculation types',
      'All calculations are performed instantly without clicking buttons',
    ],
    
    formula: `Common Percentage Formulas:

Basic Percentage:
Result = (Percentage / 100) × Value

Percentage of Total:
Percentage = (Part / Whole) × 100

Percentage Increase:
New Value = Original + (Original × Percentage / 100)

Percentage Decrease:
New Value = Original - (Original × Percentage / 100)

Percentage Change:
Change% = ((New - Old) / Old) × 100`,
    
    useCases: [
      {
        title: 'Shopping & Discounts',
        description: 'Calculate sale prices, discount amounts, and savings on purchases.',
      },
      {
        title: 'Financial Analysis',
        description: 'Analyze investment returns, profit margins, and business metrics.',
      },
      {
        title: 'Academic Calculations',
        description: 'Calculate grades, test scores, and academic performance percentages.',
      },
      {
        title: 'Tips & Service Charges',
        description: 'Calculate appropriate tip amounts at restaurants and for services.',
      },
    ],
    
    faqs: [
      {
        question: 'How do I calculate a discount percentage?',
        answer: 'To find the discount percentage, subtract the sale price from the original price, divide by the original price, and multiply by 100. For example: (Original - Sale) / Original × 100.',
      },
      {
        question: 'What\'s the difference between percentage increase and percentage change?',
        answer: 'Percentage increase always shows a positive result (how much larger), while percentage change can be positive (increase) or negative (decrease) showing the direction and magnitude of change.',
      },
      {
        question: 'How do I calculate what percentage one number is of another?',
        answer: 'Divide the first number by the second number and multiply by 100. For example: to find what percentage 25 is of 200, calculate (25 / 200) × 100 = 12.5%.',
      },
      {
        question: 'Can percentages add up to more than 100%?',
        answer: 'Yes! When dealing with multiple separate items or categories, the total can exceed 100%. For example, if sales increased 50% in Q1 and 60% in Q2, you had 110% growth total.',
      },
      {
        question: 'How accurate are these calculations?',
        answer: 'The calculator provides results accurate to 2 decimal places, which is suitable for most everyday calculations. For financial or scientific work requiring more precision, consider specialized tools.',
      },
    ],
  };

  return (
    <CalculatorLayout
      title="Percentage Calculator"
      description="Calculate percentages, increase, decrease, and more with instant results"
      icon={Percent}
      calculator={calculator}
      content={content}
      gradient="from-indigo-500 to-blue-500"
    />
  );
}
