import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react', 'react-toggle'],
  manifest: {
    manifest_version: 3,
    name: "LegiBrowse",
    version: "1.0",
    description: "A browser extension that helps low-vision users by replacing fonts in webpages where possible with a hyperlegible font. ",
    permissions: ["activeTab", "storage"],
    content_scripts: [
      {
        "matches": ["<all_urls>"],
        "js": ["contentScript.js"],
        "run_at": "document_end"
      }
    ],
    "icons": {
        "16": "icon/icon16.png",
        "32": "icon/icon32.png",
        "48": "icon/icon48.png",
        "128": "icon/icon128.png"
      },
    },
});
