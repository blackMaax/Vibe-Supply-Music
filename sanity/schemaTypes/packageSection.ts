import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'packageSection',
  title: 'Package Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'An optional title for this package section document (e.g. "Homepage Packages")',
    }),
    defineField({
      name: 'packages',
      title: 'Packages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Package Name',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string'
                // Remove required validation to make optional
            }),
            defineField({
              name: 'tagline',
              title: 'Tagline',
              type: 'string',
              description: 'A short tagline for the package.',
            }),
            defineField({
              name: 'image',
              title: 'Package Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Describe this image for accessibility.',
                  validation: Rule => Rule.required(),
                }),
              ],
            }),
            defineField({
              name: 'isPopular',
              title: 'Mark as Popular',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                {
                  type: 'string',
                  title: 'Feature'
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'tagline',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
    },
  },
}) 