export type FeedMode = "spaghetti" | "404"

export interface Author {
  id: string
  username: string
  avatar: string
  title: string
}

export interface Post {
  id: string
  author: Author
  mode: FeedMode
  content: string
  caption: string
  timestamp: string
  reactions: {
    f: number
    felt: number
    keyboard: number
    idea: number
  }
  comments: number
}

export interface Comment {
  id: string
  author: Author
  content: string
  timestamp: string
}
