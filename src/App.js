import './App.css';
import './HBSE_files/edit.css';
import './HBSE_files/edit.js';
import Header from './components/Header'
import StadiumCreator from './components/StadiumCreator';
import TextMode from './components/TextMode';
import React, { useState, useLayoutEffect } from "react";
import PropertiesTab from './components/PropertiesTab';
import HelpTab from './components/HelpTab';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

function App() {

  const [mainMode, setMainMode] = useState('stadiumCreator');
  const [width, height] = useWindowSize();

  return (
    <body className="logged-out">
      <Header />
      {/* {width}, {height} */}
      <StadiumCreator mainMode={mainMode} setMainMode={setMainMode} />
      <TextMode mainMode={mainMode} setMainMode={setMainMode} />
      <PropertiesTab mainMode={mainMode} setMainMode={setMainMode} />
      <HelpTab mainMode={mainMode} setMainMode={setMainMode} />
    </body>
  );
}

export default App;
