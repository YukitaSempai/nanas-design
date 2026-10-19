import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: {
      primary: "bg-[#714c65] text-white shadow-[0_8px_22px_rgba(113,76,101,.19)] hover:-translate-y-0.5 hover:bg-[#5e3c54]",
      outline: "border border-[#765866]/25 bg-white/70 text-[#624859] hover:border-[#765866]/60 hover:bg-white",
      quiet: "text-[#624859] hover:bg-white/70",
    },
    size: { default: "px-6 py-3 text-sm", sm: "px-4 py-2 text-xs", lg: "px-8 py-4 text-sm" },
  },
  defaultVariants: { variant: "primary", size: "default" },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
