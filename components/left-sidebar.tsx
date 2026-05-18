"use client"

import type { FeedMode } from "@/lib/types"
import { Settings, Code2, AlertTriangle, Trophy, Keyboard } from "lucide-react"

interface LeftSidebarProps {
  activeMode: FeedMode
  onModeChange: (mode: FeedMode) => void
  onUploadClick: () => void
}

export function LeftSidebar({ activeMode, onModeChange, onUploadClick }: LeftSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-60 bg-card border-r border-border">
        {/* Logo */}
        <div className="p-5 border-b border-border">
          <h1 className="font-mono font-bold text-lg text-text-heading">OOPS</h1>
          <p className="text-xs text-text-muted mt-0.5">Object-Oriented Pain Sharing</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-6">
          {/* Feed Section */}
          <div>
            <p className="px-3 text-[10px] font-medium uppercase tracking-wider text-text-muted mb-2">피드</p>
            <div className="space-y-0.5">
              <button
                onClick={() => onModeChange("spaghetti")}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors rounded-sm ${
                  activeMode === "spaghetti"
                    ? "bg-bg-surface text-text-ink border-l-[3px] border-brand -ml-px"
                    : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>스파게티 모드</span>
              </button>
              <button
                onClick={() => onModeChange("404")}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors rounded-sm ${
                  activeMode === "404"
                    ? "bg-bg-surface text-text-ink border-l-[3px] border-brand -ml-px"
                    : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>404 모드</span>
              </button>
            </div>
          </div>

          {/* Community Section */}
          <div>
            <p className="px-3 text-[10px] font-medium uppercase tracking-wider text-text-muted mb-2">커뮤니티</p>
            <div className="space-y-0.5">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors rounded-sm">
                <Keyboard className="w-4 h-4" />
                <span>명예의 전당</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors rounded-sm">
                <Trophy className="w-4 h-4" />
                <span>칭호 보유자</span>
              </button>
            </div>
          </div>

          {/* New Post Button */}
          <div className="px-1">
            <button
              onClick={onUploadClick}
              className="w-full py-2.5 bg-brand text-brand-dark font-medium text-sm rounded-sm hover:brightness-95 transition-all"
            >
              + 새 글
            </button>
          </div>
        </nav>

        {/* User Area */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-md bg-bg-surface flex items-center justify-center text-text-secondary font-medium text-sm">
              D
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">dev_user</p>
              <p className="text-xs text-text-muted truncate">초보 개발자</p>
            </div>
            <button className="p-1.5 text-text-muted hover:text-text-secondary hover:bg-bg-surface rounded-sm transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 pb-safe">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => onModeChange("spaghetti")}
            className={`flex flex-col items-center gap-1 px-4 py-2 text-xs transition-colors ${
              activeMode === "spaghetti" ? "text-brand-dark" : "text-text-muted"
            }`}
          >
            <div className="relative">
              <Code2 className="w-5 h-5" />
              {activeMode === "spaghetti" && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand rounded-full" />
              )}
            </div>
            <span>스파게티</span>
          </button>
          <button
            onClick={() => onModeChange("404")}
            className={`flex flex-col items-center gap-1 px-4 py-2 text-xs transition-colors ${
              activeMode === "404" ? "text-brand-dark" : "text-text-muted"
            }`}
          >
            <div className="relative">
              <AlertTriangle className="w-5 h-5" />
              {activeMode === "404" && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand rounded-full" />
              )}
            </div>
            <span>404</span>
          </button>
          <button
            onClick={onUploadClick}
            className="flex flex-col items-center gap-1 px-4 py-2 text-xs text-brand-dark"
          >
            <span className="w-8 h-8 bg-brand rounded-sm flex items-center justify-center text-lg font-medium">+</span>
            <span>새 글</span>
          </button>
        </div>
      </nav>
    </>
  )
}
