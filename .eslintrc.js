module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:react/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/dist/**/*", // Ignore built files.P
  ],
  plugins: ["@typescript-eslint", "import", "react"],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "no-console": 1,
    "react/jsx-uses-react": 2,
    "linebreak-style": ["error", "unix"],
    "valid-jsdoc": ["error", {
      "requireReturnType": false
    }]
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
