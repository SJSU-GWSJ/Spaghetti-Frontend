"use client"

import { useState } from "react"
import { LeftSidebar } from "@/components/left-sidebar"
import { PostCard } from "@/components/post-card"
import { RightSidebar } from "@/components/right-sidebar"
import { PostDetailModal } from "@/components/post-detail-modal"
import { UploadModal } from "@/components/upload-modal"
import type { Post, FeedMode } from "@/lib/types"

const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      id: "u1",
      username: "kim_dev",
      avatar: "K",
      title: "세그폴트 수집가"
    },
    mode: "spaghetti",
    content: `function 계산하기(x) {
  // 왜 되는지 모르겠지만 건들지 마세요
  if (x == null || x == undefined || x == "null" || x == "undefined") {
    x = x || 0 || "" || null || undefined || x;
  }
  let 결과 = "";
  for (let i = 0; i < 100; i++) {
    if (i == x) 결과 = i;
    if (결과 == x) break;
    // 나중에 고치려다 그냥 살았음
  }
  return 결과 ? 결과 : x ? x : 0;
}`,
    caption: "이거 리팩토링하면 왜 안 돌아가는지 아시는 분?",
    timestamp: "2시간 전",
    reactions: { f: 42, felt: 89, keyboard: 156, idea: 12 },
    comments: 23
  },
  {
    id: "2",
    author: {
      id: "u2",
      username: "null_hunter",
      avatar: "N",
      title: "빨간 맛 중독자"
    },
    mode: "404",
    content: `Exception in thread "main" java.lang.NullPointerException
    at com.company.service.UserService.getUser(UserService.java:42)
    at com.company.controller.MainController.handleRequest(MainController.java:156)
    at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
    
Caused by: java.lang.IllegalStateException: 또 너야...
    at com.company.repository.UserRepository.findById(UserRepository.java:89)
    ... 42 more

빌드 실패: 의존성 지옥에 오신 것을 환영합니다`,
    caption: "금요일 저녁 6시 배포 후 상황",
    timestamp: "5시간 전",
    reactions: { f: 234, felt: 567, keyboard: 89, idea: 3 },
    comments: 78
  },
  {
    id: "3",
    author: {
      id: "u3",
      username: "aaaa_dev",
      avatar: "A",
      title: "변수명 테러리스트"
    },
    mode: "spaghetti",
    content: `let a = 1;
let aa = a + 1;
let aaa = aa + a;
let aaaa = aaa + aa + a;
let aaaaa = aaaa + aaa + aa + a;
// TODO: 변수명 정리하기 (2019년 메모)
function ㅁㄴㅇㄹ(ㅋㅋㅋ, ㅎㅎㅎ) {
  return ㅋㅋㅋ + ㅎㅎㅎ + aaaaa;
}
// 이 코드 작성자 퇴사함 ㅋㅋ`,
    caption: "레거시 코드 고고학 중 발견한 유적",
    timestamp: "8시간 전",
    reactions: { f: 567, felt: 234, keyboard: 432, idea: 56 },
    comments: 156
  },
  {
    id: "4",
    author: {
      id: "u4",
      username: "loop_escape",
      avatar: "L",
      title: "무한루프 생존자"
    },
    mode: "404",
    content: `[ERROR] FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed
    - JavaScript heap out of memory
    
<--- Last few GCs --->
[12345:0x12345678] 42424242 ms: Mark-sweep 2048.0 (2048.5) -> 2047.9 (2048.5) MB
                   last resort GC in old space requested

무한 재귀의 늪에 빠진 당신을 환영합니다
Stack: Maximum call stack size exceeded
    at recursive(app.js:1:1)
    at recursive(app.js:1:1)
    at recursive(app.js:1:1)
    ... 10000 more lines`,
    caption: "useEffect 안에서 setState 했을 때",
    timestamp: "어제",
    reactions: { f: 123, felt: 456, keyboard: 78, idea: 234 },
    comments: 45
  }
]

export default function Home() {
  const [feedMode, setFeedMode] = useState<FeedMode>("spaghetti")
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [posts, setPosts] = useState(mockPosts)

  const filteredPosts = posts.filter(post => post.mode === feedMode)

  const handleReaction = (postId: string, reaction: keyof Post["reactions"]) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [reaction]: post.reactions[reaction] + 1
          }
        }
      }
      return post
    }))
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar - Fixed */}
      <LeftSidebar 
        activeMode={feedMode} 
        onModeChange={setFeedMode}
        onUploadClick={() => setShowUploadModal(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-0 lg:ml-60">
        <div className="max-w-[1200px] mx-auto flex">
          {/* Main Feed */}
          <main className="flex-1 max-w-[680px] px-4 lg:px-6 py-6">
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <PostCard 
                    key={post.id} 
                    post={post}
                    onReaction={handleReaction}
                    onClick={() => setSelectedPost(post)}
                  />
                ))
              ) : (
                <div className="text-center py-16 bg-card rounded-md border border-border">
                  <p className="text-4xl mb-3">:</p>
                  <p className="text-text-secondary text-sm">
                    아직 아무도 망하지 않았습니다.
                  </p>
                  <p className="text-text-muted text-sm">
                    첫 번째 희생자가 되어보세요.
                  </p>
                </div>
              )}
            </div>
          </main>

          {/* Right Sidebar - Desktop Only */}
          <aside className="hidden xl:block w-72 shrink-0 py-6 pr-6">
            <RightSidebar />
          </aside>
        </div>
      </div>

      {/* Modals */}
      {selectedPost && (
        <PostDetailModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)}
          onReaction={handleReaction}
        />
      )}

      {showUploadModal && (
        <UploadModal 
          onClose={() => setShowUploadModal(false)}
          onSubmit={(newPost) => {
            setPosts(prev => [newPost, ...prev])
            setShowUploadModal(false)
          }}
        />
      )}
    </div>
  )
}
