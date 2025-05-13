import { defineType } from '@sanity/types'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'Homepage',
    },
    {
      name: 'mainHero',
      title: 'Main Hero Section',
      type: 'object',
      fields: [
        {
          name: 'images',
          title: 'Hero Images',
          type: 'array',
          of: [
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  title: 'Image Alt Text / Name',
                  type: 'string',
                  description: 'Describe this image for accessibility and SEO.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'aboutVibeSupply',
      title: 'About Vibe Supply Section',
      type: 'object',
      fields: [
        {
          name: 'logo',
          title: 'Section Logo',
          type: 'image',
          options: { hotspot: true },
          description: 'Logo image displayed in the About Vibe Supply card',
        },
        {
          name: 'featuresIntro',
          title: 'Features Intro Text',
          type: 'string',
          description: 'Intro text displayed above the package features list.',
        },
        {
          name: 'features',
          title: 'Package Features',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Feature Text',
                  type: 'string',
                },
              ],
            },
          ],
          description: 'Bullet points describing what is included in the package.'
        },
        {
          name: 'footer',
          title: 'Section Footer Text',
          type: 'string',
          description: 'Text shown at the bottom of the About Vibe Supply card (e.g., Elevating events since 2015)',
        },
        {
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'imageAlt',
              title: 'Image Alt Text / SEO Title',
              type: 'string',
              description: 'Describe this image for accessibility and SEO.',
            },
            {
              name: 'imageTitle',
              title: 'Image Card Title',
              type: 'string',
              description: 'Title displayed on the image card (e.g., Unforgettable Experiences)',
            },
            {
              name: 'imageSubtitle',
              title: 'Image Card Subtitle',
              type: 'string',
              description: 'Subtitle displayed on the image card (e.g., Let\'s create magical moments for your special event)',
            },
          ],
        },
      ],
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