"use client"

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
    <div className="sticky top-6 space-y-4">
      {/* Hall of Fame */}
      <section className="bg-card rounded-md border border-border">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="font-medium text-sm text-text-heading">이번 주 명예의 전당</h2>
          <p className="text-xs text-text-muted mt-0.5">키보드 압수 리액션 TOP 3</p>
        </div>
        
        <div className="p-2">
          {hallOfFameData.map((user) => (
            <div 
              key={user.rank}
              className="flex items-center gap-3 px-2 py-2 rounded-sm hover:bg-bg-surface transition-colors"
            >
              <span className="text-sm font-medium text-text-muted w-5">
                {user.rank}
              </span>
              <div className="w-7 h-7 rounded-md bg-bg-surface flex items-center justify-center text-text-secondary font-medium text-xs">
                {user.username[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary truncate">@{user.username}</p>
                <p className="text-xs text-text-muted truncate">{user.title}</p>
              </div>
              <span className="text-xs font-medium text-text-secondary bg-bg-surface px-2 py-0.5 rounded">
                {user.count}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Title Holders */}
      <section className="bg-card rounded-md border border-border">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="font-medium text-sm text-text-heading">칭호 보유자</h2>
        </div>
        
        <div className="p-2">
          {titleHolders.map((holder) => (
            <div 
              key={holder.username}
              className="flex items-center gap-3 px-2 py-2 rounded-sm hover:bg-bg-surface transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary truncate">{holder.title}</p>
                <p className="text-xs text-text-muted">@{holder.username}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tagline */}
      <div className="px-4 py-3">
        <p className="text-xs text-text-muted text-balance">
          &quot;자랑할 수 없다면, 장렬하게 망한 걸 공유하자.&quot;
        </p>
      </div>
    </div>
  )
}
