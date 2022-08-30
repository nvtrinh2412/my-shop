module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb",
        "prettier"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier",
    ],
    "rules": {
        "no-console": "warn",
        "import/named": 2,
        "import/namespace": 2,
        "import/default": 2,
        "import/export": 2,
        "import/extensions": [
            0,
            "ignorePackages",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ],
        "import/no-unresolved": 0,
        "react/function-component-definition": 0,
        "react/jsx-filename-extension": [0, { "extensions": [".js", ".jsx"] }],
        "arrow-body-style": 0,
        "no-param-reassign": 0,
        "react/no-unused-prop-types": 1,
        "react/destructuring-assignment": 0,
        "@typescript-eslint/no-unused-vars": 1,
        "no-unused-vars": 1,
        "no-restricted-syntax": 0
    }
}

