import { Link, useLocation } from "react-router-dom";
import { Activity, Dumbbell, Apple, Calculator, LineChart, LogIn, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/Button";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout, signInWithGoogle } = useAuth();

  const links = [
    { name: "Workouts", path: "/workouts", icon: Dumbbell },
    { name: "Nutrition", path: "/nutrition", icon: Apple },
    { name: "Calculator", path: "/calculator", icon: Calculator },
    { name: "Progress", path: "/progress", icon: LineChart },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-[#CCFF00] text-black p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Activity className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter italic text-white uppercase">FITLIFE<span className="text-[#CCFF00]">.</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors flex items-center space-x-2",
                  location.pathname === link.path ? "text-[#CCFF00]" : "text-white/60 hover:text-white"
                )}
              >
                <span>{link.name}</span>
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 pl-4 border-l border-white/10">
                  <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`} alt="Avatar" className="w-8 h-8 rounded-full border border-white/20" />
                  <span className="text-sm text-white">{user.displayName?.split(' ')[0] || 'User'}</span>
                  <Button variant="ghost" size="icon" onClick={logout} className="text-white/60 hover:text-white rounded-full">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="primary" onClick={signInWithGoogle} className="ml-4 rounded-full px-6">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/60 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute w-full bg-[#050505]/95 backdrop-blur-3xl border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors",
                    location.pathname === link.path 
                      ? "bg-white/10 text-[#CCFF00]" 
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <link.icon className="h-5 w-5" />
                    <span>{link.name}</span>
                  </div>
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t border-white/10">
                {user ? (
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center space-x-3">
                      <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`} alt="Avatar" className="w-10 h-10 rounded-full border border-white/20" />
                      <span className="text-white font-bold">{user.displayName || 'User'}</span>
                    </div>
                    <Button variant="glass" size="sm" onClick={() => { logout(); setIsOpen(false); }}>
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button variant="primary" className="w-full" onClick={() => { signInWithGoogle(); setIsOpen(false); }}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In with Google
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
