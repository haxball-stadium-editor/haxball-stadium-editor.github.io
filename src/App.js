import './App.css';
import './HBSE_files/edit.css';
// import './HBSE_files/edit.js';
import Header from './components/Header'
import StadiumCreator from './components/StadiumCreator';
import TextMode from './components/TextMode';
import { useState } from "react";
import PropertiesTab from './components/PropertiesTab';
import HelpTab from './components/HelpTab';

function App() {

  const [mainMode, setMainMode] = useState('stadiumCreator');

  return (
    <body className="logged-out">
      <Header />
      <StadiumCreator mainMode={mainMode} setMainMode={setMainMode} />
      <TextMode mainMode={mainMode} setMainMode={setMainMode} />
      <PropertiesTab mainMode={mainMode} setMainMode={setMainMode} />
      <HelpTab mainMode={mainMode} setMainMode={setMainMode} />
    </body>
  );
}

export default App;
