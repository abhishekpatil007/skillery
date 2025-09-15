import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 focus-visible:ring-blue-500",
        destructive:
          "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25 hover:from-red-600 hover:to-pink-600 hover:shadow-red-500/40 hover:scale-105 active:scale-95 focus-visible:ring-red-500",
        outline:
          "border-2 border-gray-200 bg-white text-gray-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:scale-105 active:scale-95 focus-visible:ring-blue-500",
        secondary:
          "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 shadow-sm hover:from-gray-200 hover:to-gray-300 hover:scale-105 active:scale-95 focus-visible:ring-gray-500",
        ghost: 
          "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:scale-105 active:scale-95 focus-visible:ring-gray-500",
        link: 
          "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700 focus-visible:ring-blue-500",
        premium:
          "bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white shadow-lg shadow-purple-500/25 hover:from-purple-700 hover:via-pink-700 hover:to-red-600 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 focus-visible:ring-purple-500",
        success:
          "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25 hover:from-green-600 hover:to-emerald-700 hover:shadow-green-500/40 hover:scale-105 active:scale-95 focus-visible:ring-green-500",
        warning:
          "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/25 hover:from-yellow-600 hover:to-orange-600 hover:shadow-yellow-500/40 hover:scale-105 active:scale-95 focus-visible:ring-yellow-500",
        gradient:
          "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 focus-visible:ring-purple-500",
      },
      size: {
        default: "h-10 px-6 py-2 rounded-xl",
        sm: "h-8 px-4 py-1.5 rounded-lg text-xs",
        lg: "h-12 px-8 py-3 rounded-xl text-base",
        xl: "h-14 px-10 py-4 rounded-2xl text-lg",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl",
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
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Add shimmer effect for premium buttons (only for non-asChild buttons)
    const hasShimmer = !asChild && (variant === "premium" || variant === "gradient")
    
    if (asChild) {
      // For asChild, keep it simple - just pass the child through
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      )
    }
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {hasShimmer && (
          <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_ease-in-out] transition-opacity duration-300" />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
