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

export const getPostQuery = (postID: string) => {
  return `*[_type == "post" && _id == '${postID}'][0] {
    image {
      asset -> {
        url
      }
    },
    _id,
    title,
    description,
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
        userName,
        image,
        userTag
      }
    }, 
  }`
}

export const getPostCommentsQuery = (postID: string) => {
  return `*[_type == "post" && _id == '${postID}'][0] {
    comments[] {
      comment,
      createdAt,
      _key,
      postedBy -> {
        _id,
        userName,
        image,
        userTag,
      }
    }
  }`
}

export const getPostsByCategoryQuery = (
  category: string,
  postID: string = ''
) => {
  return `*[_type == "post" && category == '${category}' && _id != '${postID}'] | order(_createdAt desc) {
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

export const getPostsByUserQuery = (userID: string) => {
  return `*[ _type == 'post' && userId == '${userID}'] | order(_createdAt desc){
    image{
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
      postedBy -> {
        _id,
      },
    },
  }`
}

export const getPostsLikedByUserQuery = (userID: string) => {
  return `*[ _type == 'post' && '${userID}' in saved[].userId ] | order(_createdAt desc) {
    image {
      asset -> {
        url
      }
    },
    _id,
    title,
    postedBy -> {
      _id,
      userName,
      image,
      userTag,
    },
    saved[] {
      postedBy -> {
        _id,
      },
    },
  }`
}

export const getSearchPostsQuery = (term?: string) => {
  return `*[_type == "post" && title match '${term}' || description match '${term}'] {
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

export const getUserInfoQuery = (userID: string) => {
  return `*[_type == "user" && _id == '${userID}'][0]{
    userName,
    userTag,
    image,
    _id
  }`
}
