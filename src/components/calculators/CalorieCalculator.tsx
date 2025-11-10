import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';
import { Slider } from '../ui/slider';
import CalculatorLayout from './CalculatorLayout';

type UnitSystem = 'metric' | 'imperial';
type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary', multiplier: 1.2, description: 'Little or no exercise' },
  { value: 'light', label: 'Lightly Active', multiplier: 1.375, description: 'Exercise 1-3 days/week' },
  { value: 'moderate', label: 'Moderately Active', multiplier: 1.55, description: 'Exercise 3-5 days/week' },
  { value: 'active', label: 'Very Active', multiplier: 1.725, description: 'Exercise 6-7 days/week' },
  { value: 'veryActive', label: 'Extremely Active', multiplier: 1.9, description: 'Physical job or 2x training' },
];

export default function CalorieCalculator() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [heightCm, setHeightCm] = useState(170);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(7);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [results, setResults] = useState({ bmr: 0, tdee: 0, weightLoss: 0, weightGain: 0 });

  useEffect(() => {
    calculateCalories();
  }, [gender, age, weight, heightCm, heightFt, heightIn, activityLevel, unitSystem]);

  const calculateCalories = () => {
    let weightKg = weight;
    let heightCmValue = heightCm;

    if (unitSystem === 'imperial') {
      weightKg = weight * 0.453592;
      heightCmValue = ((heightFt * 12) + heightIn) * 2.54;
    }

    // Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = (10 * weightKg) + (6.25 * heightCmValue) - (5 * age) + 5;
    } else {
      bmr = (10 * weightKg) + (6.25 * heightCmValue) - (5 * age) - 161;
    }

    const activityMultiplier = activityLevels.find(a => a.value === activityLevel)?.multiplier || 1.2;
    const tdee = bmr * activityMultiplier;
    const weightLoss = tdee - 500;
    const weightGain = tdee + 500;

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightLoss: Math.round(weightLoss),
      weightGain: Math.round(weightGain),
    });
  };

  const calculator = (
    <div className="space-y-8">
      {/* Unit System & Gender */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-3 text-slate-700">Unit System</label>
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setUnitSystem('metric')}
              className={`p-3 rounded-xl border-2 transition-all ${
                unitSystem === 'metric'
                  ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 shadow-md'
                  : 'border-slate-200 hover:border-pink-300'
              }`}
            >
              <div className="text-center text-sm">Metric</div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setUnitSystem('imperial')}
              className={`p-3 rounded-xl border-2 transition-all ${
                unitSystem === 'imperial'
                  ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 shadow-md'
                  : 'border-slate-200 hover:border-pink-300'
              }`}
            >
              <div className="text-center text-sm">Imperial</div>
            </motion.button>
          </div>
        </div>

        <div>
          <label className="block mb-3 text-slate-700">Gender</label>
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setGender('male')}
              className={`p-3 rounded-xl border-2 transition-all ${
                gender === 'male'
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-md'
                  : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="text-center text-sm">Male</div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setGender('female')}
              className={`p-3 rounded-xl border-2 transition-all ${
                gender === 'female'
                  ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 shadow-md'
                  : 'border-slate-200 hover:border-pink-300'
              }`}
            >
              <div className="text-center text-sm">Female</div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Age */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">Age</label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <span className="text-purple-700">{age} years</span>
          </div>
        </div>
        <Slider
          value={[age]}
          onValueChange={(value) => setAge(value[0])}
          min={15}
          max={80}
          step={1}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>15 years</span>
          <span>80 years</span>
        </div>
      </div>

      {/* Weight */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-700">Weight</label>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <span className="text-blue-700">{weight} {unitSystem === 'metric' ? 'kg' : 'lbs'}</span>
          </div>
        </div>
        <Slider
          value={[weight]}
          onValueChange={(value) => setWeight(value[0])}
          min={unitSystem === 'metric' ? 30 : 66}
          max={unitSystem === 'metric' ? 200 : 440}
          step={unitSystem === 'metric' ? 0.5 : 1}
          className="mb-2"
        />
      </div>

      {/* Height */}
      {unitSystem === 'metric' ? (
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-slate-700">Height</label>
            <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
              <span className="text-emerald-700">{heightCm} cm</span>
            </div>
          </div>
          <Slider
            value={[heightCm]}
            onValueChange={(value) => setHeightCm(value[0])}
            min={100}
            max={250}
            step={1}
            className="mb-2"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-slate-700">Height (ft)</label>
              <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                <span className="text-emerald-700">{heightFt} ft</span>
              </div>
            </div>
            <Slider
              value={[heightFt]}
              onValueChange={(value) => setHeightFt(value[0])}
              min={3}
              max={8}
              step={1}
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-slate-700">Height (in)</label>
              <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                <span className="text-emerald-700">{heightIn} in</span>
              </div>
            </div>
            <Slider
              value={[heightIn]}
              onValueChange={(value) => setHeightIn(value[0])}
              min={0}
              max={11}
              step={1}
            />
          </div>
        </div>
      )}

      {/* Activity Level */}
      <div>
        <label className="block mb-3 text-slate-700">Activity Level</label>
        <div className="space-y-2">
          {activityLevels.map((level) => (
            <motion.button
              key={level.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setActivityLevel(level.value as ActivityLevel)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                activityLevel === level.value
                  ? 'border-pink-500 bg-gradient-to-r from-pink-50 to-rose-50 shadow-md'
                  : 'border-slate-200 hover:border-pink-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-slate-900">{level.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{level.description}</div>
                </div>
                <div className="text-sm text-slate-600">{level.multiplier}x</div>
              </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">BMR (Basal Metabolic Rate)</div>
            <div className="text-2xl">{results.bmr} cal/day</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">TDEE (Maintenance)</div>
            <div className="text-2xl">{results.tdee} cal/day</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">Weight Loss (-0.5kg/week)</div>
            <div className="text-2xl">{results.weightLoss} cal/day</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-2">Weight Gain (+0.5kg/week)</div>
            <div className="text-2xl">{results.weightGain} cal/day</div>
          </div>
        </div>

        {/* Macronutrient Breakdown */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200">
          <h3 className="mb-4">Recommended Macronutrients (at maintenance)</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-600">Protein (30%)</span>
                <span className="text-slate-900">{Math.round(results.tdee * 0.3 / 4)}g</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-[30%] bg-gradient-to-r from-blue-500 to-indigo-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-600">Carbs (40%)</span>
                <span className="text-slate-900">{Math.round(results.tdee * 0.4 / 4)}g</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-[40%] bg-gradient-to-r from-emerald-500 to-teal-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-600">Fats (30%)</span>
                <span className="text-slate-900">{Math.round(results.tdee * 0.3 / 9)}g</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-[30%] bg-gradient-to-r from-orange-500 to-red-500" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const content = {
    introduction: `The Calorie Calculator helps you determine your daily calorie needs based on your age, gender, weight, height, and activity level. It calculates your BMR (Basal Metabolic Rate) and TDEE (Total Daily Energy Expenditure), providing personalized recommendations for weight loss, maintenance, or weight gain.`,
    
    howToUse: [
      'Select your unit system (metric or imperial)',
      'Choose your gender (male or female)',
      'Enter your age, weight, and height',
      'Select your activity level based on your typical daily routine',
      'View your BMR, TDEE, and calorie recommendations for different goals',
      'Check the macronutrient breakdown for balanced nutrition',
    ],
    
    formula: `Mifflin-St Jeor Equation for BMR:

For Men:
BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5

For Women:
BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161

TDEE = BMR × Activity Factor

Activity Factors:
• Sedentary (little/no exercise): 1.2
• Lightly Active (1-3 days/week): 1.375
• Moderately Active (3-5 days/week): 1.55
• Very Active (6-7 days/week): 1.725
• Extremely Active (physical job + training): 1.9`,
    
    useCases: [
      {
        title: 'Weight Loss Planning',
        description: 'Calculate calorie deficit needed to lose weight safely (typically 500 cal below TDEE).',
      },
      {
        title: 'Muscle Building',
        description: 'Determine calorie surplus needed for muscle gain (typically 300-500 cal above TDEE).',
      },
      {
        title: 'Weight Maintenance',
        description: 'Find your maintenance calories to keep your current weight stable.',
      },
      {
        title: 'Nutrition Planning',
        description: 'Create balanced meal plans based on your daily calorie and macronutrient needs.',
      },
    ],
    
    faqs: [
      {
        question: 'What is the difference between BMR and TDEE?',
        answer: 'BMR is the number of calories your body needs at complete rest to maintain basic functions. TDEE is your total daily energy expenditure including all activities. TDEE = BMR × activity factor.',
      },
      {
        question: 'How many calories should I eat to lose weight?',
        answer: 'For safe, sustainable weight loss of about 0.5kg (1lb) per week, aim for a 500-calorie deficit below your TDEE. Never go below 1200 calories (women) or 1500 calories (men) without medical supervision.',
      },
      {
        question: 'Is this calculation accurate for everyone?',
        answer: 'This calculation works well for most people but may be less accurate for very muscular individuals, pregnant/breastfeeding women, or those with certain medical conditions. Consult a healthcare provider for personalized advice.',
      },
      {
        question: 'What are macronutrients and why are they important?',
        answer: 'Macronutrients are proteins, carbohydrates, and fats. Each plays a vital role: protein builds muscle, carbs provide energy, and fats support hormone production. A balanced ratio ensures optimal health and performance.',
      },
      {
        question: 'How often should I recalculate my calorie needs?',
        answer: 'Recalculate every 5-10 lbs of weight change or if your activity level changes significantly. Your calorie needs decrease as you lose weight and increase as you gain muscle.',
      },
    ],
  };

  return (
    <CalculatorLayout
      title="Calorie & TDEE Calculator"
      description="Calculate your daily calorie needs with support for metric and imperial units"
      icon={Activity}
      calculator={calculator}
      content={content}
      gradient="from-pink-500 to-rose-500"
    />
  );
}
