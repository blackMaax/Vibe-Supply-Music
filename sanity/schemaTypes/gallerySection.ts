import { ImagesIcon } from 'lucide-react' // Using ImagesIcon for the section
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title for the gallery section (e.g., \"Experience the Vibe\").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional subtitle to display below the main title.',
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'galleryImageItem' }], // Reference to the galleryImageItem schema
      description: 'Add images to the gallery. New rows will be added automatically if many images are added.',
      validation: (Rule) => Rule.min(1).error('At least one image is required for the gallery section.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      imageCount: 'images.length',
    },
    prepare({ title, subtitle, imageCount }) {
      return {
        title: title || 'Gallery Section',
        subtitle: subtitle ? `${subtitle} (${imageCount || 0} images)` : `(${imageCount || 0} images)`,
        media: ImagesIcon,
      }
    },
  },
}) 