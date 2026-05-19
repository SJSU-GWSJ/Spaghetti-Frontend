"use client"

import { Settings, Home, Search, PlusSquare, User, Bell } from "lucide-react"

interface LeftSidebarProps {
  activeMode: string
  onModeChange: (mode: any) => void
  onUploadClick: () => void
}

export function LeftSidebar({ onUploadClick }: LeftSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-20 xl:w-60 bg-black border-r border-white/10 z-50">
        {/* Logo */}
        <div className="p-6 xl:p-8">
          <h1 className="font-logo text-3xl xl:text-4xl text-primary tracking-tighter xl:block hidden">SPAGHETTI</h1>
          <h1 className="font-logo text-3xl text-primary xl:hidden block">S</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-2">
          <NavItem icon={<Home className="w-6 h-6" />} label="홈" active />
          <NavItem icon={<Search className="w-6 h-6" />} label="검색" />
          <NavItem icon={<Bell className="w-6 h-6" />} label="알림" />
          <button
            onClick={onUploadClick}
            className="w-full flex items-center gap-4 px-4 py-3 text-white hover:bg-white/10 transition-all rounded-xl group"
          >
            <PlusSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-lg xl:block hidden">만들기</span>
          </button>
          <NavItem icon={<User className="w-6 h-6" />} label="프로필" />
        </nav>

        {/* User Area */}
        <div className="p-4 xl:p-6 border-t border-white/10">
          <button className="w-full flex items-center gap-4 px-3 py-2 text-white hover:bg-white/10 transition-colors rounded-xl">
            <Settings className="w-6 h-6" />
            <span className="font-medium xl:block hidden">설정</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 z-50 pb-safe">
        <div className="flex items-center justify-around py-3">
          <button className="p-2 text-white"><Home className="w-6 h-6" /></button>
          <button className="p-2 text-white/60"><Search className="w-6 h-6" /></button>
          <button 
            onClick={onUploadClick}
            className="p-2 text-primary scale-125 transition-transform active:scale-100"
          >
            <PlusSquare className="w-7 h-7" />
          </button>
          <button className="p-2 text-white/60"><Bell className="w-6 h-6" /></button>
          <button className="p-2 text-white/60"><User className="w-6 h-6" /></button>
        </div>
      </nav>
    </>
  )
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-4 px-4 py-3 transition-all rounded-xl group ${
      active ? "text-white" : "text-white/60 hover:text-white hover:bg-white/10"
    }`}>
      <div className="group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className={`font-medium text-lg xl:block hidden ${active ? "font-bold" : ""}`}>{label}</span>
    </button>
  )
}
