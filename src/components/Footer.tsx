import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-2">
          <div className="bg-[#CCFF00] text-black p-1.5 rounded-lg">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-xl font-black tracking-tighter italic text-white uppercase">FITLIFE<span className="text-[#CCFF00]">.</span></span>
        </div>
        
        <div className="flex gap-6 items-center">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Realtime Sync Active</span>
           </div>
           <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 hidden sm:block">Firebase Instance: Global-V1</div>
        </div>

        <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest italic text-center md:text-right">
          Design: Precision Minimalist
        </p>
      </div>
    </footer>
  );
}
