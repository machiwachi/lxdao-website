module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  importOrder: ["^react(.*)$", "^next(.*)$", "^@mui(.*)$", "^@/components(.*)$", "^viem(.*)$", "^wagmi(.*)$", "^@/(.*)$", "^[./]", "^lodash$", , "^_"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"]
};
