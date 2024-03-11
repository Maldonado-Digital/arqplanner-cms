import path from 'path'

import { webpackBundler } from '@payloadcms/bundler-webpack'
// import { postgresAdapter } from '@payloadcms/db-postgres'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import { Customers } from './collections/Customers'
import { Media } from './collections/Media'
import { Organizations } from './collections/Organizations'
import { Users } from './collections/Users'
import { Works } from './collections/Works'
import SvgIcon from './graphics/Icon'
import SvgLogo from './graphics/Logo'

export default buildConfig({
  admin: {
    user: Users.slug,
    dateFormat: 'dd/MM/yyyy',
    bundler: webpackBundler(),
    components: {
      graphics: {
        Icon: SvgIcon,
        Logo: SvgLogo,
      },
    },
    meta: {
      titleSuffix: '- ArqPlanner',
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
  // db: postgresAdapter({
  //   pool: {
  //     connectionString: process.env.DATABASE_URI,
  //   },
  // }),
  db: mongooseAdapter({
    // Mongoose-specific arguments go here.
    // URL is required.
    url: process.env.DATABASE_URI,
  }),
})
