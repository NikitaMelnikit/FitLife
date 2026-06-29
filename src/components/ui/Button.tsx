import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "glass" | "primary";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl text-xs font-bold uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20": variant === "glass",
            "bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 shadow-[0_0_20px_rgba(204,255,0,0.2)]": variant === "primary",
            "bg-white text-black hover:bg-white/90": variant === "default",
            "border border-white/20 bg-transparent hover:bg-white/10 text-white": variant === "outline",
            "hover:bg-white/10 text-white": variant === "ghost",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-xl px-3": size === "sm",
            "h-12 rounded-2xl px-8": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
