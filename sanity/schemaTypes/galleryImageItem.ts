import { Images } from 'lucide-react'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'galleryImageItem',
  title: 'Gallery Image Item',
  type: 'object',
  icon: Images,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption displayed with the image.',
    }),
    defineField({
      name: 'showCaption',
      title: 'Show Caption on Image?',
      type: 'boolean',
      description: 'If checked, the caption (if provided) will be displayed over the image.',
      initialValue: true, // Default to showing the caption if one is provided
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'No caption',
        media: media || Images,
      }
    },
  },
}) 