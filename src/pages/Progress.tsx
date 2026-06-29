import { useState, useEffect, type FormEvent } from "react";
import { motion } from "motion/react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Plus, TrendingDown } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/Button";
import { db } from "../lib/firebase";
import { collection, addDoc, query, orderBy, getDocs, Timestamp } from "firebase/firestore";

export default function Progress() {
  const { user } = useAuth();
  const [weight, setWeight] = useState("");
  const [data, setData] = useState<{date: string, weight: number}[]>([]);
  const [loading, setLoading] = useState(true);

  // Dummy data for non-logged in users
  const dummyData = [
    { date: "Jan 1", weight: 85 },
    { date: "Jan 15", weight: 83 },
    { date: "Feb 1", weight: 82 },
    { date: "Feb 15", weight: 80.5 },
    { date: "Mar 1", weight: 79 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const q = query(collection(db, `users/${user.uid}/weight`), orderBy("date", "asc"));
          const querySnapshot = await getDocs(q);
          const fetchedData = querySnapshot.docs.map(doc => {
            const d = doc.data();
            return {
              date: new Date(d.date.toDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              weight: d.weight
            };
          });
          setData(fetchedData.length > 0 ? fetchedData : dummyData);
        } catch (error) {
          console.error("Error fetching data:", error);
          setData(dummyData);
        }
      } else {
        setData(dummyData);
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const handleAddWeight = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !weight) return;

    try {
      const numWeight = parseFloat(weight);
      await addDoc(collection(db, `users/${user.uid}/weight`), {
        weight: numWeight,
        date: Timestamp.now()
      });
      
      const newEntry = {
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        weight: numWeight
      };
      
      setData([...data, newEntry]);
      setWeight("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-black italic tracking-tighter mb-4 uppercase text-white">Analytics<span className="text-[#CCFF00]">.</span></h1>
        <p className="text-white/50 max-w-2xl text-sm">
          Monitor your transformation. Consistency is the key to achieving your fitness goals.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black italic uppercase">Body Weight</h3>
            <div className="flex items-center space-x-2 text-[#CCFF00] bg-[#CCFF00]/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#CCFF00]/20">
              <TrendingDown className="w-4 h-4" />
              <span>-6.0 kg</span>
            </div>
          </div>
          
          <div className="h-[400px] w-full mt-4">
            {!loading && (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={data}>
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255,255,255,0.2)" 
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <YAxis 
                    domain={['dataMin - 2', 'dataMax + 2']} 
                    stroke="rgba(255,255,255,0.2)" 
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }} 
                    axisLine={false} 
                    tickLine={false} 
                    width={40}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontWeight: 'bold' }}
                    itemStyle={{ color: '#CCFF00' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#CCFF00" 
                    strokeWidth={4} 
                    dot={{ fill: '#111', stroke: '#CCFF00', strokeWidth: 3, r: 6 }} 
                    activeDot={{ r: 8, fill: '#CCFF00' }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] p-8 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <Activity className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-black italic uppercase text-white mb-2">Log Entry</h3>
              <p className="text-xs font-medium text-white/40 mb-6">Record your weight today to keep your chart updated.</p>
              
              {user ? (
                <form onSubmit={handleAddWeight} className="flex space-x-3">
                  <input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="KG"
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CCFF00]/50 font-bold uppercase tracking-widest text-sm"
                  />
                  <Button type="submit" variant="primary" size="icon" className="h-auto aspect-square rounded-xl shrink-0">
                    <Plus className="w-5 h-5" />
                  </Button>
                </form>
              ) : (
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Please sign in to log your progress.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
