import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
    },
  },

  app: {
    rootId: 'app',
    pageTransition: {
      enterFromClass: 'opacity-0',
      enterToClass: 'opacity-100',
      leaveFromClass: 'opacity-100',
      leaveToClass: 'opacity-0',
      enterActiveClass: 'transition-opacity',
      leaveActiveClass: 'transition-opacity absolute inset-0',
    },
  },

  routeRules: {},

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'nuxt-graphql-middleware',
  ],

  tailwindcss: {
    editorSupport: true,
    config: {
      content: [
        './nuxt.config.ts',
      ],
    },
  },

  i18n: {
    bundle: {
      dropMessageCompiler: true,
      fullInstall: false,
    },
    customBlocks: {
      defaultSFCLang: 'yaml',
    },
    defaultLocale: 'en',
    locales: [
      { code: 'en', iso: 'en' },
      { code: 'nl', iso: 'nl' },
    ],
  },

  graphqlMiddleware: {
    graphqlEndpoint: `${process.env.NUXT_PUBLIC_BACKEND_URL}/graphql`,
    serverApiPrefix: '/api/graphql',
    autoImportPatterns: [
      './queries/**/*.gql',
    ],
    codegenConfig: {
      flattenGeneratedTypes: true,
      flattenGeneratedTypesIncludeFragments: true,
      skipTypename: false,
      onlyOperationTypes: false,
    },
    codegenSchemaConfig: {
      urlSchemaOptions: {
        headers: {
          token: process.env.BACKEND_API_KEY || '',
        },
      },
    },
  },
})
