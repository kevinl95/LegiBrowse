import { useState, useEffect, SetStateAction } from 'react';
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import { storage } from 'wxt/storage';

function App() {
  // Set up default settings
  storage.defineItem('local:replaceFonts', {
    fallback: true,
  });
  const [rep, setRep] = useState(true);
  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getSetttings() {
      let rep = await storage.getItem('local:replaceFonts');
      console.log(rep)
      if (rep === null) {
        await storage.setItem('local:replaceFonts', true)
        rep = true;
      }
      setRep(rep => rep);
    };

    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    getSetttings();
  }, []);

  const handleFontChange = async () => {
    console.log("Called!")
    const val = await storage.getItem('local:replaceFonts');  // Get user's choice if we are replacing fonts
    await storage.setItem('local:replaceFonts', !val);  // Invert the result
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
        defaultChecked={Boolean(rep)}
        aria-labelledby='font-label'
        onChange={handleChange} />
      <span id='font-label'>Replace Page Fonts</span>
    </>
  );
}

export default App;
