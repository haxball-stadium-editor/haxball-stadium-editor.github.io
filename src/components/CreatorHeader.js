import logoTextMode from '../HBSE_files/top-tools/top-tools_text.png';
import logoProperties from '../HBSE_files/top-tools/top-tools_pr.png';
import logoHelp from "../HBSE_files/top-tools/top-tools_help.png";
import $ from 'jquery'

var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
var meta = {
  '\b': '\\b',
  '\t': '\\t',
  '\n': '\\n',
  '\f': '\\f',
  '\r': '\\r',
  '"': '\\"',
  '\\': '\\\\'
};

function quote(string) {
  escapable.lastIndex = 0;
  return escapable.test(string) ? '"' +
    string.replace(escapable, function (a) {
      var c = meta[a];
      return typeof c === 'string' ? c
        : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + string + '"';
}

function indent(l, b) {
  return l === 0 ? "\n" : l == 1 ? "\n\n\t" : l == 2 && !b ? "\n\t\t" : l == 3 || b ? " " : "";
}

var type_properties = {
  vertexes: ['x', 'y', 'bCoef', 'cMask', 'cGroup', 'trait'],
  segments: ['v0', 'v1', 'curve', 'vis', 'color', 'bCoef', 'cMask', 'cGroup', 'trait', 'bias'],
  planes: ['normal', 'dist', 'bCoef', 'cMask', 'cGroup', 'trait'],
  discs: ['radius', 'invMass', 'pos', 'color', 'bCoef', 'cMask', 'cGroup', 'trait', 'damping', 'speed', 'gravity'],
  goals: ['p0', 'p1', 'team'],
  joints: ['d0', 'd1', '_length', 'strength', 'color']
};

function order_keys(parent, keys) {
  var order = type_properties[parent];
  if (!order) {
    return keys
  }
  var okeys = [];
  $.each(order, function (i, k) {
    if ($.inArray(k, keys) != -1) {
      okeys.push(k);
    }
  });
  $.each(keys, function (i, k) {
    if ($.inArray(k, order) == -1) {
      okeys.push(k);
    }
  });
  return okeys;
}

function pprint(j, l, tag, parent) {
  if (!l) l = 0;
  if (parent == "length" && j == null) return j;
  if (parent == "canBeStored") {
    if (j == "true" || j == true) return true;
    else return false;
  }
  if (j.substr) {
    return quote(j);
  } else if (typeof j == 'number') {
    return j.toString();
  } else if (typeof j == 'boolean') {
    return j.toString();
  } else if (j instanceof Array) {
    l++;
    var trait = j[0] ? j[0].trait : "";
    var ret = "[" + indent(l);
    var first = true;

    $.each(j, function (i, x) {
      var d = "";
      if (x.trait != trait) {
        d = indent(l);
        trait = x.trait;
      }
      ret += (first ? "" : "," + d + indent(l)) + (tag ? "/* " + i + " */ " : "") + pprint(x, l, false, parent);
      first = false;
    });

    return ret + indent(l - 1) + "]";
  } else {
    l++;
    var ret = "{" + indent(l);
    var first = true;

    var keys = order_keys(parent, Object.keys(j));

    $.each(keys, function (i, k) {
      var v = j[k];
      if (v !== undefined && k != '_data') {
        var i = k == 'bg' ? 2 : l;
        ret += (first ? "" : "," + indent(l)) + quote(k) + " : " + pprint(v, i, k == 'vertexes' && i < 10, k);
        first = false;
      }
    });

    return ret + indent(l - 1, true) + "}";
  }
  return "JSON ERROR";
}

function CreatorHeader(props) {

  function handleClick(e) {
    props.setStadium(props.stadium);
    if (e.target.id === 'button_import' || e.target.parentElement.id === 'button_import') {
      props.setMainMode('textMode');
      props.setStadiumText(pprint(props.stadium));
    } else if (e.target.id === 'button_properties' || e.target.parentElement.id === 'button_properties') {
      if (props.mainMode === 'propertiesTab') {
        props.setMainMode('stadiumCreator');
        props.setUpdateStadium(true);
      } else {
        props.setMainMode('propertiesTab');
      }
    } else if (e.target.id === 'button_help' || e.target.parentElement.id === 'button_help') {
      props.setMainMode('helpTab');
    }
  }

  function handleChange(e) {
    props.setStadium(prevState => {
      return { ...prevState, name: e.target.value }
    });
  }

  return (
    <tr>
      <td>
        <table className="underline" style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ width: "100%" }} id="right_tabs">
                <input id="input_name" value={props.stadium ? props.stadium.name : ''} onChange={handleChange} autocomplete="off" />
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
                  {props.mainMode == 'propertiesTab' ? 'Creator' : 'Properties'}
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