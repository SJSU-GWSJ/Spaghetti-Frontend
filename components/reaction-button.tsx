"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ReactionButtonProps {
  emoji: string
  label: string
  count: number
  onClick: () => void
  className?: string
}

export function ReactionButton({ emoji, label, count, onClick, className }: ReactionButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [localCount, setLocalCount] = useState(count)

  const handleClick = () => {
    setIsAnimating(true)
    const nextActive = !isActive
    setIsActive(nextActive)
    setLocalCount(nextActive ? count + 1 : count)
    onClick()
    setTimeout(() => setIsAnimating(false), 200)
  }

  const getEmojiDisplay = (emoji: string) => {
    switch (emoji) {
      case "F": return "F"
      case "felt": return "Me Too"
      case "keyboard": return "⌨️"
      case "idea": return "💡"
      default: return emoji
    }
  }

  const getFullLabel = (emoji: string, label: string) => {
    switch (emoji) {
      case "F": return "조의를 표하십시오"
      case "felt": return "나도 당해봄"
      case "keyboard": return "키보드 압수"
      case "idea": return "오... 신박한데?"
      default: return label
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all border border-white/5",
        isActive
          ? "bg-primary text-black border-primary shadow-lg shadow-primary/20"
          : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20",
        isAnimating ? "scale-110" : "scale-100",
        className
      )}
    >
      <span className={cn(
        "text-sm",
        isAnimating ? "animate-pop" : ""
      )}>
        {getEmojiDisplay(emoji)}
      </span>
      <span className="hidden sm:inline font-medium">{getFullLabel(emoji, label)}</span>
      <span className="font-bold tabular-nums">{localCount}</span>
    </button>
  )
}
