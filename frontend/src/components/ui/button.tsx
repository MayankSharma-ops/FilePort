import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 text-xs font-bold uppercase tracking-[0.11em] transition-[transform,box-shadow,background,color] duration-200 disabled:pointer-events-none disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  {
    variants: {
      variant: {
        default: "border-foreground bg-foreground text-background shadow-[4px_4px_0_var(--color-signal)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-signal)]",
        glow: "border-foreground bg-signal text-foreground shadow-[4px_4px_0_var(--color-ink)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)]",
        ghost: "border-transparent bg-transparent text-foreground hover:border-foreground hover:bg-surface",
        outline: "border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
        secondary: "border-foreground bg-support text-foreground hover:bg-signal",
      },
      size: {
        sm: "h-9 px-4",
        default: "h-11 px-6",
        lg: "h-14 px-8 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
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