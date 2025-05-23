import { type SchemaTypeDefinition } from 'sanity'
import siteSettings from './siteSettings'
import homepage from './homepage'
import galleryImageItem from './galleryImageItem'
import gallerySection from './gallerySection'
import contactSection from './contactSection'
import aboutPage from './aboutPage'
import packagePage from './packagePage'
import packageSection from './packageSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, homepage, galleryImageItem, gallerySection, contactSection, aboutPage, packagePage, packageSection],
}
