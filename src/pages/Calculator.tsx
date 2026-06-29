import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Calculator as CalcIcon, Activity } from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";

export default function Calculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [goal, setGoal] = useState("maintain");
  const [result, setResult] = useState<{ calories: number; p: number; f: number; c: number } | null>(null);

  const calculateMacros = (e: FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);
    
    if (!w || !h || !a) return;

    // Mifflin-St Jeor Equation
    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr += gender === "male" ? 5 : -161;

    let tdee = bmr * parseFloat(activity);

    if (goal === "lose") tdee -= 500;
    if (goal === "gain") tdee += 500;

    const calories = Math.round(tdee);
    const p = Math.round((calories * 0.3) / 4);
    const f = Math.round((calories * 0.25) / 9);
    const c = Math.round((calories * 0.45) / 4);

    setResult({ calories, p, f, c });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center justify-center p-3 bg-[#CCFF00]/10 rounded-2xl mb-6 border border-[#CCFF00]/20">
          <CalcIcon className="w-8 h-8 text-[#CCFF00]" />
        </div>
        <h1 className="text-5xl font-black italic tracking-tighter mb-4 uppercase text-white">Macro Calculator<span className="text-[#CCFF00]">.</span></h1>
        <p className="text-white/50 max-w-2xl mx-auto text-sm">
          Calculate your daily calorie requirements (TDEE) and optimal macronutrient split for your goals.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl"
        >
          <form onSubmit={calculateMacros} className="space-y-6">
            <div className="flex p-1 bg-black/50 rounded-xl space-x-1 border border-white/5">
              {["male", "female"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g as "male" | "female")}
                  className={cn(
                    "flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-lg capitalize transition-colors",
                    gender === g ? "bg-[#CCFF00] text-black" : "text-white/40 hover:text-white"
                  )}
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CCFF00]/50 font-bold"
                  placeholder="YRS"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CCFF00]/50 font-bold"
                  placeholder="KG"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CCFF00]/50 font-bold"
                  placeholder="CM"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Activity Level</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CCFF00]/50 appearance-none text-sm font-bold"
              >
                <option value="1.2">Sedentary (Office job)</option>
                <option value="1.375">Light Exercise (1-2 days/week)</option>
                <option value="1.55">Moderate Exercise (3-5 days/week)</option>
                <option value="1.725">Heavy Exercise (6-7 days/week)</option>
                <option value="1.9">Athlete (2x per day)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CCFF00]/50 appearance-none text-sm font-bold"
              >
                <option value="lose">Lose Weight</option>
                <option value="maintain">Maintain Weight</option>
                <option value="gain">Build Muscle</option>
              </select>
            </div>

            <Button type="submit" variant="primary" className="w-full py-4 mt-4">
              Calculate Plan
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="h-full"
        >
          {result ? (
            <div className="bg-white text-black p-8 rounded-3xl h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                  <Activity className="w-48 h-48" />
                </div>
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-black italic uppercase">Results</h3>
                    <span className="text-[10px] font-bold uppercase bg-black/5 px-3 py-1 rounded-full">Target</span>
                  </div>
                  
                  <div className="mb-10 text-center py-6 bg-black/5 rounded-2xl border border-black/10">
                    <div className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-2">Daily Calories</div>
                    <div className="text-5xl font-black italic tracking-tighter">
                      {result.calories} <span className="text-xl opacity-40 font-bold not-italic tracking-normal">KCAL</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">Macronutrients</h3>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8 mt-auto">
                    <div className="text-center p-4 bg-black/5 rounded-2xl">
                       <div className="text-xl font-black">{result.p}g</div>
                       <div className="text-[10px] font-bold opacity-40 uppercase">Prot</div>
                    </div>
                    <div className="text-center p-4 bg-black/5 rounded-2xl">
                       <div className="text-xl font-black">{result.c}g</div>
                       <div className="text-[10px] font-bold opacity-40 uppercase">Carb</div>
                    </div>
                    <div className="text-center p-4 bg-black/5 rounded-2xl">
                       <div className="text-xl font-black">{result.f}g</div>
                       <div className="text-[10px] font-bold opacity-40 uppercase">Fat</div>
                    </div>
                  </div>

                  <Button variant="default" className="w-full bg-black text-white hover:bg-black/80">Save to Profile</Button>
                </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-white/5 backdrop-blur-sm">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-4">
                <CalcIcon className="w-8 h-8 text-white/40" />
              </div>
              <p className="text-white/40 text-sm max-w-[200px] font-medium">Enter your metrics to generate your personalized nutrition plan.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
