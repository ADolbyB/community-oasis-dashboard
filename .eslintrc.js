module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "prettier",
    "plugin:react/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    ecmaFeatures: {
      jsx: true
    }
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/dist/**/*" // Ignore built files.
  ],
  plugins: ["@typescript-eslint", "import", "prettier", "react"],
  rules: {
    quotes: ["error", "double"],
    "import/no-unresolved": 0,
    "no-console": 1,
    "prettier/prettier": 2,
    "react/jsx-uses-react": 2
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
