import { defineType, defineField } from 'sanity'

export const saved = defineType({
  name: 'saved',
  title: 'Saved',
  type: 'object',
  fields: [
    defineField({
      name: 'postedBy',
      title: 'Posted By',
      type: 'postedBy'
    }),
    defineField({
      name: 'userId',
      title: 'UserId',
      type: 'string'
    })
  ]
})
