import CreatorHeader from "./CreatorHeader";

function PropertiesTab(props) {

  if (props.mainMode !== 'propertiesTab') return null;

  return (
    <table id="table" cellSpacing="7px" style={{ height: '95vh' }}>
      <tbody>
        <tr>
          <td colSpan="2" id="topbox" valign="top">
            <table style={{ width: '100%', height: '100%' }}>
              <tbody>
                <CreatorHeader mainMode={props.mainMode} setMainMode={props.setMainMode} />
                <div id="stadium_properties" >
                  <div className="prop_group">
                    <div className="prop_group_title">General</div>
                    <label className="prop" style={{ width: 90 }}>Spawn Distance:</label>
                    <input className="prop" type="text" id="prop_spawnDistance" />
                    <label className="prop" style={{ width: 90 }}>Width:</label>
                    <input className="prop" type="text" id="prop_width" />
                    <label className="prop" style={{ width: 90 }}>Height:</label>
                    <input className="prop" type="text" id="prop_height" />
                    <label className="prop" style={{ width: 90 }}>Camera Width:</label>
                    <input className="prop" type="text" id="prop_cameraWidth" />
                    <label className="prop" style={{ width: 90 }}>Camera Height:</label>
                    <input className="prop" type="text" id="prop_cameraHeight" />
                    <label className="prop" style={{ width: 90 }}>maxViewWidth:</label>
                    <input className="prop" type="text" id="prop_maxViewWidth" />
                    <label className="prop" style={{ width: 90 }}>canBeStored:</label>
                    <select className="prop" style={{ width: 104 }} id="prop_canBeStored">
                      <option value='true'>True</option>
                      <option value='false'>False</option>
                    </select>
                    <label className="prop" style={{ width: 90 }}>Camera Follow:</label>
                    <select className="prop" style={{ width: 104 }} id="prop_cameraFollow">
                      <option value="ball">Ball</option>
                      <option value="player">Player</option>
                    </select>
                    <label className="prop" style={{ width: 90 }}>kickOffReset:</label>
                    <select className="prop" style={{ width: 104 }} id="prop_kickOffReset">
                      <option value="partial">Partial</option>
                      <option value="full">Full</option>
                    </select>
                  </div>
                  <div className="prop_group">
                    <div className="prop_group_title">Background</div>
                    <label className="prop" style={{ width: 78 }}>Type:</label>
                    <select className="prop" id="prop_bg_type">
                      <option value="">none</option>
                      <option value="grass">grass</option>
                      <option value="hockey">hockey</option>
                    </select>
                    <label className="prop" style={{ width: 78 }}>Height:</label>
                    <input className="prop" type="text" id="prop_bg_height" />
                    <label className="prop" style={{ width: 78 }}>Width:</label>
                    <input className="prop" type="text" id="prop_bg_width" />
                    <label className="prop" style={{ width: 78 }}>cornerRadius:</label>
                    <input className="prop" type="text" id="prop_bg_cornerRadius" />
                    <label className="prop" style={{ width: 78 }}>kickOffRadius:</label>
                    <input className="prop" type="text" id="prop_bg_kickOffRadius" />
                    <label className="prop" style={{ width: 78 }}>Color:</label>
                    <input className="prop" type="text" id="prop_bg_color" />
                  </div>
                  <div className="prop_group">
                    <div className="prop_group_title">Player Physics</div>
                    <label className="prop" style={{ width: 75 }}>Gravity</label>
                    <input className="prop" type="text" id="prop_pp_gravity" />
                    <label className="prop" style={{ width: 75 }}>Radius</label>
                    <input className="prop" type="text" id="prop_pp_radius" />
                    <label className="prop" style={{ width: 75 }}>bCoef</label>
                    <input className="prop" type="text" id="prop_pp_bCoef" />
                    <label className="prop" style={{ width: 75 }}>InvMass</label>
                    <input className="prop" type="text" id="prop_pp_invMass" />
                    <label className="prop" style={{ width: 75 }}>Damping</label>
                    <input className="prop" type="text" id="prop_pp_damping" />
                    <label className="prop" style={{ width: 75 }}>CGroup</label>
                    <input className="prop" type="text" id="prop_pp_cGroup" />
                    <label className="prop" style={{ width: 75 }}>Acceleration</label>
                    <input className="prop" type="text" id="prop_pp_acceleration" />
                  </div>
                  <div className="prop_group">
                    <div className="prop_group_title">Player Physics (Kick)</div>
                    <label className="prop" style={{ width: 75 }}>kickingAcceleration</label>
                    <input className="prop" type="text" id="prop_pp_kickingAcceleration" />
                    <label className="prop" style={{ width: 75 }}>kickingDamping</label>
                    <input className="prop" type="text" id="prop_pp_kickingDamping" />
                    <label className="prop" style={{ width: 75 }}>kickStrength</label>
                    <input className="prop" type="text" id="prop_pp_kickStrength" />
                    <label className="prop" style={{ width: 75 }}>kickback</label>
                    <input className="prop" type="text" id="prop_pp_kickback" />
                  </div>
                  <div className="prop_group">
                    <div className="prop_group_title">Ball Physics</div>
                    <label className="prop" style={{ width: 75 }}>Gravity</label>
                    <input className="prop" type="text" id="prop_bp_gravity" />
                    <label className="prop" style={{ width: 75 }}>Radius</label>
                    <input className="prop" type="text" id="prop_bp_radius" />
                    <label className="prop" style={{ width: 75 }}>bCoef</label>
                    <input className="prop" type="text" id="prop_bp_bCoef" />
                    <label className="prop" style={{ width: 75 }}>invMass</label>
                    <input className="prop" type="text" id="prop_bp_invMass" />
                    <label className="prop" style={{ width: 75 }}>Damping</label>
                    <input className="prop" type="text" id="prop_bp_damping" />
                    <label className="prop" style={{ width: 75 }}>Color</label>
                    <input className="prop" type="text" id="prop_bp_color" />
                    <label className="prop" style={{ width: 75 }}>cMask</label>
                    <input className="prop" type="text" id="prop_bp_cMask" />
                    <label className="prop" style={{ width: 75 }}>cGroup</label>
                    <input className="prop" type="text" id="prop_bp_cGroup" />
                  </div>
                  <div className="prop_group">
                    <div className="prop_group_title">Color Codes</div>
                    <button>
                      <a href="https://www.color-hex.com/" target="_blank" rel='noreferrer' style={{ color: "#fff" }}>Custom Colors</a>
                    </button>
                    <label className="prop" style={{ width: 75 }}>Color 1: </label>
                    <input className="prop" type="color" name="color1" value="#718C5A" />
                    <label className="prop" style={{ width: 75 }}>Color 2: </label>
                    <input className="prop" type="color" name="color2" value="#555555" />
                    <label className="prop" style={{ width: 75 }}>Color 3: </label>
                    <input className="prop" type="color" name="color3" value="#1A2125" />
                    <label className="prop" style={{ width: 75 }}>Color 4: </label>
                    <input className="prop" type="color" name="color4" value="#2E343C" />
                    <label className="prop" style={{ width: 75 }}>Color 5: </label>
                    <input className="prop" type="color" name="color5" value="#8ED2AB" />
                  </div>
                  <div className="prop_group">
                    <div className="prop_group_title">New Trait</div>
                    <label className="prop" style={{ width: 75 }}>name</label>
                    <input className="prop" type="text" id="trait_name" />
                    <label className="prop" style={{ width: 75 }}>vis</label>
                    <select className="prop" style={{ width: 104 }} id="trait_vis">
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                    <label className="prop" style={{ width: 75 }}>bCoef</label>
                    <input className="prop" type="text" id="trait_bCoef" />
                    <label className="prop" style={{ width: 75 }}>radius</label>
                    <input className="prop" type="text" id="trait_radius" />
                    <label className="prop" style={{ width: 75 }}>invMass</label>
                    <input className="prop" type="text" id="trait_invMass" />
                    <label className="prop" style={{ width: 75 }}>gravity</label>
                    <input className="prop" type="text" id="trait_gravity" />
                    <label className="prop" style={{ width: 75 }}>damping</label>
                    <input className="prop" type="text" id="trait_damping" />
                    <label className="prop" style={{ width: 75 }}>cMask</label>
                    <input className="prop" type="text" id="trait_cMask" />
                    <label className="prop" style={{ width: 75 }}>cGroup</label>
                    <input className="prop" type="text" id="trait_cGroup" />
                    <label className="prop" style={{ width: 75 }}>acceleration</label>
                    <input className="prop" type="text" id="trait_acceleration" />
                    <label className="prop" style={{ width: 75 }}>color</label>
                    <input className="prop" type="text" id="trait_color" />
                    <button id="button_newTrait">Add new trait</button>
                  </div>
                </div>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  )
};

export default PropertiesTab;