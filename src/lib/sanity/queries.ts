export const getAllPostsQuery = () => {
  return `*[_type == "post"] | order(_createdAt desc) {
    image {
      asset -> {
        url
      }
    },
    _id,
    title,
    category,
    postedBy -> {
      _id,
      userName,
      image,
      userTag,
    },
    saved[] {
      _key,
      postedBy -> {
        _id,
      }
    },
  }`
}
