import { defineType } from '@sanity/types'
import { defineField } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'Homepage',
    }),
    defineField({
      name: 'mainHero',
      title: 'Main Hero Section',
      type: 'object',
      description: 'Configure the main hero banner images and introductory content.',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'images',
          title: 'Hero Images',
          type: 'array',
          of: [
            defineField({
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Image Alt Text / Name',
                  type: 'string',
                  description: 'Describe this image for accessibility and SEO.',
                }),
                defineField({
                  name: 'title',
                  title: 'Image Title Overlay',
                  type: 'string',
                  description: 'Optional: Text to display as an overlay on this hero image.',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'packageSectionRef',
      title: 'Package & CTA Section',
      type: 'reference',
      to: [{type: 'packageSection'}],
      description: 'Select the reusable Package Section document to display on the homepage.',
    }),
    {
      name: 'experienceTheVibeGallery',
      title: 'Gallery Section',
      type: 'gallerySection',
      description: 'Manage the images and content for the gallery on the homepage.',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage'
      }
    }
  }
}) 