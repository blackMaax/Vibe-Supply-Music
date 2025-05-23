import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from '../sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Vibe Supply',
  projectId: "u8xcmiuu",
  dataset: "production",
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schema.types,
  },
}) 