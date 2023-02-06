import './App.css';
import Header from './components/Header'
import StadiumCreator from './components/StadiumCreator';
import TextMode from './components/TextMode';
import React from "react";
import PropertiesTab from './components/properties/PropertiesTab';
import HelpTab from './components/HelpTab';
import Changelog from './components/changelog/Changelog';
import { useSelector } from 'react-redux';

function App() {

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
