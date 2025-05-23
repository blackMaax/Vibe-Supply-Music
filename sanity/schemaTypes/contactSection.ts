import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      description: 'The main title for the contact section (e.g., "Get in Touch").',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Section Subtitle',
      description: 'The subtitle displayed below the main title.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featuredImageCard',
      title: 'Featured Image Card',
      description: 'Content for the image card displayed next to the contact form.',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'imageAlt',
          title: 'Image Alt Text',
          description: 'Descriptive text for the image (for accessibility).',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'imageTitle',
          title: 'Title on Image',
          description: 'Text displayed as a title overlay on the image.',
          type: 'string',
        }),
        defineField({
          name: 'imageSubtitle',
          title: 'Subtitle on Image',
          description: 'Text displayed as a subtitle overlay on the image.',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    // Global contact info (email, phone, socials) is handled separately
    // and not part of this specific section's content schema.
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      media: 'featuredImageCard.image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Contact Section',
        subtitle: 'Contact Form Section Content',
        media: media,
      }
    },
  },
}) 