import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Apple, Utensils, Droplets } from "lucide-react";
import { Button } from "../components/ui/Button";

const meals = [
  {
    title: "High-Protein Breakfast",
    calories: 450,
    macros: "35g P • 40g C • 15g F",
    items: ["Oatmeal with berries", "3 scrambled eggs", "Black coffee"],
    time: "Morning"
  },
  {
    title: "Performance Lunch",
    calories: 650,
    macros: "50g P • 65g C • 20g F",
    items: ["Grilled chicken breast", "Quinoa", "Roasted asparagus"],
    time: "Afternoon"
  },
  {
    title: "Recovery Dinner",
    calories: 550,
    macros: "45g P • 30g C • 25g F",
    items: ["Baked salmon", "Sweet potato", "Mixed greens salad"],
    time: "Evening"
  }
];

export default function Nutrition() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-black italic tracking-tighter mb-4 uppercase text-white">Nutrition<span className="text-[#CCFF00]">.</span></h1>
        <p className="text-white/50 max-w-2xl text-sm">
          Fuel your body with nutrient-dense meals. Example daily plan tailored for optimal performance.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {meals.map((meal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors flex flex-col sm:flex-row gap-6"
            >
              <div className="flex-1">
                <span className="text-[10px] font-bold text-[#CCFF00] uppercase tracking-widest mb-2 block">{meal.time}</span>
                <h3 className="text-xl font-bold text-white mb-4">{meal.title}</h3>
                <div className="space-y-3">
                  {meal.items.map((item, j) => (
                    <div key={j} className="flex items-center space-x-3 text-white/60 text-sm font-medium">
                      <Utensils className="w-4 h-4 text-white/40" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sm:w-48 bg-black/20 rounded-2xl p-4 flex flex-col justify-center border border-white/5 shrink-0">
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">Energy</div>
                <div className="text-3xl font-black italic tracking-tighter text-white mb-4">{meal.calories} <span className="text-xs font-bold not-italic tracking-normal opacity-40">KCAL</span></div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">Macros</div>
                <div className="text-xs font-bold text-[#CCFF00]">{meal.macros}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-b from-cyan-900/20 to-black p-8 rounded-3xl border border-cyan-500/20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            <div className="mx-auto w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-6">
              <Droplets className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-lg font-black italic uppercase text-white mb-2">Hydration</h3>
            <p className="text-white/40 text-sm mb-6 font-medium">Aim for 3-4 liters daily.</p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5, 6].map((cup) => (
                <div key={cup} className="w-8 h-12 rounded-t-lg rounded-b-sm border-2 border-cyan-500/30 overflow-hidden relative">
                  <div className={`absolute bottom-0 w-full bg-cyan-500/50 transition-all ${cup <= 4 ? 'h-full' : 'h-0'}`} />
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs font-bold tracking-widest uppercase text-cyan-400">4 / 6 Glasses</p>
          </div>

          <div className="bg-[#CCFF00] p-8 rounded-3xl text-black">
            <div className="flex items-center space-x-3 mb-4">
              <Apple className="w-6 h-6" />
              <h3 className="text-lg font-black italic uppercase">Custom Plan</h3>
            </div>
            <p className="text-sm font-medium mb-8 opacity-80">
              Use our calculator to get your precise macros, or connect with a coach.
            </p>
            <Link to="/calculator" className="block w-full">
              <Button variant="default" className="w-full bg-black text-white hover:bg-black/80">
                Calculate Macros
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
