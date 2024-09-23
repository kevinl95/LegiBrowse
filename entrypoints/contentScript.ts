import { storage } from 'wxt/storage';

export default defineUnlistedScript(() => {
  (async function() {
        const onwatch = storage.watch<boolean>('local:replaceFonts', (newBool, oldBool) => {
          console.log('Font replacement setting changed:', { newBool, oldBool });
        });
        const replace = await storage.getItem('local:replaceFonts');
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
  