import CreatorHeader from "./CreatorHeader";

function StadiumCreator(props) {

  if (props.mainMode !== 'stadiumCreator') return null;

  return (

    // <table id="table" cellspacing="7px" style={{ height: 700 }}>
    //   <tbody>
    //     <tr>
    //       <td colspan="2" id="topbox" valign="top">
    //         EEEE
    //       </td>
    //     </tr>
    //   </tbody>
    // </table >

    <table id="table" cellSpacing="7px" style={{ height: 864 }}>
      <tbody>
        <tr>
          <td colspan="2" id="topbox" valign="top">
            <table style={{ width: '100%', height: '100%' }}>
              <tbody>
                <CreatorHeader mainMode={props.mainMode} setMainMode={props.setMainMode} />
                <tr>
                  <td style={{ height: "100%" }}>
                    <div id="canvas_div_placeholder"></div>
                    <div id="canvas_div" style={{ top: 86, left: 49, width: 860, height: 612 }}>
                      <canvas id="canvas" width="840" height="592" style={{ width: 840, height: 592, cursor: "default" }}></canvas>
                      <div id="stadium_properties" className="hidden">
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
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr id="bottomboxes">
          <td id="leftbox" valign="top">
            <table>
              <tbody>
                <tr>
                  <td id="left_tabs">
                    <button id="button_tab_properties" className="active">
                      <img alt='img' src="./HBSE_files/left-tools/left-tools_pr.png" style={{ height: 12, width: 12 }} />Properties
                    </button>
                    {/* <button id="button_tab_edit">Edit</button> */}
                    <button id="button_tab_advanced">
                      <img alt='img' src="./HBSE_files/left-tools/left-tools_board.png" style={{ height: 12, width: 12 }} />Tools
                    </button>
                    {/* <button id="button_tab_spawnpoints">SpawnPoints</button> */}
                  </td>
                  <td>
                    <div id="tab_parent">
                      <div id="tab_properties" className="selected_tool_other">
                      </div>
                      <div id="tab_advanced" className="hidden">
                        <table>
                          <td>
                            <button id="button_tab_spawnpoints">SpawnPoints</button>
                            <button id="button_tab_joints">Joints</button>
                            <button id="button_mirror_mode">
                              <img alt='img' src="./HBSE_files/left-tools/left-tools_mirror.png" style={{ height: 12, width: 12 }} />Automatic Mirror
                            </button>
                            <button id="pref_preview">
                              <img alt='img' src="./HBSE_files/left-tools/left-tools_preview.png" style={{ height: 12, width: 12 }} />Preview
                            </button>
                          </td>
                        </table>
                      </div>
                      <div id="tab_joints" className="hidden">
                        <table>
                          <tr>
                            <label className="prop" style={{ width: 40 }}>length:</label>
                            <input className="prop" type="text" id="inputLength" value="null" />
                            <label className="prop" style={{ width: 35 }}>color:</label>
                            <input className="prop" type="text" id="inputColor" value="transparent" />
                            <label className="prop" style={{ width: 53 }}>strength:</label>
                            <input className="prop" type="text" id="inputStrength" value="rigid" />
                            <button id="button_addJoint" style={{ backgroundColor: "#696969", onmouseover: "jointAlertOn()", onmouseout: "jointAlertOff()" }}>
                              Add Joint
                            </button>
                            <label id="joint_alert"></label>
                          </tr>
                        </table>
                      </div>
                      <div id="tab_spawnpoints" className="hidden">
                        <table>
                          <td>
                            <label className="prop" style={{ width: 25 }}>x:</label>
                            <input className="prop" type="text" id="prop_spawnPointX" />
                            <label className="prop" style={{ width: 25 }}>y:</label>
                            <input className="prop" type="text" id="prop_spawnPointY" />
                            <button id="button_redSpawnPoint" style={{ backgroundColor: "#e56e56" }}>
                              Add Spawn Point
                            </button>
                            <button id="button_blueSpawnPoint" style={{ backgroundColor: "#598ae5" }}>
                              Add Spawn Point
                            </button>
                            <button id="button_resetRed" style={{ backgroundColor: "#e56e56", color: 'black' }}>
                              Reset Spawnpoints
                            </button>
                            <button id="button_resetBlue" style={{ backgroundColor: "#598ae5", color: 'black' }}>
                              Reset Spawnpoints
                            </button>
                          </td>
                        </table>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div id="tab_parent">
                      <div id="tab_advanced" className="hidden">
                        <button id="button_mirror_mode">Automatic Mirrow</button>
                        <button id="pref_preview">미리보기</button>
                      </div>
                    </div>
                    <div id="tab_sub" className="active" style={{ position: 'fixed', bottom: 5, left: 37, height: 27.5, width: '100%', display: 'inline' }}>
                      <button id="button_undo" style={{ backgroundColor: '#5872A5' }}><img alt='img' src="./HBSE_files/always-tools/always-tools_undo.png" style={{ height: 12, width: 12 }} />Undo</button>
                      <button id="button_redo" style={{ backgroundColor: "#5872A5" }}> <img alt='img' src="./HBSE_files/always-tools/always-tools_redo.png" style={{ height: 12, width: 12 }} />Redo</button>
                      <button id="button_copy" style={{ backgroundColor: "#5872A5" }} > <img alt='img' src="./HBSE_files/always-tools/always-tools_copy.png" style={{ height: 12, width: 12 }} />Copy</button>
                      <button id="button_paste" style={{ backgroundColor: "#5872A5" }} > <img alt='img' src="./ HBSE_files / always - tools / always - tools_paste.png" style={{ height: 12, width: 12 }} />Paste</button>
                      <button id="button_delete" style={{ backgroundColor: "#BB2929" }}> <img alt='img' src="./HBSE_files/always-tools/always-tools_del.png" style={{ height: 12, width: 12 }} />Delete</button>
                      <button id="button_select_all" style={{ backgroundColor: "#5872A5" }} > <img alt='img' src="./ HBSE_files / always - tools / always - tools_all.png" style={{ height: 12, width: 12 }} />Select All</button>
                      <button id="button_select_none" style={{ backgroundColor: "#5872A5" }}> <img alt='img' src="./HBSE_files/always-tools/always-tools_cancel.png" style={{ height: 12, width: 12 }} />Select None</button>
                      <button id="button_inverse_selection" style={{ backgroundColor: "#5872A5" }}> <img alt='img' src="./ HBSE_files / always - tools / always - tools_inverse.png" style={{ height: 12, width: 12 }} />Inverse Selection</button>
                      <button id="button_duplicate" style={{ backgroundColor: "#5872A5" }}> <img alt='img' src="./HBSE_files/always-tools/always-tools_CaP.png" style={{ height: 12, width: 12 }} />Duplicate</button >
                      <button id="button_cut" style={{ backgroundColor: "#BB2929" }}> <img alt='img' src="./ HBSE_files / always - tools / always - tools_cut.png" style={{ height: 12, width: 12 }} />Clear</button >
                      <button id="button_zoom05" style={{ backgroundColor: '#9b009b' }}>Zoom x0.5</button>
                      <button id="button_zoom1" style={{ backgroundColor: '#9b009b' }}> Zoom x1</button >
                      <button id="button_zoom2" style={{ backgroundColor: '#9b009b' }}>Zoom x2</button>
                      <button id="button_zoom3" style={{ backgroundColor: '#9b009b' }}> Zoom x3</button >
                    </div >
                  </td >
                </tr >
              </tbody >
            </table >
          </td >
          <td id="rightbox" valign="top">
            <pre id="mousepos" className="right">285, 23</pre>
            <button id="button_tool_select" className="active" style={{ width: 95 }}><img alt='img' src="./HBSE_files/right-tools/right-tools_select.png" style={{ height: 12, width: 12 }} />Select</button>
            <button id="button_tool_rotate" style={{ width: 100 }}><img alt='img' src="./HBSE_files/right-tools/right-tools_rotate.png" style={{ height: 12, width: 12 }} />Rotate</button>
            <button id="button_tool_scale" style={{ width: 100 }}><img alt='img' src="./HBSE_files/right-tools/right-tools_scale.png" style={{ height: 12, width: 12 }} />Scale</button>
            <button id="button_tool_segment" style={{ width: 130 }}><img alt='img' src="./HBSE_files/right-tools/right-tools_segment.png" style={{ height: 12, width: 12 }} />Segment</button>
            <button id="button_tool_vertex" style={{ width: 137 }}><img alt='img' src="./HBSE_files/right-tools/right-tools_vertex.png" style={{ height: 12, width: 12 }} />Vertex</button>
            <button id="button_tool_disc" style={{ width: 95 }}><img alt='img' src="./HBSE_files/right-tools/right-tools_disc.png" style={{ height: 12, width: 12 }} />Disc</button>
            <button id="button_tool_goal" style={{ width: 95 }}><img alt='img' src="./HBSE_files/right-tools/right-tools_goal.png" style={{ height: 12, width: 12 }} />Goal</button>
            <button id="button_tool_plane" style={{ width: 100 }}><img alt='img' src="./HBSE_files/right-tools/right-tools_plane.png" style={{ height: 12, width: 12 }} />Plane</button>
          </td>
        </tr >
      </tbody >
    </table >
  );
}

export default StadiumCreator;