import './App.css';
import './HBSE_files/edit.css';
import Header from './components/Header'
import StadiumCreator from './components/StadiumCreator';
import TextMode from './components/TextMode';
import React, { useState, useLayoutEffect, useEffect } from "react";
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
  const [stadium, setStadium] = useState("");
  const [stadiumText, setStadiumText] = useState("");
  const [updateStadium, setUpdateStadium] = useState(false);

  useEffect(() => {
    // console.log('mounted')
  }, []);

  return (
    <body className="logged-out">
      <Header />
      {/* {width}, {height} */}
      <StadiumCreator
        mainMode={mainMode}
        setMainMode={setMainMode}
        stadium={stadium}
        setStadium={setStadium}
        stadiumText={stadiumText}
        setStadiumText={setStadiumText}
        updateStadium={updateStadium}
        setUpdateStadium={setUpdateStadium}
      />
      <TextMode mainMode={mainMode} setMainMode={setMainMode} stadium={stadium} setStadium={setStadium} stadiumText={stadiumText} setStadiumText={setStadiumText} />
      <PropertiesTab
        mainMode={mainMode}
        setMainMode={setMainMode}
        stadium={stadium}
        setStadium={setStadium}
        stadiumText={stadiumText}
        setStadiumText={setStadiumText}
        updateStadium={updateStadium}
        setUpdateStadium={setUpdateStadium}
      />
      <HelpTab
        mainMode={mainMode}
        setMainMode={setMainMode}
        updateStadium={updateStadium}
        setUpdateStadium={setUpdateStadium}
      />
    </body>
  );
}

export default App;
