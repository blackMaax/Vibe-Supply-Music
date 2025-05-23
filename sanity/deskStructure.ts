import { StructureBuilder } from 'sanity/structure'

export const deskStructure = (S: StructureBuilder) => {
  return S.list()
    .title('Content')
    .items([
      // Add your structure items here
      S.listItem()
        .title('Settings')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
      // Add more list items as needed
    ])
} 