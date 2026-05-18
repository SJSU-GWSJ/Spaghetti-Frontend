"use client"

import type { Post } from "@/lib/types"
import { ReactionButton } from "./reaction-button"
import { MessageCircle, Share2 } from "lucide-react"

interface PostCardProps {
  post: Post
  onReaction: (postId: string, reaction: keyof Post["reactions"]) => void
  onClick: () => void
}

export function PostCard({ post, onReaction, onClick }: PostCardProps) {
  const isSpaghetti = post.mode === "spaghetti"

  return (
    <article 
      className="bg-card rounded-md border border-border overflow-hidden cursor-pointer hover:border-border-default transition-colors animate-fade-in"
      onClick={onClick}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-bg-surface flex items-center justify-center text-text-secondary font-medium text-sm">
              {post.author.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-text-primary">@{post.author.username}</span>
                <span className="px-1.5 py-0.5 bg-bg-surface text-text-secondary text-xs rounded">
                  {post.author.title}
                </span>
              </div>
              <span className="text-xs text-text-muted">{post.timestamp}</span>
            </div>
          </div>
          
          {/* Mode Badge */}
          <span className={`px-2 py-1 text-xs rounded font-medium ${
            isSpaghetti 
              ? "bg-bg-surface text-text-secondary" 
              : "bg-error-bg text-error-text"
          }`}>
            {isSpaghetti ? "스파게티" : "404"}
          </span>
        </div>
      </div>

      {/* Code/Error Block */}
      <div className="px-4 pb-3">
        <div 
          className={`rounded-sm overflow-hidden border-l-[3px] ${
            isSpaghetti 
              ? "bg-bg-surface border-brand" 
              : "bg-error-bg border-error-border"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <pre className="p-3 overflow-x-auto text-xs font-mono leading-relaxed">
            <code className={isSpaghetti ? "text-text-strong" : "text-error-text"}>
              {post.content.length > 400 
                ? post.content.slice(0, 400) + "\n..." 
                : post.content}
            </code>
          </pre>
        </div>
      </div>

      {/* Caption */}
      {post.caption && (
        <div className="px-4 pb-3">
          <p className="text-sm text-text-primary">{post.caption}</p>
        </div>
      )}

      {/* Reactions */}
      <div className="px-4 py-3 border-t border-border" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            <ReactionButton
              emoji="F"
              label="F"
              count={post.reactions.f}
              onClick={() => onReaction(post.id, "f")}
            />
            <ReactionButton
              emoji="felt"
              label="나도 당해봄"
              count={post.reactions.felt}
              onClick={() => onReaction(post.id, "felt")}
            />
            <ReactionButton
              emoji="keyboard"
              label="키보드 압수"
              count={post.reactions.keyboard}
              onClick={() => onReaction(post.id, "keyboard")}
            />
            <ReactionButton
              emoji="idea"
              label="신박한데?"
              count={post.reactions.idea}
              onClick={() => onReaction(post.id, "idea")}
            />
          </div>
          
          <div className="flex items-center gap-2 text-text-muted">
            <button className="flex items-center gap-1 text-xs hover:text-text-secondary transition-colors">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{post.comments}</span>
            </button>
            <button className="flex items-center gap-1 text-xs hover:text-text-secondary transition-colors">
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
