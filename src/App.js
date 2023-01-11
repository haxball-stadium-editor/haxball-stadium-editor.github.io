import './App.css';
import Header from './components/Header'
import StadiumCreator from './components/StadiumCreator';
import TextMode from './components/TextMode';
import React, { useState, useLayoutEffect, useEffect } from "react";
import PropertiesTab from './components/PropertiesTab';
import HelpTab from './components/HelpTab';
import Changelog from './components/changelog/Changelog';

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
  const [version, setVersion] = useState("2.1.0");
  const [updateStadium, setUpdateStadium] = useState(false);

  useEffect(() => {
    if (version == '2.1.0') return;
    alert('Hello, it\'s new version of Haxball Stadium Editor. Whole code has been migrated to React.js and restructured, so you may experience some bugs. If so, please let me know either on Discord Falafel#3895, or report bug on GitHub (link in header). There will be some new features in the near future, like extracting stadium from .hbr recording and automatic map upload to Haxmaps.com. If you prefer to use the old version, it\'s still available - click [Old version] in header. Enjoy :)')
  }, [version]);

  return (
    <div className="logged-out">
      <Header
        version={version}
      />
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
        version={version}
      />
      <Changelog
        hide={true}
        version={version}
        setVersion={setVersion}
      />
    </div >
  );
}

export default App;
