import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText } from 'lucide-react';
import { Slider } from '../ui/slider';
import CalculatorLayout from './CalculatorLayout';

const gstRates = [
  { rate: 0, label: '0% - Essential goods' },
  { rate: 0.25, label: '0.25% - Precious stones' },
  { rate: 3, label: '3% - Gold, silver' },
  { rate: 5, label: '5% - Household necessities' },
  { rate: 12, label: '12% - Standard goods' },
  { rate: 18, label: '18% - Most goods & services' },
  { rate: 28, label: '28% - Luxury items' },
];

export default function GSTCalculator() {
  const [calculationType, setCalculationType] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [amount, setAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [results, setResults] = useState({ gstAmount: 0, totalAmount: 0, netAmount: 0 });

  useEffect(() => {
    calculateGST();
  }, [amount, gstRate, calculationType]);

  const calculateGST = () => {
    if (calculationType === 'exclusive') {
      // Add GST to base amount
      const gstAmount = (amount * gstRate) / 100;
      const totalAmount = amount + gstAmount;
      setResults({
        gstAmount: Math.round(gstAmount * 100) / 100,
        totalAmount: Math.round(totalAmount * 100) / 100,
        netAmount: amount,
      });
    } else {
      // Remove GST from total amount
      const netAmount = (amount * 100) / (100 + gstRate);
      const gstAmount = amount - netAmount;
      setResults({
        gstAmount: Math.round(gstAmount * 100) / 100,
        totalAmount: amount,
        netAmount: Math.round(netAmount * 100) / 100,
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'decimal',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const calculator = (
    <div className="space-y-8">
      {/* Calculation Type */}
      <div>
        <label className="block mb-3 text-slate-700">Calculation Type</label>
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCalculationType('exclusive')}
            className={`p-4 rounded-xl border-2 transition-all ${
              calculationType === 'exclusive'
                ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-md'
                : 'border-slate-200 hover:border-orange-300'
            }`}
          >
            <div className="text-center">
              <div className="text-slate-900">Add GST</div>
              <div className="text-xs text-slate-500 mt-1">GST Exclusive</div>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCalculationType('inclusive')}
            className={`p-4 rounded-xl border-2 transition-all ${
              calculationType === 'inclusive'
                ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-md'
                : 'border-slate-200 hover:border-orange-300'
            }`}
          >
            <div className="text-center">
              <div className="text-slate-900">Remove GST</div>
              <div className="text-xs text-slate-500 mt-1">GST Inclusive</div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Amount */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">
            {calculationType === 'exclusive' ? 'Base Amount' : 'Total Amount (with GST)'}
          </label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <span className="text-blue-700">₹ {formatCurrency(amount)}</span>
          </div>
        </div>
        <Slider
          value={[amount]}
          onValueChange={(value) => setAmount(value[0])}
          min={100}
          max={1000000}
          step={100}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>₹100</span>
          <span>₹10,00,000</span>
        </div>
      </div>

      {/* GST Rate Selector */}
      <div>
        <label className="block mb-3 text-slate-700">Select GST Rate</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {gstRates.map((rate) => (
            <motion.button
              key={rate.rate}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGstRate(rate.rate)}
              className={`p-3 rounded-xl border-2 transition-all ${
                gstRate === rate.rate
                  ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-md'
                  : 'border-slate-200 hover:border-orange-300'
              }`}
            >
              <div className="text-center">
                <div className="text-slate-900">{rate.rate}%</div>
              </div>
            </motion.button>
          ))}
        </div>
        <div className="mt-3 p-3 rounded-lg bg-slate-50 text-sm text-slate-600">
          {gstRates.find(r => r.rate === gstRate)?.label}
        </div>
      </div>

      {/* Custom GST Rate */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">Or Enter Custom Rate</label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <span className="text-purple-700">{gstRate}%</span>
          </div>
        </div>
        <Slider
          value={[gstRate]}
          onValueChange={(value) => setGstRate(value[0])}
          min={0}
          max={28}
          step={0.25}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>0%</span>
          <span>28%</span>
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
            <div className="text-sm opacity-90 mb-2">Net Amount</div>
            <div className="text-2xl">₹ {formatCurrency(results.netAmount)}</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">GST Amount</div>
            <div className="text-2xl">₹ {formatCurrency(results.gstAmount)}</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">Total Amount</div>
            <div className="text-2xl">₹ {formatCurrency(results.totalAmount)}</div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200">
          <div className="mb-4">GST Breakdown</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-600">Base Amount (Excluding GST)</span>
              <span className="text-slate-900">₹ {formatCurrency(results.netAmount)}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-600">GST @ {gstRate}%</span>
              <span className="text-orange-600">+ ₹ {formatCurrency(results.gstAmount)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-900">Total Amount (Including GST)</span>
              <span className="text-emerald-600">₹ {formatCurrency(results.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* CGST/SGST Split */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-orange-50 border border-slate-200">
          <div className="mb-4">CGST & SGST Split</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-500 mb-1">CGST ({gstRate / 2}%)</div>
              <div className="text-slate-900">₹ {formatCurrency(results.gstAmount / 2)}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">SGST ({gstRate / 2}%)</div>
              <div className="text-slate-900">₹ {formatCurrency(results.gstAmount / 2)}</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-500">
            For intra-state transactions. For inter-state, use IGST @ {gstRate}%
          </div>
        </div>
      </motion.div>
    </div>
  );

  const content = {
    introduction: `The Goods and Services Tax (GST) Calculator helps you calculate GST amounts for your business transactions in India. You can either add GST to a base amount (GST Exclusive) or remove GST from a total amount (GST Inclusive). This tool supports all standard GST rates applicable in India.`,
    
    howToUse: [
      'Choose whether you want to add GST (exclusive) or remove GST (inclusive)',
      'Enter your base amount or total amount depending on your selection',
      'Select the applicable GST rate from the standard rates or enter a custom rate',
      'View the instant calculation showing net amount, GST amount, and total',
      'Check the CGST/SGST split for intra-state transactions',
    ],
    
    formula: `GST Calculation Formulas:

For GST Exclusive (Add GST):
GST Amount = (Base Amount × GST Rate) / 100
Total Amount = Base Amount + GST Amount

For GST Inclusive (Remove GST):
Net Amount = (Total Amount × 100) / (100 + GST Rate)
GST Amount = Total Amount - Net Amount

CGST/SGST Split (Intra-state):
CGST = GST Amount / 2
SGST = GST Amount / 2

IGST (Inter-state):
IGST = GST Amount`,
    
    useCases: [
      {
        title: 'Invoice Generation',
        description: 'Calculate exact GST amounts to include in customer invoices for goods and services.',
      },
      {
        title: 'Purchase Planning',
        description: 'Determine the actual cost excluding GST when you know the total price including tax.',
      },
      {
        title: 'Tax Filing',
        description: 'Accurately compute GST liability for your business tax returns and compliance.',
      },
      {
        title: 'Pricing Strategy',
        description: 'Set competitive prices by understanding the impact of different GST rates on your products.',
      },
    ],
    
    faqs: [
      {
        question: 'What are the different GST rates in India?',
        answer: 'India has multiple GST slabs: 0% (essential items), 0.25% (precious stones), 3% (gold/silver), 5% (household necessities), 12% (standard goods), 18% (most goods & services), and 28% (luxury items and sin goods).',
      },
      {
        question: 'What is the difference between CGST, SGST, and IGST?',
        answer: 'For intra-state transactions, GST is split equally between CGST (Central GST) and SGST (State GST). For inter-state transactions, IGST (Integrated GST) is charged at the full rate.',
      },
      {
        question: 'When should I use GST Exclusive vs Inclusive?',
        answer: 'Use GST Exclusive when you have a base price and need to add GST. Use GST Inclusive when you have a final price and need to find out how much GST is included in it.',
      },
      {
        question: 'Is GST applicable on all goods and services?',
        answer: 'Most goods and services are subject to GST, but some items like fresh fruits, vegetables, unbranded cereals, and certain services are exempt. Always check current GST regulations for specific items.',
      },
      {
        question: 'How do I know which GST rate applies to my product?',
        answer: 'GST rates are classified by HSN (Harmonized System of Nomenclature) codes for goods and SAC (Service Accounting Code) for services. Consult the GST rate schedule or a tax professional for accurate classification.',
      },
    ],
  };

  return (
    <CalculatorLayout
      title="GST Calculator India"
      description="Calculate GST inclusive and exclusive amounts with support for all Indian GST rates"
      icon={FileText}
      calculator={calculator}
      content={content}
      gradient="from-orange-500 to-red-500"
    />
  );
}
