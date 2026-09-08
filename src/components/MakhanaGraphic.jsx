import React from 'react'

/**
 * Minimalist, high-end vector symbols for clean editorial brand layout.
 */

export function MakhanaSymbol({ className = "w-6 h-6", color = "#18181B" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50 16 
           C62 14, 76 24, 78 38 
           C86 42, 90 54, 86 68 
           C82 78, 70 86, 54 86 
           C42 88, 28 82, 18 72 
           C10 60, 10 44, 20 34 
           C18 22, 36 14, 50 16 Z"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="4" fill={color} />
    </svg>
  )
}

export const MakhanaPop = MakhanaSymbol

export function CrunchBadge({ text = "SLOW ROASTED", className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-subtle border border-black/5 font-mono text-[10px] font-medium tracking-widest uppercase text-charcoal ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-charcoal" />
      {text}
    </span>
  )
}
