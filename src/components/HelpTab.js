import logoHelp from "../HBSE_files/top-tools/top-tools_help.png";
import logoHaxRacing from "../HBSE_files/top-tools/haxracing.png";
import logoClose from "../HBSE_files/general/general_close.png"

function HelpTab(props) {

  if (props.mainMode !== 'helpTab') return null;

  function handleClick(e) {
    console.log(e.target);
    if (e.target.id === 'button_help_close' || e.target.parentElement.id === 'button_help_close') {
      props.setMainMode('stadiumCreator');
    } else if (e.target.id === 'button_about' || e.target.parentElement.id === 'button_about') {
      alert('v2.10, 2020 by Falafel');
    } else if (e.target.id === 'button_contact' || e.target.parentElement.id === 'button_contact') {
      alert('Discord: Falafel#3895\nYou can find me at discord.io/haxracing\nemail: turbofalafel@gmail.com');
    }
  }

  return (
    <table id="table" cellSpacing="7px" style={{ height: 864 }}>
      <tbody>
        <tr>
          <td colspan="2" id="topbox" valign="top">
            <table style={{ width: '100%', height: '100%' }}>
              <tbody>
                <div id="boxhelp" style={{ height: 864 }}>
                  <button id="button_about" style={{ width: 120 }} onClick={handleClick}>
                    <img src={logoHelp} style={{ height: 12, width: 12 }} alt='img' />
                    Version
                  </button>
                  <button id="button_haxracing" style={{ width: 150 }} onClick={handleClick}>
                    <a href="https://discord.io/haxracing" target="_blank" style={{ color: '#FFF' }} rel='noreferrer'>
                      <img src={logoHaxRacing} style={{ height: 12, width: 24 }} alt='img' />HaxRacing</a></button>
                  <button id="button_contact" style={{ width: 100 }} onClick={handleClick}>Contact</button>
                  <button id="button_help_close" style={{ width: 100 }} onClick={handleClick}>Close
                    <img src={logoClose} style={{ height: 10, width: 14 }} alt='img' onClick={handleClick} /></button>
                  <div id="helpcontents" style={{ height: '90%' }}>
                    <h2>Haxball Stadium Editor</h2>
                    <h3>General info</h3>
                    The < a href="http://web.archive.org/web/20181112005722/https://github.com/atnnn/haxpuck/" > source code for
                      HaxPuck</a > (created by AtnNn) was available on github.
                    Haxball Stadium File(.hbs) wiki is available < a
                      href="https://github.com/haxball/haxball-issues/wiki/Stadium-(.hbs)-File" > HERE</a >
                    <h4>(2020-04-17) v2.10 by Falafel</h4>
                    <ul>
                      <li>Added an alert when user tries to load too big map (max width/height is 65535). Stadium will be displayed
                        in a limited way (8000x8000)</li>
                    </ul>
                    <h4>(2020-04-16) v2.09 by Falafel</h4>
                    <ul>
                      <li>Changed "Tools" tab, it should be more clear and intuitive now</li>
                      <li>Changed displaying of transparent joints</li>
                      <li>Added "Upload .hbs file" button, which lets you upload the map fom your computer</li>
                    </ul>
                    <h4>(2020-04-15) v2.08 by Falafel</h4>
                    <ul>
                      <li>Fixed some bugs</li>
                    </ul>
                    <h4>(2020-04-14) v2.07 by Falafel</h4>
                    <ul>
                      <li>Joints are now editable (via "Properties" tab, just like segments or discs)</li>
                      <li>Colors of joints are now correctly displayed</li>
                    </ul>
                    <h4>(2020-04-10) v2.06 by Falafel</h4>
                    <ul>
                      <li>Added "Copy All" button beacuse of error, when user tries to manually copy the text</li>
                      <li>Fixed bug that appear when deleting a disc. From now on joints are deleted when one of his discs is
                        deleted</li>
                      <li>Fixed bug when "strength" value of joint has incorrect value (it becomes "rigid" now)</li>
                    </ul>
                    <h4>(2020-01-04) v2.05 by Falafel</h4>
                    <ul>
                      <li>Fixed bug with loading stadium when joints have null length value</li>
                    </ul>
                    <h4>(2019-12-31) v2.04 by Falafel</h4>
                    <ul>
                      <li>Changed positions of "Save" and "Cancel changes" buttons, as it was in old haxpuck</li>
                      <li>Discs can have "transparent" color property now</li>
                    </ul>
                    <h4>(2019-12-28) v2.03 by Falafel</h4>
                    <ul>
                      <li>Added zoom buttons at bottom toolbox (x0.5, x1, x2, x3)</li>
                    </ul>
                    <h4>(2019-12-28) v2.02 by Falafel</h4>
                    <ul>
                      <li>Joints are "visible" now</li>
                    </ul>
                    <h4>(2019-12-26) v2.01 by Falafel</h4>
                    <ul>
                      <li>Fixed some bugs</li>
                    </ul>
                    <h4>(2019-12-23) v2.00 by Falafel</h4>
                    <ul>
                      <li>Added missing properties (kickOffReset, cameraWidth, cameraHeight, bias)</li>
                      <li>Added possibility to create traits: [Properties] {'>'} [New trait]</li>
                      <li>Creating and deleting SpawnPoints with x and y properties: [Tools]</li>
                      <li>Creating joints in [Tools] with length, color and strength properties (available only if 2 discs are
                        selected)</li>
                      <li>Added "Download .hbs file" button at the bottom of [Text Mode]</li>
                      <li>Graphical visualization of bias (works properly only for straight segments)</li>
                    </ul>

                    <h4>(2019-08-06) v1.14 by GLH (Grandes Liga Haxball)</h4>
                    <ul>
                      <li>[Kick Recoil] was added in [Properties] {'>'} [Player Physics].</li>
                      <li>Gravity has been added in Properties {'>'} Player Physics.</li>
                      <li>Gravity has been added in Properties {'>'} Ball Physics.</li>
                      <li> Added icon in [Tools] {'>'} [Automatic Mirror]. </li>
                      <li> Added icon in [Tools] {'>'} [Preview]. </li>
                      <li> [Text Mode] {'>'} [Clear] has been changed to [Clear All]. </li>
                      <li> An alert window was added when you clicked [Text Mode] {'>'} [Clear All]. </li>
                      <li> The icon has been changed in [Top QuickTool] {'>'} [Bug Report / Contact]. </li>
                      <li> The icon has been changed in [Bottom QuickTool] {'>'} [Undo] and [Redo]. </li>
                      <li> Icon changed in [Text mode]. </li>
                      <li> [Help] has been updated. </li>
                      <li> Some translations have been improved. </li>
                      <li> Added properties included in Haxball HTML5 update</li>
                    </ul>
                  </div >
                </div >
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default HelpTab;