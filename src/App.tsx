import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calculator, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';
import HomePage from './components/HomePage';
import SIPCalculator from './components/calculators/SIPCalculator';
import MortgageCalculator from './components/calculators/MortgageCalculator';
import GSTCalculator from './components/calculators/GSTCalculator';
import CompoundInterestCalculator from './components/calculators/CompoundInterestCalculator';
import CalorieCalculator from './components/calculators/CalorieCalculator';
import BMICalculator from './components/calculators/BMICalculator';
import PercentageCalculator from './components/calculators/PercentageCalculator';
import DiscountCalculator from './components/calculators/DiscountCalculator';
import PaycheckCalculator from './components/calculators/PaycheckCalculator';
import PregnancyCalculator from './components/calculators/PregnancyCalculator';
import About from './components/About';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sip-calculator" element={<SIPCalculator />} />
          <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
          <Route path="/gst-calculator" element={<GSTCalculator />} />
          <Route path="/compound-interest-calculator" element={<CompoundInterestCalculator />} />
          <Route path="/calorie-calculator" element={<CalorieCalculator />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="/discount-calculator" element={<DiscountCalculator />} />
          <Route path="/paycheck-calculator" element={<PaycheckCalculator />} />
          <Route path="/pregnancy-calculator" element={<PregnancyCalculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const calculators = [
    { path: '/sip-calculator', name: 'SIP Calculator', category: 'Finance' },
    { path: '/mortgage-calculator', name: 'Mortgage Calculator', category: 'Finance' },
    { path: '/gst-calculator', name: 'GST Calculator', category: 'Tax' },
    { path: '/compound-interest-calculator', name: 'Compound Interest', category: 'Finance' },
    { path: '/calorie-calculator', name: 'Calorie Calculator', category: 'Health' },
    { path: '/bmi-calculator', name: 'BMI Calculator', category: 'Health' },
    { path: '/percentage-calculator', name: 'Percentage Calculator', category: 'Utility' },
    { path: '/discount-calculator', name: 'Discount Calculator', category: 'Retail' },
    { path: '/paycheck-calculator', name: 'Paycheck Calculator', category: 'Finance' },
    { path: '/pregnancy-calculator', name: 'Pregnancy Calculator', category: 'Health' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg"
            >
              <Calculator className="w-6 h-6 text-white" />
            </motion.div>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CalcPro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/about"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/about'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              About
            </Link>
            <Link
              to="/privacy"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/privacy'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Privacy
            </Link>
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-2">
                Calculators
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-2 max-h-96 overflow-y-auto">
                  {calculators.map((calc, index) => (
                    <Link
                      key={calc.path}
                      to={calc.path}
                      className="block px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all group/item"
                    >
                      <div className="text-slate-900 group-hover/item:text-blue-600 transition-colors">
                        {calc.name}
                      </div>
                      <div className="text-xs text-slate-500">{calc.category}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-all"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-slate-200 bg-white"
        >
          <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            >
              Home
            </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-slate-50 transition-all"
              >
                About
              </Link>
              <Link
                to="/privacy"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-slate-50 transition-all"
              >
                Privacy
              </Link>
            <div className="pt-2 pb-1 text-xs text-slate-500 px-4">Calculators</div>
            {calculators.map((calc) => (
              <Link
                key={calc.path}
                to={calc.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-slate-50 transition-all"
              >
                <div className="text-slate-900">{calc.name}</div>
                <div className="text-xs text-slate-500">{calc.category}</div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl">CalcPro</span>
            </div>
            <p className="text-slate-300 max-w-md">
              Professional calculators for finance, health, and everyday use. Get accurate results instantly with our easy-to-use tools.
            </p>
          </div>
          <div>
            <div className="mb-4">Finance Tools</div>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="/sip-calculator" className="hover:text-white transition-colors">SIP Calculator</Link></li>
              <li><Link to="/mortgage-calculator" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
              <li><Link to="/compound-interest-calculator" className="hover:text-white transition-colors">Compound Interest</Link></li>
            </ul>
          </div>
          <div>
            <div className="mb-4">Health Tools</div>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="/bmi-calculator" className="hover:text-white transition-colors">BMI Calculator</Link></li>
              <li><Link to="/calorie-calculator" className="hover:text-white transition-colors">Calorie Calculator</Link></li>
              <li><Link to="/pregnancy-calculator" className="hover:text-white transition-colors">Pregnancy Calculator</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-700 text-center text-slate-400">
          <p>&copy; 2025 CalcPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default App;
