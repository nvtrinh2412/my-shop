module.exports = {
    env: {
        browser: true,
        es2015: true
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript',
        "prettier",
        "eslint:recommended",
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    plugins: [
        'react'
    ],
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "no-unused-vars": 0,
        "@typescript-eslint/no-unused-vars": 0,
        '@typescript-eslint/no-floating-promises': ['warn', { ignoreVoid: true }],
        "react/prop-types": "off",
    },

    globals: {
        React: true,
        google: true,
        mount: true,
        mountWithRouter: true,
        shallow: true,
        shallowWithRouter: true,
        context: true,
        expect: true,
        jsdom: true,
        JSX: true,
    },
}
