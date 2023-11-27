export interface Post {
  _id: string
  category: string
  image: Image
  postedBy: PostedBy
  saved: Saved[]
  title: string
}

export interface PostDetails extends Omit<Post, 'saved'> {
  description: string
  saved: Array<{
    _key: string
    postedBy: PostedBy
  }>
}

export interface Image {
  asset: Asset
}

export interface Asset {
  url: string
}

export interface Comment {
  _key: string
  comment: string
  postedBy: PostedBy
  createdAt: string
}

export interface PostedBy {
  _id: string
  image: string
  userName: string
  userTag: string
}

export interface Saved {
  _key: string
  postedBy: SavedPostedBy
}

export interface SavedPostedBy {
  _id: string
}
