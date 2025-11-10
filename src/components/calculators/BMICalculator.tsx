import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { Slider } from '../ui/slider';
import CalculatorLayout from './CalculatorLayout';

type UnitSystem = 'metric' | 'imperial';

export default function BMICalculator() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [weight, setWeight] = useState(70);
  const [heightCm, setHeightCm] = useState(170);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(7);
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState({ name: '', color: '', gradient: '' });

  useEffect(() => {
    calculateBMI();
  }, [weight, heightCm, heightFt, heightIn, unitSystem]);

  const calculateBMI = () => {
    let bmiValue = 0;
    
    if (unitSystem === 'metric') {
      const heightM = heightCm / 100;
      bmiValue = weight / (heightM * heightM);
    } else {
      const totalInches = (heightFt * 12) + heightIn;
      bmiValue = (weight / (totalInches * totalInches)) * 703;
    }

    setBmi(parseFloat(bmiValue.toFixed(1)));
    
    if (bmiValue < 18.5) {
      setCategory({ 
        name: 'Underweight', 
        color: 'text-blue-600',
        gradient: 'from-blue-500 to-cyan-500'
      });
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory({ 
        name: 'Normal Weight', 
        color: 'text-emerald-600',
        gradient: 'from-emerald-500 to-teal-500'
      });
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory({ 
        name: 'Overweight', 
        color: 'text-orange-600',
        gradient: 'from-orange-500 to-amber-500'
      });
    } else {
      setCategory({ 
        name: 'Obese', 
        color: 'text-red-600',
        gradient: 'from-red-500 to-rose-500'
      });
    }
  };

  const getBMIPosition = () => {
    if (bmi < 15) return 0;
    if (bmi > 40) return 100;
    return ((bmi - 15) / 25) * 100;
  };

  const calculator = (
    <div className="space-y-8">
      {/* Unit System Toggle */}
      <div>
        <label className="block mb-3 text-slate-700">Unit System</label>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setUnitSystem('metric')}
            className={`p-4 rounded-xl border-2 transition-all ${
              unitSystem === 'metric'
                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md'
                : 'border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className="text-center">
              <div className="text-slate-900">Metric</div>
              <div className="text-xs text-slate-500 mt-1">kg & cm</div>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setUnitSystem('imperial')}
            className={`p-4 rounded-xl border-2 transition-all ${
              unitSystem === 'imperial'
                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md'
                : 'border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className="text-center">
              <div className="text-slate-900">Imperial</div>
              <div className="text-xs text-slate-500 mt-1">lbs & ft/in</div>
            </div>
          </motion.button>
        </div>
      </div>

      {unitSystem === 'metric' ? (
        <>
          {/* Weight (kg) */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-slate-700">Weight</label>
              <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <span className="text-blue-700">{weight} kg</span>
              </div>
            </div>
            <Slider
              value={[weight]}
              onValueChange={(value: number[]) => setWeight(value[0])}
              min={30}
              max={200}
              step={0.5}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>30 kg</span>
              <span>200 kg</span>
            </div>
          </div>

          {/* Height (cm) */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-slate-700">Height</label>
              <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                <span className="text-purple-700">{heightCm} cm</span>
              </div>
            </div>
            <Slider
              value={[heightCm]}
              onValueChange={(value: number[]) => setHeightCm(value[0])}
              min={100}
              max={250}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>100 cm</span>
              <span>250 cm</span>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Weight (lbs) */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-slate-700">Weight</label>
              <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <span className="text-blue-700">{weight} lbs</span>
              </div>
            </div>
            <Slider
              value={[weight]}
              onValueChange={(value: number[]) => setWeight(value[0])}
              min={66}
              max={440}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>66 lbs</span>
              <span>440 lbs</span>
            </div>
          </div>

          {/* Height (feet) */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-slate-700">Height (Feet)</label>
              <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                <span className="text-purple-700">{heightFt} ft</span>
              </div>
            </div>
            <Slider
              value={[heightFt]}
              onValueChange={(value: number[]) => setHeightFt(value[0])}
              min={3}
              max={8}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>3 ft</span>
              <span>8 ft</span>
            </div>
          </div>

          {/* Height (inches) */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-slate-700">Height (Inches)</label>
              <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                <span className="text-purple-700">{heightIn} in</span>
              </div>
            </div>
            <Slider
              value={[heightIn]}
              onValueChange={(value: number[]) => setHeightIn(value[0])}
              min={0}
              max={11}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>0 in</span>
              <span>11 in</span>
            </div>
          </div>
        </>
      )}

      {/* BMI Result */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-8 rounded-2xl bg-gradient-to-br ${category.gradient} text-white shadow-2xl text-center`}
      >
        <div className="text-sm opacity-90 mb-2">Your BMI</div>
        <motion.div
          key={bmi}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-5xl mb-4"
        >
          {bmi}
        </motion.div>
        <div className="text-xl">{category.name}</div>
      </motion.div>

      {/* BMI Scale */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200">
        <div className="mb-4">BMI Scale</div>
        <div className="relative h-8 rounded-full overflow-hidden mb-4">
          <div className="absolute inset-0 flex">
            <div className="flex-1 bg-gradient-to-r from-blue-400 to-blue-500" />
            <div className="flex-1 bg-gradient-to-r from-emerald-400 to-emerald-500" />
            <div className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500" />
            <div className="flex-1 bg-gradient-to-r from-red-400 to-red-500" />
          </div>
          <motion.div
            initial={{ left: '0%' }}
            animate={{ left: `${getBMIPosition()}%` }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-slate-900 shadow-lg"
          />
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs text-center">
          <div className="text-blue-600">
            <div>Underweight</div>
            <div className="text-slate-500">&lt; 18.5</div>
          </div>
          <div className="text-emerald-600">
            <div>Normal</div>
            <div className="text-slate-500">18.5 - 24.9</div>
          </div>
          <div className="text-orange-600">
            <div>Overweight</div>
            <div className="text-slate-500">25 - 29.9</div>
          </div>
          <div className="text-red-600">
            <div>Obese</div>
            <div className="text-slate-500">≥ 30</div>
          </div>
        </div>
      </div>

      {/* Health Recommendations */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200">
        <h3 className="mb-3 text-slate-900">Health Recommendations</h3>
        <ul className="space-y-2 text-slate-600">
          {category.name === 'Underweight' && (
            <>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Consult a healthcare provider for personalized advice</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Focus on nutrient-dense, calorie-rich foods</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Consider strength training to build muscle mass</span>
              </li>
            </>
          )}
          {category.name === 'Normal Weight' && (
            <>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Maintain your healthy weight through balanced diet</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Engage in regular physical activity (150 min/week)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Continue monitoring your health regularly</span>
              </li>
            </>
          )}
          {category.name === 'Overweight' && (
            <>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>Consider a balanced diet with calorie reduction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>Increase physical activity gradually</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>Consult healthcare provider for weight management plan</span>
              </li>
            </>
          )}
          {category.name === 'Obese' && (
            <>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Consult a healthcare provider for comprehensive evaluation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Develop a supervised weight loss program</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Focus on sustainable lifestyle changes</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );

  const content = {
    introduction: `Body Mass Index (BMI) is a simple calculation using a person's height and weight to determine if their weight is in a healthy range. While BMI doesn't directly measure body fat, it's a useful screening tool to identify potential weight-related health issues. Our calculator supports both metric (kg/cm) and imperial (lbs/ft/in) units for your convenience.`,
    
    howToUse: [
      'Choose your preferred unit system (Metric or Imperial)',
      'Enter your weight using the slider or input field',
      'Enter your height - in centimeters for metric, or feet and inches for imperial',
      'Your BMI will be calculated automatically and displayed with your category',
      'Review the BMI scale to see where your result falls',
      'Read the personalized health recommendations for your BMI category',
    ],
    
    formula: `BMI is calculated using different formulas based on the unit system:

Metric Formula:
BMI = Weight (kg) / [Height (m)]²

Imperial Formula:
BMI = [Weight (lbs) / Height (in)²] × 703

BMI Categories:
• Underweight: BMI < 18.5
• Normal Weight: BMI 18.5 - 24.9
• Overweight: BMI 25 - 29.9
• Obese: BMI ≥ 30`,
    
    useCases: [
      {
        title: 'General Health Screening',
        description: 'Quick assessment to determine if your weight is within a healthy range for your height.',
      },
      {
        title: 'Weight Loss Tracking',
        description: 'Monitor your progress during weight loss journey by tracking BMI changes over time.',
      },
      {
        title: 'Fitness Goal Setting',
        description: 'Set realistic weight goals and track your journey towards a healthy BMI range.',
      },
      {
        title: 'Health Risk Assessment',
        description: 'Identify potential health risks associated with being underweight, overweight, or obese.',
      },
    ],
    
    faqs: [
      {
        question: 'Is BMI accurate for everyone?',
        answer: 'BMI is a useful general indicator but has limitations. It doesn\'t account for muscle mass, bone density, or body composition. Athletes with high muscle mass may have high BMI but low body fat. Consult healthcare providers for complete assessment.',
      },
      {
        question: 'What is a healthy BMI range?',
        answer: 'A BMI between 18.5 and 24.9 is generally considered healthy for most adults. However, optimal BMI can vary based on age, gender, ethnicity, and individual health factors.',
      },
      {
        question: 'How often should I check my BMI?',
        answer: 'For general health monitoring, checking BMI monthly or quarterly is sufficient. If you\'re actively working on weight management, weekly or bi-weekly checks can help track progress.',
      },
      {
        question: 'Does BMI differ for children?',
        answer: 'Yes, BMI calculations for children and teens use age and gender-specific percentile charts because body composition changes as they grow. This calculator is designed for adults 18 and older.',
      },
      {
        question: 'What should I do if my BMI is outside the normal range?',
        answer: 'Consult with a healthcare provider for personalized advice. They can assess your overall health, discuss lifestyle changes, and create a plan tailored to your specific needs and circumstances.',
      },
    ],
  };

  return (
    <CalculatorLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index with support for metric and imperial units"
      icon={Heart}
      calculator={calculator}
      content={content}
      gradient="from-red-500 to-pink-500"
    />
  );
}
