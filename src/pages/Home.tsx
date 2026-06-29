import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Dumbbell, Apple } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function Home() {
  return (
    <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto w-full">
      {/* Left Column: Hero & Workouts */}
      <div className="md:col-span-8 flex flex-col gap-6">
        {/* Hero Welcome */}
        <div className="relative bg-gradient-to-r from-[#111] to-[#1a1a1a] p-8 rounded-3xl border border-white/5 min-h-[240px] flex flex-col justify-end overflow-hidden">
          <div className="absolute top-0 right-0 p-8 hidden sm:block">
            <div className="w-32 h-32 rounded-full border-[12px] border-[#CCFF00]/20 border-t-[#CCFF00] flex items-center justify-center">
              <span className="text-2xl font-bold italic text-white">82%</span>
            </div>
          </div>
          <div className="relative z-10 sm:pr-40">
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2 uppercase text-white">
              Push the Limit<br />
              <span className="text-white/40">No Excuses Only Results.</span>
            </h1>
            <p className="text-white/50 text-sm max-w-md">
              Your individualized plan is optimized for Hypertrophy phase. 14 days until next assessment.
            </p>
          </div>
        </div>

        {/* Featured Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
          {/* Daily Workout Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex flex-col h-full relative">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-[#CCFF00] text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shrink-0">Today</span>
              <span className="text-white/40 text-xs shrink-0 ml-2">Estimated 55 min</span>
            </div>
            <h3 className="text-xl font-bold mb-1 text-white">Lower Body Power</h3>
            <p className="text-white/50 text-xs mb-4">Focus on compound movements and tempo.</p>
            <div className="mt-auto space-y-3 pt-4">
              <div className="flex justify-between text-sm py-2 border-b border-white/5">
                <span className="text-white/60">Back Squats</span>
                <span className="text-white">4 x 8-10</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-white/5">
                <span className="text-white/60">Bulgarian Split Squat</span>
                <span className="text-white">3 x 12</span>
              </div>
              <Link to="/workouts" className="block w-full mt-4 shrink-0">
                <Button className="w-full" variant="glass">Start Session</Button>
              </Link>
            </div>
          </div>

          {/* Progress Stats Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Weekly Progress</h3>
              <div className="flex items-end justify-between h-32 gap-2 mb-4 px-2">
                <div className="w-full bg-white/10 h-1/2 rounded-t-lg"></div>
                <div className="w-full bg-white/10 h-3/4 rounded-t-lg"></div>
                <div className="w-full bg-[#CCFF00] h-full rounded-t-lg shadow-[0_0_20px_rgba(204,255,0,0.3)]"></div>
                <div className="w-full bg-white/10 h-2/3 rounded-t-lg"></div>
                <div className="w-full bg-white/10 h-4/5 rounded-t-lg"></div>
                <div className="w-full bg-white/10 h-1/2 rounded-t-lg"></div>
                <div className="w-full bg-white/5 h-1/4 rounded-t-lg"></div>
              </div>
              <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-tighter">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-end">
              <div>
                <div className="text-2xl font-bold text-white">+12.4%</div>
                <div className="text-[10px] text-white/40 uppercase">Performance Index</div>
              </div>
              <div className="text-right text-[10px] text-[#CCFF00] italic font-bold">On Track</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Nutrition & Calculator */}
      <div className="md:col-span-4 flex flex-col gap-6">
        {/* KBJU Widget */}
        <div className="bg-white text-black p-6 rounded-3xl flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black italic uppercase">KBJU Tracker</h3>
            <span className="text-[10px] font-bold">2,450 KCAL GOAL</span>
          </div>
          
          <div className="space-y-6 flex-1 flex flex-col">
            {/* Calorie Bar */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>CALORIES</span>
                <span>1,840 / 2,450</span>
              </div>
              <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                <div className="h-full bg-black w-[75%]"></div>
              </div>
            </div>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-black/5 rounded-2xl">
                <div className="text-sm font-black">142g</div>
                <div className="text-[9px] font-bold opacity-40 uppercase">Prot</div>
              </div>
              <div className="text-center p-3 bg-black/5 rounded-2xl">
                <div className="text-sm font-black">210g</div>
                <div className="text-[9px] font-bold opacity-40 uppercase">Carb</div>
              </div>
              <div className="text-center p-3 bg-black/5 rounded-2xl">
                <div className="text-sm font-black">62g</div>
                <div className="text-[9px] font-bold opacity-40 uppercase">Fat</div>
              </div>
            </div>

            <div className="p-4 border-2 border-dashed border-black/10 rounded-2xl">
              <h4 className="text-xs font-bold uppercase mb-2">Next Meal: Lunch</h4>
              <p className="text-xs opacity-60">Chicken breast, Quinoa, Broccoli & Avocado dressing.</p>
            </div>

            {/* Calculator Quick-View */}
            <div className="mt-auto pt-4">
              <Link to="/nutrition" className="block w-full">
                <Button className="w-full" variant="default">Manage Diet Plan</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link to="/progress" className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 group cursor-pointer hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#CCFF00] flex items-center justify-center text-black">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Log Daily Habits</div>
              <div className="text-[10px] text-white/40">Sleep, Water, Stress</div>
            </div>
          </Link>
          <Link to="/calculator" className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 group cursor-pointer hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <CalculatorIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">BMR Calculator</div>
              <div className="text-[10px] text-white/40">Recalculate target intake</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Simple icon for Calculator link
function CalculatorIcon(props: any) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
    </svg>
  );
}
