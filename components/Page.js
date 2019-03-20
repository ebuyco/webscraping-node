import { useEffect, useState } from 'react';
import { ScrapeProvider } from './ScrapeContext';


// Created a Custom hook available only at version 16.8
function useScrapes() {
  const [scrapes, setScrapes] = useState({
    twitter: [],
    instagram: []
  });
  useEffect(() => {
    (async () => {
      console.log('Mounting or updating effect');
      const res = await fetch('http://localhost:2132/data');
      const data = await res.json();
      console.log(data);
      setScrapes(data);
    })();
  }, []);
  return scrapes;
}


export default function Page({ children }) {
  const scrapes = useScrapes();
  return (
    <ScrapeProvider
      value={{
        scrapes,
      }}
    >
      <div className='page'>
        {children}
      </div>
    </ScrapeProvider>
  );
}
