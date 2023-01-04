import logoTextMode from '../HBSE_files/top-tools/top-tools_text.png';
import logoProperties from '../HBSE_files/top-tools/top-tools_pr.png';
import logoHelp from "../HBSE_files/top-tools/top-tools_help.png";

function CreatorHeader(props) {

  function handleClick(e) {
    // console.log('klikło', props.mainMode);
    // console.log(e.target.id);
    if (e.target.id === 'button_import' || e.target.parentElement.id === 'button_import') {
      props.setMainMode('textMode');
      // console.log('obecny stadion', props.stadium);
    } else if (e.target.id === 'button_properties' || e.target.parentElement.id === 'button_properties') {
      if (props.mainMode === 'propertiesTab') {
        props.setMainMode('stadiumCreator');
        props.reloadStadium();
      } else {
        props.setMainMode('propertiesTab');
      }
    } else if (e.target.id === 'button_help' || e.target.parentElement.id === 'button_help') {
      props.setMainMode('helpTab');
    }
  }

  return (
    <tr>
      <td>
        <table className="underline" style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ width: "100%" }} id="right_tabs">  </td>
              <td></td>
              <td>
                <button id="button_import" style={{ width: 125 }} onClick={handleClick}>
                  <img alt='img' src={logoTextMode} style={{ height: 12, width: 12 }} />
                  Text Mode
                </button>
              </td>
              <td>
                <button id="button_properties" style={{ width: 125 }} onClick={handleClick}>
                  <img alt='img' src={logoProperties} style={{ height: 12, width: 12 }} />
                  Properties
                </button>
              </td>
              <td>
                <button id="button_help" style={{ width: 95 }} onClick={handleClick}>
                  <img alt='img' src={logoHelp} style={{ height: 12, width: 12 }} />
                  Help
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}

export default CreatorHeader;