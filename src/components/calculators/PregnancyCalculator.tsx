import { useState } from 'react';
import { motion } from 'motion/react';
import { Baby, Calendar } from 'lucide-react';
import CalculatorLayout from './CalculatorLayout';

export default function PregnancyCalculator() {
  const [calculationMethod, setCalculationMethod] = useState<'lmp' | 'conception' | 'ultrasound'>('lmp');
  const [lmpDate, setLmpDate] = useState('2024-03-01');
  const [conceptionDate, setConceptionDate] = useState('2024-03-15');
  const [ultrasoundDate, setUltrasoundDate] = useState('2024-05-01');
  const [gestationalAge, setGestationalAge] = useState(8);

  const calculateDueDate = () => {
    let dueDate = new Date();
    
    if (calculationMethod === 'lmp') {
      const lmp = new Date(lmpDate);
      dueDate = new Date(lmp.getTime() + (280 * 24 * 60 * 60 * 1000)); // Add 280 days
    } else if (calculationMethod === 'conception') {
      const conception = new Date(conceptionDate);
      dueDate = new Date(conception.getTime() + (266 * 24 * 60 * 60 * 1000)); // Add 266 days
    } else {
      const ultrasound = new Date(ultrasoundDate);
      const daysPregnant = gestationalAge * 7;
      const daysRemaining = 280 - daysPregnant;
      dueDate = new Date(ultrasound.getTime() + (daysRemaining * 24 * 60 * 60 * 1000));
    }

    return dueDate;
  };

  const getCurrentWeek = () => {
    let startDate = new Date();
    
    if (calculationMethod === 'lmp') {
      startDate = new Date(lmpDate);
    } else if (calculationMethod === 'conception') {
      startDate = new Date(conceptionDate);
      startDate = new Date(startDate.getTime() - (14 * 24 * 60 * 60 * 1000)); // Subtract 2 weeks
    } else {
      return gestationalAge;
    }

    const today = new Date();
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 7);
  };

  const getTrimester = (weeks: number) => {
    if (weeks <= 13) return { number: 1, name: 'First Trimester', color: 'from-pink-500 to-rose-500' };
    if (weeks <= 27) return { number: 2, name: 'Second Trimester', color: 'from-purple-500 to-pink-500' };
    return { number: 3, name: 'Third Trimester', color: 'from-blue-500 to-purple-500' };
  };

  const dueDate = calculateDueDate();
  const currentWeek = getCurrentWeek();
  const trimester = getTrimester(currentWeek);
  const daysUntilDue = Math.max(0, Math.floor((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getMilestones = () => {
    const lmp = calculationMethod === 'lmp' ? new Date(lmpDate) : 
                calculationMethod === 'conception' ? new Date(new Date(conceptionDate).getTime() - (14 * 24 * 60 * 60 * 1000)) :
                new Date(new Date(ultrasoundDate).getTime() - (gestationalAge * 7 * 24 * 60 * 60 * 1000));
    
    return [
      { week: 12, name: 'First Trimester Ends', date: new Date(lmp.getTime() + (12 * 7 * 24 * 60 * 60 * 1000)) },
      { week: 20, name: 'Halfway Point!', date: new Date(lmp.getTime() + (20 * 7 * 24 * 60 * 60 * 1000)) },
      { week: 27, name: 'Second Trimester Ends', date: new Date(lmp.getTime() + (27 * 7 * 24 * 60 * 60 * 1000)) },
      { week: 37, name: 'Full Term', date: new Date(lmp.getTime() + (37 * 7 * 24 * 60 * 60 * 1000)) },
      { week: 40, name: 'Due Date', date: dueDate },
    ];
  };

  const calculator = (
    <div className="space-y-8">
      {/* Calculation Method */}
      <div>
        <label className="block mb-3 text-slate-700">Calculation Method</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCalculationMethod('lmp')}
            className={`p-4 rounded-xl border-2 transition-all ${
              calculationMethod === 'lmp'
                ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 shadow-md'
                : 'border-slate-200 hover:border-pink-300'
            }`}
          >
            <div className="text-center">
              <Calendar className="w-5 h-5 mx-auto mb-2 text-pink-600" />
              <div className="text-slate-900">Last Period</div>
              <div className="text-xs text-slate-500 mt-1">Most common method</div>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCalculationMethod('conception')}
            className={`p-4 rounded-xl border-2 transition-all ${
              calculationMethod === 'conception'
                ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-md'
                : 'border-slate-200 hover:border-purple-300'
            }`}
          >
            <div className="text-center">
              <Baby className="w-5 h-5 mx-auto mb-2 text-purple-600" />
              <div className="text-slate-900">Conception Date</div>
              <div className="text-xs text-slate-500 mt-1">If known</div>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCalculationMethod('ultrasound')}
            className={`p-4 rounded-xl border-2 transition-all ${
              calculationMethod === 'ultrasound'
                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-md'
                : 'border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className="text-center">
              <Calendar className="w-5 h-5 mx-auto mb-2 text-blue-600" />
              <div className="text-slate-900">Ultrasound</div>
              <div className="text-xs text-slate-500 mt-1">Most accurate</div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Date Inputs */}
      {calculationMethod === 'lmp' && (
        <div>
          <label className="block mb-2 text-slate-700">First Day of Last Menstrual Period (LMP)</label>
          <input
            type="date"
            value={lmpDate}
            onChange={(e) => setLmpDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pink-500 outline-none transition-colors"
          />
        </div>
      )}

      {calculationMethod === 'conception' && (
        <div>
          <label className="block mb-2 text-slate-700">Conception Date</label>
          <input
            type="date"
            value={conceptionDate}
            onChange={(e) => setConceptionDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 outline-none transition-colors"
          />
          <p className="mt-2 text-sm text-slate-500">
            Conception typically occurs about 2 weeks after your last period
          </p>
        </div>
      )}

      {calculationMethod === 'ultrasound' && (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-slate-700">Ultrasound Date</label>
            <input
              type="date"
              value={ultrasoundDate}
              onChange={(e) => setUltrasoundDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block mb-2 text-slate-700">Gestational Age at Ultrasound (weeks)</label>
            <input
              type="number"
              value={gestationalAge}
              onChange={(e) => setGestationalAge(Number(e.target.value))}
              min="1"
              max="40"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>
      )}

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* Due Date Card */}
        <motion.div
          key={dueDate.toString()}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className={`p-8 rounded-2xl bg-gradient-to-br ${trimester.color} text-white shadow-2xl text-center`}
        >
          <div className="text-sm opacity-90 mb-2">Estimated Due Date</div>
          <div className="text-4xl mb-4">{formatDate(dueDate)}</div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
            <Baby className="w-4 h-4" />
            <span>{daysUntilDue} days to go</span>
          </div>
        </motion.div>

        {/* Current Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">Current Week</div>
            <div className="text-3xl">Week {currentWeek}</div>
          </div>
          <div className={`p-6 rounded-2xl bg-gradient-to-br ${trimester.color} text-white shadow-xl`}>
            <div className="text-sm opacity-90 mb-2">Trimester</div>
            <div className="text-3xl">{trimester.name}</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">Progress</div>
            <div className="text-3xl">{Math.round((currentWeek / 40) * 100)}%</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200">
          <div className="mb-4">Pregnancy Timeline</div>
          <div className="h-4 rounded-full bg-slate-200 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentWeek / 40) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r ${trimester.color}`}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-slate-600">
            <span>Week 0</span>
            <span>Week 40</span>
          </div>
        </div>

        {/* Milestones */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200">
          <h3 className="mb-4">Important Milestones</h3>
          <div className="space-y-3">
            {getMilestones().map((milestone, index) => {
              const isPast = currentWeek >= milestone.week;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isPast ? 'bg-emerald-50 border border-emerald-200' : 'bg-slate-50 border border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isPast ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-600'
                    }`}>
                      {isPast ? '✓' : milestone.week}
                    </div>
                    <div>
                      <div className={isPast ? 'text-emerald-700' : 'text-slate-900'}>{milestone.name}</div>
                      <div className="text-xs text-slate-500">Week {milestone.week}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600">{formatDate(milestone.date)}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Weekly Development */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
          <h3 className="mb-3">Week {currentWeek} Development</h3>
          <p className="text-slate-600 mb-3">
            {currentWeek <= 4 && "Your baby is just starting to form. The embryo is about the size of a poppy seed."}
            {currentWeek > 4 && currentWeek <= 8 && "Major organs are beginning to develop. Your baby is about the size of a raspberry."}
            {currentWeek > 8 && currentWeek <= 12 && "Your baby's bones are forming and they can make movements. About the size of a lime."}
            {currentWeek > 12 && currentWeek <= 16 && "Your baby can hear sounds and their skeleton is hardening. About the size of an avocado."}
            {currentWeek > 16 && currentWeek <= 20 && "You might feel your baby move! They're about the size of a banana."}
            {currentWeek > 20 && currentWeek <= 24 && "Your baby's lungs are developing rapidly. About the size of an ear of corn."}
            {currentWeek > 24 && currentWeek <= 28 && "Your baby can open their eyes and respond to sound. About the size of a head of cauliflower."}
            {currentWeek > 28 && currentWeek <= 32 && "Your baby's brain is developing quickly. About the size of a pineapple."}
            {currentWeek > 32 && currentWeek <= 36 && "Your baby is getting ready for birth, gaining weight rapidly. About the size of a honeydew melon."}
            {currentWeek > 36 && "Your baby is full term and ready to meet you! About the size of a watermelon."}
          </p>
          <div className="flex items-center gap-2 text-sm text-purple-700">
            <Baby className="w-4 h-4" />
            <span>Remember to consult with your healthcare provider for personalized guidance</span>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const content = {
    introduction: `The Pregnancy Due Date Calculator helps expectant mothers estimate their baby's due date and track their pregnancy progress. Using the first day of your last menstrual period (LMP), conception date, or ultrasound data, this calculator provides an estimated delivery date and shows important pregnancy milestones throughout your journey.`,
    
    howToUse: [
      'Select your preferred calculation method (LMP, Conception Date, or Ultrasound)',
      'Enter the corresponding date based on your selection',
      'For ultrasound method, also enter the gestational age confirmed by your doctor',
      'View your estimated due date and current pregnancy week',
      'Track important milestones and trimester progress',
      'Review weekly development information for your stage',
    ],
    
    formula: `Pregnancy Due Date Calculations:

Naegele's Rule (LMP Method):
Due Date = LMP + 280 days (40 weeks)

Conception Date Method:
Due Date = Conception Date + 266 days (38 weeks)

Ultrasound Method:
Due Date = Ultrasound Date + (280 - Gestational Age in days)

Pregnancy is typically 40 weeks from LMP or 38 weeks from conception.

Trimesters:
• First Trimester: Weeks 1-13
• Second Trimester: Weeks 14-27
• Third Trimester: Weeks 28-40`,
    
    useCases: [
      {
        title: 'Pregnancy Planning',
        description: 'Plan important events, appointments, and preparations around your estimated due date.',
      },
      {
        title: 'Healthcare Scheduling',
        description: 'Schedule prenatal visits and tests at appropriate times during your pregnancy.',
      },
      {
        title: 'Milestone Tracking',
        description: 'Track your baby\'s development and know what to expect each week.',
      },
      {
        title: 'Work Planning',
        description: 'Plan maternity leave and coordinate work responsibilities before delivery.',
      },
    ],
    
    faqs: [
      {
        question: 'How accurate is the due date calculation?',
        answer: 'Only about 5% of babies are born on their exact due date. Most babies arrive within 2 weeks before or after the estimated date. The ultrasound method is generally most accurate, especially when done in the first trimester.',
      },
      {
        question: 'What if I don\'t know my LMP date?',
        answer: 'Use the ultrasound method instead. Your healthcare provider can determine gestational age through an ultrasound scan, which is very accurate, especially in early pregnancy.',
      },
      {
        question: 'Why is pregnancy counted from LMP, not conception?',
        answer: 'The LMP date is used because it\'s easier to remember than the exact conception date. Conception typically occurs about 2 weeks after LMP, but this can vary. Medical professionals use LMP as a standard reference point.',
      },
      {
        question: 'Can my due date change?',
        answer: 'Your due date may be adjusted based on early ultrasound measurements, especially if there\'s a significant difference from the LMP-based date. First-trimester ultrasounds are most accurate for dating.',
      },
      {
        question: 'What if I have irregular periods?',
        answer: 'If your menstrual cycles are irregular, the LMP method may be less accurate. Discuss with your healthcare provider about using ultrasound dating instead, which is more reliable in these cases.',
      },
    ],
  };

  return (
    <CalculatorLayout
      title="Pregnancy Due Date Calculator"
      description="Calculate your estimated due date and track pregnancy milestones"
      icon={Baby}
      calculator={calculator}
      content={content}
      gradient="from-purple-500 to-pink-500"
    />
  );
}
