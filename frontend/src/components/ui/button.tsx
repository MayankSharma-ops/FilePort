import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[transform,box-shadow,background] duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background hover:scale-[1.02] active:scale-[0.98] shadow-[0_8px_30px_-8px_rgba(91,157,255,0.45)]",
        glow:
          "bg-gradient-to-br from-glow-blue to-glow-teal text-white hover:scale-[1.02] active:scale-[0.98] shadow-[0_8px_40px_-6px_rgba(45,212,191,0.45)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:via-white/30 before:to-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        ghost:
          "bg-transparent text-foreground hover:bg-white/5 border border-transparent hover:border-white/10",
        outline:
          "border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-foreground hover:border-white/25",
        secondary:
          "bg-white/[0.06] text-foreground hover:bg-white/[0.1] border border-white/10",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { buttonVariants };
