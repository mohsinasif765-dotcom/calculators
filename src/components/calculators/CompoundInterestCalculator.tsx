import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';
import { Slider } from '../ui/slider';
import CalculatorLayout from './CalculatorLayout';
import CurrencySelect, { currencies } from '../ui/CurrencySelect';

const compoundingFrequencies = [
  { value: 1, label: 'Annually' },
  { value: 2, label: 'Semi-Annually' },
  { value: 4, label: 'Quarterly' },
  { value: 12, label: 'Monthly' },
  { value: 365, label: 'Daily' },
];

export default function CompoundInterestCalculator() {
  const [currency, setCurrency] = useState(currencies[0]);
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [time, setTime] = useState(10);
  const [frequency, setFrequency] = useState(12);
  const [results, setResults] = useState({ finalAmount: 0, interest: 0 });

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, rate, time, frequency]);

  const calculateCompoundInterest = () => {
    const r = rate / 100;
    const amount = principal * Math.pow((1 + r / frequency), frequency * time);
    const interest = amount - principal;

    setResults({
      finalAmount: Math.round(amount),
      interest: Math.round(interest),
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculator = (
    <div className="space-y-8">
      {/* Currency Selector */}
      <div>
        <label className="block mb-3 text-slate-700">Select Currency</label>
        <CurrencySelect value={currency} onChange={setCurrency} />
      </div>

      {/* Principal Amount */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">Principal Amount</label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <span className="text-blue-700">{currency.symbol} {formatCurrency(principal)}</span>
          </div>
        </div>
        <Slider
          value={[principal]}
          onValueChange={(value: number[]) => setPrincipal(value[0])}
          min={1000}
          max={1000000}
          step={1000}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>{currency.symbol}1,000</span>
          <span>{currency.symbol}1,000,000</span>
        </div>
      </div>

      {/* Interest Rate */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">Annual Interest Rate</label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
            <span className="text-emerald-700">{rate}%</span>
          </div>
        </div>
        <Slider
          value={[rate]}
          onValueChange={(value: number[]) => setRate(value[0])}
          min={1}
          max={20}
          step={0.25}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>1%</span>
          <span>20%</span>
        </div>
      </div>

      {/* Time Period */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">Time Period (Years)</label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <span className="text-purple-700">{time} years</span>
          </div>
        </div>
        <Slider
          value={[time]}
          onValueChange={(value: number[]) => setTime(value[0])}
          min={1}
          max={30}
          step={1}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>1 year</span>
          <span>30 years</span>
        </div>
      </div>

      {/* Compounding Frequency */}
      <div>
        <label className="block mb-3 text-slate-700">Compounding Frequency</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {compoundingFrequencies.map((freq) => (
            <motion.button
              key={freq.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFrequency(freq.value)}
              className={`p-3 rounded-xl border-2 transition-all ${
                frequency === freq.value
                  ? 'border-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 shadow-md'
                  : 'border-slate-200 hover:border-violet-300'
              }`}
            >
              <div className="text-center text-sm">{freq.label}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">Principal</div>
            <div className="text-2xl">{currency.symbol} {formatCurrency(principal)}</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">Interest Earned</div>
            <div className="text-2xl">{currency.symbol} {formatCurrency(results.interest)}</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">Final Amount</div>
            <div className="text-2xl">{currency.symbol} {formatCurrency(results.finalAmount)}</div>
          </div>
        </div>

        {/* Visual Breakdown */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200">
          <div className="mb-4">Investment Growth</div>
          <div className="h-8 rounded-full overflow-hidden flex">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(principal / results.finalAmount) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="bg-gradient-to-r from-blue-500 to-indigo-500"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(results.interest / results.finalAmount) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className="bg-gradient-to-r from-violet-500 to-purple-500"
            />
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-slate-600">Principal: {((principal / results.finalAmount) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-violet-500" />
              <span className="text-slate-600">Interest: {((results.interest / results.finalAmount) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const content = {
    introduction: `The Compound Interest Calculator helps you calculate the future value of your investments with compound interest. Unlike simple interest, compound interest earns interest on both the principal and previously earned interest, leading to exponential growth over time. This calculator supports multiple currencies and compounding frequencies.`,
    
    howToUse: [
      'Select your preferred currency from the available options',
      'Enter the principal amount you want to invest',
      'Set the annual interest rate (expected return)',
      'Choose the investment time period in years',
      'Select how often interest is compounded (monthly, quarterly, etc.)',
      'View instant calculations of interest earned and final amount',
    ],
    
    formula: `Compound Interest Formula:
A = P(1 + r/n)^(nt)

Where:
- A = Final Amount
- P = Principal Amount
- r = Annual Interest Rate (as decimal)
- n = Number of times interest is compounded per year
- t = Time in years

Compound Interest = A - P`,
    
    useCases: [
      {
        title: 'Savings Account Growth',
        description: 'Calculate how your savings will grow over time with compound interest in savings accounts or fixed deposits.',
      },
      {
        title: 'Investment Planning',
        description: 'Project the future value of investments in bonds, CDs, or other fixed-income securities.',
      },
      {
        title: 'Retirement Planning',
        description: 'Estimate your retirement corpus growth with regular compound interest over decades.',
      },
      {
        title: 'Education Fund',
        description: 'Plan for children\'s education by understanding how compound interest grows your savings.',
      },
    ],
    
    faqs: [
      {
        question: 'What is the difference between simple and compound interest?',
        answer: 'Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus accumulated interest. Compound interest grows your money faster over time.',
      },
      {
        question: 'How does compounding frequency affect returns?',
        answer: 'More frequent compounding (e.g., daily vs. annually) leads to slightly higher returns. The effect becomes more significant with larger amounts and longer time periods.',
      },
      {
        question: 'What is a realistic interest rate to use?',
        answer: 'For savings accounts: 3-6%, Fixed Deposits: 5-8%, Bonds: 6-9%, Equity investments: 10-15% (long-term average). Always use conservative estimates for planning.',
      },
      {
        question: 'Is this calculation guaranteed?',
        answer: 'This calculator provides estimates based on constant interest rates. Actual returns may vary based on market conditions, especially for variable-rate investments.',
      },
      {
        question: 'How can I maximize compound interest?',
        answer: 'Start investing early, choose higher interest rates, opt for more frequent compounding, and let your investment grow without withdrawals for longer periods.',
      },
    ],
  };

  return (
    <CalculatorLayout
      title="Compound Interest Calculator"
      description="Calculate compound interest and future investment value with multi-currency support"
      icon={TrendingUp}
      calculator={calculator}
      content={content}
      gradient="from-violet-500 to-purple-500"
    />
  );
}
