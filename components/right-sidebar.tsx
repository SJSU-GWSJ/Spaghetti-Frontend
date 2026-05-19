"use client"

import { Trophy, Keyboard, Crown } from "lucide-react"

const hallOfFameData = [
  { rank: 1, username: "aaaa_dev", title: "변수명 테러리스트", count: 432 },
  { rank: 2, username: "null_hunter", title: "빨간 맛 중독자", count: 89 },
  { rank: 3, username: "kim_dev", title: "세그폴트 수집가", count: 78 },
]

const titleHolders = [
  { title: "세그폴트 수집가", username: "kim_dev" },
  { title: "빨간 맛 중독자", username: "null_hunter" },
  { title: "변수명 테러리스트", username: "aaaa_dev" },
  { title: "무한루프 생존자", username: "loop_escape" },
]

export function RightSidebar() {
  return (
    <div className="sticky top-6 space-y-6 w-full animate-fade-in">
      {/* Weekly Worst Coder (Hall of Fame) */}
      <section className="bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden backdrop-blur-md">
        <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-r from-primary/10 to-transparent flex items-center gap-3">
          <Trophy className="w-5 h-5 text-primary" />
          <div>
            <h2 className="font-bold text-sm text-white">주간 명예의 전당</h2>
            <p className="text-[10px] text-white/40 uppercase tracking-wider">Worst Coder of the Week</p>
          </div>
        </div>
        
        <div className="p-3 space-y-1">
          {hallOfFameData.map((user) => (
            <div 
              key={user.rank}
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-all group"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white font-bold border border-white/10 group-hover:border-primary/50 transition-colors">
                  {user.username[0].toUpperCase()}
                </div>
                {user.rank === 1 && (
                  <Crown className="absolute -top-2 -right-1 w-4 h-4 text-primary fill-primary animate-bounce" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white truncate">@{user.username}</p>
                  <span className="text-[10px] text-primary font-bold">TOP {user.rank}</span>
                </div>
                <p className="text-[11px] text-white/40 truncate">{user.title}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-white">
                  {user.count}
                </span>
                <span className="text-[8px] text-white/20 uppercase">압수됨</span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 bg-black/40 border-t border-white/5">
          <p className="text-[10px] text-white/40 text-center">
            '키보드 압수' 리액션을 가장 많이 받은 순위입니다.
          </p>
        </div>
      </section>

      {/* Title Holders */}
      <section className="bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden backdrop-blur-md">
        <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
          <Keyboard className="w-5 h-5 text-white/60" />
          <h2 className="font-bold text-sm text-white">칭호 보유자</h2>
        </div>
        
        <div className="p-3 grid grid-cols-1 gap-2">
          {titleHolders.map((holder) => (
            <div 
              key={holder.username}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
            >
              <p className="text-[11px] font-bold text-primary mb-0.5">{holder.title}</p>
              <p className="text-xs text-white/60">@{holder.username}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Quote */}
      <div className="px-2">
        <p className="text-[11px] text-white/20 text-center italic leading-relaxed">
          "자랑할 수 없다면, 장렬하게 망한 걸 공유하자."
        </p>
      </div>
    </div>
  )
}
