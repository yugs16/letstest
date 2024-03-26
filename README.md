# About Project
### A small project showcasing ways to write unit and e2e tests for your react UI components.
- We will be developing some react components that will use react's popular hooks, like `useState`, `useEffect`, `useRef`, and `useContext`, and will be writing **unit test cases for them using [vitest](https://vitest.dev/) + [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)**.
- We will be developing **E2E test cases for some workflow using ([Cypress v13](https://www.cypress.io/))**.
- We will use [MSW (Mock Service Worker)](https://www.npmjs.com/package/msw) to intercept API calls as we are not creating networks here.
- We will use [react-query](https://www.npmjs.com/package/@tanstack/react-query), just for fun 🙂.
- We will see how we can architect this test-based project.

# Architecture
We will be using `React + TypeScript + Vite` for setup.

### Installation and running project:
After cloning and `cd letstest` follow the below steps. 
- `npm install`
- `npm run dev`, a server should start on `localhost:8081`
- should give you something like below- 

### Running unit test using "vitest":
- Tests: `npm run test`
- Coverage: `npm run test-coverage`, can be viewed inside /coverage dir.
- Vitest UI preview - `npm run test-preview`, will launch vitest-ui with coverage, something like this -
  
  <img src="https://github.com/yugs16/letstest/assets/9073610/52c552bd-1243-4dbb-b3b9-6d62033b223c" alt="drawing" width="300"/>
  
  More can be found here - https://vitest.dev/guide/coverage#vitest-ui


### Running E2E tests using "cypress":
- `npm run cy-run`, will run cypress tests on terminal
- `npm run cy-open`, will open cypress UI window, and based on test and browser selection you will be able to see test running, in our case we should see sample.cy.ts file ready to run-

  <img src="https://github.com/yugs16/letstest/assets/9073610/5f607aa2-4971-44a9-9c0a-eeea806a1187" alt="drawing" width="300" />

- Select `sample.cy.ts` to see the test run and e2e change on the virtual browser 


# Something on Vite config
- You can see the vite.config.ts file on the root,


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
