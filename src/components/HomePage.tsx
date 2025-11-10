import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Home as HomeIcon,
  FileText,
  Percent,
  Activity,
  Heart,
  Calculator as CalcIcon,
  Tag,
  Wallet,
  Baby,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const calculators = [
    {
      path: '/sip-calculator',
      name: 'SIP Return Calculator',
      description: 'Calculate returns on your Systematic Investment Plan',
      icon: TrendingUp,
      category: 'Finance',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      path: '/mortgage-calculator',
      name: 'Mortgage Calculator',
      description: 'Calculate monthly payments and total interest for your home loan',
      icon: HomeIcon,
      category: 'Finance',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      path: '/gst-calculator',
      name: 'GST Calculator',
      description: 'Calculate GST inclusive and exclusive amounts',
      icon: FileText,
      category: 'Tax',
      comingSoon: true,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      path: '/compound-interest-calculator',
      name: 'Compound Interest Calculator',
      description: 'Calculate compound interest and future value of investments',
      icon: TrendingUp,
      category: 'Finance',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      path: '/calorie-calculator',
      name: 'Calorie/TDEE Calculator',
      description: 'Calculate your daily calorie needs and Total Daily Energy Expenditure',
      icon: Activity,
      category: 'Health',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      path: '/bmi-calculator',
      name: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and health status',
      icon: Heart,
      category: 'Health',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      path: '/percentage-calculator',
      name: 'Percentage Calculator',
      description: 'Calculate percentages, increase, decrease and more',
      icon: Percent,
      category: 'Utility',
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      path: '/discount-calculator',
      name: 'Discount Calculator',
      description: 'Calculate final price after discount and savings',
      icon: Tag,
      category: 'Retail',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      path: '/paycheck-calculator',
      name: 'Paycheck Calculator',
      description: 'Calculate take-home salary after tax deductions',
      icon: Wallet,
      category: 'Finance',
      comingSoon: true,
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      path: '/pregnancy-calculator',
      name: 'Pregnancy Due Date Calculator',
      description: 'Calculate your estimated due date and pregnancy timeline',
      icon: Baby,
      category: 'Health',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 mb-6"
            >
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700">Professional Calculator Suite</span>
            </motion.div>
            
            <h1 className="mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Powerful Calculators for
              <br />
              Finance, Health & More
            </h1>
            
            <p className="text-slate-600 max-w-2xl mx-auto mb-8">
              Get instant, accurate calculations with our suite of professional tools. 
              Perfect for financial planning, health tracking, and everyday calculations.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link
                to="/sip-calculator"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 rounded-xl bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-300 transition-all">
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4 bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent">
              Choose Your Calculator
            </h2>
            <p className="text-slate-600">
              Select from our comprehensive suite of calculators designed for accuracy and ease of use
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {calculators.map((calc) => {
              const Icon = calc.icon;
              const card = (
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-slate-100 overflow-hidden ${calc.comingSoon ? 'opacity-70 pointer-events-none' : ''}`}
                >
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${calc.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs">
                      {calc.category}
                    </span>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${calc.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  <h3 className="mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
                    {calc.name}
                  </h3>
                  
                  <p className="text-slate-600 mb-4">
                    {calc.description}
                  </p>

                  {calc.comingSoon && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-amber-400 text-white rounded-md text-xs font-medium">Coming soon</div>
                  )}

                  <div className="flex items-center gap-2 text-blue-600 group-hover:gap-3 transition-all">
                    <span>{calc.comingSoon ? 'Coming soon' : 'Calculate now'}</span>
                    {!calc.comingSoon && <ArrowRight className="w-4 h-4" />}
                  </div>
                </motion.div>
              );

              return (
                <motion.div key={calc.path} variants={item}>
                  {calc.comingSoon ? card : <Link to={calc.path}>{card}</Link>}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CalcIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2">Accurate Calculations</h3>
              <p className="text-slate-600">Precise results using industry-standard formulas</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2">Real-time Results</h3>
              <p className="text-slate-600">Instant calculations as you type</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2">User Friendly</h3>
              <p className="text-slate-600">Simple interface designed for everyone</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
