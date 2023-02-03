import './App.css';
import Header from './components/Header'
import StadiumCreator from './components/StadiumCreator';
import TextMode from './components/TextMode';
import React, { useState } from "react";
import PropertiesTab from './components/PropertiesTab';
import HelpTab from './components/HelpTab';
import Changelog from './components/changelog/Changelog';
import { useSelector, useDispatch } from 'react-redux';

function App() {

  // const [mainMode, setMainMode] = useState('stadiumCreator');
  // const [stadium, setStadium] = useState("");
  // const [stadiumText, setStadiumText] = useState("");
  // const [version, setVersion] = useState("2.1.0");
  // const [updateStadium, setUpdateStadium] = useState(false);
  // const xx = useSelector((state) => state.version.value);

  const mainMode = useSelector((state) => state.mainMode.value);

  return (
    <div className="logged-out">
      <Header />
      {mainMode === 'stadiumCreator' && <StadiumCreator />}
      {mainMode === 'textMode' && <TextMode />}
      {mainMode === 'propertiesTab' && <PropertiesTab />}
      {mainMode === 'helpTab' && <HelpTab />}
      <Changelog hide={true} />
    </div >
  );
}

export default App;
