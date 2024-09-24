import { useEffect } from 'react';
import React from 'react';
import { storage } from 'wxt/storage';
import Toggle from 'react-toggle'
import "react-toggle/style.css"

function App() {
  // Set up default settings
  let [rep, setRep] = useState(true);
  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getSetttings() {
      const settingsPresent = await storage.getItem('local:replaceFonts');
      if (settingsPresent != null) {
        rep = Boolean(settingsPresent)
      } else {
        await storage.setItem("local:replaceFonts", true);
        rep = true;
      }
      setRep(rep);
    }
    getSetttings();
  }, [rep]);

  const handleFontReplaceChange = async () => {
    rep = !rep;
    await storage.setItem("local:replaceFonts", rep);
    setRep(rep);
  };
  // onChange handler with async call
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
          // Call async function and get result
          await handleFontReplaceChange();
          // Refresh the tab
          browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            var activeTab = tabs[0];
            browser.tabs.reload(activeTab.id); // Refresh the active tab
          });
      } catch (error) {
          console.error('Error:', error);
      }
  };
  return (
    <>
      <Toggle
        id='font-status'
        checked={rep}
        aria-labelledby='font-label'
        onChange={handleChange} />
      <span id='font-label'>Replace Page Fonts</span>
    </>
  );
}

export default App;
