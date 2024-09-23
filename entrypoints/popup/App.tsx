import { React, useEffect } from 'react';
import { createStorage } from "unstorage";
import localStorageDriver from 'unstorage/drivers/localstorage';
import Toggle from 'react-toggle'
import "react-toggle/style.css"

function App() {
  // Set up default settings
  const storage = createStorage({
    driver: localStorageDriver(),
  });  
  let [rep, setRep] = useState(true);
  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getSetttings() {
      const settingsPresent = await storage.hasItem("replaceFonts");
      if (settingsPresent) {
        rep = await storage.getItem('replaceFonts') as boolean;
      } else {
        await storage.setItem("replaceFonts", true);
        rep = true;
      }
      setRep(rep);
    }
    getSetttings();
  }, [rep]);

  const handleFontChange = async () => {
    rep = !rep;
    await storage.setItem("replaceFonts", rep);
    setRep(rep);
  };
  // onChange handler with async call
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
          // Call async function and get result
          await handleFontChange();
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
