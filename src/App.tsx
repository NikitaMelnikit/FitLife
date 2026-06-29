import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import Nutrition from "./pages/Nutrition";
import Calculator from "./pages/Calculator";
import Progress from "./pages/Progress";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#CCFF00] selection:text-black flex flex-col">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/progress" element={<Progress />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
