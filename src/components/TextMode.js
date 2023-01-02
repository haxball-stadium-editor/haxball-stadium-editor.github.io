function TextMode(props) {

  function handleClick(e) {
    console.log(e.target.id);
    props.setMainMode('stadiumCreator');
  }

  if (props.mainMode !== 'textMode') return null;

  return (
    <div id="box" style={{ height: '80vh' }} >
      <div id="boximport">
        <table style={{ height: '100%', width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ height: '75vh' }}><textarea id="textarea_import"></textarea></td>
            </tr>
            <tr>
              <td>
                <button id="button_import_import" onClick={handleClick}>
                  <img src="./HBSE_files/general/general_save.png" style={{ height: 12, width: 12 }} alt='img' />
                  Save
                </button>
                <button id="button_import_cancel">
                  <img src="./HBSE_files/general/general_vis.png" style={{ height: 12, width: 12 }} alt='img' />
                  Cancel Changes
                </button>
                <button id="button_import_clear">
                  <img src="./HBSE_files/general/general_del.png" style={{ height: 12, width: 12 }} alt='img' />
                  Clear
                </button>
                <button id="button_import_goto">
                  <img src="./HBSE_files/general/general_goto.png" style={{ height: 12, width: 12 }} alt='img' />
                  Goto Character
                </button>
                <button id="button_import_select_all" style={{ backgroundColor: 'green' }}>
                  <img src="./HBSE_files/general/general_all.png" style={{ height: 12, width: 12 }} alt='img' />
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