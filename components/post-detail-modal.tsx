"use client"

import { useEffect, useState } from "react"
import type { Post, Comment } from "@/lib/types"
import { ReactionButton } from "./reaction-button"
import { X, Send } from "lucide-react"

interface PostDetailModalProps {
  post: Post
  onClose: () => void
  onReaction: (postId: string, reaction: keyof Post["reactions"]) => void
}

const mockComments: Comment[] = [
  {
    id: "c1",
    author: { id: "u5", username: "react_master", avatar: "R", title: "훅 중독자" },
    content: "이거 의존성 버전 충돌임ㅋㅋ",
    timestamp: "1시간 전"
  },
  {
    id: "c2",
    author: { id: "u6", username: "clean_coder", avatar: "C", title: "린트 경찰" },
    content: "변수명이 `a`... 개발자 면허 반납해",
    timestamp: "45분 전"
  },
  {
    id: "c3",
    author: { id: "u7", username: "debug_hero", avatar: "D", title: "콘솔로그 장인" },
    content: "나도 어제 이거로 4시간 날림",
    timestamp: "30분 전"
  },
  {
    id: "c4",
    author: { id: "u8", username: "senior_dev", avatar: "S", title: "레거시 고고학자" },
    content: "ㅋㅋㅋㅋ 이거 내가 5년 전에 짠 코드랑 똑같음",
    timestamp: "15분 전"
  }
]

export function PostDetailModal({ post, onClose, onReaction }: PostDetailModalProps) {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState(mockComments)
  const isSpaghetti = post.mode === "spaghetti"

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const handleSubmitComment = () => {
    if (!comment.trim()) return
    
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: { id: "current", username: "dev_user", avatar: "D", title: "초보 개발자" },
      content: comment,
      timestamp: "방금 전"
    }
    setComments(prev => [...prev, newComment])
    setComment("")
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-text-ink/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-card rounded-lg border border-border max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-bg-surface flex items-center justify-center text-text-secondary font-medium text-sm">
              {post.author.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-text-primary">@{post.author.username}</span>
                <span className="px-1.5 py-0.5 bg-bg-surface text-text-muted text-xs rounded">
                  {post.author.title}
                </span>
              </div>
              <span className="text-xs text-text-muted">{post.timestamp}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-bg-surface rounded-sm transition-colors"
          >
            <X className="w-4 h-4 text-text-muted" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Code Block */}
          <div className="p-4">
            <div 
              className={`rounded-sm overflow-hidden border-l-[3px] ${
                isSpaghetti 
                  ? "bg-bg-surface border-brand" 
                  : "bg-error-bg border-error-border"
              }`}
            >
              <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed">
                <code className={isSpaghetti ? "text-text-strong" : "text-error-text"}>
                  {post.content}
                </code>
              </pre>
            </div>
          </div>

          {/* Caption */}
          {post.caption && (
            <div className="px-4 pb-4">
              <p className="text-sm text-text-primary">{post.caption}</p>
            </div>
          )}

          {/* Reactions */}
          <div className="px-4 pb-4 flex items-center gap-1.5 flex-wrap">
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

          {/* Comments */}
          <div className="border-t border-border">
            <div className="px-4 py-3 border-b border-border">
              <span className="font-medium text-sm text-text-heading">댓글 {comments.length}</span>
            </div>
            
            <div className="p-4 space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-md bg-bg-surface flex items-center justify-center text-text-muted font-medium text-xs shrink-0">
                    {c.author.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-text-primary">@{c.author.username}</span>
                      <span className="text-xs text-text-muted">{c.timestamp}</span>
                    </div>
                    <p className="text-sm text-text-secondary mt-0.5">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comment Input */}
        <div className="px-4 py-3 border-t border-border bg-bg-surface">
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-md bg-card border border-border flex items-center justify-center text-text-secondary font-medium text-xs shrink-0">
              D
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
                placeholder="위로 또는 조롱을 입력하세요..."
                className="flex-1 px-3 py-1.5 bg-card border border-border rounded-sm text-sm focus:outline-none focus:border-border-default placeholder:text-text-muted"
              />
              <button
                onClick={handleSubmitComment}
                disabled={!comment.trim()}
                className="px-3 py-1.5 bg-brand text-brand-dark rounded-sm text-sm font-medium hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
