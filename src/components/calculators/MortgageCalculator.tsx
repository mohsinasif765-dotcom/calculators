import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Home, IndianRupee, DollarSign, Euro, PoundSterling } from 'lucide-react';
import { Slider } from '../ui/slider';
import CalculatorLayout from './CalculatorLayout';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar', icon: DollarSign },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', icon: IndianRupee },
  { code: 'EUR', symbol: '€', name: 'Euro', icon: Euro },
  { code: 'GBP', symbol: '£', name: 'British Pound', icon: PoundSterling },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', icon: DollarSign },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', icon: DollarSign },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', icon: DollarSign },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', icon: DollarSign },
];

export default function MortgageCalculator() {
  const [currency, setCurrency] = useState(currencies[0]);
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [downPayment, setDownPayment] = useState(60000);
  const [results, setResults] = useState({ monthlyPayment: 0, totalPayment: 0, totalInterest: 0 });

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, interestRate, loanTerm, downPayment]);

  const calculateMortgage = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = principal / numberOfPayments;
    } else {
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResults({
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
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
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-md'
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

      {/* Home Price */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">Home Price</label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
            <span className="text-blue-700">{currency.symbol} {formatCurrency(loanAmount)}</span>
          </div>
        </div>
        <Slider
          value={[loanAmount]}
          onValueChange={(value) => setLoanAmount(value[0])}
          min={50000}
          max={2000000}
          step={10000}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>{currency.symbol}50K</span>
          <span>{currency.symbol}2M</span>
        </div>
      </div>

      {/* Down Payment */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">Down Payment</label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
            <span className="text-emerald-700">{currency.symbol} {formatCurrency(downPayment)} ({((downPayment/loanAmount) * 100).toFixed(0)}%)</span>
          </div>
        </div>
        <Slider
          value={[downPayment]}
          onValueChange={(value) => setDownPayment(value[0])}
          min={0}
          max={loanAmount * 0.5}
          step={5000}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>{currency.symbol}0</span>
          <span>{currency.symbol}{formatCurrency(loanAmount * 0.5)}</span>
        </div>
      </div>

      {/* Interest Rate */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">Interest Rate (Annual)</label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <span className="text-purple-700">{interestRate.toFixed(2)}%</span>
          </div>
        </div>
        <Slider
          value={[interestRate]}
          onValueChange={(value) => setInterestRate(value[0])}
          min={1}
          max={15}
          step={0.25}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>1%</span>
          <span>15%</span>
        </div>
      </div>

      {/* Loan Term */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">Loan Term</label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
            <span className="text-orange-700">{loanTerm} years</span>
          </div>
        </div>
        <Slider
          value={[loanTerm]}
          onValueChange={(value) => setLoanTerm(value[0])}
          min={5}
          max={30}
          step={5}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>5 years</span>
          <span>30 years</span>
        </div>
      </div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-xl">
          <div className="text-sm opacity-90 mb-2">Monthly Payment</div>
          <div className="text-2xl">{currency.symbol} {formatCurrency(results.monthlyPayment)}</div>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl">
          <div className="text-sm opacity-90 mb-2">Total Interest</div>
          <div className="text-2xl">{currency.symbol} {formatCurrency(results.totalInterest)}</div>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl">
          <div className="text-sm opacity-90 mb-2">Total Payment</div>
          <div className="text-2xl">{currency.symbol} {formatCurrency(results.totalPayment)}</div>
        </div>
      </motion.div>

      {/* Payment Breakdown */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200">
        <div className="mb-4">Payment Breakdown</div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">Principal & Interest</span>
              <span className="text-slate-900">{currency.symbol} {formatCurrency(results.monthlyPayment)}/mo</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <div>
              <div className="text-xs text-slate-500 mb-1">Loan Amount</div>
              <div className="text-slate-900">{currency.symbol} {formatCurrency(loanAmount - downPayment)}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Down Payment</div>
              <div className="text-slate-900">{currency.symbol} {formatCurrency(downPayment)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const content = {
    introduction: `A mortgage calculator helps you estimate your monthly home loan payments based on the loan amount, interest rate, and loan term. This tool is essential for home buyers to understand their financial commitment and plan their budget accordingly.`,
    
    howToUse: [
      'Select your preferred currency from the available options',
      'Enter the total home price you\'re considering',
      'Set your down payment amount (typically 10-20% of home price)',
      'Input the annual interest rate offered by your lender',
      'Choose your loan term (15, 20, or 30 years are common)',
      'View your monthly payment, total interest, and total payment instantly',
    ],
    
    formula: `The mortgage payment calculator uses the standard amortization formula:

M = P × [r(1 + r)^n] / [(1 + r)^n - 1]

Where:
- M = Monthly Payment
- P = Principal (Loan Amount - Down Payment)
- r = Monthly Interest Rate (Annual Rate / 12)
- n = Total Number of Payments (Years × 12)

Total Interest = (M × n) - P
Total Payment = M × n`,
    
    useCases: [
      {
        title: 'Home Purchase Planning',
        description: 'Determine how much house you can afford based on your budget and desired monthly payment.',
      },
      {
        title: 'Comparing Loan Options',
        description: 'Compare different interest rates and loan terms to find the best mortgage deal.',
      },
      {
        title: 'Refinancing Decision',
        description: 'Calculate potential savings from refinancing your existing mortgage at a lower rate.',
      },
      {
        title: 'Budget Planning',
        description: 'Understand your total housing costs including principal and interest payments.',
      },
    ],
    
    faqs: [
      {
        question: 'What is a good down payment percentage?',
        answer: 'A 20% down payment is traditional and helps you avoid private mortgage insurance (PMI). However, many lenders offer loans with 5-10% down. The larger your down payment, the lower your monthly payments and total interest paid.',
      },
      {
        question: 'How does interest rate affect my payment?',
        answer: 'Interest rate significantly impacts your monthly payment and total interest paid. Even a 0.5% difference in rate can mean thousands of dollars over the life of the loan. Always shop around for the best rate.',
      },
      {
        question: 'Should I choose a 15-year or 30-year mortgage?',
        answer: '30-year mortgages have lower monthly payments but higher total interest. 15-year mortgages have higher monthly payments but you\'ll pay significantly less interest overall and build equity faster. Choose based on your budget and financial goals.',
      },
      {
        question: 'What other costs should I consider?',
        answer: 'Besides principal and interest, consider property taxes, homeowners insurance, HOA fees, and maintenance costs. These can add 30-50% to your monthly housing costs.',
      },
      {
        question: 'Can I pay off my mortgage early?',
        answer: 'Most mortgages allow early payoff, but check for prepayment penalties. Making extra principal payments can save thousands in interest and shorten your loan term significantly.',
      },
    ],
  };

  return (
    <CalculatorLayout
      title="Mortgage Calculator"
      description="Calculate monthly payments and total interest for your home loan with multi-currency support"
      icon={Home}
      calculator={calculator}
      content={content}
      gradient="from-blue-500 to-cyan-500"
    />
  );
}
