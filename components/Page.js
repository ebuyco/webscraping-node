import { useEffect, useState } from 'react';
import { ScrapeProvider } from './ScrapeContext';


// Created a Custom hook available only at version 16.8
function useScrapes() {
  // initial state from hooks
  const [scrapes, setScrapes] = useState({
    twitter: [],
    instagram: []
  });
    // fetch function
async function fetchScrapes(){
  const res = await fetch('http://localhost:2132/data');
  const data = await res.json();
  setScrapes(data);
}

  useEffect(() => {
    fetchScrapes();
  }, []);
  return {scrapes, fetchScrapes};
}


export default function Page({ children }) {
  const hookInfo = useScrapes();
  return (
    <ScrapeProvider
      value={
       hookInfo
      }
    >
      <div className='page'>
        {children}
      </div>
    </ScrapeProvider>
  );
}
