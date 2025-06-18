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

    // Global contact info (email, phone, socials) is handled separately
    // and not part of this specific section's content schema.
  ],
  preview: {
    select: {
      title: 'sectionTitle',
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Section',
        subtitle: 'Contact Form Section Content',
      }
    },
  },
}) 