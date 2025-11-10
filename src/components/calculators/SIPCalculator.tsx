import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, IndianRupee, DollarSign, Euro, PoundSterling } from 'lucide-react';
import { Slider } from '../ui/slider';
import CalculatorLayout from './CalculatorLayout';

const currencies = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', icon: IndianRupee },
  { code: 'USD', symbol: '$', name: 'US Dollar', icon: DollarSign },
  { code: 'EUR', symbol: '€', name: 'Euro', icon: Euro },
  { code: 'GBP', symbol: '£', name: 'British Pound', icon: PoundSterling },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', icon: DollarSign },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', icon: DollarSign },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', icon: DollarSign },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', icon: DollarSign },
];

export default function SIPCalculator() {
  const [currency, setCurrency] = useState(currencies[0]);
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [results, setResults] = useState({ invested: 0, returns: 0, total: 0 });

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = timePeriod * 12;
    
    const futureValue = monthlyInvestment * 
      (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    
    const invested = monthlyInvestment * months;
    const returns = futureValue - invested;

    setResults({
      invested: Math.round(invested),
      returns: Math.round(returns),
      total: Math.round(futureValue),
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
      {/* Currency Selector */}
      <div>
        <label className="block mb-3 text-slate-700">Select Currency</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {currencies.map((curr) => {
            const Icon = curr.icon;
            return (
              <motion.button
                key={curr.code}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrency(curr)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  currency.code === curr.code
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-slate-600" />
                  <span className="text-sm">{curr.code}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Monthly Investment */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">Monthly Investment</label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <span className="text-blue-700">{currency.symbol} {formatCurrency(monthlyInvestment)}</span>
          </div>
        </div>
        <Slider
          value={[monthlyInvestment]}
          onValueChange={(value) => setMonthlyInvestment(value[0])}
          min={500}
          max={100000}
          step={500}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>{currency.symbol}500</span>
          <span>{currency.symbol}100,000</span>
        </div>
      </div>

      {/* Expected Return Rate */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">Expected Return Rate (p.a.)</label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
            <span className="text-emerald-700">{expectedReturn}%</span>
          </div>
        </div>
        <Slider
          value={[expectedReturn]}
          onValueChange={(value) => setExpectedReturn(value[0])}
          min={1}
          max={30}
          step={0.5}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>1%</span>
          <span>30%</span>
        </div>
      </div>

      {/* Time Period */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">Time Period (Years)</label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <span className="text-purple-700">{timePeriod} years</span>
          </div>
        </div>
        <Slider
          value={[timePeriod]}
          onValueChange={(value) => setTimePeriod(value[0])}
          min={1}
          max={40}
          step={1}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>1 year</span>
          <span>40 years</span>
        </div>
      </div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-xl">
          <div className="text-sm opacity-90 mb-2">Total Invested</div>
          <div className="text-2xl">{currency.symbol} {formatCurrency(results.invested)}</div>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl">
          <div className="text-sm opacity-90 mb-2">Est. Returns</div>
          <div className="text-2xl">{currency.symbol} {formatCurrency(results.returns)}</div>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl">
          <div className="text-sm opacity-90 mb-2">Total Value</div>
          <div className="text-2xl">{currency.symbol} {formatCurrency(results.total)}</div>
        </div>
      </motion.div>

      {/* Visual Breakdown */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200">
        <div className="mb-4">Investment Breakdown</div>
        <div className="h-8 rounded-full overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(results.invested / results.total) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="bg-gradient-to-r from-blue-500 to-indigo-500"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(results.returns / results.total) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-500"
          />
        </div>
        <div className="flex justify-between mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-slate-600">Invested: {((results.invested / results.total) * 100).toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-600">Returns: {((results.returns / results.total) * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const content = {
    introduction: `A Systematic Investment Plan (SIP) is a method of investing in mutual funds where you invest a fixed amount regularly. This SIP calculator helps you estimate the future value of your SIP investments based on your monthly contribution, expected rate of return, and investment duration.`,
    
    howToUse: [
      'Select your preferred currency from the available options',
      'Enter or adjust your monthly investment amount using the slider',
      'Set the expected annual return rate (typically 8-15% for equity funds)',
      'Choose your investment time period in years',
      'View instant calculations of total investment, returns, and maturity amount',
    ],
    
    formula: `The SIP calculator uses the future value of annuity formula: FV = P × ((1 + r)^n - 1) / r) × (1 + r)

Where:
- FV = Future Value
- P = Monthly Investment
- r = Monthly Rate of Return (Annual Rate / 12 / 100)
- n = Total number of months (Years × 12)`,
    
    useCases: [
      {
        title: 'Retirement Planning',
        description: 'Calculate how much you need to invest monthly to reach your retirement corpus goal.',
      },
      {
        title: 'Goal-Based Investing',
        description: 'Plan for specific financial goals like buying a house, children\'s education, or a dream vacation.',
      },
      {
        title: 'Wealth Creation',
        description: 'Understand the power of compounding and long-term wealth creation through disciplined investing.',
      },
      {
        title: 'Portfolio Diversification',
        description: 'Determine optimal SIP amounts across different mutual fund categories.',
      },
    ],
    
    faqs: [
      {
        question: 'What is a good monthly SIP amount?',
        answer: 'A good SIP amount depends on your income and financial goals. Financial experts typically recommend investing 20-30% of your monthly income. Start with what you can afford consistently and increase it gradually.',
      },
      {
        question: 'What is a realistic expected return rate?',
        answer: 'Equity mutual funds have historically delivered 12-15% annual returns over the long term. Debt funds typically return 6-8%. Use conservative estimates (10-12%) for planning to avoid overestimating returns.',
      },
      {
        question: 'Can I change my SIP amount later?',
        answer: 'Yes, most mutual funds allow you to increase, decrease, or pause your SIP. You can also start multiple SIPs in the same fund with different amounts.',
      },
      {
        question: 'What is the minimum time period for SIP?',
        answer: 'While there\'s no strict minimum, SIPs work best over longer periods (5+ years) due to the power of compounding. The longer you stay invested, the better your returns tend to be.',
      },
      {
        question: 'How accurate is this calculator?',
        answer: 'This calculator provides estimates based on a constant rate of return. Actual mutual fund returns vary yearly. Use it for planning purposes, but remember that past performance doesn\'t guarantee future results.',
      },
    ],
  };

  return (
    <CalculatorLayout
      title="SIP Return Calculator"
      description="Calculate returns on your Systematic Investment Plan with support for multiple currencies"
      icon={TrendingUp}
      calculator={calculator}
      content={content}
      gradient="from-blue-500 to-indigo-500"
    />
  );
}
