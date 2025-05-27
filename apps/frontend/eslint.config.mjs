// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  await antfu({
    typescript: { tsconfigPath: './tsconfig.json' },
    vue: {
      overrides: {
        'vue/max-attributes-per-line': ['error', { singleline: 3 }],
        'vue/no-multiple-template-root': 'off',
      },
    },
  }),
)
