import { useEffect, useState } from "react";
import CreatorHeader from "./CreatorHeader";
import $ from 'jquery'

function PropertiesTab(props) {

  const [stadiumProperties, setStadiumProperties] = useState(props.stadium);

  var stadium = props.stadium;

  // var field_setters = [];

  // function connect_field(input, p, parse, unparse) {
  //   input.change(function () {
  //     var val = input.val();
  //     if (parse) {
  //       val = parse(val);
  //       input.val(val);
  //     }
  //     set_prop(stadium, p, val);
  //   });

  //   field_setters.push(function () {
  //     if (input.closest('body').length === 0)
  //       return false;
  //     var val = get_prop(stadium, p);
  //     if (unparse)
  //       val = unparse(val);
  //     input.val(val);

  //     return true;
  //   });
  // }

  // function set_prop(object, path, val) {
  //   var list = path.split('.');
  //   while (list.length > 1) {
  //     var step = list.shift();
  //     var next = object[step];
  //     if (next == undefined) {
  //       next = {};
  //       object[step] = next;
  //     }
  //     object = next;
  //   }
  //   object[list.shift()] = val;
  // }

  // function get_prop(object, path) {
  //   var list = path.split('.');
  //   while (list.length) {
  //     if (object == undefined)
  //       return undefined;
  //     object = object[list.shift()];
  //   }
  //   return object;
  // }


  // function parseColor(str) {
  //   if (!str.match('^[A-Fa-f0-9]{6}$'))
  //     return '';
  //   return str;
  // }

  // function parseCameraFollow(str) {
  //   if (str.match('ball') || str.match('player')) return str;
  //   else return '';
  // }

  // function parseDetectedCommand(str) {
  //   if (str.match('true')) return "true";
  //   else return "false";
  // }

  // function parseKickOff(str) {
  //   if (str.match('full')) return str;
  //   else return 'partial';
  // }

  // function parseTab(str) {
  //   var pstryk1 = str.split(",");
  //   var pstryk2 = [];
  //   pstryk2[0] = Number(pstryk1[0]);
  //   pstryk2[1] = Number(pstryk1[1]);
  //   return pstryk2;
  // }

  // function parseMaskList(str) {
  //   var list = str.split(',');
  //   var out = [];
  //   $.each(list, function (i, w) {
  //     if ($.inArray(w, ['ball', 'red', 'blue', 'wall', 'redKO', 'blueKO', 'all', 'kick', 'score', 'c0', 'c1', 'c2', 'c3']) != -1) {
  //       out.push(w);
  //     }
  //   });
  //   return out;
  // }


  // connect_field($('#input_name'), 'name');
  // connect_field($('#prop_spawnDistance'), 'spawnDistance', parseFloat);
  // connect_field($('#prop_width'), 'width', parseFloat);
  // connect_field($('#prop_height'), 'height', parseFloat);
  // connect_field($('#prop_maxViewWidth'), 'maxViewWidth', parseFloat);
  // connect_field($('#prop_cameraWidth'), 'cameraWidth', parseFloat);
  // connect_field($('#prop_cameraHeight'), 'cameraHeight', parseFloat);
  // connect_field($('#prop_cameraFollow'), 'cameraFollow', parseCameraFollow);
  // connect_field($('#prop_canBeStored'), 'canBeStored', parseDetectedCommand);
  // connect_field($('#prop_kickOffReset'), 'kickOffReset', parseKickOff);
  // connect_field($('#prop_bg_type'), 'bg.type');
  // connect_field($('#prop_bg_height'), 'bg.height', parseFloat);
  // connect_field($('#prop_bg_width'), 'bg.width', parseFloat);
  // connect_field($('#prop_bg_cornerRadius'), 'bg.cornerRadius', parseFloat);
  // connect_field($('#prop_bg_kickOffRadius'), 'bg.kickOffRadius', parseFloat);
  // connect_field($('#prop_bg_color'), 'bg.color', parseColor);
  // connect_field($('#prop_pp_radius'), 'playerPhysics.radius', parseFloat);
  // connect_field($('#prop_pp_bCoef'), 'playerPhysics.bCoef', parseFloat);
  // connect_field($('#prop_pp_invMass'), 'playerPhysics.invMass', parseFloat);
  // connect_field($('#prop_pp_damping'), 'playerPhysics.damping', parseFloat);
  // connect_field($('#prop_pp_acceleration'), 'playerPhysics.acceleration', parseFloat);
  // connect_field($('#prop_pp_gravity'), 'playerPhysics.gravity', parseTab);
  // connect_field($('#prop_pp_kickingAcceleration'), 'playerPhysics.kickingAcceleration', parseFloat);
  // connect_field($('#prop_pp_kickingDamping'), 'playerPhysics.kickingDamping', parseFloat);
  // connect_field($('#prop_pp_kickStrength'), 'playerPhysics.kickStrength', parseFloat);
  // connect_field($('#prop_pp_kickback'), 'playerPhysics.kickback', parseFloat);
  // connect_field($('#prop_bp_radius'), 'ballPhysics.radius', parseFloat);
  // connect_field($('#prop_bp_bCoef'), 'ballPhysics.bCoef', parseFloat);
  // connect_field($('#prop_bp_invMass'), 'ballPhysics.invMass', parseFloat);
  // connect_field($('#prop_bp_damping'), 'ballPhysics.damping', parseFloat);
  // connect_field($('#prop_bp_gravity'), 'ballPhysics.gravity', parseTab);
  // connect_field($('#prop_bp_color'), 'ballPhysics.color', parseColor);
  // connect_field($('#prop_bp_cMask'), 'ballPhysics.cMask', parseMaskList);
  // connect_field($('#prop_bp_cGroup'), 'ballPhysics.cGroup', parseMaskList);

  useEffect(() => {
    setStadiumProperties(props.stadium);
    // console.log('czy aby na pewno jeszcze raz');
  }, [props.stadium]);

  if (props.mainMode !== 'propertiesTab') return null;

  var stadiumBackup = { ...props.stadium };
  var stadiumF = { ...props.stadium };
  // var stadiumF = props.stadium;

  function parseValue(target) {
    if (target.id.endsWith('gravity')) {
      var a = target.value.split(',')
      if (a.length == 2) {
        if (!isNaN(a[0]) && !isNaN(a[1])) return [Number(a[0], Number(a[1]))];
      }
      return false;
    } else if (target.id.endsWith('cGroup') || target.id.endsWith('cMask')) {
      var a = target.value.split(',');
      for (let x of a) {
        if (!['ball', 'red', 'blue', 'wall', 'redKO', 'blueKO', 'all', 'kick', 'score', 'c0', 'c1', 'c2', 'c3'].includes(x)) return false;
      }
      return a;
    } else if (target.id.endsWith('color')) {
      if (!target.value.match('^[A-Fa-f0-9]{6}$')) return false;
      return target.value;
    } else {
      if (isNaN(target.value)) return false;
      else return Number(target.value);
    }
  }

  function handlePropertiesChange(e) {
    // console.log(e)
    var prop = e.target.id.substring(5);
    var secondProp = false;
    if (prop.startsWith('bg')) {
      secondProp = prop.substring(3);
      prop = 'bg';
    } else if (prop.startsWith('bp')) {
      secondProp = prop.substring(3);
      prop = 'ballPhysics';
    } else if (prop.startsWith('pp')) {
      secondProp = prop.substring(3);
      prop = 'playerPhysics';
    }
    // console.log(prop, secondProp, parseValue(e.target));
    if (e.target.type == 'text') {
      if (parseValue(e.target)) {
        e.target.classList.remove('error');
      } else {
        e.target.classList.add('error');
      }
    }

    // stadiumF[prop] = e.target.value;
    // console.log(stadiumF)
    if (secondProp) {
      setStadiumProperties(prevState => {
        return { ...prevState, [prop]: { ...prevState[prop], [secondProp]: e.target.value } }
      });
    } else {
      setStadiumProperties(prevState => {
        return { ...prevState, [prop]: e.target.value }
      });
    }
  }

  function handleBlur(e) {
    var prop = e.target.id.substring(5);
    var secondProp = false;
    var v = parseValue(e.target);
    if (prop.startsWith('bg')) {
      secondProp = prop.substring(3);
      prop = 'bg';
    } else if (prop.startsWith('bp')) {
      secondProp = prop.substring(3);
      prop = 'ballPhysics';
    } else if (prop.startsWith('pp')) {
      secondProp = prop.substring(3);
      prop = 'playerPhysics';
    }
    if (!v) {
      e.target.classList.remove('error');
      setStadiumProperties(stadiumF);
    } else {
      if (secondProp) {
        stadiumF[prop] = { ...stadiumF[prop], [secondProp]: v }
      } else {
        stadiumF[prop] = v;
      }
      props.setStadium(stadiumF);
      e.target.classList.remove('error');
      if (secondProp) {
        setStadiumProperties(prevState => {
          return { ...prevState, [prop]: { ...prevState[prop], [secondProp]: v } }
        });
      } else {
        setStadiumProperties(prevState => {
          return { ...prevState, [prop]: v }
        });
      }
    }
  }

  function handleSelect(e) {
    var prop = e.target.id.substring(5);
    if (prop == "bg_type") {
      stadiumF.bg = { ...stadiumF.bg, ['type']: e.target.value }
      props.setStadium(stadiumF);
      setStadiumProperties(prevState => {
        return { ...prevState, bg: { ...prevState.bg, ['type']: e.target.value } }
      });
    } else {
      stadiumF[prop] = e.target.value;
      props.setStadium(stadiumF);
      setStadiumProperties(stadiumF);
    }
  }

  return (
    <table id="table" cellSpacing="7px" style={{ height: '95vh' }}>
      <tbody>
        <tr>
          <td colSpan="2" id="topbox" valign="top">
            <table style={{ width: '100%', height: '100%' }}>
              <tbody>
                <CreatorHeader
                  mainMode={props.mainMode}
                  setMainMode={props.setMainMode}
                  stadium={props.stadium}
                  setStadium={props.setStadium}
                  stadiumText={props.stadiumText}
                  setStadiumText={props.setStadiumText}
                  updateStadium={props.updateStadium}
                  setUpdateStadium={props.setUpdateStadium}
                />
                <div id="stadium_properties" >
                  <div className="prop_group">
                    <div className="prop_group_title">General</div>
                    <label className="prop" style={{ width: 90 }}>Spawn Distance:</label>
                    <input className="prop" type="text" id="prop_spawnDistance" value={stadiumProperties.spawnDistance} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 90 }}>Width:</label>
                    <input className="prop" type="text" id="prop_width" value={stadiumProperties.width} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 90 }}>Height:</label>
                    <input className="prop" type="text" id="prop_height" value={stadiumProperties.height} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 90 }}>Camera Width:</label>
                    <input className="prop" type="text" id="prop_cameraWidth" value={stadiumProperties.cameraWidth} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 90 }}>Camera Height:</label>
                    <input className="prop" type="text" id="prop_cameraHeight" value={stadiumProperties.cameraHeight} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 90 }}>maxViewWidth:</label>
                    <input className="prop" type="text" id="prop_maxViewWidth" value={stadiumProperties.maxViewWidth} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 90 }}>canBeStored:</label>
                    <select className="prop" style={{ width: 104 }} id="prop_canBeStored" onChange={handleSelect} value={stadiumProperties.canBeStored}>
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
                    <label className="prop" style={{ width: 90 }}>Camera Follow:</label>
                    <select className="prop" style={{ width: 104 }} id="prop_cameraFollow" onChange={handleSelect} value={stadiumProperties.cameraFollow}>
                      <option value="ball">Ball</option>
                      <option value="player">Player</option>
                    </select>
                    <label className="prop" style={{ width: 90 }}>kickOffReset:</label>
                    <select className="prop" style={{ width: 104 }} id="prop_kickOffReset" onChange={handleSelect} value={stadiumProperties.kickOffReset} >
                      <option value="partial">Partial</option>
                      <option value="full">Full</option>
                    </select>
                  </div>
                  <div className="prop_group">
                    <div className="prop_group_title">Background</div>
                    <label className="prop" style={{ width: 78 }}>Type:</label>
                    <select className="prop" id="prop_bg_type" value={stadiumProperties.bg.type} onChange={handleSelect}>
                      <option value="none">none</option>
                      <option value="grass">grass</option>
                      <option value="hockey">hockey</option>
                    </select>
                    <label className="prop" style={{ width: 78 }}>Height:</label>
                    <input className="prop" type="text" id="prop_bg_height" value={stadiumProperties.bg.height} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 78 }}>Width:</label>
                    <input className="prop" type="text" id="prop_bg_width" value={stadiumProperties.bg.width} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 78 }}>cornerRadius:</label>
                    <input className="prop" type="text" id="prop_bg_cornerRadius" value={stadiumProperties.bg.cornerRadius} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 78 }}>kickOffRadius:</label>
                    <input className="prop" type="text" id="prop_bg_kickOffRadius" value={stadiumProperties.bg.kickOffRadius} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 78 }}>Color:</label>
                    <input className="prop" type="text" id="prop_bg_color" value={stadiumProperties.bg.color} onChange={handlePropertiesChange} onBlur={handleBlur} />
                  </div>
                  <div className="prop_group">
                    <div className="prop_group_title">Player Physics</div>
                    <label className="prop" style={{ width: 75 }}>Gravity</label>
                    <input className="prop" type="text" id="prop_pp_gravity" value={stadiumProperties.playerPhysics.gravity} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 75 }}>Radius</label>
                    <input className="prop" type="text" id="prop_pp_radius" value={stadiumProperties.playerPhysics.radius} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 75 }}>bCoef</label>
                    <input className="prop" type="text" id="prop_pp_bCoef" value={stadiumProperties.playerPhysics.bCoef} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 75 }}>InvMass</label>
                    <input className="prop" type="text" id="prop_pp_invMass" value={stadiumProperties.playerPhysics.invMass} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 75 }}>Damping</label>
                    <input className="prop" type="text" id="prop_pp_damping" value={stadiumProperties.playerPhysics.damping} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 75 }}>CGroup</label>
                    <input className="prop" type="text" id="prop_pp_cGroup" value={stadiumProperties.playerPhysics.cGroup} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 75 }}>Acceleration</label>
                    <input className="prop" type="text" id="prop_pp_acceleration" value={stadiumProperties.playerPhysics.acceleration} onChange={handlePropertiesChange} onBlur={handleBlur} />
                  </div>
                  <div className="prop_group">
                    <div className="prop_group_title">Player Physics (Kick)</div>
                    <label className="prop" style={{ width: 75 }}>kickingAcceleration</label>
                    <input className="prop" type="text" id="prop_pp_kickingAcceleration" value={stadiumProperties.playerPhysics.kickingAcceleration} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 75 }}>kickingDamping</label>
                    <input className="prop" type="text" id="prop_pp_kickingDamping" value={stadiumProperties.playerPhysics.kickingDamping} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 75 }}>kickStrength</label>
                    <input className="prop" type="text" id="prop_pp_kickStrength" value={stadiumProperties.playerPhysics.kickStrength} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 75 }}>kickback</label>
                    <input className="prop" type="text" id="prop_pp_kickback" value={stadiumProperties.playerPhysics.kickback} onChange={handlePropertiesChange} onBlur={handleBlur} />
                  </div>
                  <div className="prop_group">
                    <div className="prop_group_title">Ball Physics</div>
                    <label className="prop" style={{ width: 75 }}>Gravity</label>
                    <input className="prop" type="text" id="prop_bp_gravity" value={stadiumProperties.ballPhysics.gravity} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 75 }}>Radius</label>
                    <input className="prop" type="text" id="prop_bp_radius" value={stadiumProperties.ballPhysics.radius} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 75 }}>bCoef</label>
                    <input className="prop" type="text" id="prop_bp_bCoef" value={stadiumProperties.ballPhysics.bCoef} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 75 }}>invMass</label>
                    <input className="prop" type="text" id="prop_bp_invMass" value={stadiumProperties.ballPhysics.invMass} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 75 }}>Damping</label>
                    <input className="prop" type="text" id="prop_bp_damping" value={stadiumProperties.ballPhysics.damping} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 75 }}>Color</label>
                    <input className="prop" type="text" id="prop_bp_color" value={stadiumProperties.ballPhysics.color} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 75 }}>cMask</label>
                    <input className="prop" type="text" id="prop_bp_cMask" value={stadiumProperties.ballPhysics.cMask} onChange={handlePropertiesChange} onBlur={handleBlur} />
                    <label className="prop" style={{ width: 75 }}>cGroup</label>
                    <input className="prop" type="text" id="prop_bp_cGroup" value={stadiumProperties.ballPhysics.cGroup} onChange={handlePropertiesChange} onBlur={handleBlur} />
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