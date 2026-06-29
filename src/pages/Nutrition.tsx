import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Apple, Utensils, Droplets, Plus, Trash2, Activity } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../lib/firebase";
import { collection, addDoc, query, getDocs, deleteDoc, doc, where } from "firebase/firestore";

interface FoodLog {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: Date;
  dateString: string;
}

export default function Nutrition() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const todayString = new Date().toLocaleDateString('en-CA');

  // Hardcoded goals for now
  const goals = { calories: 2450, protein: 142, carbs: 210, fat: 62 };

  const fetchLogs = async () => {
    if (!user) {
      setLogs([]);
      setLoading(false);
      return;
    }
    try {
      const q = query(
        collection(db, `users/${user.uid}/foodLogs`),
        where("dateString", "==", todayString)
      );
      const snapshot = await getDocs(q);
      let fetchedLogs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date()
      })) as FoodLog[];
      
      // Sort in JS to avoid missing index errors in Firestore
      fetchedLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      
      setLogs(fetchedLogs);
    } catch (error) {
      console.error("Error fetching food logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [user]);

  const handleAddFood = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !name || !calories) return;

    const newLog = {
      name,
      calories: parseFloat(calories) || 0,
      protein: parseFloat(protein) || 0,
      carbs: parseFloat(carbs) || 0,
      fat: parseFloat(fat) || 0,
      timestamp: new Date(),
      dateString: todayString
    };

    try {
      const docRef = await addDoc(collection(db, `users/${user.uid}/foodLogs`), newLog);
      setLogs([{ id: docRef.id, ...newLog }, ...logs]);
      
      // Reset form
      setName("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setFat("");
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, `users/${user.uid}/foodLogs`, id));
      setLogs(logs.filter(log => log.id !== id));
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  const totals = logs.reduce((acc, log) => ({
    calories: acc.calories + log.calories,
    protein: acc.protein + log.protein,
    carbs: acc.carbs + log.carbs,
    fat: acc.fat + log.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-black italic tracking-tighter mb-4 uppercase text-white">Nutrition<span className="text-[#CCFF00]">.</span></h1>
        <p className="text-white/50 max-w-2xl text-sm">
          Track your daily intake, monitor your macros, and fuel your performance.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Add Food Form */}
          <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] p-8 rounded-3xl border border-white/5 relative overflow-hidden">
            <h3 className="text-lg font-black italic uppercase text-white mb-2">Log Food</h3>
            <p className="text-xs font-medium text-white/40 mb-6">Enter what you ate today.</p>
            
            {user ? (
              <form onSubmit={handleAddFood} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="FOOD NAME"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CCFF00]/50 font-bold uppercase tracking-widest text-sm"
                  />
                  <input
                    type="number"
                    required
                    step="1"
                    min="0"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="CALORIES (KCAL)"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CCFF00]/50 font-bold uppercase tracking-widest text-sm"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    placeholder="PROTEIN (G)"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CCFF00]/50 font-bold uppercase tracking-widest text-sm"
                  />
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                    placeholder="CARBS (G)"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CCFF00]/50 font-bold uppercase tracking-widest text-sm"
                  />
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={fat}
                    onChange={(e) => setFat(e.target.value)}
                    placeholder="FAT (G)"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CCFF00]/50 font-bold uppercase tracking-widest text-sm"
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  <Plus className="w-5 h-5 mr-2" /> Add Entry
                </Button>
              </form>
            ) : (
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center text-[10px] font-bold uppercase tracking-widest text-white/40">
                Please sign in to log your food.
              </div>
            )}
          </div>

          {/* Today's Log */}
          <div className="space-y-4">
            <h3 className="text-xl font-black italic uppercase text-white mb-4">Today's Log</h3>
            {loading ? (
              <div className="flex justify-center py-12">
                <Activity className="w-8 h-8 text-[#CCFF00] animate-pulse" />
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center p-8 border border-white/5 rounded-3xl bg-white/5 text-white/40 text-sm font-medium">
                No food logged today.
              </div>
            ) : (
              <AnimatePresence>
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
                  >
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-2">{log.name}</h4>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="font-bold text-[#CCFF00]">{log.calories} <span className="text-[10px] text-white/40 tracking-widest uppercase">Kcal</span></span>
                        <span className="text-white/60">P: {log.protein}g</span>
                        <span className="text-white/60">C: {log.carbs}g</span>
                        <span className="text-white/60">F: {log.fat}g</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(log.id)}
                      className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-colors shrink-0"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Daily Summary */}
          <div className="bg-[#CCFF00] p-8 rounded-3xl text-black relative overflow-hidden">
            <h3 className="text-lg font-black italic uppercase mb-6">Daily Summary</h3>
            
            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold uppercase tracking-widest opacity-60">Calories</span>
                <div className="text-right">
                  <span className="text-4xl font-black italic tracking-tighter">{totals.calories}</span>
                  <span className="text-xs font-bold opacity-60 ml-1">/ {goals.calories}</span>
                </div>
              </div>
              <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-black rounded-full"
                  style={{ width: `${Math.min(100, (totals.calories / goals.calories) * 100)}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
                  <span>Protein</span>
                  <span>{totals.protein} / {goals.protein}g</span>
                </div>
                <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                  <div className="h-full bg-black rounded-full" style={{ width: `${Math.min(100, (totals.protein / goals.protein) * 100)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
                  <span>Carbs</span>
                  <span>{totals.carbs} / {goals.carbs}g</span>
                </div>
                <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                  <div className="h-full bg-black rounded-full" style={{ width: `${Math.min(100, (totals.carbs / goals.carbs) * 100)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
                  <span>Fat</span>
                  <span>{totals.fat} / {goals.fat}g</span>
                </div>
                <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                  <div className="h-full bg-black rounded-full" style={{ width: `${Math.min(100, (totals.fat / goals.fat) * 100)}%` }} />
                </div>
              </div>
            </div>
            
            <Link to="/calculator" className="block w-full mt-8">
              <Button variant="default" className="w-full bg-black text-[#CCFF00] hover:bg-black/80 font-black uppercase tracking-widest text-sm">
                Update Goals
              </Button>
            </Link>
          </div>

          {/* Hydration */}
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
        </motion.div>
      </div>
    </div>
  );
}
