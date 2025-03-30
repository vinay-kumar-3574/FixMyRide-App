import React from "react";
import { cva } from "class-variance-authority";

// ✅ Fix: Ensure `cn` is imported correctly
import cn from "classnames"; // ✅ Correct
 // Adjust path if necessary

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "border border-foreground text-foreground", // ✅ Added missing border
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className = "", variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
