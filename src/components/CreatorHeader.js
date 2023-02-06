import logoTextMode from '../HBSE_files/top-tools/top-tools_text.png';
import logoProperties from '../HBSE_files/top-tools/top-tools_pr.png';
import logoHelp from "../HBSE_files/top-tools/top-tools_help.png";
import $ from 'jquery'
import { editStadium } from '../reducers/stadiumSlice';
import { setMainMode } from '../reducers/mainModeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function CreatorHeader(props) {

  const dispatch = useDispatch();
  const stadiumState = useSelector((state) => state.stadium.value);
  const stadium = JSON.parse(JSON.stringify(stadiumState))
  const mainMode = useSelector((state) => state.mainMode.value);
  const [stadiumName, setStadiumName] = useState(stadium.name)

  useEffect(() => {
    setStadiumName(stadiumState.name)
  }, [stadiumState]);

  function handleClick(e) {
    props.updateStadium();
    if (e.target.id === 'button_import' || e.target.parentElement.id === 'button_import') {
      $("#table").fadeTo(300, 0.01, "linear", function () {
        dispatch(setMainMode('textMode'));
      })
    } else if (e.target.id === 'button_properties' || e.target.parentElement.id === 'button_properties') {
      $("#table").fadeTo(300, 0.01, "linear", function () {
        if (mainMode === 'propertiesTab') {
          dispatch(setMainMode('stadiumCreator'));
        } else {
          dispatch(setMainMode('propertiesTab'));
        }
      })
    } else if (e.target.id === 'button_help' || e.target.parentElement.id === 'button_help') {
      $("#table").fadeTo(300, 0.01, "linear", function () {
        dispatch(setMainMode('helpTab'));
      })
    }
  }

  function handleChange(e) {
    setStadiumName(e.target.value);
    stadium.name = e.target.value;
    dispatch(editStadium(stadium));
  }

  return (
    <tr>
      <td>
        <table className="underline" style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ width: "100%" }} id="right_tabs">
                <input id="input_name" value={stadiumName} onChange={handleChange} autoComplete="off" />
              </td>
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
                  {mainMode === 'propertiesTab' ? 'Creator' : 'Properties'}
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