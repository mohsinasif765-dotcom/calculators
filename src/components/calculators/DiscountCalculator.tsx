import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Tag } from 'lucide-react';
import { Slider } from '../ui/slider';
import CalculatorLayout from './CalculatorLayout';
import CurrencySelect, { currencies } from '../ui/CurrencySelect';

export default function DiscountCalculator() {
  const [currency, setCurrency] = useState(currencies[0]);
  const [originalPrice, setOriginalPrice] = useState(100);
  const [discountPercent, setDiscountPercent] = useState(20);
  const [results, setResults] = useState({ discountAmount: 0, finalPrice: 0, savings: 0 });

  useEffect(() => {
    calculateDiscount();
  }, [originalPrice, discountPercent]);

  const calculateDiscount = () => {
    const discountAmount = (originalPrice * discountPercent) / 100;
    const finalPrice = originalPrice - discountAmount;

    setResults({
      discountAmount: Math.round(discountAmount * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
      savings: discountPercent,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const calculator = (
    <div className="space-y-8">
      {/* Currency Selector */}
      <div>
        <label className="block mb-3 text-slate-700">Select Currency</label>
        <CurrencySelect value={currency} onChange={setCurrency} />
      </div>

      {/* Original Price */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">Original Price</label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <span className="text-blue-700">{currency.symbol} {formatCurrency(originalPrice)}</span>
          </div>
        </div>
        <Slider
          value={[originalPrice]}
          onValueChange={(value: number[]) => setOriginalPrice(value[0])}
          min={1}
          max={10000}
          step={1}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>{currency.symbol}1</span>
          <span>{currency.symbol}10,000</span>
        </div>
      </div>

      {/* Discount Percentage */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">Discount Percentage</label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
            <span className="text-orange-700">{discountPercent}% OFF</span>
          </div>
        </div>
        <Slider
          value={[discountPercent]}
          onValueChange={(value: number[]) => setDiscountPercent(value[0])}
          min={1}
          max={90}
          step={1}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>1%</span>
          <span>90%</span>
        </div>
      </div>

      {/* Quick Discount Presets */}
      <div>
        <label className="block mb-3 text-slate-700">Quick Select</label>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {[10, 15, 20, 25, 30, 40, 50, 75].map((preset) => (
            <motion.button
              key={preset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDiscountPercent(preset)}
              className={`p-3 rounded-xl border-2 transition-all ${
                discountPercent === preset
                  ? 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-md'
                  : 'border-slate-200 hover:border-yellow-300'
              }`}
            >
              <div className="text-center text-sm">{preset}%</div>
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
        {/* Main Result Card */}
        <motion.div
          key={results.finalPrice}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-2xl text-center"
        >
          <div className="text-sm opacity-90 mb-2">Final Price</div>
          <div className="text-5xl mb-4">{currency.symbol} {formatCurrency(results.finalPrice)}</div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
            <Tag className="w-4 h-4" />
            <span>{discountPercent}% OFF</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">You Save</div>
            <div className="text-2xl">{currency.symbol} {formatCurrency(results.discountAmount)}</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">Savings Percentage</div>
            <div className="text-2xl">{results.savings}%</div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200">
          <div className="mb-4">Price Breakdown</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-600">Original Price</span>
              <span className="text-slate-900">{currency.symbol} {formatCurrency(originalPrice)}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-600">Discount ({discountPercent}%)</span>
              <span className="text-red-600">- {currency.symbol} {formatCurrency(results.discountAmount)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-900">Final Price</span>
              <span className="text-emerald-600">{currency.symbol} {formatCurrency(results.finalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Visual Savings */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-orange-50 border border-slate-200">
          <div className="mb-4">Visual Savings</div>
          <div className="h-12 rounded-full overflow-hidden flex items-center bg-slate-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${100 - discountPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white"
            >
              <span className="text-sm px-4">Pay {100 - discountPercent}%</span>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${discountPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="h-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white"
            >
              <span className="text-sm px-4">Save {discountPercent}%</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const content = {
    introduction: `The Discount Calculator helps you quickly calculate the final price after applying a discount percentage. Perfect for shoppers, retailers, and anyone dealing with sales, this tool shows you exactly how much you'll save and what you'll pay. It supports multiple currencies for international shopping convenience.`,
    
    howToUse: [
      'Select your preferred currency',
      'Enter the original price of the item',
      'Adjust the discount percentage using the slider or select a preset',
      'View the final price, savings amount, and visual breakdown instantly',
      'Use quick select buttons for common discount percentages',
    ],
    
    formula: `Discount Calculation Formulas:

Discount Amount = Original Price × (Discount % / 100)

Final Price = Original Price - Discount Amount

Or directly:
Final Price = Original Price × (1 - Discount % / 100)

Savings Percentage = (Discount Amount / Original Price) × 100`,
    
    useCases: [
      {
        title: 'Online Shopping',
        description: 'Calculate actual prices during sales and compare deals across different retailers.',
      },
      {
        title: 'Retail Business',
        description: 'Set sale prices and determine profit margins after offering discounts.',
      },
      {
        title: 'Coupon Stacking',
        description: 'Calculate cumulative discounts when multiple coupons or offers are applied.',
      },
      {
        title: 'Budget Planning',
        description: 'Plan purchases during sales and determine if deals fit your budget.',
      },
    ],
    
    faqs: [
      {
        question: 'How do I calculate multiple discounts?',
        answer: 'For multiple discounts, apply them sequentially. For example, 20% off followed by 10% off: First apply 20% to get a new price, then apply 10% to that result. This gives a different result than adding percentages (not 30% total).',
      },
      {
        question: 'What\'s the difference between discount and sale price?',
        answer: 'The discount is the amount you save (Original - Sale Price), while the sale price is what you actually pay. Both are important for understanding the value of a deal.',
      },
      {
        question: 'How do stores determine discount percentages?',
        answer: 'Retailers calculate discounts based on profit margins, inventory turnover needs, competition, and marketing strategies. Common discounts (25%, 50%, 75%) are psychologically appealing numbers.',
      },
      {
        question: 'Is a higher discount percentage always better?',
        answer: 'Not necessarily! A 50% discount on a $100 item ($50 off) is better than 75% off a $50 item ($37.50 off). Compare actual dollar savings and final prices, not just percentages.',
      },
      {
        question: 'How accurate is this calculator for tax and fees?',
        answer: 'This calculator shows pre-tax prices. Remember to add sales tax, shipping, or other fees to get your final checkout amount. The discount usually applies before taxes are added.',
      },
    ],
  };

  return (
    <CalculatorLayout
      title="Discount Calculator"
      description="Calculate final price after discount with multi-currency support"
      icon={Tag}
      calculator={calculator}
      content={content}
      gradient="from-yellow-500 to-orange-500"
    />
  );
}
