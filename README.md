# About Project
### A small project showcasing ways to write unit and e2e tests for your react UI components.
- We will be developing some react components that will use react's popular hooks, like `useState`, `useEffect`, `useRef`, and `useContext`, and will be writing **unit test cases for them using jest + react-testing-library([check docs](https://testing-library.com/docs/react-testing-library/intro/))**.
- We will be developing **E2E test cases for some workflow using Cypress([check docs](https://www.cypress.io/))**.
- We will use [MSW (Mock Service Worker)](https://www.npmjs.com/package/msw) to intercept API calls as we are not creating networks here.
- We will use [react-query](https://www.npmjs.com/package/@tanstack/react-query), just for fun 🙂.
- We will see how we can architect this test-based project.

### Architecture:
- We will be using `React + TypeScript + Vite` as starting libraries
### Installation and Working:
After clone and `cd letstest` follow the below steps. 
- `npm install`
- `npm run start`, a server should start on `localhost:8081`

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
