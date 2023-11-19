import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1366,
    viewportHeight: 768
  },
})
