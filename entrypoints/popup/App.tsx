import { useState, useEffect } from 'react';
import Toggle from 'react-toggle'
import { storage } from 'wxt/storage';
import './App.css';

function App() {
  // Set up default settings
  storage.defineItem('local:replaceFonts', {
    fallback: true,
  });
  const [rep, setRep] = useState(null);
  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getSetttings() {
      const rep = await storage.getItem('local:replaceFonts');
      setRep(rep);
    };

    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    getSetttings();
  }, []);

  const handleFontChange = async () => {
    const val = await storage.getItem('local:replaceFonts');  // Get user's choice if we are replacing fonts
    await storage.setItem('local:replaceFonts', !val);  // Invert the result
  };

  // onChange handler with async call
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
          // Call async function and get result
          const result = await handleFontChange();
      } catch (error) {
          console.error('Error:', error);
      }
  };
  return (
    <>
      <div className="card">
      <label>
        <Toggle
          defaultChecked={rep}
          icons={false}
          onChange={handleChange} />
        <span>Replace Fonts</span>
      </label>
      </div>
    </>
  );
}

export default App;
