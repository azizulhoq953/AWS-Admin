
const { configure } = require('@cloudscape-design/browser-test-tools/use-browser');
const { devServerPort } = require('./scripts/config');

jest.setTimeout(90 * 1000);
configure({
  browserName: 'ChromeHeadlessIntegration',
  browserCreatorOptions: {
    seleniumUrl: `http://localhost:9515`,
  },
  webdriverOptions: {
    baseUrl: `http://localhost:${devServerPort}`,
    implicitTimeout: 200,
  },
});



// const { configure } = require('@cloudscape-design/browser-test-tools/use-browser');
// const dotenv = require('dotenv');

// // Load environment variables from .env file
// dotenv.config();

// const devServerPort = process.env.DEV_SERVER_PORT || 3000; // Default to 3000 if not set

// jest.setTimeout(90 * 1000);
// configure({
//   browserName: 'ChromeHeadlessIntegration',
//   browserCreatorOptions: {
//     seleniumUrl: `http://localhost:9515`,
//   },
//   webdriverOptions: {
//     baseUrl: `http://localhost:${devServerPort}`,
//     implicitTimeout: 200,
//   },
// });
