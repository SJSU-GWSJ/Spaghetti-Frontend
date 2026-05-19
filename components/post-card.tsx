"use client"

import type { Post } from "@/lib/types"
import { MessageCircle, MoreHorizontal, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface PostCardProps {
  post: Post
  onReaction: (postId: string, reaction: keyof Post["reactions"]) => void
  onClick: () => void
}

export function PostCard({ post, onReaction, onClick }: PostCardProps) {
  const isSpaghetti = post.mode === "spaghetti"

  return (
    <article 
      className="relative h-full w-full max-w-[450px] aspect-[9/16] lg:h-[90vh] lg:rounded-2xl overflow-hidden bg-black flex flex-col shadow-2xl animate-slide-up"
      onClick={onClick}
    >
      {/* Code/Error Content Area - Background */}
      <div className="absolute inset-0 z-0">
        <div className={`h-full w-full p-6 pt-20 flex items-center justify-center ${
          isSpaghetti ? "bg-zinc-900/50" : "bg-red-950/20"
        }`}>
          <div className="w-full max-h-[70%] overflow-hidden rounded-xl glass p-4">
             <pre className="text-[11px] md:text-xs font-mono leading-relaxed overflow-x-auto scrollbar-none">
              <code className={isSpaghetti ? "text-primary" : "text-destructive"}>
                {post.content}
              </code>
            </pre>
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* Top Header - User Info */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold border-2 border-white/10">
            {post.author.avatar}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white text-shadow">@{post.author.username}</span>
              <span className="px-2 py-0.5 bg-primary/20 backdrop-blur-md text-primary text-[10px] rounded-full border border-primary/30">
                {post.author.title}
              </span>
            </div>
            <span className="text-[10px] text-white/60 text-shadow">{post.timestamp}</span>
          </div>
        </div>
        <button className="p-2 text-white/80 hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Info Area */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 pr-20">
        {/* Caption */}
        {post.caption && (
          <p className="text-sm md:text-base text-white leading-snug text-shadow font-medium mb-2">
            {post.caption}
          </p>
        )}
        
        {/* Mode Indicator Tag */}
        <span className={cn(
          "px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-widest",
          isSpaghetti ? "bg-primary text-black" : "bg-destructive text-white"
        )}>
          {post.mode}
        </span>
      </div>

      {/* Vertical Action Bar (Reels Style) - Moved Lower and Reordered */}
      <div className="absolute bottom-6 right-4 z-20 flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
        
        {/* F Reaction */}
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={() => onReaction(post.id, "f")}
            className="w-12 h-12 glass rounded-full flex items-center justify-center text-xl font-bold text-white hover:scale-110 transition-transform active:scale-95"
          >
            F
          </button>
          <span className="text-xs text-white font-bold text-shadow">{post.reactions.f}</span>
        </div>

        {/* Keyboard Reaction */}
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={() => onReaction(post.id, "keyboard")}
            className="w-12 h-12 glass rounded-full flex items-center justify-center text-xl hover:scale-110 transition-transform active:scale-95"
          >
            ⌨️
          </button>
          <span className="text-xs text-white font-bold text-shadow">{post.reactions.keyboard}</span>
        </div>

        {/* Me Too Reaction */}
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={() => onReaction(post.id, "felt")}
            className="w-12 h-12 glass rounded-full flex items-center justify-center text-[10px] font-black text-white leading-tight hover:scale-110 transition-transform active:scale-95"
          >
            ME<br/>TOO
          </button>
          <span className="text-xs text-white font-bold text-shadow">{post.reactions.felt}</span>
        </div>

        {/* Idea (Lightbulb) Reaction */}
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={() => onReaction(post.id, "idea")}
            className="w-12 h-12 glass rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
          >
            <Lightbulb className="w-6 h-6 text-primary" />
          </button>
          <span className="text-xs text-white font-bold text-shadow">{post.reactions.idea}</span>
        </div>

        {/* Comment Button - AT THE BOTTOM */}
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={onClick}
            className="w-12 h-12 glass rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </button>
          <span className="text-xs text-white font-bold text-shadow">{post.comments}</span>
        </div>

      </div>
    </article>
  )
}
