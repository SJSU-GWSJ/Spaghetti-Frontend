"use client"

import { useState, useEffect } from "react"
import type { Post, FeedMode } from "@/lib/types"
import { X, Upload, Code2, AlertTriangle } from "lucide-react"

interface UploadModalProps {
  onClose: () => void
  onSubmit: (post: Post) => void
}

export function UploadModal({ onClose, onSubmit }: UploadModalProps) {
  const [mode, setMode] = useState<FeedMode>("spaghetti")
  const [content, setContent] = useState("")
  const [caption, setCaption] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isSpaghetti = mode === "spaghetti"

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

  const handleSubmit = () => {
    if (!content.trim()) return
    
    setIsSubmitting(true)
    
    setTimeout(() => {
      const newPost: Post = {
        id: `p${Date.now()}`,
        author: {
          id: "current",
          username: "dev_user",
          avatar: "D",
          title: "초보 개발자"
        },
        mode,
        content: content.trim(),
        caption: caption.trim(),
        timestamp: "방금 전",
        reactions: { f: 0, felt: 0, keyboard: 0, idea: 0 },
        comments: 0
      }
      
      onSubmit(newPost)
    }, 500)
  }

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-zinc-900 border border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-lg font-bold text-white">망한 코드 공유하기</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Mode Selector */}
          <div className="flex gap-3">
            <button
              onClick={() => setMode("spaghetti")}
              className={`flex-1 py-3 px-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                isSpaghetti
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-black/20 border-white/5 text-white/40 hover:border-white/20"
              }`}
            >
              <Code2 className="w-6 h-6" />
              <span className="text-xs font-bold uppercase tracking-wider">스파게티</span>
            </button>
            <button
              onClick={() => setMode("404")}
              className={`flex-1 py-3 px-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                !isSpaghetti
                  ? "bg-destructive/10 border-destructive text-destructive"
                  : "bg-black/20 border-white/5 text-white/40 hover:border-white/20"
              }`}
            >
              <AlertTriangle className="w-6 h-6" />
              <span className="text-xs font-bold uppercase tracking-wider">404 에러</span>
            </button>
          </div>

          {/* Code/Error Textarea */}
          <div className={`rounded-xl overflow-hidden border-2 transition-colors ${
            isSpaghetti 
              ? "bg-black/40 border-primary/20 focus-within:border-primary/50" 
              : "bg-black/40 border-destructive/20 focus-within:border-destructive/50"
          }`}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={isSpaghetti 
                ? "// 돌아가긴 하는데... 왜 돌아가는지는 묻지 마세요"
                : "[ERROR] java.lang.NullPointerException: 또 너야..."
              }
              className={`w-full h-48 p-4 bg-transparent font-mono text-sm resize-none focus:outline-none placeholder:text-white/20 leading-relaxed ${
                isSpaghetti ? "text-primary" : "text-destructive"
              }`}
            />
          </div>

          {/* Caption */}
          <div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="무슨 일이 있었나요?"
              className="w-full h-20 p-4 bg-black/40 border-2 border-white/5 rounded-xl text-white text-sm resize-none focus:outline-none focus:border-white/20 placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-black/20 border-t border-white/5">
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            className="w-full py-4 bg-primary text-black rounded-xl font-bold text-base hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-3 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <Upload className="w-5 h-5" />
                장렬하게 업로드
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
