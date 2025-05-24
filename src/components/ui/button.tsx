
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-teal-500 text-primary-foreground hover:bg-teal-600 dark:hover:shadow-[0_0_10px_rgba(46,204,113,0.3)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:hover:shadow-[0_0_10px_rgba(255,0,0,0.2)]",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-teal-500/20 dark:hover:bg-teal-500/10",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:hover:bg-teal-500/10",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-teal-500/10",
        link: "text-teal-500 underline-offset-4 hover:underline",
        glow: "bg-teal-500/90 text-primary-foreground hover:bg-teal-500/80 dark:shadow-teal-neon dark:hover:shadow-teal-glow transition-shadow duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
