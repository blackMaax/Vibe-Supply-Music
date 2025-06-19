import { defineType } from '@sanity/types'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'About Page',
    },
    {
      name: 'aboutUsSection',
      title: 'About Us Section',
      type: 'object',
      description: 'Configure the main about us content.',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'ethosTitle',
          title: 'Ethos Title',
          type: 'string',
          description: 'The title for the ethos section.',
          initialValue: 'The Vibe Supply Ethos',
        },
        {
          name: 'ethosContent',
          title: 'Ethos Content',
          type: 'text',
          description: 'The main content of the ethos section.',
        },

        {
          name: 'mainContentTitle',
          title: 'Main Content Title',
          type: 'string',
          description: 'The title for the main content block (e.g., Our Story).',
        },
        {
          name: 'ourStoryParagraphs',
          title: 'Our Story Paragraphs',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'paragraph',
              title: 'Paragraph',
              fields: [
                {
                  name: 'text',
                  title: 'Paragraph Text',
                  type: 'text',
                  validation: (Rule: any) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: 'text',
                },
                prepare(selection: Record<string, any>) {
                  const { title } = selection;
                  return {
                    title: title ? `${(title as string).substring(0, 50)}...` : 'Paragraph',
                  };
                }
              },
            },
          ],
          description: 'Add one or more paragraphs for the Our Story section. First paragraph is required, additional paragraphs are optional.',
          validation: (Rule: any) => Rule.min(1).max(3).error('You must have at least 1 paragraph and at most 3 paragraphs.'),
        },
        {
          name: 'keyPoints',
          title: 'Key Points / Bullet Points',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'keyPoint',
              title: 'Key Point',
              fields: [
                {
                  name: 'text',
                  title: 'Text',
                  type: 'string',
                },
              ],
              preview: {
                select: {
                  title: 'text',
                },
              },
            },
          ],
          description: 'Key points or bullet points for the Our Story section.',
        },
        {
          name: 'featuredImage',
          title: 'Featured Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Image Caption',
              type: 'string',
              description: 'Optional caption for the image.',
            },
            {
              name: 'position',
              title: 'Image Position',
              type: 'string',
              description: 'Choose whether the image appears on the left or right.',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Right', value: 'right' },
                ],
              },
              initialValue: 'right',
            },
          ],
        },
      ],
    },
    {
      name: 'meetTheFoundersSection',
      title: 'Meet the Founders Section',
      type: 'object',
      description: 'Configure the founders showcase section.',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'isHidden',
          title: 'Hide Section',
          type: 'boolean',
          description: 'Toggle to hide or show the entire Meet the Founders section.',
          initialValue: false,
        },
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'The main title for the founders section.',
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'text',
          description: 'A brief introduction to the founders section.',
        },
        {
          name: 'founders',
          title: 'Founders',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'founder',
              title: 'Founder',
              fields: [
                {
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'role',
                  title: 'Role',
                  type: 'string',
                  description: 'e.g., Co-Founder, Creative Director',
                },
                {
                  name: 'bio',
                  title: 'Biography',
                  type: 'text',
                  description: 'A brief biography of the founder.',
                },
                {
                  name: 'image',
                  title: 'Profile Image',
                  type: 'image',
                  options: { hotspot: true },
                },
                {
                  name: 'socialLinks',
                  title: 'Social Links',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      name: 'socialLink',
                      title: 'Social Link',
                      fields: [
                        {
                          name: 'platform',
                          title: 'Platform',
                          type: 'string',
                          options: {
                            list: [
                              { title: 'Instagram', value: 'instagram' },
                              { title: 'LinkedIn', value: 'linkedin' },
                              { title: 'Twitter', value: 'twitter' },
                              { title: 'Facebook', value: 'facebook' },
                            ],
                          },
                        },
                        {
                          name: 'url',
                          title: 'URL',
                          type: 'url',
                        },
                      ],
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
        title: 'About Page'
      }
    }
  }
}) 