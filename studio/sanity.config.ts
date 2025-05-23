import {defineConfig} from 'sanity'
import {structureTool, type StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from '../sanity/schemaTypes'

// Define your singleton document types
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