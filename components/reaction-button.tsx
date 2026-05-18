"use client"

import { useState } from "react"

interface ReactionButtonProps {
  emoji: string
  label: string
  count: number
  onClick: () => void
}

export function ReactionButton({ emoji, label, count, onClick }: ReactionButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsAnimating(true)
    setIsActive(true)
    onClick()
    setTimeout(() => setIsAnimating(false), 200)
  }

  return (
    <button
      onClick={handleClick}
      className={`group flex items-center gap-1 px-2 py-1 rounded text-xs transition-all ${
        isActive
          ? "bg-brand-subtle border border-brand text-brand-dark"
          : "bg-bg-surface border border-transparent text-text-secondary hover:border-border-default hover:text-text-primary"
      } ${isAnimating ? "animate-pop" : ""}`}
    >
      <span className={`font-mono ${isAnimating ? "scale-110" : ""} transition-transform`}>
        {emoji === "F" && "F"}
        {emoji === "felt" && "T_T"}
        {emoji === "keyboard" && "kbd"}
        {emoji === "idea" && "!"}
      </span>
      <span className="hidden sm:inline">{label}</span>
      <span className="font-medium tabular-nums">{count}</span>
    </button>
  )
}
