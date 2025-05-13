import { type SchemaTypeDefinition } from 'sanity'
import siteSettings from './siteSettings'
import homepage from './homepage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, homepage],
}
