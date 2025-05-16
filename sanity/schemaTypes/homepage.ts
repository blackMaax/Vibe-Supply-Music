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
      description: 'Configure the main hero banner images and introductory content.',
      options: {
        collapsible: true,
        collapsed: true,
      },
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
                {
                  name: 'title',
                  title: 'Image Title Overlay',
                  type: 'string',
                  description: 'Optional: Text to display as an overlay on this hero image.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'packageCtaSection',
      title: 'Package CTA Section',
      type: 'object',
      description: 'Manage the title, subtitle, call-to-action button, and featured packages for this section.',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'e.g., Ready to Elevate Your Event?',
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'text',
          description: 'Descriptive text below the main title.',
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          description: 'e.g., View Our Packages',
        },
        {
          name: 'buttonLink',
          title: 'Button Link',
          type: 'string', // Using string for flexibility (internal/external)
          description: 'e.g., /packages or https://example.com',
        },
        {
          name: 'packages',
          title: 'Package Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'packageItem',
              title: 'Package',
              fields: [
                { name: 'name', title: 'Package Name', type: 'string', validation: (Rule: any) => Rule.required() },
                { name: 'tagline', title: 'Tagline', type: 'string' },
                {
                  name: 'features',
                  title: 'Features',
                  type: 'array',
                  of: [{ type: 'string', title: 'Feature' }],
                },
                {
                  name: 'image',
                  title: 'Package Image',
                  type: 'image',
                  options: { hotspot: true },
                  fields: [{ name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule: any) => Rule.required() }],
                },
                {
                  name: 'isPopular',
                  title: 'Is Popular?',
                  type: 'boolean',
                  description: 'Highlight this package as popular.',
                  initialValue: false,
                },
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'tagline',
                  media: 'image',
                  isPopular: 'isPopular',
                },
                prepare(selection: any) {
                  const { title, subtitle, media, isPopular } = selection;
                  return {
                    title: `${title as string}${isPopular ? ' (Popular)' : ''}`,
                    subtitle: subtitle as string,
                    media: media,
                  };
                },
              },
            },
          ],
        },
      ],
    },
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