import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Activity } from "lucide-react";

const Home = lazy(() => import("./pages/Home"));
const Workouts = lazy(() => import("./pages/Workouts"));
const Nutrition = lazy(() => import("./pages/Nutrition"));
const Calculator = lazy(() => import("./pages/Calculator"));
const Progress = lazy(() => import("./pages/Progress"));

function LoadingScreen() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <Activity className="w-8 h-8 text-[#CCFF00] animate-pulse" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#CCFF00] selection:text-black flex flex-col">
          <Navbar />
          <main className="flex-grow pt-20 flex flex-col">
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/nutrition" element={<Nutrition />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/progress" element={<Progress />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
