import { type SchemaTypeDefinition } from 'sanity'
import siteSettings from './siteSettings'
import homepage from './homepage'
import galleryImageItem from './galleryImageItem'
import gallerySection from './gallerySection'
import contactSection from './contactSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, homepage, galleryImageItem, gallerySection, contactSection],
}
