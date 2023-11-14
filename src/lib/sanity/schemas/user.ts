import { defineType, defineField } from 'sanity'

export const user = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'userName',
      title: 'User Name',
      type: 'string'
    }),
    defineField({
      name: 'image',
      title: 'User Image',
      type: 'string'
    }),
    defineField({
      name: 'userTag',
      title: 'User Tag',
      type: 'string'
    })
  ]
})
