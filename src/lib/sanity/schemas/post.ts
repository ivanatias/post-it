import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Post Description',
      type: 'string'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string'
    }),
    defineField({
      name: 'postedBy',
      title: 'Posted By',
      type: 'postedBy'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'userId',
      title: 'UserId',
      type: 'string'
    }),
    defineField({
      name: 'saved',
      title: 'Saved',
      type: 'array',
      of: [{ type: 'saved' }]
    }),
    defineField({
      name: 'comments',
      type: 'array',
      of: [{ type: 'comment' }]
    })
  ]
})
