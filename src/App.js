import './App.css';
import Header from './components/Header'
import StadiumCreator from './components/StadiumCreator';
import TextMode from './components/TextMode';
import React, { useState, useLayoutEffect, useEffect } from "react";
import PropertiesTab from './components/PropertiesTab';
import HelpTab from './components/HelpTab';
import Changelog from './components/changelog/Changelog';

function App() {

  const [mainMode, setMainMode] = useState('stadiumCreator');
  const [stadium, setStadium] = useState("");
  const [stadiumText, setStadiumText] = useState("");
  const [version, setVersion] = useState("2.1.0");
  const [updateStadium, setUpdateStadium] = useState(false);

  return (
    <div className="logged-out">
      <Header
        version={version}
      />
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