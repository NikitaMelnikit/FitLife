import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Flame, Play, X } from "lucide-react";
import { Button } from "../components/ui/Button";

const workouts = [
  {
    id: 1,
    title: "Full Body Hypertrophy",
    duration: "45 min",
    intensity: "High",
    category: "Strength",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2000&auto=format&fit=crop",
    description: "A comprehensive full-body routine designed to maximize muscle growth through compound movements and targeted isolation exercises.",
    exercises: [
      { name: "Barbell Squats", sets: 4, reps: "8-10", rest: "90s" },
      { name: "Bench Press", sets: 4, reps: "8-10", rest: "90s" },
      { name: "Bent-Over Rows", sets: 3, reps: "10-12", rest: "60s" },
      { name: "Dumbbell Overhead Press", sets: 3, reps: "10-12", rest: "60s" }
    ]
  },
  {
    id: 2,
    title: "Core & Mobility",
    duration: "30 min",
    intensity: "Medium",
    category: "Flexibility",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2000&auto=format&fit=crop",
    description: "Improve your core stability and joint range of motion with this focused session. Essential for injury prevention and overall performance.",
    exercises: [
      { name: "Plank Variations", sets: 3, reps: "60s", rest: "30s" },
      { name: "Russian Twists", sets: 3, reps: "20 reps", rest: "30s" },
      { name: "Hip Bridges", sets: 3, reps: "15 reps", rest: "45s" },
      { name: "Dynamic Stretching Routine", sets: 1, reps: "10 min", rest: "None" }
    ]
  },
  {
    id: 3,
    title: "HIIT Cardio Blast",
    duration: "25 min",
    intensity: "Extreme",
    category: "Cardio",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop",
    description: "A high-intensity interval training session to burn maximum calories and boost cardiovascular endurance in minimal time.",
    exercises: [
      { name: "Burpees", sets: 4, reps: "45s work", rest: "15s" },
      { name: "Mountain Climbers", sets: 4, reps: "45s work", rest: "15s" },
      { name: "Jump Squats", sets: 4, reps: "45s work", rest: "15s" },
      { name: "High Knees", sets: 4, reps: "45s work", rest: "15s" }
    ]
  }
];

export default function Workouts() {
  const [selectedWorkout, setSelectedWorkout] = useState<typeof workouts[0] | null>(null);
  const [activeWorkout, setActiveWorkout] = useState<typeof workouts[0] | null>(null);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [isResting, setIsResting] = useState(false);

  const startWorkout = () => {
    setActiveWorkout(selectedWorkout);
    setSelectedWorkout(null);
    setCurrentExerciseIdx(0);
    setIsResting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-black italic tracking-tighter mb-4 uppercase text-white">Workouts<span className="text-[#CCFF00]">.</span></h1>
        <p className="text-white/50 max-w-2xl text-sm">
          Curated training programs designed for maximum efficiency. Select a routine to begin your session.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout, i) => (
          <motion.div
            key={workout.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedWorkout(workout)}
            className="group relative overflow-hidden rounded-3xl bg-[#111] border border-white/5 cursor-pointer"
          >
            <div className="aspect-[4/3] w-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img 
                src={workout.image} 
                alt={workout.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 mix-blend-luminosity"
              />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <span className="inline-block px-3 py-1 bg-[#CCFF00] rounded-full text-[10px] font-bold text-black uppercase tracking-widest mb-3">
                  {workout.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{workout.title}</h3>
                <div className="flex items-center space-x-4 text-xs font-bold text-white/60 uppercase tracking-widest">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {workout.duration}
                  </div>
                  <div className="flex items-center text-[#CCFF00]">
                    <Flame className="w-3 h-3 mr-1" />
                    {workout.intensity}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-white/5 flex justify-between items-center bg-black/50 backdrop-blur-md">
              <span className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">View details</span>
              <Button variant="glass" size="icon" className="rounded-full">
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedWorkout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWorkout(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#111] border border-white/10 rounded-3xl shadow-2xl z-10 custom-scrollbar"
            >
              <div className="relative h-64 w-full">
                <img src={selectedWorkout.image} alt={selectedWorkout.title} className="w-full h-full object-cover opacity-50 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                <button 
                  onClick={() => setSelectedWorkout(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white/10 rounded-full transition-colors text-white z-20"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-[#CCFF00] rounded-full text-[10px] font-bold text-black uppercase tracking-widest mb-3">
                    {selectedWorkout.category}
                  </span>
                  <h2 className="text-3xl font-black italic uppercase text-white mb-2">{selectedWorkout.title}</h2>
                  <div className="flex items-center space-x-6 text-sm font-bold text-white/60 uppercase tracking-widest">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {selectedWorkout.duration}
                    </div>
                    <div className="flex items-center text-[#CCFF00]">
                      <Flame className="w-4 h-4 mr-2" />
                      {selectedWorkout.intensity}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-white/60 text-sm mb-8 font-medium leading-relaxed">
                  {selectedWorkout.description}
                </p>
                
                <h3 className="text-lg font-black italic uppercase text-white mb-4">Exercises</h3>
                <div className="space-y-3 mb-8">
                  {selectedWorkout.exercises.map((exercise, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="font-bold text-white">{exercise.name}</div>
                          <div className="text-xs font-bold uppercase tracking-widest text-white/40 mt-1">Rest: {exercise.rest}</div>
                        </div>
                      </div>
                      <div className="flex space-x-4 shrink-0">
                        <div className="text-center">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-[#CCFF00]">Sets</div>
                          <div className="text-lg font-black text-white">{exercise.sets}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-[#CCFF00]">Reps</div>
                          <div className="text-lg font-black text-white">{exercise.reps}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button onClick={startWorkout} className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/80 h-14 text-sm uppercase tracking-widest font-black">
                  Start Workout
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeWorkout && (
          <div className="fixed inset-0 z-[60] bg-[#111] flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <span className="text-[#CCFF00] font-bold uppercase tracking-widest text-xs">{activeWorkout.title}</span>
                  <div className="text-white/40 text-sm font-medium mt-1">Exercise {currentExerciseIdx + 1} of {activeWorkout.exercises.length}</div>
                </div>
                <button 
                  onClick={() => setActiveWorkout(null)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {activeWorkout.exercises[currentExerciseIdx] && (
                <div className="flex-1 flex flex-col justify-center items-center text-center max-w-2xl mx-auto w-full">
                  <motion.div
                    key={currentExerciseIdx + (isResting ? '-rest' : '-work')}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full"
                  >
                    {isResting ? (
                      <div className="bg-white/5 rounded-3xl p-12 border border-white/10">
                        <div className="text-[#CCFF00] font-black italic tracking-widest uppercase mb-4 text-xl">Rest</div>
                        <div className="text-7xl font-black text-white mb-6">
                          {activeWorkout.exercises[currentExerciseIdx].rest}
                        </div>
                        <p className="text-white/50 mb-12">Up next: {activeWorkout.exercises[currentExerciseIdx + 1]?.name || 'Finished!'}</p>
                        
                        <Button 
                          onClick={() => {
                            setIsResting(false);
                            setCurrentExerciseIdx(i => i + 1);
                          }}
                          className="bg-white text-black hover:bg-white/80 h-16 px-12 text-lg uppercase tracking-widest font-black rounded-full"
                        >
                          Skip Rest
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-5xl sm:text-7xl font-black italic uppercase text-white mb-8 tracking-tighter">
                          {activeWorkout.exercises[currentExerciseIdx].name}
                        </div>
                        
                        <div className="flex justify-center space-x-12 mb-16">
                          <div>
                            <div className="text-[#CCFF00] font-bold uppercase tracking-widest text-sm mb-2">Sets</div>
                            <div className="text-4xl font-black text-white">{activeWorkout.exercises[currentExerciseIdx].sets}</div>
                          </div>
                          <div>
                            <div className="text-[#CCFF00] font-bold uppercase tracking-widest text-sm mb-2">Reps</div>
                            <div className="text-4xl font-black text-white">{activeWorkout.exercises[currentExerciseIdx].reps}</div>
                          </div>
                        </div>

                        <Button 
                          onClick={() => {
                            if (currentExerciseIdx < activeWorkout.exercises.length - 1) {
                              setIsResting(true);
                            } else {
                              setActiveWorkout(null);
                            }
                          }}
                          className="w-full max-w-sm mx-auto bg-[#CCFF00] text-black hover:bg-[#CCFF00]/80 h-20 text-xl uppercase tracking-widest font-black rounded-full shadow-[0_0_40px_rgba(204,255,0,0.3)]"
                        >
                          {currentExerciseIdx < activeWorkout.exercises.length - 1 ? 'Complete Exercise' : 'Finish Workout'}
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
