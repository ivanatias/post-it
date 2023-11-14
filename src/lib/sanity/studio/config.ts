import { defineConfig, type SingleWorkspace } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { dataset, projectId } from '../client/config'
import * as documents from '../schemas'

const config = {
  dataset,
  projectId,
  title: 'Post it studio',
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: Object.values(documents)
  }
}

export const studioConfig = defineConfig(config as SingleWorkspace)
