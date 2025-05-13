import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'section',
  title: 'Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero', value: 'hero' },
          { title: 'About', value: 'about' },
          { title: 'Features', value: 'features' },
          { title: 'Gallery', value: 'gallery' },
          { title: 'Contact', value: 'contact' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
    },
    prepare({ title, type }) {
      return {
        title: title || 'Untitled Section',
        subtitle: type ? `${type.charAt(0).toUpperCase() + type.slice(1)} Section` : 'No type',
      }
    },
  },
}) 