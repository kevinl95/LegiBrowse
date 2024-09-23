import { createStorage } from "unstorage";
import localStorageDriver from 'unstorage/drivers/localstorage';

export default defineUnlistedScript(() => {
  (async function() {
      const storage = createStorage({
        driver: localStorageDriver(),
      });
      const replace = await storage.getItem('replaceFonts');
      if (replace) {  // Only replace the fonts if the user has toggled this setting on
        const legibleFont = "Atkinson Hyperlegible";
        const link = document.createElement("link");
        link.rel = 'stylesheet';  // Specifies the relationship of the link
        link.href = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible';  // URL of the font
        link.type = 'text/css';  // Specifies the MIME type
        // Create a style element to hold our font change
        const style = document.createElement("style");
        style.innerHTML = `
          * {
            font-family: '${legibleFont}' !important;
          }
        `;
        
        // Append the font and style element to the head of the document
        document.head.appendChild(link);
        document.head.appendChild(style);
      }
    })();
});
  