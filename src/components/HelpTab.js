import logoHelp from "../HBSE_files/top-tools/top-tools_help.png";
import logoHaxRacing from "../HBSE_files/top-tools/haxracing.png";
import logoClose from "../HBSE_files/general/general_close.png"
import Changelog from "./changelog/Changelog.js";
import { useEffect } from "react";
import $ from 'jquery'
import { useSelector, useDispatch } from "react-redux";
import { setMainMode } from "../reducers/mainModeSlice";

function HelpTab() {

  const mainMode = useSelector((state) => state.mainMode.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mainMode === 'helpTab') $("#table").fadeTo(300, 1)
  }, [mainMode])

  function handleClick(e) {
    if (e.target.id === 'button_help_close' || e.target.parentElement.id === 'button_help_close') {
      $("#table").fadeTo(300, 0.01, "linear", function () {
        dispatch(setMainMode('stadiumCreator'));
      })
    } else if (e.target.id === 'button_contact' || e.target.parentElement.id === 'button_contact') {
      alert('Discord: Falafel#3895\nYou can find me at discord.io/haxracing\nemail: turbofalafel@gmail.com');
    }
  }

  return (
    <table id="table" cellSpacing="7px" style={{ height: '95vh', opacity: 0.01 }}>
      <tbody>
        <tr>
          <td colSpan="2" id="topbox" valign="top">
            <table style={{ width: '100%', height: '100%' }}>
              <tbody><tr><td>
                <div id="boxhelp" style={{ height: '82vh' }}>
                  <button id="button_haxracing" style={{ width: 150 }} onClick={handleClick}>
                    <a href="https://discord.io/haxracing" target="_blank" style={{ color: '#FFF' }} rel='noreferrer'>
                      <img src={logoHaxRacing} style={{ height: 12, width: 24 }} alt='img' />HaxRacing</a></button>
                  <button id="button_contact" style={{ width: 100 }} onClick={handleClick}>Contact</button>
                  <button id="button_hbs_wiki">
                    <a href="https://github.com/haxball/haxball-issues/wiki/Stadium-(.hbs)-File" target="_blank" rel='noreferrer' style={{ color: '#FFF' }}>
                      .hbs wiki</a></button>
                  <button id="button_help_close" style={{ width: 100 }} onClick={handleClick}>Close
                    <img src={logoClose} style={{ height: 10, width: 14 }} alt='img' onClick={handleClick} /></button>
                  <Changelog hide={false} />
                </div >
              </td></tr></tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default HelpTab;