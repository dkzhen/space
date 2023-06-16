import React, { useEffect, useState } from 'react';

const Home = ({ message }) => {
  const [apiMessage, setApiMessage] = useState(message);

  useEffect(() => {
    fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => setApiMessage(data.message))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Next.js Frontend and Backend Tutorial</h1>
      <p>{apiMessage}</p>
    </div>
  );
};


export default Home;
