// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from 'path'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import { Customers } from './collections/Customers'
import { Media } from './collections/Media'
import { Organizations } from './collections/Organizations'
import { Users } from './collections/Users'
import { Works } from './collections/Works'

import IconSvgBeta from './graphics/IconSvgBeta'
import LogoSvgBeta from './graphics/LogoSvgBeta'

export default buildConfig({
  serverURL: process.env.SERVER_URL || '',
  admin: {
    user: Users.slug,
    dateFormat: 'dd/MM/yyyy',
    bundler: webpackBundler(),
    components: {
      graphics: {
        Icon: IconSvgBeta,
        Logo: LogoSvgBeta,
      },
    },
    meta: {
      titleSuffix: '- ArqPlanner BETA',
      favicon: '/assets/favicon.png',
    },
  },
  editor: slateEditor({}),
  collections: [Users, Customers, Organizations, Works, Media],
  localization: {
    locales: [
      {
        label: 'Português BR',
        code: 'pt-BR',
      },
      {
        label: 'English',
        code: 'en',
      },
    ],
    defaultLocale: 'pt-BR',
    fallback: true,
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  upload: {
    limits: {
      fileSize: 500000000, // 500MB, written in bytes
    },
  },
})
