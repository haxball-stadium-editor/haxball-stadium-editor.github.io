<<<<<<< HEAD
import $ from 'jquery';

function tracef(name, f) {
    return function () {
        var ret = f.apply(this, arguments);
        console.log(name, arguments, ret);
        return ret;
    };
}

//===== Config Variables
// extra border around the stadium inside the canvas
var margin = 0;

// minimum distance before a click becomes a drag
var minimum_drag_distance = 4;

// maximum distance from which an object can be clicked
var maximum_click_distance = 5;

// distance from which to snap to nearby objects
var snap_distance = 5;

// number of undo savepoints to keep
var undo_levels = 500;

// colors of objects that invisible in haxball
var colors = {
    selected: 'rgba(256,256,0,0.8)',
    vertex: 'rgba(256,0,256,1)',
    invisible_thick: 'rgba(255,255,255,0.8)',
    invisible_thin: 'rgba(0,0,0,0.8)',
    plane_thick: 'rgba(0,0,0,0.8)',
    plane_thin: 'rgba(255,255,255,0.8)',
    red: {
        thick: 'rgba(255,127,127,1)',
        thin: 'rgba(255,0,0,0.8)'
    },
    blue: {
        thick: 'rgba(127,127,255,1)',
        thin: 'rgba(0,0,255,0.8)'
    }
};


//===== Haxball Values

// values harcoded in haxball
var haxball = {
    hockey: {
        bg_color: 'rgb(85, 85, 85)',
        border_color: 'rgb(233,204,110)'
    },
    grass: {
        bg_color: 'rgb(113,140,90)',
        border_color: 'rgb(199,230,189)'
    },
    segment_color: 'rgb(0,0,0)',
    disc_color: 'rgb(255,255,255)',
    default_disc_radius: 10,
    default_player_radius: 15
};

var properties = (function (p) {
    return {
        bCoef: p(false, 'number'),
        gravity: p(false, 'point'),
        speed: p(false, 'point'),
        cMask: p(false, 'layers'),
        cGroup: p(false, 'layers'),
        trait: p(false, 'trait'),
        x: p(true, 'number', true),
        y: p(true, 'number', true),
        v0: p(true, 'ref', true),
        v1: p(true, 'ref', true),
        curve: p(true, 'number'),
        curveF: p(true, 'number'),
        bias: p(false, 'number'),
        vis: p(false, 'bool'),
        color: p(false, 'color'),
        normal: p(true, 'point', true),
        dist: p(true, 'number', true),
        radius: p(false, 'number'),
        invMass: p(false, 'number'),
        pos: p(true, 'point'),
        p0: p(true, 'point', true),
        p1: p(true, 'point', true),
        team: p(true, 'team'),
        damping: p(true, 'number'),
        d0: p(true, 'number'),
        d1: p(true, 'number'),
        _length: p(true, 'number'),
        strength: p(true, 'number')
    };
})(function (required, type, nodefault) {
    return { required: required, type: type, def: !nodefault };
});

var type_properties = {
    vertexes: ['x', 'y', 'bCoef', 'cMask', 'cGroup', 'trait'],
    segments: ['v0', 'v1', 'curve', 'vis', 'color', 'bCoef', 'cMask', 'cGroup', 'trait', 'bias'],
    planes: ['normal', 'dist', 'bCoef', 'cMask', 'cGroup', 'trait'],
    discs: ['radius', 'invMass', 'pos', 'color', 'bCoef', 'cMask', 'cGroup', 'trait', 'damping', 'speed', 'gravity'],
    goals: ['p0', 'p1', 'team'],
    joints: ['d0', 'd1', '_length', 'strength', 'color']
};

var defaults = {
    discs: {
        radius: 10
    },
    players: {
        radius: 15
    }
};

// Maximums
var maximum_curve = 340;



//==== Program State

// the stadium json (with additional _data fields)
var stadium = {};

// user info when logged in
var user_info = false;

// session id
var session_id = 0;

// the canvas html element
var canvas;

// the currently active tool
var current_tool;

// the position from which to drag
var drag_start_pos;

// savepoints for undo and redo
var undo_savepoints = [];
var redo_savepoints = [];

// Clipboard
var clipboard;

// center of rotation and scale
var transformation_center = [0, 0];

// is the mouse clicked?
var mouse_left_down = false;
var mouse_dragging = false;

// total number of fully selected objects
var total_selected_by_type;
var total_selected_by_prop;

// dynamic settings
var settings = {
    preview: false
};

// additional elements to render over the stadium (used for debugging)
var debug_render = [];

// Functions that populate input fields when a new stadium is loaded
var field_setters = [];

// can leave without prompt
var can_leave = true;

// Triggers

var triggers = {
    select: [],
    unselect: [],
    set_tool: [],
    reset_selection: []
};

// Property data
var property_data = {};

// cache of patterns
var bg_patterns = {};

// cached window width
var window_width = 800;

// cached canvas size info
var canvas_rect = [-150, -75, 150, 75];

// cached mouse position
var current_mouse_position = false;

// 거울 모드
var mirror_mode = false;
var mirror_directions = ['horizontal', 'vertical', 'across'];

// directions in which mirroring is disabled
var disabled_mirroring = {};

// 저장
var last_save_id = false;
var last_save_name = false;

// library
var library = {
    list: [],
    last: false,
    query: 'public',
    initialised: false
}

//===== Aliases


//==== Initialisation

$(function () {



    $(window).bind('beforeunload', function () {
        if (!can_leave)
            return "Please confirm closing Haxball Stadium Editor";
    });


    canvas = document.getElementById('canvas');

    if (!canvas.getContext) {
        alert('Unable to initialise canvas. Your browser may be too old.');
        return;
    }

});

    // $('#button_import').click(function () {
    //     console.log('click na text mode');
    //     for (var i = 0; i < stadium.joints.length; i++) {
    //         if (stadium.joints[i]._length) {
    //             stadium.joints[i].length = stadium.joints[i]._length;
    //         }
    //     }
    //     console.log(pprint(stadium))
    //     // $('#textarea_import').val(pprint(stadium));
    //     document.getElementById("textarea_import").value = pprint(stadium);
    //     show_box('import');
    //     czyTekst = true;
    // });















//     $('#button_import_goto').click(function () {
//         var pos = prompt('Character position:');
//         if (pos)
//             set_selection_range($('#textarea_import')[0], parseInt(pos, 10), parseInt(pos, 10) + 10);
//     });

//     $('#button_properties').click(function () {
//         toggle_properties();
//     });

//     $('#button_undo').click(function () {
//         undo();
//     });

//     $('#button_redo').click(function () {
//         redo();
//     });

//     $('#button_delete').click(function () {
//         if (delete_selected(stadium))
//             modified();
//     });

//     $('#button_select_all').click(function () {
//         select_all();
//     });


//     $('#button_select_none').click(function () {
//         select_all(function () { return false; });
//     });

//     $('#button_inverse_selection').click(function () {
//         select_all(function (shape) { return !selected(shape.object); });
//     });

//     $('#button_copy').click(function () {
//         copy();
//     });

//     $('#button_paste').click(function () {
//         paste();
//         modified();
//     });

//     $('#button_cut').click(function () {
//         cut();
//         modified();
//     });

//     $('#button_duplicate').click(function () {
//         duplicate();
//         modified();
//     });

//     $('#button_mirror_mode').click(function () {
//         mirror_mode = mirror_mode ? false : true;
//         if (mirror_mode) {
//             $('#button_mirror_mode').addClass('active');
//             reset_mirror_data(stadium);
//         } else {
//             $('#button_mirror_mode').removeClass('active');
//             clear_mirror_data(stadium);
//         }
//     });

//     $('#pref_preview').click(function () {
//         $('#pref_preview').toggleClass('active');
//         settings.preview = $('#pref_preview').hasClass('active');
//         queue_render();
//     });

//     $('#button_redSpawnPoint').click(function () {
//         var xxx = document.getElementById('prop_spawnPointX').value;
//         var yyy = document.getElementById('prop_spawnPointY').value;
//         document.getElementById("prop_spawnPointX").value = "";
//         document.getElementById("prop_spawnPointY").value = "";
//         console.log(xxx, yyy);
//         stadium.redSpawnPoints.push([Number(xxx), Number(yyy)]);
//     });

//     $('#button_blueSpawnPoint').click(function () {
//         var xxx = document.getElementById('prop_spawnPointX').value;
//         var yyy = document.getElementById('prop_spawnPointY').value;
//         document.getElementById("prop_spawnPointX").value = "";
//         document.getElementById("prop_spawnPointY").value = "";
//         console.log(xxx, yyy);
//         stadium.blueSpawnPoints.push([Number(xxx), Number(yyy)]);
//     });

//     $('#button_resetRed').click(function () {
//         stadium.redSpawnPoints = [];
//         //console.log(button_resetRed);
//         //console.log(document.getElementById("button_resetRed"));
//         document.getElementById("button_resetRed").innerHTML = "Spawnpoints resetted!";
//         setTimeout(function () {
//             document.getElementById("button_resetRed").innerHTML = "Reset Spawnpoints";
//         }, 1200);
//     });

//     $('#button_resetBlue').click(function () {
//         stadium.blueSpawnPoints = [];
//         document.getElementById("button_resetBlue").innerHTML = "Spawnpoints resetted!";
//         setTimeout(function () {
//             document.getElementById("button_resetBlue").innerHTML = "Reset Spawnpoints";
//         }, 1200);
//     });

//     $('#button_addJoint').click(function () {
//         if (total_selected_by_type.discs != 2) return;
//         document.getElementById("button_addJoint").innerHTML = "Joint added!";
//         setTimeout(function () {
//             document.getElementById("button_addJoint").innerHTML = "Add Joint";
//         }, 1200);
//         var joint = {}
//         for (var i = 0; i < stadium.discs.length; i++) {
//             if (stadium.discs[i]._selected) {
//                 if (joint.d0) joint.d1 = i + 1
//                 else joint.d0 = i + 1;
//             }
//         }
//         var le = document.getElementById("inputLength").value;
//         if (le = "null") joint.length = "null";
//         else {
//             var tap = le.split(",");
//             if (tap.length == 2) {
//                 joint.length = [];
//                 joint.length[0] = Number(tap[0]);
//                 joint.length[1] = Number(tap[1]);
//             } else joint.length = Number(le);
//         }
//         if (document.getElementById("inputStrength").value == "rigid") joint.strength = "rigid";
//         else joint.strength = Number(document.getElementById("inputStrength").value);
//         if (isNaN(joint.strength)) joint.strength = "rigid";
//         joint.color = document.getElementById("inputColor").value;
//         stadium.joints.push(joint);
//         queue_render();
//     });

//     $('#button_newTrait').click(function () {
//         var zet = {};
//         zet.vis = document.getElementById('trait_vis').value;
//         if (zet.vis == "true") zet.vis = true;
//         else zet.vis = false;
//         if (document.getElementById('trait_bCoef').value != "") zet.bCoef = Number(document.getElementById('trait_bCoef').value);
//         if (document.getElementById('trait_radius').value != "") zet.radius = Number(document.getElementById('trait_radius').value);
//         if (document.getElementById('trait_invMass').value != "") zet.invMass = Number(document.getElementById('trait_invMass').value);
//         var zetName = "newTrait";
//         if (document.getElementById('trait_name').value != "") zetName = document.getElementById('trait_name').value;
//         if (document.getElementById('trait_gravity').value != "") {
//             var pstryk = (document.getElementById('trait_gravity').value).split(",");
//             zet.gravity = []
//             zet.gravity[0] = Number(pstryk[0]);
//             zet.gravity[1] = Number(pstryk[1]);
//         }
//         if (document.getElementById('trait_damping').value != "") zet.damping = parseFloat(document.getElementById('trait_damping').value);
//         if (document.getElementById('trait_cMask').value != "") zet.cMask = parseMaskList(document.getElementById('trait_cMask').value);
//         if (document.getElementById('trait_cGroup').value != "") zet.cGroup = parseMaskList(document.getElementById('trait_cGroup').value);
//         if (document.getElementById('trait_acceleration').value != "") zet.acceleration = Number(document.getElementById('trait_acceleration').value);
//         if (document.getElementById('trait_color').value != "") zet.color = document.getElementById('trait_color').value;
//         //console.log(zet);

//         //console.log(stadium.traits);
//         Object.defineProperty(stadium.traits, zetName, { value: zet, enumerable: true });
//         /*console.log(stadium.traits);
//         trejts = stadium.traits;
//         console.log(trejts);*/

//         document.getElementById('trait_bCoef').value = "";
//         document.getElementById('trait_radius').value = "";
//         document.getElementById('trait_name').value = "";
//         document.getElementById('trait_invMass').value = "";
//         document.getElementById('trait_gravity').value = "";
//         document.getElementById('trait_damping').value = "";
//         document.getElementById('trait_cMask').value = "";
//         document.getElementById('trait_cGroup').value = "";
//         document.getElementById('trait_acceleration').value = "";
//         document.getElementById('trait_color').value = "";

//         document.getElementById("button_newTrait").innerHTML = "Trait Added!";
//         setTimeout(function () {
//             document.getElementById("button_newTrait").innerHTML = "Add New Trait";
//         }, 1200);
//     });

//     $('#button_zoom05').click(function () {
//         skala = 0.5;
//         resize_canvas();
//         render(stadium);
//     });

//     $('#button_zoom1').click(function () {
//         skala = 1;
//         resize_canvas();
//         render(stadium);
//     });

//     $('#button_zoom2').click(function () {
//         skala = 2;
//         resize_canvas();
//         render(stadium);
//     });

//     $('#button_zoom3').click(function () {
//         skala = 3;
//         resize_canvas();
//         render(stadium);
//     });

//     $('#button_powrot').click(function () {
//         document.getElementById("button_tab_advanced").click();
//     });


//     define_tab('properties');
//     define_tab('advanced');
//     define_tab('edit');
//     define_tab('joints');
//     define_tab('spawnpoints');

//     $(canvas).mousedown(handle_down);
//     $(canvas).mouseup(handle_up);
//     $(canvas).mousemove(handle_move);
//     $(document).bind('keydown', handle_key);

//     resize();
//     $(window).resize(resize);
// });

// function show_box(name) {
//     console.log('funkcja show_box');
//     $('#table').addClass('hidden');
//     $('#box' + name).removeClass('hidden').siblings().addClass('hidden');
//     $('#box').removeClass('hidden');
// }

// function hide_box(name) {
//     $('#box').addClass('hidden');
//     $('#table').removeClass('hidden');
//     resize();
// }


/*
     FILE ARCHIVED ON 14:27:57 Nov 29, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:50:58 Mar 23, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.
 
     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 100.014 (3)
  esindex: 0.009
  captures_list: 122.456
  CDXLines.iter: 12.751 (3)
  PetaboxLoader3.datanode: 86.918 (5)
  exclusion.robots: 0.211
  exclusion.robots.policy: 0.195
  RedisCDXSource: 5.789
  PetaboxLoader3.resolve: 43.367 (2)
  load_resource: 124.712
=======
import $ from 'jquery';

function tracef(name, f) {
    return function () {
        var ret = f.apply(this, arguments);
        console.log(name, arguments, ret);
        return ret;
    };
}

//===== Config Variables
// extra border around the stadium inside the canvas
var margin = 0;

// minimum distance before a click becomes a drag
var minimum_drag_distance = 4;

// maximum distance from which an object can be clicked
var maximum_click_distance = 5;

// distance from which to snap to nearby objects
var snap_distance = 5;

// number of undo savepoints to keep
var undo_levels = 500;

// colors of objects that invisible in haxball
var colors = {
    selected: 'rgba(256,256,0,0.8)',
    vertex: 'rgba(256,0,256,1)',
    invisible_thick: 'rgba(255,255,255,0.8)',
    invisible_thin: 'rgba(0,0,0,0.8)',
    plane_thick: 'rgba(0,0,0,0.8)',
    plane_thin: 'rgba(255,255,255,0.8)',
    red: {
        thick: 'rgba(255,127,127,1)',
        thin: 'rgba(255,0,0,0.8)'
    },
    blue: {
        thick: 'rgba(127,127,255,1)',
        thin: 'rgba(0,0,255,0.8)'
    }
};


//===== Haxball Values

// values harcoded in haxball
var haxball = {
    hockey: {
        bg_color: 'rgb(85, 85, 85)',
        border_color: 'rgb(233,204,110)'
    },
    grass: {
        bg_color: 'rgb(113,140,90)',
        border_color: 'rgb(199,230,189)'
    },
    segment_color: 'rgb(0,0,0)',
    disc_color: 'rgb(255,255,255)',
    default_disc_radius: 10,
    default_player_radius: 15
};

var properties = (function (p) {
    return {
        bCoef: p(false, 'number'),
        gravity: p(false, 'point'),
        speed: p(false, 'point'),
        cMask: p(false, 'layers'),
        cGroup: p(false, 'layers'),
        trait: p(false, 'trait'),
        x: p(true, 'number', true),
        y: p(true, 'number', true),
        v0: p(true, 'ref', true),
        v1: p(true, 'ref', true),
        curve: p(true, 'number'),
        curveF: p(true, 'number'),
        bias: p(false, 'number'),
        vis: p(false, 'bool'),
        color: p(false, 'color'),
        normal: p(true, 'point', true),
        dist: p(true, 'number', true),
        radius: p(false, 'number'),
        invMass: p(false, 'number'),
        pos: p(true, 'point'),
        p0: p(true, 'point', true),
        p1: p(true, 'point', true),
        team: p(true, 'team'),
        damping: p(true, 'number'),
        d0: p(true, 'number'),
        d1: p(true, 'number'),
        _length: p(true, 'number'),
        strength: p(true, 'number')
    };
})(function (required, type, nodefault) {
    return { required: required, type: type, def: !nodefault };
});

var type_properties = {
    vertexes: ['x', 'y', 'bCoef', 'cMask', 'cGroup', 'trait'],
    segments: ['v0', 'v1', 'curve', 'vis', 'color', 'bCoef', 'cMask', 'cGroup', 'trait', 'bias'],
    planes: ['normal', 'dist', 'bCoef', 'cMask', 'cGroup', 'trait'],
    discs: ['radius', 'invMass', 'pos', 'color', 'bCoef', 'cMask', 'cGroup', 'trait', 'damping', 'speed', 'gravity'],
    goals: ['p0', 'p1', 'team'],
    joints: ['d0', 'd1', '_length', 'strength', 'color']
};

var defaults = {
    discs: {
        radius: 10
    },
    players: {
        radius: 15
    }
};

// Maximums
var maximum_curve = 340;



//==== Program State

// the stadium json (with additional _data fields)
var stadium = {};

// user info when logged in
var user_info = false;

// session id
var session_id = 0;

// the canvas html element
var canvas;

// the currently active tool
var current_tool;

// the position from which to drag
var drag_start_pos;

// savepoints for undo and redo
var undo_savepoints = [];
var redo_savepoints = [];

// Clipboard
var clipboard;

// center of rotation and scale
var transformation_center = [0, 0];

// is the mouse clicked?
var mouse_left_down = false;
var mouse_dragging = false;

// total number of fully selected objects
var total_selected_by_type;
var total_selected_by_prop;

// dynamic settings
var settings = {
    preview: false
};

// additional elements to render over the stadium (used for debugging)
var debug_render = [];

// Functions that populate input fields when a new stadium is loaded
var field_setters = [];

// can leave without prompt
var can_leave = true;

// Triggers

var triggers = {
    select: [],
    unselect: [],
    set_tool: [],
    reset_selection: []
};

// Property data
var property_data = {};

// cache of patterns
var bg_patterns = {};

// cached window width
var window_width = 800;

// cached canvas size info
var canvas_rect = [-150, -75, 150, 75];

// cached mouse position
var current_mouse_position = false;

// 거울 모드
var mirror_mode = false;
var mirror_directions = ['horizontal', 'vertical', 'across'];

// directions in which mirroring is disabled
var disabled_mirroring = {};

// 저장
var last_save_id = false;
var last_save_name = false;

// library
var library = {
    list: [],
    last: false,
    query: 'public',
    initialised: false
}

//===== Aliases


//==== Initialisation

$(function () {



    $(window).bind('beforeunload', function () {
        if (!can_leave)
            return "Please confirm closing Haxball Stadium Editor";
    });


    canvas = document.getElementById('canvas');

    if (!canvas.getContext) {
        alert('Unable to initialise canvas. Your browser may be too old.');
        return;
    }

});

    // $('#button_import').click(function () {
    //     console.log('click na text mode');
    //     for (var i = 0; i < stadium.joints.length; i++) {
    //         if (stadium.joints[i]._length) {
    //             stadium.joints[i].length = stadium.joints[i]._length;
    //         }
    //     }
    //     console.log(pprint(stadium))
    //     // $('#textarea_import').val(pprint(stadium));
    //     document.getElementById("textarea_import").value = pprint(stadium);
    //     show_box('import');
    //     czyTekst = true;
    // });















//     $('#button_import_goto').click(function () {
//         var pos = prompt('Character position:');
//         if (pos)
//             set_selection_range($('#textarea_import')[0], parseInt(pos, 10), parseInt(pos, 10) + 10);
//     });

//     $('#button_properties').click(function () {
//         toggle_properties();
//     });

//     $('#button_undo').click(function () {
//         undo();
//     });

//     $('#button_redo').click(function () {
//         redo();
//     });

//     $('#button_delete').click(function () {
//         if (delete_selected(stadium))
//             modified();
//     });

//     $('#button_select_all').click(function () {
//         select_all();
//     });


//     $('#button_select_none').click(function () {
//         select_all(function () { return false; });
//     });

//     $('#button_inverse_selection').click(function () {
//         select_all(function (shape) { return !selected(shape.object); });
//     });

//     $('#button_copy').click(function () {
//         copy();
//     });

//     $('#button_paste').click(function () {
//         paste();
//         modified();
//     });

//     $('#button_cut').click(function () {
//         cut();
//         modified();
//     });

//     $('#button_duplicate').click(function () {
//         duplicate();
//         modified();
//     });

//     $('#button_mirror_mode').click(function () {
//         mirror_mode = mirror_mode ? false : true;
//         if (mirror_mode) {
//             $('#button_mirror_mode').addClass('active');
//             reset_mirror_data(stadium);
//         } else {
//             $('#button_mirror_mode').removeClass('active');
//             clear_mirror_data(stadium);
//         }
//     });

//     $('#pref_preview').click(function () {
//         $('#pref_preview').toggleClass('active');
//         settings.preview = $('#pref_preview').hasClass('active');
//         queue_render();
//     });

//     $('#button_redSpawnPoint').click(function () {
//         var xxx = document.getElementById('prop_spawnPointX').value;
//         var yyy = document.getElementById('prop_spawnPointY').value;
//         document.getElementById("prop_spawnPointX").value = "";
//         document.getElementById("prop_spawnPointY").value = "";
//         console.log(xxx, yyy);
//         stadium.redSpawnPoints.push([Number(xxx), Number(yyy)]);
//     });

//     $('#button_blueSpawnPoint').click(function () {
//         var xxx = document.getElementById('prop_spawnPointX').value;
//         var yyy = document.getElementById('prop_spawnPointY').value;
//         document.getElementById("prop_spawnPointX").value = "";
//         document.getElementById("prop_spawnPointY").value = "";
//         console.log(xxx, yyy);
//         stadium.blueSpawnPoints.push([Number(xxx), Number(yyy)]);
//     });

//     $('#button_resetRed').click(function () {
//         stadium.redSpawnPoints = [];
//         //console.log(button_resetRed);
//         //console.log(document.getElementById("button_resetRed"));
//         document.getElementById("button_resetRed").innerHTML = "Spawnpoints resetted!";
//         setTimeout(function () {
//             document.getElementById("button_resetRed").innerHTML = "Reset Spawnpoints";
//         }, 1200);
//     });

//     $('#button_resetBlue').click(function () {
//         stadium.blueSpawnPoints = [];
//         document.getElementById("button_resetBlue").innerHTML = "Spawnpoints resetted!";
//         setTimeout(function () {
//             document.getElementById("button_resetBlue").innerHTML = "Reset Spawnpoints";
//         }, 1200);
//     });

//     $('#button_addJoint').click(function () {
//         if (total_selected_by_type.discs != 2) return;
//         document.getElementById("button_addJoint").innerHTML = "Joint added!";
//         setTimeout(function () {
//             document.getElementById("button_addJoint").innerHTML = "Add Joint";
//         }, 1200);
//         var joint = {}
//         for (var i = 0; i < stadium.discs.length; i++) {
//             if (stadium.discs[i]._selected) {
//                 if (joint.d0) joint.d1 = i + 1
//                 else joint.d0 = i + 1;
//             }
//         }
//         var le = document.getElementById("inputLength").value;
//         if (le = "null") joint.length = "null";
//         else {
//             var tap = le.split(",");
//             if (tap.length == 2) {
//                 joint.length = [];
//                 joint.length[0] = Number(tap[0]);
//                 joint.length[1] = Number(tap[1]);
//             } else joint.length = Number(le);
//         }
//         if (document.getElementById("inputStrength").value == "rigid") joint.strength = "rigid";
//         else joint.strength = Number(document.getElementById("inputStrength").value);
//         if (isNaN(joint.strength)) joint.strength = "rigid";
//         joint.color = document.getElementById("inputColor").value;
//         stadium.joints.push(joint);
//         queue_render();
//     });

//     $('#button_newTrait').click(function () {
//         var zet = {};
//         zet.vis = document.getElementById('trait_vis').value;
//         if (zet.vis == "true") zet.vis = true;
//         else zet.vis = false;
//         if (document.getElementById('trait_bCoef').value != "") zet.bCoef = Number(document.getElementById('trait_bCoef').value);
//         if (document.getElementById('trait_radius').value != "") zet.radius = Number(document.getElementById('trait_radius').value);
//         if (document.getElementById('trait_invMass').value != "") zet.invMass = Number(document.getElementById('trait_invMass').value);
//         var zetName = "newTrait";
//         if (document.getElementById('trait_name').value != "") zetName = document.getElementById('trait_name').value;
//         if (document.getElementById('trait_gravity').value != "") {
//             var pstryk = (document.getElementById('trait_gravity').value).split(",");
//             zet.gravity = []
//             zet.gravity[0] = Number(pstryk[0]);
//             zet.gravity[1] = Number(pstryk[1]);
//         }
//         if (document.getElementById('trait_damping').value != "") zet.damping = parseFloat(document.getElementById('trait_damping').value);
//         if (document.getElementById('trait_cMask').value != "") zet.cMask = parseMaskList(document.getElementById('trait_cMask').value);
//         if (document.getElementById('trait_cGroup').value != "") zet.cGroup = parseMaskList(document.getElementById('trait_cGroup').value);
//         if (document.getElementById('trait_acceleration').value != "") zet.acceleration = Number(document.getElementById('trait_acceleration').value);
//         if (document.getElementById('trait_color').value != "") zet.color = document.getElementById('trait_color').value;
//         //console.log(zet);

//         //console.log(stadium.traits);
//         Object.defineProperty(stadium.traits, zetName, { value: zet, enumerable: true });
//         /*console.log(stadium.traits);
//         trejts = stadium.traits;
//         console.log(trejts);*/

//         document.getElementById('trait_bCoef').value = "";
//         document.getElementById('trait_radius').value = "";
//         document.getElementById('trait_name').value = "";
//         document.getElementById('trait_invMass').value = "";
//         document.getElementById('trait_gravity').value = "";
//         document.getElementById('trait_damping').value = "";
//         document.getElementById('trait_cMask').value = "";
//         document.getElementById('trait_cGroup').value = "";
//         document.getElementById('trait_acceleration').value = "";
//         document.getElementById('trait_color').value = "";

//         document.getElementById("button_newTrait").innerHTML = "Trait Added!";
//         setTimeout(function () {
//             document.getElementById("button_newTrait").innerHTML = "Add New Trait";
//         }, 1200);
//     });

//     $('#button_zoom05').click(function () {
//         skala = 0.5;
//         resize_canvas();
//         render(stadium);
//     });

//     $('#button_zoom1').click(function () {
//         skala = 1;
//         resize_canvas();
//         render(stadium);
//     });

//     $('#button_zoom2').click(function () {
//         skala = 2;
//         resize_canvas();
//         render(stadium);
//     });

//     $('#button_zoom3').click(function () {
//         skala = 3;
//         resize_canvas();
//         render(stadium);
//     });

//     $('#button_powrot').click(function () {
//         document.getElementById("button_tab_advanced").click();
//     });


//     define_tab('properties');
//     define_tab('advanced');
//     define_tab('edit');
//     define_tab('joints');
//     define_tab('spawnpoints');

//     $(canvas).mousedown(handle_down);
//     $(canvas).mouseup(handle_up);
//     $(canvas).mousemove(handle_move);
//     $(document).bind('keydown', handle_key);

//     resize();
//     $(window).resize(resize);
// });

// function show_box(name) {
//     console.log('funkcja show_box');
//     $('#table').addClass('hidden');
//     $('#box' + name).removeClass('hidden').siblings().addClass('hidden');
//     $('#box').removeClass('hidden');
// }

// function hide_box(name) {
//     $('#box').addClass('hidden');
//     $('#table').removeClass('hidden');
//     resize();
// }


/*
     FILE ARCHIVED ON 14:27:57 Nov 29, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:50:58 Mar 23, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.
 
     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 100.014 (3)
  esindex: 0.009
  captures_list: 122.456
  CDXLines.iter: 12.751 (3)
  PetaboxLoader3.datanode: 86.918 (5)
  exclusion.robots: 0.211
  exclusion.robots.policy: 0.195
  RedisCDXSource: 5.789
  PetaboxLoader3.resolve: 43.367 (2)
  load_resource: 124.712
>>>>>>> 4fa73a8799f23b20ed1dc58a869117c09c354afa
*/