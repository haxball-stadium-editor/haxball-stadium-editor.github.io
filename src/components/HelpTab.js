<<<<<<< HEAD
import logoHelp from "../HBSE_files/top-tools/top-tools_help.png";
import logoHaxRacing from "../HBSE_files/top-tools/haxracing.png";
import logoClose from "../HBSE_files/general/general_close.png"
import Changelog from "./changelog/Changelog.js";

function HelpTab(props) {

  if (props.mainMode !== 'helpTab') return null;

  function handleClick(e) {
    if (e.target.id === 'button_help_close' || e.target.parentElement.id === 'button_help_close') {
      props.setMainMode('stadiumCreator');
      props.setUpdateStadium(true)
    } else if (e.target.id === 'button_about' || e.target.parentElement.id === 'button_about') {
      alert('v' + props.version.version + ', ' + props.version.year);
      console.log(Changelog);
    } else if (e.target.id === 'button_contact' || e.target.parentElement.id === 'button_contact') {
      alert('Discord: Falafel#3895\nYou can find me at discord.io/haxracing\nemail: turbofalafel@gmail.com');
    }
  }

  return (
    <table id="table" cellSpacing="7px" style={{ height: '95vh' }}>
      <tbody>
        <tr>
          <td colSpan="2" id="topbox" valign="top">
            <table style={{ width: '100%', height: '100%' }}>
              <tbody>
                <div id="boxhelp" style={{ height: '82vh' }}>
                  <button id="button_about" style={{ width: 120 }} onClick={handleClick}>
                    <img src={logoHelp} style={{ height: 12, width: 12 }} alt='img' />
                    Version
                  </button>
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
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

=======
import logoHelp from "../HBSE_files/top-tools/top-tools_help.png";
import logoHaxRacing from "../HBSE_files/top-tools/haxracing.png";
import logoClose from "../HBSE_files/general/general_close.png"
import Changelog from "./changelog/Changelog.js";

function HelpTab(props) {

  if (props.mainMode !== 'helpTab') return null;

  function handleClick(e) {
    if (e.target.id === 'button_help_close' || e.target.parentElement.id === 'button_help_close') {
      props.setMainMode('stadiumCreator');
      props.setUpdateStadium(true)
    } else if (e.target.id === 'button_about' || e.target.parentElement.id === 'button_about') {
      alert('v' + props.version.version + ', ' + props.version.year);
      console.log(Changelog);
    } else if (e.target.id === 'button_contact' || e.target.parentElement.id === 'button_contact') {
      alert('Discord: Falafel#3895\nYou can find me at discord.io/haxracing\nemail: turbofalafel@gmail.com');
    }
  }

  return (
    <table id="table" cellSpacing="7px" style={{ height: '95vh' }}>
      <tbody>
        <tr>
          <td colSpan="2" id="topbox" valign="top">
            <table style={{ width: '100%', height: '100%' }}>
              <tbody>
                <div id="boxhelp" style={{ height: '82vh' }}>
                  <button id="button_about" style={{ width: 120 }} onClick={handleClick}>
                    <img src={logoHelp} style={{ height: 12, width: 12 }} alt='img' />
                    Version
                  </button>
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
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

>>>>>>> 4fa73a8799f23b20ed1dc58a869117c09c354afa
export default HelpTab;