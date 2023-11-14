import { defineConfig, type SingleWorkspace } from 'sanity'
import { deskTool } from 'sanity/desk'
import { dataset, projectId } from '../client/config'
import * as documents from '../schemas'

const config = {
  dataset,
  projectId,
  title: 'Post it studio',
  basePath: '/studio',
  plugins: [deskTool()],
  schema: {
    types: Object.values(documents)
  }
}

export const studioConfig = defineConfig(config as SingleWorkspace)
