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
    {
      name: 'packageCtaSection',
      title: 'Package CTA Section',
      type: 'object',
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
      name: 'meetTheTeamSection',
      title: 'Meet The Team Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'e.g., Meet the Team',
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'text',
          description: 'Descriptive text below the main title for the team section.',
        },
        {
          name: 'mainImage',
          title: 'Large Decorative Image (Left Side)',
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe this image for accessibility and SEO.'
            },
          ],
        },
        {
          name: 'bandMembers',
          title: 'Band Members',
          description: 'Add between 2 and 6 band members.',
          type: 'array',
          validation: (Rule: any) => [
            Rule.min(2).error('You must add at least 2 band members.'),
            Rule.max(6).error('You can add a maximum of 6 band members.'),
          ],
          of: [
            {
              name: 'bandMember', // This name is for the type within the array
              title: 'Band Member',
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'role',
                  title: 'Role / Instrument',
                  type: 'string',
                },
                {
                  name: 'bio',
                  title: 'Short Bio',
                  type: 'text',
                },
                {
                  name: 'image',
                  title: 'Member Image',
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    {
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      description: 'Describe this image for accessibility (e.g., Headshot of [Name]).',
                      validation: (Rule: any) => Rule.required(),
                    },
                  ],
                },
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'role',
                  media: 'image',
                },
                prepare(selection: any) {
                  const { title, subtitle, media } = selection;
                  return {
                    title: title,
                    subtitle: subtitle,
                    media: media,
                  };
                },
              },
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