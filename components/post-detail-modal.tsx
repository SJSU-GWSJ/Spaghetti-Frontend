"use client"

import { useEffect, useState } from "react"
import type { Post, Comment } from "@/lib/types"
import { ReactionButton } from "./reaction-button"
import { X, Send, MoreHorizontal } from "lucide-react"

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
  const [comments, setComments] = useState(post.comments > 0 ? mockComments : [])
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
      className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-0 md:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-zinc-950 border border-white/10 w-full max-w-5xl h-full md:h-[80vh] md:rounded-2xl overflow-hidden flex flex-col md:flex-row animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Code Block (Visual focus) */}
        <div className="flex-1 bg-black/40 relative border-r border-white/5 overflow-hidden flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto scrollbar-none flex items-center justify-center">
            <div className={`w-full glass p-6 rounded-2xl border-2 transition-colors ${
              isSpaghetti ? "border-primary/20" : "border-destructive/20"
            }`}>
              <pre className="text-xs md:text-sm font-mono leading-relaxed overflow-x-auto scrollbar-none">
                <code className={isSpaghetti ? "text-primary" : "text-destructive"}>
                  {post.content}
                </code>
              </pre>
            </div>
          </div>
          
          {/* Mobile Only Header */}
          <div className="md:hidden absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
             <button onClick={onClose} className="p-2 bg-black/40 rounded-full text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Side: Info & Comments */}
        <div className="w-full md:w-[400px] flex flex-col bg-zinc-900/50">
          {/* Header */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-black font-bold">
                {post.author.avatar}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-white">@{post.author.username}</span>
                <span className="text-[10px] text-white/40">{post.timestamp}</span>
              </div>
            </div>
            <button className="p-2 text-white/40 hover:text-white transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Caption & Comments Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
            {/* Caption */}
            {post.caption && (
              <div className="pb-4 border-b border-white/5">
                <p className="text-sm text-white leading-relaxed">{post.caption}</p>
              </div>
            )}

            {/* Reactions in Detail */}
            <div className="flex flex-wrap gap-2">
               <ReactionButton
                emoji="F" label="F" count={post.reactions.f}
                onClick={() => onReaction(post.id, "f")}
              />
              <ReactionButton
                emoji="felt" label="Me Too" count={post.reactions.felt}
                onClick={() => onReaction(post.id, "felt")}
              />
              <ReactionButton
                emoji="keyboard" label="압수" count={post.reactions.keyboard}
                onClick={() => onReaction(post.id, "keyboard")}
              />
              <ReactionButton
                emoji="idea" label="신박한데?" count={post.reactions.idea}
                onClick={() => onReaction(post.id, "idea")}
              />
            </div>

            {/* Comments List */}
            <div className="space-y-4 pt-4">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest">댓글 {comments.length}</p>
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3 animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 font-medium text-xs shrink-0 border border-white/10">
                    {c.author.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">@{c.author.username}</span>
                      <span className="text-[10px] text-white/40">{c.timestamp}</span>
                    </div>
                    <p className="text-sm text-white/80 mt-1 leading-snug">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comment Input */}
          <div className="p-4 border-t border-white/5 bg-black/40">
            <div className="flex gap-3 bg-white/5 rounded-xl border border-white/10 p-1 focus-within:border-primary/50 transition-colors">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.nativeEvent.isComposing && handleSubmitComment()}
                placeholder="댓글 달기..."
                className="flex-1 px-3 py-2 bg-transparent text-sm text-white focus:outline-none placeholder:text-white/20"
              />
              <button
                onClick={handleSubmitComment}
                disabled={!comment.trim()}
                className="p-2 text-primary hover:scale-110 active:scale-95 transition-all disabled:opacity-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Close Button */}
        <button 
          onClick={onClose}
          className="hidden md:block absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-all hover:scale-110"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
