import { type ClientConfig } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_TOKEN

export const sanityClientConfig: ClientConfig = {
  projectId,
  dataset,
  token,
  apiVersion: '2023-11-13',
  useCdn: false
}
