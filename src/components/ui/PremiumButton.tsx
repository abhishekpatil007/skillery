"use client";

import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Star, Zap, Crown, Gem } from "lucide-react";

interface PremiumButtonProps extends ButtonProps {
  icon?: "sparkles" | "star" | "zap" | "crown" | "gem";
  glow?: boolean;
  pulse?: boolean;
  shimmer?: boolean;
}

const iconMap = {
  sparkles: Sparkles,
  star: Star,
  zap: Zap,
  crown: Crown,
  gem: Gem,
};

export function PremiumButton({
  children,
  className,
  icon,
  glow = false,
  pulse = false,
  shimmer = false,
  variant = "premium",
  ...props
}: PremiumButtonProps) {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <Button
      variant={variant}
      className={cn(
        "relative overflow-hidden",
        glow && "animate-pulse-glow",
        pulse && "animate-pulse",
        shimmer && "group",
        className
      )}
      {...props}
    >
      {shimmer && (
        <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {IconComponent && <IconComponent className="h-4 w-4" />}
        {children}
      </span>
    </Button>
  );
}

// Specialized button components
export function CTAButton({ children, ...props }: ButtonProps) {
  return (
    <PremiumButton
      variant="gradient"
      size="lg"
      icon="sparkles"
      glow
      shimmer
      className="text-lg font-bold px-8 py-4"
      {...props}
    >
      {children}
    </PremiumButton>
  );
}

export function ActionButton({ children, ...props }: ButtonProps) {
  return (
    <PremiumButton
      variant="default"
      size="default"
      icon="zap"
      className="font-semibold"
      {...props}
    >
      {children}
    </PremiumButton>
  );
}

export function SuccessButton({ children, ...props }: ButtonProps) {
  return (
    <PremiumButton
      variant="success"
      size="default"
      icon="star"
      className="font-semibold"
      {...props}
    >
      {children}
    </PremiumButton>
  );
}

export function DangerButton({ children, ...props }: ButtonProps) {
  return (
    <PremiumButton
      variant="destructive"
      size="default"
      className="font-semibold"
      {...props}
    >
      {children}
    </PremiumButton>
  );
}

export function OutlineButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      variant="outline"
      size="default"
      className="font-semibold border-2 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
      {...props}
    >
      {children}
    </Button>
  );
}

export function GhostButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      variant="ghost"
      size="default"
      className="font-medium hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 hover:scale-105 active:scale-95"
      {...props}
    >
      {children}
    </Button>
  );
}
