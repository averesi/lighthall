import React, { useState, useEffect } from 'react';

function App() {
  // Set initial click count to 0
  const [clickCount, setClickCount] = useState(0);

  // Get click count from local storage on component mount
  useEffect(() => {
    const storedClickCount = localStorage.getItem('clickCount');
    if (storedClickCount) {
      setClickCount(parseInt(storedClickCount));
    }
  }, []);

  // Update click count in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('clickCount', clickCount);
  }, [clickCount]);

  // Set up state for country click counts
  const [countryClicks, setCountryClicks] = useState({});

  // Function to update country click counts
  const handleCountryClick = async () => {
    // Get the user's country using an API
    setClickCount(clickCount + 1);
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const country = data.country_name;

    // Update country click counts in state
    setCountryClicks(prevState => {
      if (prevState[country]) {
        return {
          ...prevState,
          [country]: prevState[country] + 1
        };
      } else {
        return {
          ...prevState,
          [country]: 1
        };
      }
    });

    // Increment click count
    
  };

  return (
    <div className="App">
      <h1>Click Counter</h1>
      <p>Click the button to increase the count:</p>
      <button onClick={handleCountryClick}>Click Me!</button>
      <p>Number of Clicks: {clickCount}</p>
      <h2>Distribution of Clicks by Country</h2>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(countryClicks).map(([country, clicks]) => (
            <tr key={country}>
              <td>{country}</td>
              <td>{clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
