import { defineType } from '@sanity/types'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'The name of your site, usually your company/brand name.',
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      description: 'Describe your site for search engines and social media.',
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add keywords that describe your site.',
    },
    {
      name: 'author',
      title: 'Site Author',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Important for SEO and accessibility.',
        },
      ],
    },
    {
      name: 'logoWhite',
      title: 'White/Inverted Logo',
      type: 'image',
      description: 'A version of the logo for use on dark backgrounds.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Important for SEO and accessibility.',
        },
      ],
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Recommended: .ico or .png, square dimensions (e.g., 32x32, 64x64).',
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Primary contact email address for the site.',
    },
    {
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      description: 'Primary contact phone number for the site.',
    },
    {
      name: 'defaultOgImage',
      title: 'Default OG Image',
      type: 'image',
      description: 'Used for social media cards when no image is added.',
      options: { hotspot: true },
    },
    {
      name: 'url',
      title: 'Site URL',
      type: 'url',
      description: 'The main site URL. Used to create canonical and alternate language links.',
    },
    {
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'navItemUrl',
              title: 'Navigation Item URL',
              type: 'slug',
              options: {
                source: 'title',
                maxLength: 96,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        {
          name: 'copyrightName',
          title: 'Copyright name',
          type: 'string',
        },
        {
          name: 'footerText',
          title: 'Footer Text',
          type: 'string',
          description: 'Text displayed in the footer (e.g., © YEAR Vibe Supply. All rights reserved.)',
        },
        {
          name: 'footerNav',
          title: 'Footer Navigation',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                },
                {
                  name: 'navItemUrl',
                  title: 'Navigation Item URL',
                  type: 'slug',
                  options: {
                    source: 'title',
                    maxLength: 96,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
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
      title: 'title',
      subtitle: 'description',
    },
  },
}) 