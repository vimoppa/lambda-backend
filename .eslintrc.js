module.exports = {
  extends: ['airbnb-base', 'prettier', 'plugin:@typescript-eslint/recommended', 'plugin:import/typescript'],
  parser: '@typescript-eslint/parser',
  env: { jest: true, node: true },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    // Note: you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    'class-methods-use-this': 'off',
    // console logs are OK in Node
    'no-console': 'off',
    // Added to fix `aws-sdk` being in devDeps instead of Deps (in order to avoid including it in the pkgs)
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // Fix problem that causes eslint to request that all importsinclude the extension, thus breaking them
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    // use es6 module imports and exports
    'import/no-commonjs': 'error',
    // not useful or desired
    'import/no-named-as-default-member': 'off',
    // common warnings in the codebase
    'no-process-exit': 'off',
    'node/shebang': 'off',
    'no-useless-escape': 'off',
    'prefer-rest-params': 'off',
    // "@typescript-eslint/no-explicit-any": "off",
    // relaxing because we have many errors
    'require-atomic-updates': 'off',
    // typescript
    // 'node/no-missing-import': ['error', { tryExtensions: ['.js', '.ts'] }],
    'node/no-missing-import': 'off',
    // enforce strictly camelcase
    camelcase: 'warn',
    // simple-import-sort
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [
            '^(_http_agent|_http_client|_http_common|_http_incoming|_http_outgoing|_http_server|_stream_duplex|_stream_passthrough|_stream_readable|_stream_transform|_stream_wrap|_stream_writable|_tls_common|_tls_wrap|assert|async_hooks|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|http2|https|inspector|module|net|os|path|perf_hooks|process|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|trace_events|tty|url|util|v8|vm|worker_threads|zlib)(/|$)',
          ],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything that does not start with a dot.
          ['^[^.]'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
    // tweak typescript defaults
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    // Already being validated by @typescript-eslint/no-unused-vars
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  // Disable typescript checks in JS
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    // import cycle or cycular dependencies is fine within models classes.
    { files: ['**/models/*.ts'], rules: { 'import/no-cycle': 'off' } },
  ],
  settings: {
    // Ignore .d.ts files for import (they just define the types)
    'import/ignore': ['.d.ts$'],
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts'],
      },
    },
  },
};
