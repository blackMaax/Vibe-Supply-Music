import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'packagePage',
  title: 'Package Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The main title for the package page',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'text',
      description: 'A brief description of the packages section',
    }),
    defineField({
      name: 'packageSectionRef',
      title: 'Package Section',
      type: 'reference',
      to: [{ type: 'packageSection' }],
      description: 'Select the Package Section document that contains the packages for this page.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'ratesAndConsultationSection',
      title: 'Rates & Consultation Section',
      type: 'object',
      description: 'Configure the Rates & Consultation section',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'e.g., RATES & CONSULTATION',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'text',
          description: 'The main text content for this section.',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Important for SEO and accessibility.',
              validation: Rule => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'object',
      description: 'Configure the FAQ section',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'e.g., Frequently Asked Questions',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'text',
          description: 'Brief description for the FAQ section',
        }),
        defineField({
          name: 'faqs',
          title: 'FAQ Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'question',
                  title: 'Question',
                  type: 'string',
                  validation: Rule => Rule.required(),
                }),
                defineField({
                  name: 'answer',
                  title: 'Answer',
                  type: 'text',
                  validation: Rule => Rule.required(),
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
                defineField({
                  name: 'imagePosition',
                  title: 'Image Position',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Left', value: 'left' },
                      { title: 'Right', value: 'right' },
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'left',
                  validation: Rule => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'question',
                  subtitle: 'answer',
                  media: 'image',
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}) 