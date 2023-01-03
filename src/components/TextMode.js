function TextMode(props) {

  function handleClick(e) {
    if (e.target.id == 'button_import_import') {
      var st;
      try {
        JSON.parse(props.stadiumText);
      } catch (error) {
        st = 0;
      }
      if (st == 0) {
        alert('Can not load changes - text is not a proper JSON Object. Please fix errors or click button Cancel Changes');
        return;
      }
      st = JSON.parse(props.stadiumText);
      if (st.joints) {
        for (var i = 0; i < st.joints.length; i++) {
          if (st.joints[i]._length) {
            st.joints[i].length = st.joints[i]._length;
          }
        }
      }
      // załaduj zmiany w stadionie
      props.setMainMode('stadiumCreator');
    } else if (e.target.id == 'button_import_cancel') {
      // setStadiumText()
    }
  }

  if (props.mainMode !== 'textMode') return null;

  function handleChange(e) {
    // console.log(e);
    props.setStadiumText(e.target.value);
  }

  return (
    <div id="box" style={{ height: '80vh' }} >
      <div id="boximport">
        <table style={{ height: '100%', width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ height: '75vh' }}><textarea id="textarea_import" value={props.stadiumText} onChange={handleChange}></textarea></td>
            </tr>
            <tr>
              <td>
                <button id="button_import_import" onClick={handleClick}>
                  Save
                </button>
                <button id="button_import_cancel" onClick={handleClick}>
                  Cancel Changes
                </button>
                <button id="button_import_clear">
                  Clear
                </button>
                <button id="button_import_goto">
                  Goto Character
                </button>
                <button id="button_import_select_all" style={{ backgroundColor: 'green' }}>
                  Copy All
                </button>
                <button id="button_downloadMap" style={{ backgroundColor: 'green' }}>Download .hbs file</button>
                <label>{'Upload .hbs file ->'}</label>
                <input type="file" id="loadHBS" onchange="fileLoaded()" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default TextMode;