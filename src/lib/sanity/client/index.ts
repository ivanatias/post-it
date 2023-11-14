import { createClient } from 'next-sanity'
import { sanityClientConfig } from './config'

export const client = createClient(sanityClientConfig)
