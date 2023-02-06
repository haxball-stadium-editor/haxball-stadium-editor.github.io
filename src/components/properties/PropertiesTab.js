import { useEffect, useState } from "react";
import CreatorHeader from "../CreatorHeader";
import $ from 'jquery';
import { useSelector, useDispatch } from "react-redux";
import { editStadium } from "../../reducers/stadiumSlice";
import Properties from "./Properties";

function PropertiesTab() {

  const stadium = useSelector((state) => state.stadium.value);
  const mainMode = useSelector((state) => state.mainMode.value);
  const dispatch = useDispatch();

  var stadiumF = JSON.parse(JSON.stringify(stadium));
  stadiumF = checkStadium(stadiumF);

  const [stadiumProperties, setStadiumProperties] = useState(stadiumF);

  useEffect(() => {
    if (mainMode === 'propertiesTab') $("#table").fadeTo(300, 1);
  }, [mainMode])

  function parseValue(target) {
    if (target.id.endsWith('gravity')) {
      var a = target.value.split(',')
      if (a.length === 2) {
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

  function checkStadium(stadiumF) {
    var defaultStadium = {
      name: "New Stadium",
      width: 420,
      height: 200,
      cameraWidth: 0,
      cameraHeight: 0,
      maxViewWidth: 0,
      cameraFollow: "ball",
      spawnDistance: 170,
      redSpawnPoints: [],
      blueSpawnPoints: [],
      canBeStored: true,
      kickOffReset: "partial",
      bg: { "color": "718C5A" },
      traits: {
        "ballArea": { "vis": false, "bCoef": 1, "cMask": ["ball"] },
        "goalPost": { "radius": 8, "invMass": 0, "bCoef": 0.5 },
        "goalNet": { "vis": true, "bCoef": 0.1, "cMask": ["ball"] },
        "kickOffBarrier": { "vis": false, "bCoef": 0.1, "cGroup": ["redKO", "blueKO"], "cMask": ["red", "blue"] }
      },
      vertexes: [],
      segments: [],
      goals: [],
      discs: [],
      planes: [],
      joints: [],

      "playerPhysics": {
        "radius": 15,
        "bCoef": 0.5,
        "invMass": 0.5,
        "damping": 0.96,
        "cGroup": ["red", "blue"],
        "acceleration": 0.1,
        "gravity": [0, 0],
        "kickingAcceleration": 0.07,
        "kickingDamping": 0.96,
        "kickStrength": 5,
        "kickback": 0,

      },

      "ballPhysics": {
        "radius": 10,
        "bCoef": 0.5,
        "cMask": ["all"
        ],
        "damping": 0.99,
        "invMass": 1,
        "gravity": [0, 0],
        "color": "ffffff",
        "cGroup": ["ball"]
      }
    }
    var keys = Object.keys(defaultStadium);
    for (let key of keys) {
      if (stadiumF[key] === undefined) stadiumF[key] = defaultStadium[key];
    }
    keys = Object.keys(defaultStadium.playerPhysics);
    for (let key of keys) {
      if (stadiumF.playerPhysics[key] === undefined) stadiumF.playerPhysics[key] = defaultStadium.playerPhysics[key];
    }
    keys = Object.keys(defaultStadium.ballPhysics);
    for (let key of keys) {
      if (stadiumF.ballPhysics[key] === undefined) stadiumF.ballPhysics[key] = defaultStadium.ballPhysics[key];
    }
    return stadiumF;
  }

  function handlePropertiesChange(e) {
    if (e.target.id.startsWith('trait')) {
      var prop = e.target.id.substring(6);
    } else {
      var prop = e.target.id.substring(5);
    }
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
    if (e.target.type === 'text') {
      if (parseValue(e.target)) {
        e.target.classList.remove('error');
      } else {
        e.target.classList.add('error');
      }
    }

    if (secondProp) {
      setStadiumProperties(prevState => {
        return { ...prevState, [prop]: { ...prevState[prop], [secondProp]: e.target.value } }
      });
    } else if (!e.target.id.startsWith('trait')) {
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

  function handleTraitBlur(e) {
    // var prop = e.target.id.substring(6);
    // var v = parseValue(e.target);
    // if (!v) {
    //   e.target.classList.remove('error');
    // } else {
    // }
  }

  function handleSelect(e) {
    var prop = e.target.id.substring(5);
    if (prop === "bg_type") {
      stadiumF.bg = { ...stadiumF.bg, type: e.target.value }
      if (stadiumF.bg.type === 'grass') stadiumF.bg.color = '718C5A'
      else if (stadiumF.bg.type === 'hockey') stadiumF.bg.color = '555555'
      setStadiumProperties(prevState => {
        return { ...prevState, bg: { ...prevState.bg, type: e.target.value } }
      });
    } else {
      stadiumF[prop] = e.target.value;
      setStadiumProperties(stadiumF);
    }
  }

  function addNewTrait() {
    var zet = {};
    zet.vis = document.getElementById('trait_vis').value;
    if (zet.vis === "true") zet.vis = true;
    else zet.vis = false;
    if (document.getElementById('trait_bCoef').value !== "") zet.bCoef = Number(document.getElementById('trait_bCoef').value);
    if (document.getElementById('trait_radius').value !== "") zet.radius = Number(document.getElementById('trait_radius').value);
    if (document.getElementById('trait_invMass').value !== "") zet.invMass = Number(document.getElementById('trait_invMass').value);
    var zetName = "newTrait";
    if (document.getElementById('trait_name').value !== "") zetName = document.getElementById('trait_name').value;
    if (document.getElementById('trait_gravity').value !== "") {
      var pstryk = (document.getElementById('trait_gravity').value).split(",");
      zet.gravity = []
      zet.gravity[0] = Number(pstryk[0]);
      zet.gravity[1] = Number(pstryk[1]);
    }
    if (document.getElementById('trait_damping').value !== "") zet.damping = parseValue({ target: { id: 'damping' }, value: document.getElementById('trait_damping').value });
    if (document.getElementById('trait_cMask').value !== "") zet.cMask = parseValue({ target: { id: 'cMask' }, value: document.getElementById('trait_cMask').value });
    if (document.getElementById('trait_cGroup').value !== "") zet.cGroup = parseValue({ target: { id: 'cGroup' }, value: document.getElementById('trait_cGroup').value });
    if (document.getElementById('trait_acceleration').value !== "") zet.acceleration = Number(document.getElementById('trait_acceleration').value);
    if (document.getElementById('trait_color').value !== "") zet.color = document.getElementById('trait_color').value;
    stadiumF.traits[zetName] = zet;

    document.getElementById('trait_bCoef').value = "";
    document.getElementById('trait_radius').value = "";
    document.getElementById('trait_name').value = "";
    document.getElementById('trait_invMass').value = "";
    document.getElementById('trait_gravity').value = "";
    document.getElementById('trait_damping').value = "";
    document.getElementById('trait_cMask').value = "";
    document.getElementById('trait_cGroup').value = "";
    document.getElementById('trait_acceleration').value = "";
    document.getElementById('trait_color').value = "";

    document.getElementById("button_newTrait").innerHTML = "Trait Added!";
    setTimeout(function () {
      document.getElementById("button_newTrait").innerHTML = "Add New Trait";
    }, 1200);
  }

  function updateStadium() {
    dispatch(editStadium(stadiumProperties))
  }

  return (
    <table id="table" cellSpacing="7px" style={{ height: '64vh', opacity: 0.01, overflow: "scroll" }}>
      <tbody>
        <tr>
          <td colSpan="2" id="topbox" valign="top" style={{ height: '64vh', overflow: "scroll" }}>
            <table >
              <tbody>
                <CreatorHeader updateStadium={updateStadium} />
                <tr><td>
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
                      <Properties
                        type='text' width='78' ids='prop_bg_' valuesFrom={stadiumProperties.bg} onChange={handlePropertiesChange} onBlur={handleBlur}
                        names={['height', 'width', 'cornerRadius', 'kickOffRadius', 'color']} />
                    </div>
                    <div className="prop_group">
                      <div className="prop_group_title">Player Physics</div>
                      <Properties
                        type='text' width='75' ids='prop_pp_' valuesFrom={stadiumProperties.playerPhysics} onChange={handlePropertiesChange} onBlur={handleBlur}
                        names={['gravity', 'radius', 'bCoef', 'invMass', 'damping', 'cGroup', 'acceleration']} />
                    </div>
                    <div className="prop_group">
                      <div className="prop_group_title">Player Physics (Kick)</div>
                      <Properties
                        type='text' width='95' ids='prop_pp_' valuesFrom={stadiumProperties.playerPhysics} onChange={handlePropertiesChange} onBlur={handleBlur}
                        names={['kickingAcceleration', 'kickingDamping', 'kickStrength', 'kickback']} />
                    </div>
                    <div className="prop_group">
                      <div className="prop_group_title">Ball Physics</div>
                      <Properties
                        type='text' width='75' ids='prop_bp_' valuesFrom={stadiumProperties.ballPhysics} onChange={handlePropertiesChange} onBlur={handleBlur}
                        names={['gravity', 'radius', 'bCoef', 'invMass', 'damping', 'color', 'cMask', 'cGroup']} />
                    </div>
                    <div className="prop_group">
                      <div className="prop_group_title">Color Codes</div>
                      <button>
                        <a href="https://www.color-hex.com/" target="_blank" rel='noreferrer' style={{ color: "#fff" }}>Custom Colors</a>
                      </button>
                      <label className="prop" style={{ width: 75 }}>Color 1: </label>
                      <input className="prop" type="color" name="color1" defaultValue="#718C5A" />
                      <label className="prop" style={{ width: 75 }}>Color 2: </label>
                      <input className="prop" type="color" name="color2" defaultValue="#555555" />
                      <label className="prop" style={{ width: 75 }}>Color 3: </label>
                      <input className="prop" type="color" name="color3" defaultValue="#1A2125" />
                      <label className="prop" style={{ width: 75 }}>Color 4: </label>
                      <input className="prop" type="color" name="color4" defaultValue="#2E343C" />
                      <label className="prop" style={{ width: 75 }}>Color 5: </label>
                      <input className="prop" type="color" name="color5" defaultValue="#8ED2AB" />
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
                      <input className="prop" type="text" id="trait_bCoef" onChange={handlePropertiesChange} onBlur={handleTraitBlur} />
                      <label className="prop" style={{ width: 75 }}>radius</label>
                      <input className="prop" type="text" id="trait_radius" onChange={handlePropertiesChange} onBlur={handleTraitBlur} />
                      <label className="prop" style={{ width: 75 }}>invMass</label>
                      <input className="prop" type="text" id="trait_invMass" onChange={handlePropertiesChange} onBlur={handleTraitBlur} />
                      <label className="prop" style={{ width: 75 }}>gravity</label>
                      <input className="prop" type="text" id="trait_gravity" onChange={handlePropertiesChange} onBlur={handleTraitBlur} />
                      <label className="prop" style={{ width: 75 }}>damping</label>
                      <input className="prop" type="text" id="trait_damping" onChange={handlePropertiesChange} onBlur={handleTraitBlur} />
                      <label className="prop" style={{ width: 75 }}>cMask</label>
                      <input className="prop" type="text" id="trait_cMask" onChange={handlePropertiesChange} onBlur={handleTraitBlur} />
                      <label className="prop" style={{ width: 75 }}>cGroup</label>
                      <input className="prop" type="text" id="trait_cGroup" onChange={handlePropertiesChange} onBlur={handleTraitBlur} />
                      <label className="prop" style={{ width: 75 }}>acceleration</label>
                      <input className="prop" type="text" id="trait_acceleration" onChange={handlePropertiesChange} onBlur={handleTraitBlur} />
                      <label className="prop" style={{ width: 75 }}>color</label>
                      <input className="prop" type="text" id="trait_color" onChange={handlePropertiesChange} onBlur={handleTraitBlur} />
                      <button id="button_newTrait" onClick={addNewTrait}>Add new trait</button>
                    </div>
                  </div>
                </td></tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  )
};

export default PropertiesTab;