"use client"

import { useState, useEffect } from "react"
import type { Post, FeedMode } from "@/lib/types"
import { X, Upload } from "lucide-react"

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
      className="fixed inset-0 z-50 bg-text-ink/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-card rounded-lg border border-border max-w-xl w-full overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="font-medium text-sm text-text-heading">새 글 올리기</h2>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-bg-surface rounded-sm transition-colors"
          >
            <X className="w-4 h-4 text-text-muted" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Mode Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setMode("spaghetti")}
              className={`flex-1 py-2 text-sm font-medium transition-colors rounded-sm border ${
                isSpaghetti
                  ? "bg-bg-surface border-border-default text-text-primary"
                  : "bg-card border-border text-text-muted hover:border-border-default"
              }`}
            >
              스파게티 모드
            </button>
            <button
              onClick={() => setMode("404")}
              className={`flex-1 py-2 text-sm font-medium transition-colors rounded-sm border ${
                !isSpaghetti
                  ? "bg-error-bg border-error-border text-error-text"
                  : "bg-card border-border text-text-muted hover:border-border-default"
              }`}
            >
              404 모드
            </button>
          </div>

          {/* Code/Error Textarea */}
          <div className={`rounded-sm overflow-hidden border ${
            isSpaghetti 
              ? "bg-bg-surface border-border" 
              : "bg-error-bg border-error-border"
          }`}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={isSpaghetti 
                ? "// 돌아가긴 하는데... 왜 돌아가는지는 묻지 마세요"
                : "[ERROR] java.lang.NullPointerException: 또 너야..."
              }
              className={`w-full h-44 p-3 bg-transparent font-mono text-xs resize-none focus:outline-none placeholder:text-text-muted leading-relaxed ${
                isSpaghetti ? "text-text-strong" : "text-error-text"
              }`}
            />
          </div>

          {/* Caption */}
          <div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="한 마디 남기기 (선택)"
              className="w-full h-16 p-3 bg-bg-surface border border-border rounded-sm text-sm resize-none focus:outline-none focus:border-border-default placeholder:text-text-muted"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border">
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            className="w-full py-2.5 bg-brand text-brand-dark rounded-sm font-medium text-sm hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-brand-dark/30 border-t-brand-dark rounded-full animate-spin" />
                업로드 중...
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                장렬하게 올리기
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
