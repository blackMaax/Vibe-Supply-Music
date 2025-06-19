import { defineType } from '@sanity/types'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Define fieldsets for grouping
  fieldsets: [
    { name: 'branding', title: 'Branding & Identity', options: { collapsible: true, collapsed: false } },
    { name: 'contact', title: 'Contact Information', options: { collapsible: true, collapsed: false } },
    { name: 'footerConfig', title: 'Footer Configuration', options: { collapsible: true, collapsed: false } },
    { name: 'social', title: 'Social Media Links', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'The name of your site, usually your company/brand name.',
      fieldset: 'branding', // Assign to branding fieldset
    },
    {
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'branding', // Assign to branding fieldset
    },

    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Recommended: .ico or .png, square dimensions (e.g., 32x32, 64x64).',
      fieldset: 'branding', // Assign to branding fieldset
    },
    {
      name: 'siteBackgroundImage',
      title: 'Site Background Image',
      type: 'image',
      description: 'A large image to be used as the default background for the entire site.',
      options: { hotspot: true }, // Hotspot is useful for images where focal point matters
      fieldset: 'branding', // Assign to branding fieldset
    },
    {
      name: 'socialSharingImage',
      title: 'Social Sharing Image',
      type: 'image',
      description: 'Image shown when your website is shared on WhatsApp, Facebook, Twitter, etc. Recommended: 1200x630px for best results.',
      options: { hotspot: true },
      fieldset: 'branding', // Assign to branding fieldset
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Primary contact email address for the site.',
      fieldset: 'contact', // Assign to contact fieldset
    },
    {
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      description: 'Primary contact phone number for the site (optional - can be added later).',
      fieldset: 'contact', // Assign to contact fieldset
    },
    {
      name: 'footer',
      title: 'Footer Content', // Renamed for clarity within its own group
      type: 'object',
      fields: [
        {
          name: 'copyrightName',
          title: 'Copyright Holder Name', // Made more descriptive
          type: 'string',
          description: 'Typically your company/brand name for the copyright notice.'
        },
        {
          name: 'footerText',
          title: 'Custom Footer Text', // Made more descriptive
          type: 'string',
          description: 'Text displayed at the very bottom of the footer (e.g., © YEAR Company Name. All rights reserved.). If blank, a default might be used.',
        },
      ],
      fieldset: 'footerConfig', // Assign to footer fieldset
    },
    {
      name: 'socialLinks',
      title: 'Social Links', // Title is fine as is, it's within the 'Social Media' group
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter (X)', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'Pinterest', value: 'pinterest' },
                  { title: 'Snapchat', value: 'snapchat' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                ],
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule: any) => Rule.required().uri({
                scheme: ['http', 'https']
              }),
            },
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url'
            },
            prepare(selection: Record<string, any>) {
              const { title, subtitle } = selection;
              const platformTitle = title ? (title as string).charAt(0).toUpperCase() + (title as string).slice(1) : 'No platform selected';
              return {
                title: platformTitle,
                subtitle: subtitle as string
              };
            }
          }
        },
      ],
      fieldset: 'social', // Assign to social fieldset
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}) 