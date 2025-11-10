import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Wallet } from 'lucide-react';
import { Slider } from '../ui/slider';
import CalculatorLayout from './CalculatorLayout';

export default function PaycheckCalculator() {
  const [annualSalary, setAnnualSalary] = useState(1200000);
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('new');
  const [deductions, setDeductions] = useState(50000);
  const [results, setResults] = useState({
    grossSalary: 0,
    tax: 0,
    takeHome: 0,
    monthlyTakeHome: 0,
  });

  useEffect(() => {
    calculateTax();
  }, [annualSalary, taxRegime, deductions]);

  const calculateTax = () => {
    let taxableIncome = annualSalary;
    
    if (taxRegime === 'old') {
      taxableIncome = Math.max(0, annualSalary - deductions - 50000); // Standard deduction
    }

    let tax = 0;
    
    if (taxRegime === 'new') {
      // New Tax Regime (FY 2024-25)
      if (taxableIncome <= 300000) tax = 0;
      else if (taxableIncome <= 700000) tax = (taxableIncome - 300000) * 0.05;
      else if (taxableIncome <= 1000000) tax = 20000 + (taxableIncome - 700000) * 0.10;
      else if (taxableIncome <= 1200000) tax = 50000 + (taxableIncome - 1000000) * 0.15;
      else if (taxableIncome <= 1500000) tax = 80000 + (taxableIncome - 1200000) * 0.20;
      else tax = 140000 + (taxableIncome - 1500000) * 0.30;
    } else {
      // Old Tax Regime
      if (taxableIncome <= 250000) tax = 0;
      else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
      else if (taxableIncome <= 1000000) tax = 12500 + (taxableIncome - 500000) * 0.20;
      else tax = 112500 + (taxableIncome - 1000000) * 0.30;
    }

    // Add 4% cess
    tax = tax * 1.04;

    const takeHome = annualSalary - tax;
    const monthlyTakeHome = takeHome / 12;

    setResults({
      grossSalary: annualSalary,
      tax: Math.round(tax),
      takeHome: Math.round(takeHome),
      monthlyTakeHome: Math.round(monthlyTakeHome),
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculator = (
    <div className="space-y-8">
      {/* Tax Regime Selection */}
      <div>
        <label className="block mb-3 text-slate-700">Tax Regime</label>
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setTaxRegime('new')}
            className={`p-4 rounded-xl border-2 transition-all ${
              taxRegime === 'new'
                ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-md'
                : 'border-slate-200 hover:border-cyan-300'
            }`}
          >
            <div className="text-center">
              <div className="text-slate-900">New Tax Regime</div>
              <div className="text-xs text-slate-500 mt-1">Lower rates, no deductions</div>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setTaxRegime('old')}
            className={`p-4 rounded-xl border-2 transition-all ${
              taxRegime === 'old'
                ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-md'
                : 'border-slate-200 hover:border-cyan-300'
            }`}
          >
            <div className="text-center">
              <div className="text-slate-900">Old Tax Regime</div>
              <div className="text-xs text-slate-500 mt-1">Higher rates, with deductions</div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Annual Salary */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">Annual Gross Salary</label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <span className="text-blue-700">₹ {formatCurrency(annualSalary)}</span>
          </div>
        </div>
        <Slider
          value={[annualSalary]}
          onValueChange={(value: number[]) => setAnnualSalary(value[0])}
          min={300000}
          max={5000000}
          step={50000}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>₹3L</span>
          <span>₹50L</span>
        </div>
      </div>

      {/* Deductions (Only for Old Regime) */}
      {taxRegime === 'old' && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-slate-700">Deductions (80C, 80D, etc.)</label>
            <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
              <span className="text-emerald-700">₹ {formatCurrency(deductions)}</span>
            </div>
          </div>
          <Slider
            value={[deductions]}
              onValueChange={(value: number[]) => setDeductions(value[0])}
            min={0}
            max={200000}
            step={10000}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>₹0</span>
            <span>₹2L</span>
          </div>
          <div className="mt-2 p-3 rounded-lg bg-blue-50 text-sm text-slate-600">
            Common deductions: PPF, ELSS, Life Insurance (80C - max ₹1.5L), Health Insurance (80D), Home Loan Interest (24b)
          </div>
        </div>
      )}

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">Monthly Take-Home</div>
            <div className="text-3xl">₹ {formatCurrency(results.monthlyTakeHome)}</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">Annual Take-Home</div>
            <div className="text-3xl">₹ {formatCurrency(results.takeHome)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">Gross Salary (Annual)</div>
            <div className="text-2xl">₹ {formatCurrency(results.grossSalary)}</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">Total Tax (with cess)</div>
            <div className="text-2xl">₹ {formatCurrency(results.tax)}</div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200">
          <div className="mb-4">Salary Breakdown</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-600">Gross Annual Salary</span>
              <span className="text-slate-900">₹ {formatCurrency(results.grossSalary)}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-600">Income Tax + Cess</span>
              <span className="text-red-600">- ₹ {formatCurrency(results.tax)}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-600">Effective Tax Rate</span>
              <span className="text-orange-600">{((results.tax / results.grossSalary) * 100).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-900">Annual Take-Home</span>
              <span className="text-emerald-600">₹ {formatCurrency(results.takeHome)}</span>
            </div>
          </div>
        </div>

        {/* Visual Breakdown */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200">
          <div className="mb-4">Income Distribution</div>
          <div className="h-12 rounded-full overflow-hidden flex">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(results.takeHome / results.grossSalary) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white text-sm"
            >
              Take-Home
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(results.tax / results.grossSalary) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className="bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white text-sm"
            >
              Tax
            </motion.div>
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-600">Take-Home: {((results.takeHome / results.grossSalary) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-slate-600">Tax: {((results.tax / results.grossSalary) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const content = {
    introduction: `The Paycheck Calculator helps Indian taxpayers calculate their take-home salary after income tax deductions. It supports both the New Tax Regime (with lower rates and no deductions) and Old Tax Regime (with higher rates but deductions under sections 80C, 80D, etc.). This tool helps you understand your effective tax rate and monthly income.`,
    
    howToUse: [
      'Choose between New or Old Tax Regime based on your preference',
      'Enter your annual gross salary (CTC minus employer contributions)',
      'If using Old Regime, add your eligible deductions (80C, 80D, etc.)',
      'View your monthly and annual take-home salary instantly',
      'Compare effective tax rates between both regimes',
    ],
    
    formula: `New Tax Regime (FY 2024-25):
• Up to ₹3L: Nil
• ₹3L - ₹7L: 5%
• ₹7L - ₹10L: 10%
• ₹10L - ₹12L: 15%
• ₹12L - ₹15L: 20%
• Above ₹15L: 30%

Old Tax Regime:
• Up to ₹2.5L: Nil
• ₹2.5L - ₹5L: 5%
• ₹5L - ₹10L: 20%
• Above ₹10L: 30%

Standard Deduction: ₹50,000
Health & Education Cess: 4%

Take-Home = Gross Salary - Income Tax`,
    
    useCases: [
      {
        title: 'Salary Negotiation',
        description: 'Understand your actual take-home when negotiating job offers and salary hikes.',
      },
      {
        title: 'Tax Planning',
        description: 'Compare Old vs New tax regimes to choose the most beneficial option for your situation.',
      },
      {
        title: 'Budget Planning',
        description: 'Plan your monthly budget based on accurate take-home salary calculations.',
      },
      {
        title: 'Investment Decisions',
        description: 'Determine if tax-saving investments under 80C make financial sense for you.',
      },
    ],
    
    faqs: [
      {
        question: 'Which tax regime should I choose?',
        answer: 'Choose New Regime if you have minimal deductions (less than ₹2.5L). Choose Old Regime if you have significant deductions from home loans, insurance, PPF, etc. Calculate both to see which gives you more take-home.',
      },
      {
        question: 'What deductions are available in the Old Regime?',
        answer: 'Major deductions include: Section 80C (₹1.5L - PPF, ELSS, life insurance, tuition fees), Section 80D (health insurance), Section 24(b) (home loan interest up to ₹2L), and HRA exemption.',
      },
      {
        question: 'Is CTC the same as gross salary?',
        answer: 'No. CTC includes employer contributions (PF, gratuity, etc.). Your gross salary is CTC minus these contributions. Use gross salary for accurate tax calculations.',
      },
      {
        question: 'What is the standard deduction?',
        answer: 'Standard deduction of ₹50,000 is available to all salaried individuals in both tax regimes. It\'s automatically deducted from your taxable income.',
      },
      {
        question: 'Can I switch between tax regimes?',
        answer: 'Yes, salaried individuals can switch between Old and New regimes every year while filing returns. Evaluate annually based on your deductions and choose the better option.',
      },
    ],
  };

  return (
    <CalculatorLayout
      title="Paycheck & Salary Tax Calculator (India)"
      description="Calculate your take-home salary after income tax deductions in India"
      icon={Wallet}
      calculator={calculator}
      content={content}
      gradient="from-cyan-500 to-blue-500"
    />
  );
}
