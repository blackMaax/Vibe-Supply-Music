import type {StructureResolver} from 'sanity/structure'
// We don't need to import SchemaTypeDefinition or the specific schema file here
// if we rely on the name 'siteSettings' directly.

// Define a list of singleton document types
export const singletonTypes: Set<string> = new Set(['siteSettings']) 

export const structure: StructureResolver = (S, context) => 
  S.list()
    .title('Content')
    .items([
      // Site Settings Singleton
      S.listItem()
        .title('Site Settings') // You can customize this title
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings') // Document ID for the singleton
        ),
      // .icon(YourIcon) // If you had an icon for siteSettings schema

      S.divider(),

      // Filter out singleton types from the main list and list the rest
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.has(listItem.getId()!)
      ),
    ])
