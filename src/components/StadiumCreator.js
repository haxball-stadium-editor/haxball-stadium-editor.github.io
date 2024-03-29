/* eslint-disable eqeqeq */
import CreatorHeader from "./CreatorHeader";
import $ from 'jquery';

import {
  logoSelect, logoRotate, logoDisc, logoScale, logoSegment, logoVertex, logoGoal, logoPlane, logoProperties, logoTools, imgClear,
  imgCopy, imgDelete, imgDuplicate, imgInverse, imgMirror, imgPaste, imgPreview, imgRedo, imgSelectAll, imgSelectNone, imgUndo, basicStadiums
} from './imports'

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { editStadium } from "../reducers/stadiumSlice";

var current_tool;

// cached canvas size info
var canvas_rect = [-150, -75, 150, 75];

var zoomScale = 1;
var zoomFactor = 1.08; // zoomScale multiplier when mouse wheel is used

var canvas = document.getElementById('canvas');
var stadium;

//===== Config Variables
// extra border around the stadium inside the canvas
var margin = 0;

// minimum distance before a click becomes a drag
var minimum_drag_distance = 4;

// maximum distance from which an object can be clicked
var maximum_click_distance = 5;

// number of undo savepoints to keep
var undo_levels = 500;

// colors of objects that are invisible in haxball
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

// cached mouse position
var current_mouse_position = false;

var mirror_mode = false;
var mirror_directions = ['horizontal', 'vertical', 'across'];

// directions in which mirroring is disabled
var disabled_mirroring = {};

var pi = Math.PI;
var abs = Math.abs;
var round = Math.round;
var max = Math.max;
var min = Math.min;

var initialiseProperties = true;

function starting() {
  resize();
  load(stadium);
  canvas = document.getElementById('canvas');

  define_tab('properties');
  define_tab('advanced');
  define_tab('edit');
  define_tab('joints');
  define_tab('spawnpoints');
  define_tab('basic_stadiums');
  // define_tab('haxmaps')

  if (initialiseProperties) {
    initialise_properties_css();
    populate_tab_properties();
  } else initialiseProperties = true;

  add_tool(tool_select);
  add_tool(tool_segment);
  add_tool(tool_disc);
  add_tool(tool_vertex);
  add_tool(tool_plane);
  add_tool(tool_goal);
  add_tool(tool_rotate);
  add_tool(tool_scale);

  set_tool(tool_select);
  modified(true);
}

// function getLineCoefs(x, y) {
//   var a = (x[1] - y[1]) / (x[0] - y[0]);
//   var b = y[1] - a * y[0];
//   return { a: a, b: b };
// }

// function getQuadraticEquationRoots(a, b, c) {
//   var delta = b * b - 4 * a * c;
//   return [(-b - Math.sqrt(delta)) / (2 * a), (-b + Math.sqrt(delta)) / (2 * a)]
// }

function renderbg(st, ctx) {
  var bg = st.bg;
  ctx.save();

  if (bg.type == 'grass' || bg.type == 'hockey') {

    ctx.fillStyle = haxball[bg.type].bg_color;
    if (bg.color) {
      if (bg.color.match('^[A-Fa-f0-9]{6}$')) ctx.fillStyle = '#' + bg.color;
    }
    ctx.fillRect(-st.width, -st.height,
      2 * st.width, 2 * st.height);

    ctx.beginPath();

    if (bg.cornerRadius == undefined) bg.cornerRadius = 0;
    if (bg.kickOffRadius == undefined) bg.kickOffRadius = 0;

    ctx.moveTo(-bg.width + bg.cornerRadius, -bg.height);
    ctx.arcTo(bg.width, -bg.height, bg.width, -bg.height + bg.cornerRadius, bg.cornerRadius);
    ctx.arcTo(bg.width, bg.height, bg.width - bg.cornerRadius, bg.height, bg.cornerRadius);
    ctx.arcTo(-bg.width, bg.height, -bg.width, bg.height - bg.cornerRadius, bg.cornerRadius);
    ctx.arcTo(-bg.width, -bg.height, -bg.width + bg.cornerRadius, -bg.height, bg.cornerRadius);

    ctx.save();
    ctx.clip();
    ctx.fillStyle = bg_patterns[bg.type];
    ctx.fillRect(-st.width, -st.height, 2 * st.width, 2 * st.height);
    ctx.restore();

    ctx.moveTo(0, -bg.height);
    ctx.lineTo(0, -bg.kickOffRadius);
    ctx.moveTo(bg.kickOffRadius, 0);
    ctx.arc(0, 0, bg.kickOffRadius, 0, Math.PI * 2, true);
    ctx.moveTo(0, bg.kickOffRadius);
    ctx.lineTo(0, bg.height);

    ctx.lineWidth = 3;
    ctx.strokeStyle = haxball[bg.type].border_color;
    ctx.stroke();
  } else {
    ctx.fillStyle = haxball.grass.bg_color;
    if (bg.color.match('^[A-Fa-f0-9]{6}$')) ctx.fillStyle = '#' + bg.color;
    ctx.fillRect(-st.width, -st.height, 2 * st.width, 2 * st.height);
  }
  ctx.restore();
}

function render_segment_arc(ctx, segment, arc) {
  ctx.beginPath();
  if (arc.curve) {
    ctx.arc(arc.center[0], arc.center[1], arc.radius, arc.from, arc.to, false);
  } else {
    ctx.moveTo(arc.a[0], arc.a[1]);
    ctx.lineTo(arc.b[0], arc.b[1]);
  }

  if (segment.vis !== false) {
    if (selected(segment) && !settings.preview) {
      ctx.lineWidth = 5;
      ctx.strokeStyle = colors.selected;
      ctx.stroke();
    }
    ctx.lineWidth = 3;
    ctx.strokeStyle = color_to_style(segment.color, haxball.segment_color);
    ctx.stroke();
  } else if (!settings.preview) {
    if (selected(segment)) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = colors.selected;
      ctx.stroke();
    }
    ctx.lineWidth = 2;
    ctx.strokeStyle = colors.invisible_thick;
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = colors.invisible_thin;
    ctx.stroke();
  }

  if (segment.bias && !settings.preview) {
    if (arc.curve) {
      ctx.beginPath();
      ctx.moveTo(arc.b[0], arc.b[1])
      if (arc.curve > 0) ctx.arc(arc.center[0], arc.center[1], arc.radius, arc.to, arc.from, true);
      else ctx.arc(arc.center[0], arc.center[1], arc.radius, arc.from, arc.to, false);
      if (arc.curve > 0) {
        try {
          ctx.arc(arc.center[0], arc.center[1], arc.radius - segment.bias, arc.from, arc.to, false)
        } catch (error) {
          ctx.lineTo(arc.center[0], arc.center[1])
        }
      } else {
        try {
          ctx.arc(arc.center[0], arc.center[1], arc.radius + segment.bias, arc.to, arc.from, true)
        } catch (error) {
          ctx.lineTo(arc.center[0], arc.center[1])
        }
      }

      ctx.lineTo(arc.b[0], arc.b[1]);
      ctx.globalAlpha = 0.2
      ctx.fillStyle = 'black'
      ctx.fill();
      ctx.globalAlpha = 1;
    } else {
      var dx, dy;
      var lineLength = Math.sqrt((arc.a[0] - arc.b[0]) * (arc.a[0] - arc.b[0]) + ((arc.a[1] - arc.b[1]) * (arc.a[1] - arc.b[1])));
      dx = (arc.b[1] - arc.a[1]) * segment.bias / lineLength;
      dy = (arc.b[0] - arc.a[0]) * segment.bias / lineLength;
      ctx.beginPath();
      ctx.moveTo(arc.a[0], arc.a[1]);
      ctx.globalAlpha = 0;
      ctx.lineTo(arc.b[0], arc.b[1]);
      ctx.globalAlpha = 0.2;
      if (segment.bias > 0) {
        ctx.lineTo(arc.b[0] - dx, arc.b[1] + dy);
        ctx.lineTo(arc.a[0] - dx, arc.a[1] + dy);
      } else {
        ctx.lineTo(arc.b[0] - dx, arc.b[1] + dy);
        ctx.lineTo(arc.a[0] - dx, arc.a[1] + dy);
      }
      ctx.lineTo(arc.a[0], arc.a[1])
      ctx.moveTo((arc.a[0] + arc.b[0]) / 2 - (lineLength / 2), (arc.a[1] + arc.b[1]) / 2);
      ctx.lineTo((arc.a[0] + arc.b[0]) / 2 + (lineLength / 2), (arc.a[1] + arc.b[1]) / 2);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
}

function complete(st, o) {
  if (o.trait) {
    return $.extend({}, st.traits[o.trait], o);
  }
  return $.extend({}, o);
}

function complete_shape_object(st, shape) {
  var ret = {};
  if (defaults[shape.type]) {
    $.extend(ret, defaults[shape.type]);
  }
  if (shape.object.trait) {
    $.extend(ret, st.traits[shape.object.trait]);
  }
  $.extend(ret, shape.object);
  return ret;
}

function norm(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}

function dist(a, b) {
  return norm([a[0] - b[0], a[1] - b[1]]);
}

function normalise(v) {
  var k = norm(v);

  var x = v[0] / k;
  var y = v[1] / k;

  return [x, y];
}

function handle_down(ev) {
  if (ev.button !== undefined && ev.button === 1) return;
  $(document.activeElement).blur();
  mouse_left_down = true;
  mouse_dragging = false;
  var pt = translate_coords([ev.pageX, ev.pageY]);
  drag_start_pos = pt;
  current_tool.down(pt, ev);
  return false;
}

function translate_coords(p) {
  var off = $(canvas).offset();
  var pt = [Math.round(p[0] - off.left + canvas_rect[0]) / zoomScale,
  Math.round(p[1] - off.top + canvas_rect[1]) / zoomScale];
  return pt;
}


function handle_up(ev) {
  mouse_left_down = false;
  var pt = translate_coords([ev.pageX, ev.pageY]);
  if (mouse_dragging) {
    mouse_dragging = false;
    current_tool.end_drag(drag_start_pos, pt, ev);
  } else {
    current_tool.click(pt, ev);
  }
  drag_start_pos = false;
  return false;
}

function handle_key(ev) {
  if (ev.ctrlKey && ev.which == 67) {
    alert("Keep in mind that stadium might not be copied properly using that method. Please use \"Copy All\" button");
  }

  if (ev.ctrlKey) {
    return;
  } else if ($(ev.target).is('textarea')) {
    return;
  } else if ($(ev.target).is('input')) {
    if (ev.which == 13) { // RET
      $(document.activeElement).blur();
      return false;
    }
    return;
  }

  switch (ev.which) {
    case 90: // Z
    case 85:// U
      undo();
      return false;
    case 82: // R
      redo();
      return false;
    case 46: // DEL
      if (delete_selected(stadium))
        modified();
      return false;
    case 65: // A
      select_all();
      return false;
    case 67: // C
      copy();
      return false;
    case 88: // X
      cut();
      modified();
      return false;
    case 86: // V
      paste();
      modified();
      return false;
    case 68: // D
      duplicate();
      modified();
      return false;
    case 49: // 1
    case 50: // 2
    case 51: // 3
    case 52: // 4
    case 53: // 5
    case 54: // 6
    case 55: // 7
    case 56: // 8
      set_tool([tool_select, tool_rotate, tool_scale, tool_segment,
        tool_vertex, tool_disc, tool_goal, tool_plane]
      [ev.which - 49]);
      return false;
    default:
      return current_tool.key(ev.which, ev);
  }
}

function handle_move(ev) {
  var div_mousepos = $('#mousepos');
  var pt = translate_coords([ev.pageX, ev.pageY]);
  current_mouse_position = pt;
  if (window_width < ev.pageX * 2) {
    div_mousepos.removeClass('left').addClass('right');
  } else {
    div_mousepos.removeClass('right').addClass('left');
  }
  var update_pos = true;
  if (mouse_left_down) {
    if (!mouse_dragging && dist(pt, drag_start_pos) >= minimum_drag_distance) {
      mouse_dragging = true;
    }
    if (mouse_dragging &&
      current_tool.dragging &&
      current_tool.dragging(drag_start_pos, pt, ev) === false) {
      update_pos = false;
    }
  } else {
    if (current_tool.moving && current_tool.moving(pt, ev) === false)
      update_pos = false;
  }
  if (update_pos)
    div_mousepos.text((pt[0] > Math.floor(pt[0]) ? pt[0].toFixed(2) : pt[0]) + ', ' + (pt[1] > Math.floor(pt[1]) ? pt[1].toFixed(2) : pt[1]));
}

var tool_select = {
  name: 'select',
  cursor: 'default',
  init: function () {
    this.drag_type = false;
  },
  down: function (pt, ev) {
    if (ev.which === 2) return;
    var shape = under_point(stadium, pt);
    this.shape = shape;
    if (!shape) {
      this.drag_type = 'select';
      if (!(ev.shiftKey || ev.ctrlKey)) {
        clear_selection(stadium);
      }
    } else {
      if (shape.type == 'segments') {
        this.drag_type = 'segment';
      } else {
        this.drag_type = 'move';
      }
      this.keep_others = ev.shiftKey || ev.ctrlKey;
      if (!selected(shape.object)) {
        this.shape_selected = false;
        if (!this.keep_others)
          clear_selection(stadium);
        select_shape(stadium, shape);
      } else {
        this.shape_selected = true;
      }
    }
    queue_render();
  },
  click: function (pt, ev) {
    if (this.shape) {
      if (this.shape_selected) {
        if (this.keep_others) {
          unselect_shape(stadium, this.shape);
        } else {
          clear_selection(stadium);
        }
      }
    }
    update_savepoint();
    if (total_selected_by_type.discs == 2) allowJoint();
    else disallowJoint();
  },
  end_drag: function (from, to, ev) {
    this.transform = false;
    this.drag_type = false;
    var shape = this.shape;
    if (!shape) {
      select_rect(stadium, from, to);
      update_savepoint();
    } else if (shape.type == 'segments') {
      curve_segment_to_point(stadium, shape.object, to);
      modified();
    } else {
      if (for_selected(stadium, move_obj, from, to)) {
        update_mirrored_geometry_selected(stadium);
        resize_canvas();
        modified();
      }
    }
    if (total_selected_by_type.discs == 2) allowJoint();
    else disallowJoint();
  },
  key: function () { },
  dragging: function (from, to, ev) {
    this.drag_from = from;
    this.drag_to = to;

    this.transform = (
      this.drag_type == 'move' ? transform_drag_move :
        this.drag_type == 'segment' ? transform_drag_curve :
          false);
    queue_render();
    if (this.drag_type == 'select') {
      $('#mousepos').text(Math.abs(from[0] - to[0]) + ' x ' + Math.abs(from[1] - to[1]));
      return false;
    } else if (this.drag_type == 'segment') {
      return false;
    }
  },
  render: function (ctx) {
    if (mouse_dragging && this.drag_type == 'select') {
      var a = this.drag_from;
      var b = this.drag_to;
      ctx.fillStyle = 'rgba(201,224,247,0.5)';
      ctx.fillRect(a[0], a[1], b[0] - a[0], b[1] - a[1]);
    }
  }
};

function transform_drag_curve(st, ctx, shape, draw) {
  if (!this.shape || shape.object != this.shape.object) {
    draw();
    return;
  }

  var seg = complete(st, shape.object);
  var arc = segment_arc_to_point(st, seg, this.drag_to);

  $('#mousepos').text(Math.round(arc.curve) + '°');

  render_segment_arc(ctx, seg, arc);
}

function transform_drag_move(st, ctx, shape, draw) {
  if (shape_fully_selected(st, shape))
    ctx.translate(this.drag_to[0] - this.drag_from[0],
      this.drag_to[1] - this.drag_from[1]);
  draw();
}

var tool_rotate = {
  name: 'rotate',
  cursor: 'default',
  init: function () {
    queue_render();
  },
  down: function (pt, ev) {
    this.drag_from = pt;
  },
  click: function (pt, ev) {
    transformation_center = pt;
    queue_render();
  },
  end_drag: function (from, to, ev) {
    var cs = angle_cs_three(transformation_center, from, to);
    if (for_selected(stadium, rotate_obj, transformation_center, cs[0], cs[1])) {
      update_mirrored_geometry_selected(stadium);
      resize_canvas();
      modified();
    }
  },
  key: function () { },
  render: render_transformation_center,
  dragging: function (from, to, ev) {
    this.drag_to = to;
    $('#mousepos').text(round(three_point_angle(from, transformation_center, to) * 180 / pi) + '°');
    queue_render();
    return false;
  },
  transform: function (st, ctx, shape, draw) {
    if (mouse_dragging && shape_fully_selected(st, shape)) {
      var o = transformation_center;
      ctx.translate(o[0], o[1]);
      var cs = angle_cs_three(transformation_center, this.drag_from, this.drag_to);
      ctx.rotate(angle_to([0, 0], cs));
      ctx.translate(-o[0], -o[1]);
    }
    draw();
  }
};

function angle_cs_three(o, from, to) {
  var b = normalise(point_subtract(from, o));
  var a = normalise(point_subtract(to, o));
  var cos = a[0] * b[0] + a[1] * b[1];
  var sin = -a[0] * b[1] + a[1] * b[0];
  return [cos, sin];
}

function set_tool(t) {
  var old_tool = current_tool;
  current_tool = t;
  $('#button_tool_' + t.name).siblings('button').removeClass('active');
  $('#button_tool_' + t.name).addClass('active');
  $(canvas).css('cursor', t.cursor);
  t.init();
  trigger('set_tool', t, old_tool);
  queue_render();
}

function unselect_shape(st, shape) {
  shape_set_selected(shape, false);
  if (shape.type == 'segments') {
    var s = shape.object;
    if (selected(st.vertexes[s.v0]) == 'segment')
      shape_set_selected(Shape('vertexes', st.vertexes[s.v0], s.v0), false);
    if (selected(st.vertexes[s.v1]) == 'segment')
      shape_set_selected(Shape('vertexes', st.vertexes[s.v1], s.v1), false);
  }

}

function select_shape(st, shape) {
  shape_set_selected(shape, true);
  if (shape.type == 'segments') {
    var s = shape.object;
    if (!selected(st.vertexes[s.v0]))
      shape_set_selected(Shape('vertexes', st.vertexes[s.v0], s.v0), 'segment');
    if (!selected(st.vertexes[s.v1]))
      shape_set_selected(Shape('vertexes', st.vertexes[s.v1], s.v1), 'segment');
  }
}

function data(obj, k, v) {
  if (v === undefined) {
    return obj._data ? obj._data[k] : undefined;
  }
  if (!obj._data)
    obj._data = {};
  obj._data[k] = v;
}

function clear_selection(st) {
  var count = 0;
  for_all_shapes(st, function (shape) {
    if (selected(shape.object)) {
      shape_set_selected(shape, false);
      count++;
    }
  });
  return count;
}

function under_point(st, pt, type) {
  var obj;
  var index;

  // check objects in reverse order thet they were rendered
  // which is, at first, the same as the reverse order in which they were created

  if (!type || type == 'discs') {
    eachRev(st.discs, function (i, disc) {
      var d = complete_shape_object(st, Shape('discs', disc, i));
      if (dist(d.pos, pt) - d.radius <= maximum_click_distance) {
        obj = disc;
        index = i;
        return false;
      }
    });

    if (obj) return Shape('discs', obj, index);
  }

  if (!type || type == 'goals') {
    eachRev(st.goals, function (i, goal) {
      var g = complete(st, goal);
      if (point_next_to_line(pt, g.p0, g.p1, maximum_click_distance)) {
        obj = goal;
        index = i;
        return false;
      }
    });

    if (obj) return Shape('goals', obj, index);
  }

  if (!type || type == 'vertexes') {
    eachRev(st.vertexes, function (i, vertex) {
      var v = complete(st, vertex);
      if (dist([v.x, v.y], pt) <= maximum_click_distance) {
        obj = vertex;
        index = i;
        return false;
      }
    });

    if (obj) return Shape('vertexes', obj, index);
  }

  if (!type || type == 'segment') {
    eachRev(st.segments, function (i, segment) {
      if (segment_contains(st, segment, pt, maximum_click_distance)) {
        obj = segment;
        index = i;
        return false;
      }
    });

    if (obj) return Shape('segments', obj, index);
  }

  if (!type || type == 'joints') {
    if (st.joints) {
      eachRev(st.joints, function (i, joint) {
        if (joint_contains(st, joint, pt, maximum_click_distance)) {
          obj = joint;
          index = i;
          return false;
        }
      });
    }

    if (obj) return Shape('joints', obj, index);
  }

  if (!type || type == 'planes') {
    eachRev(st.planes, function (i, plane) {
      var ext = plane_extremes(st, plane);
      if (point_next_to_line(pt, ext.a, ext.b, maximum_click_distance)) {
        obj = plane;
        index = i;
        return false;
      }
    });

    if (obj) return Shape('planes', obj, index);
  }
}

function selected(obj) {
  return obj._selected;
}

function shape_set_selected(shape, val) {
  var sel = shape.object._selected;
  if (!sel && val) {
    trigger('select', shape);
  } else if (sel && !val) {
    trigger('unselect', shape);
  }
  if (!val) {
    val = undefined;
  }
  shape.object._selected = val;
}

function trigger(name, a, b) {
  $.each(triggers[name], function (i, f) { f(a, b); });
}

function queue_render() {
  // if this function gets called too much, add a minimum delay between calls to render
  renderStadium(stadium);
}

function for_selected(st, f, a, b, c) {
  var count = 0;
  for_all_shapes(st, function (shape) {
    if (selected(shape.object)) {
      f(st, shape, a, b, c);
      count++;
    }
  });
  return count;
}

function for_all_shapes(st, types, f) {
  if (!f) {
    f = types;
    types = ['vertexes', 'segments', 'goals', 'discs', 'planes', 'joints'];
  }

  $.each(types, function (i, name) {
    var group = st[name];
    if (group) {
      $.each(group, function (i, obj) {
        return f(Shape(name, obj, i));
      });
    }
  });
}

function select_rect(st, a, b) {
  var count = 0;
  // Segments after vertexes
  for_all_shapes(st, ['vertexes', 'goals', 'discs', 'segments', 'joints'], function (shape) {
    var obj = shape.object;
    var o = complete(st, obj);
    switch (shape.type) {
      case 'vertexes':
        if (rectangle_contains(a, b, [o.x, o.y])) {
          shape_set_selected(shape, true);
          count++;
        }
        break;

      case 'goals':
        if (rectangle_contains(a, b, o.p0) &&
          rectangle_contains(a, b, o.p1)) {
          shape_set_selected(shape, true);
          count++;
        }
        break;

      case 'discs':
        if (rectangle_contains(a, b, o.pos) &&
          !near(o.pos[0], a[0], o.radius) &&
          !near(o.pos[0], b[0], o.radius) &&
          !near(o.pos[1], a[1], o.radius) &&
          !near(o.pos[1], b[1], o.radius)) {
          shape_set_selected(shape, true);
          count++;
        }
        break;

      case 'segments':
        if (selected(st.vertexes[o.v0]) && selected(st.vertexes[o.v1])) {
          shape_set_selected(shape, true);
          count++;
        }
        break;

      case 'joints':
        if (selected(st.discs[o.d0 - 1]) && selected(st.discs[o.d1 - 1])) {
          shape_set_selected(shape, true);
          count++;
        }
        break;
      default:
        console.warn('Unexpected shape type')
    }

  });

  // TODO: count is wrong. includes shapes that were already selected
  return count;
}

function move_obj(st, shape, from, to) {
  var type = shape.type;
  var obj = shape.object;

  var o = complete(st, obj);

  var vd = point_subtract(to, from);

  if (type == 'vertexes') {
    obj.x = o.x + vd[0];
    obj.y = o.y + vd[1];
  }

  if (type == 'discs') {
    obj.pos = point_add(o.pos, vd);
  }

  if (type == 'goals') {
    obj.p0 = point_add(o.p0, vd);
    obj.p1 = point_add(o.p1, vd);
  }

  if (type == 'planes') {
    obj.dist += dot_product(vd, o.normal) / norm(o.normal);
  }
}

var tool_segment = {
  name: 'segment',
  cursor: 'default',
  init: function () { },
  click: function () { },
  end_drag: function (from, to, ev) {
    var shape = add_segment(stadium, from, to);
    select_shape(stadium, shape);
    var v = segment_vertices(stadium, shape);
    select_shape(stadium, v[0]);
    select_shape(stadium, v[1]);
    modified();
  },
  key: function () { },
  down: function (pt, ev) {
    this.drag_from = pt;
    this.curve = get_prop_val('curve', 0);
  },
  dragging: function (from, to, ev) {
    this.drag_to = to;
    $('#mousepos').text(Math.round(dist(from, to)) + '; ' + Math.round(angle_to(from, to) / Math.PI * 180) + '°');
    queue_render();
    return false;
  },
  render: function (ctx) {
    if (mouse_dragging) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = color_to_style(get_prop_val('color', '000000'));
      var arc = calculate_arc(this.drag_from, this.drag_to, this.curve);
      ctx.beginPath();
      if (arc.radius) {
        ctx.arc(arc.center[0], arc.center[1], arc.radius, arc.from, arc.to, false);
      } else {
        ctx.moveTo(this.drag_from[0], this.drag_from[1]);
        ctx.lineTo(this.drag_to[0], this.drag_to[1]);
      }
      ctx.stroke();
    }
  }
};

function add_segment(st, from, to, no_mirror) {
  var sa = under_point(st, from, 'vertexes');
  var sb = under_point(st, to, 'vertexes');

  var a = sa || add_vertex(st, from, true);
  var b = sb || add_vertex(st, to, true);

  var obj = {
    v0: a.index,
    v1: b.index
  };

  obj = $.extend({}, get_props_for_type('segments'), obj);

  st.segments.push(obj);

  var shape = Shape('segments', obj, st.segments.length - 1);

  if (mirror_mode && !no_mirror) {
    $.each(mirror_directions, function (i, dir) {
      if (!mirroring_disabled[dir] && can_mirror_segment(from, to, dir, obj.curve)) {
        var seg = add_segment(st, mirror_point(from, dir), mirror_point(to, dir), true);
        if (shape.object.curve && (dir == 'horizontal' || dir == 'vertical'))
          seg.object.curve = -shape.object.curve;
        link_shapes(shape, seg, dir);
        var v = segment_vertices(st, seg);
        link_shapes(a, v[0], dir);
        link_shapes(b, v[1], dir);
      }
    });
  }

  return shape;
}

function can_mirror_segment(a, b, dir) {
  var ret = true;
  if (sign(a[0]) * sign(b[0]) == -1) {
    ret = ret && dir != 'horizontal' && dir != 'across';
  }
  if (sign(a[1]) * sign(b[1]) == -1) {
    ret = ret && dir != 'vertical' && dir != 'across';
  }
  return ret;
}

function add_vertex(st, pt, no_mirror) {
  var obj = {
    x: pt[0],
    y: pt[1]
  };

  obj = $.extend({}, get_props_for_type('vertexes'), obj);

  st.vertexes.push(obj);
  var shape = Shape('vertexes', obj, st.vertexes.length - 1);

  if (mirror_mode && !no_mirror) {
    $.each(mirror_directions, function (i, dir) {
      if (!mirroring_disabled(dir) && can_mirror_vertex(pt, dir)) {
        var ver = add_vertex(st, mirror_point(pt, dir), true);
        link_shapes(shape, ver, dir);
      }
    });
  }

  return shape;
}

function can_mirror_vertex(pt, dir) {
  if (pt[0] == 0)
    return dir == 'vertical' && pt[1] != 0;
  if (pt[1] == 0)
    return dir == 'horizontal';
  return true;
}

var tool_disc = {
  name: 'disc',
  cursor: 'default',
  init: function () { },
  down: function (pt, ev) {
    this.drag_from = pt;
  },
  click: function (pt) {
    var shape = add_disc(stadium, pt);
    select_shape(stadium, shape);
    if (total_selected_by_type.discs == 2) allowJoint();
    else disallowJoint();
    resize_canvas();
    modified();
  },
  end_drag: function (from, to, ev) {
    var shape = add_disc(stadium, from, dist(from, to));
    select_shape(stadium, shape);
    if (total_selected_by_type.discs == 2) allowJoint();
    else disallowJoint();
    resize_canvas();
    modified();
  },
  key: function () { },
  dragging: function (from, to, ev) {
    this.drag_to = to;
    queue_render();
  },
  render: function (ctx) {
    if (mouse_dragging) {
      ctx.fillStyle = color_to_style(get_prop_val('color', 'FFFFFF'));
      ctx.beginPath();
      ctx.arc(this.drag_from[0], this.drag_from[1],
        dist(this.drag_from, this.drag_to),
        0, Math.PI * 2, false);
      ctx.fill();
    }
  }
};

function add_disc(st, pt, r, is_mirror) {
  var obj = {
    pos: [pt[0], pt[1]],
    radius: r
  };

  obj = $.extend({}, get_props_for_type('discs'), obj);

  st.discs.push(obj);
  var shape = Shape('discs', obj, st.discs.length - 1);

  if (mirror_mode && !is_mirror) {
    $.each(mirror_directions, function (i, dir) {
      if (!mirroring_disabled(dir) && can_mirror_vertex(pt, dir)) {
        var dis = add_disc(st, mirror_point(pt, dir), r, true);
        link_shapes(shape, dis, dir);
      }
    });
  }

  return shape;
}

function load_tile(name) {
  var tile = new Image(128, 128);
  tile.onload = function () {
    var ctx = canvas.getContext('2d');
    bg_patterns[name] = ctx.createPattern(tile, 'repeat');
  };
  tile.src = "https://raw.githubusercontent.com/haxball-stadium-editor/haxball-stadium-editor.github.io/v2.11/" + name + "tile.png"
}

function color_to_style(color, def) {
  if (!color) {
    return def ? def : 'rgb(0,0,0)';
  } else if (color.substr) {
    return '#' + color;
  } else {
    return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
  }
}

function segment_arc(st, segment) {
  var seg = segment_points(st, segment);

  var arc = data(segment, 'arc');

  if (arc && arc.a[0] == seg.a[0] && arc.a[1] == seg.a[1] &&
    arc.b[0] == seg.b[0] && arc.b[1] == seg.b[1] && arc.curve == segment.curve) {
    return arc;
  }

  arc = { a: seg.a, b: seg.b, curve: segment.curve };

  var curve = segment.curve;

  $.extend(arc, calculate_arc(seg.a, seg.b, curve));

  data(segment, 'arc', arc);

  return arc;
}

function calculate_arc(a, b, curve) {
  var arc = {};

  if (curve === 0)
    return arc;

  if (curve < 0) {
    curve = -curve;
    var c = a;
    a = b;
    b = c;
  }

  var c = [b[0] - a[0], b[1] - a[1]];
  var d = [
    a[0] + c[0] / 2,
    a[1] + c[1] / 2
  ];
  var nc = norm(c);

  if (curve == 180) {
    arc.radius = nc / 2;
    arc.center = d;
    arc.from = angle_to(d, a);
    arc.to = angle_to(d, b);
    return arc;
  }

  var angle = curve * Math.PI / 180;
  var spa2 = Math.sin(Math.PI / 2 - angle / 2);
  var radius = Math.abs(nc * spa2 / Math.sin(angle));


  var cp = normalise([c[1], -c[0]]);

  var l = Math.sqrt((nc * nc / 4) + radius * radius - nc * radius * Math.cos(Math.PI / 2 - angle / 2));

  if (curve > 180)
    l = -l;

  arc.radius = radius;

  arc.center = [
    d[0] - cp[0] * l,
    d[1] - cp[1] * l
  ];

  arc.from = angle_to(arc.center, a);
  arc.to = angle_to(arc.center, b);

  return arc;
}

function angle_to(o, p) {
  return Math.atan2(p[1] - o[1], p[0] - o[0]);
}

function between(a, b, c) {
  return (a <= c && c <= b) || (b <= c && c <= a);
}

function point_next_to_line(pt, a, b, d) {
  return distance_line_point(a, b, pt) <= d &&
    three_point_angle(a, pt, b) > Math.PI / 2;
}

function segment_contains(st, segment, pt, d) {
  var s = complete(st, segment);
  if (!s.curve || s.curve === 0) {
    var seg = segment_points(st, segment);
    return point_next_to_line(pt, seg.a, seg.b, d);
  } else {
    var arc = segment_arc(st, s);
    return distance_circle_point(arc.center, arc.radius, pt) <= d &&
      clockwise_between(arc.from, arc.to, angle_to(arc.center, pt));
  }
}

function joint_contains(st, joint, pt, d) {
  var joi = joint_points(st, joint);
  return point_next_to_line(pt, joi.a, joi.b, d);
}

function distance_line_point(a, b, p) {
  return Math.abs(height_line_point(a, b, p));
}

function height_line_point(a, b, p) {
  var d = dist(a, b);
  if (d === 0)
    return dist(a, p);
  return ((b[0] - a[0]) * (a[1] - p[1]) - (a[0] - p[0]) * (b[1] - a[1])) / d;
}

function distance_circle_point(c, r, p) {
  return Math.abs(dist(c, p) - r);
}

function clockwise_between(a, b, c) {
  // clockwise or anticlockwise??
  a = (a + Math.PI * 2) % (Math.PI * 2);
  b = (b + Math.PI * 2) % (Math.PI * 2);
  c = (c + Math.PI * 2) % (Math.PI * 2);
  return !((b <= c && c <= a) ||
    (c <= a && a <= b) ||
    (a <= b && b <= c));
}

function Shape(type, object, i) {
  return { type: type, object: object, index: i };
}

function three_point_angle(a, o, b) {
  var r = angle_to(o, a);
  var s = angle_to(o, b);
  var d = Math.abs(r - s);
  if (d > Math.PI)
    return Math.PI * 2 - d;
  return d;
}

function circumcenter(a, b, c) {

  var d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));

  if (d === 0)
    return false;

  return [
    ((a[1] * a[1] + a[0] * a[0]) * (b[1] - c[1]) +
      (b[1] * b[1] + b[0] * b[0]) * (c[1] - a[1]) +
      (c[1] * c[1] + c[0] * c[0]) * (a[1] - b[1])) / d,
    ((a[1] * a[1] + a[0] * a[0]) * (c[0] - b[0]) +
      (b[1] * b[1] + b[0] * b[0]) * (a[0] - c[0]) +
      (c[1] * c[1] + c[0] * c[0]) * (b[0] - a[0])) / d
  ];
}

function segment_arc_to_point(st, segment, pt) {
  var arc = segment_arc(st, segment);
  var o = circumcenter(pt, arc.a, arc.b);
  var new_arc = { a: arc.a, b: arc.b };

  if (!o) {
    new_arc.curve = 0;
    return new_arc;
  }

  var a = arc.a;
  var b = arc.b;
  var height = height_line_point(a, b, pt);

  new_arc.curve = curve_from_center(o, a, b, height);

  if (Math.abs(new_arc.curve) > maximum_curve) {
    new_arc.curve = sign(new_arc.curve) * maximum_curve;
    $.extend(new_arc, calculate_arc(arc.a, arc.b, new_arc.curve));
    return new_arc;
  }


  new_arc.center = o;
  new_arc.radius = dist(o, pt);
  new_arc.from = angle_to(o, a);
  new_arc.to = angle_to(o, b);

  if (new_arc.curve < 0) {
    var c = new_arc.from;
    new_arc.from = new_arc.to;
    new_arc.to = c;
  }

  return new_arc;
}

function curve_from_center(o, a, b, height) {
  var angle = three_point_angle(a, o, b);

  var o_side = height_line_point(a, b, o) < 0;

  if (height < 0) {
    if (o_side)
      angle = Math.PI * 2 - angle;
    angle = -angle;
  } else if (!o_side) {
    angle = Math.PI * 2 - angle;
  }

  return angle / Math.PI * 180;
}

function curve_segment_to_point(st, segment, pt) {
  var arc = segment_arc_to_point(st, segment, pt);

  segment.curve = arc.curve;

  if (mirror_mode) {
    $.each(mirror_data(segment), function (dir, shape) {
      if (dir == 'horizontal' || dir == 'vertical')
        shape.object.curve = -arc.curve;
      else
        shape.object.curve = arc.curve;
    });
  }
}

function plane_extremes_at_point(st, pt) {
  return plane_extremes_helper(st, pt, norm(pt));
}

function plane_extremes_helper(st, normal, dist) {
  var ext = {};

  dist = - dist;

  if (normal[0] === 0 && normal[1] === 0) {
    normal = [1, 0];
  }

  var n = normalise(normal);

  var r = canvas_rect;

  var p1 = [r[0], (-dist - n[0] * r[0]) / n[1]];
  var p2 = [r[2], (-dist - n[0] * r[2]) / n[1]];
  var p3 = [(-dist - n[1] * r[1]) / n[0], r[1]];
  var p4 = [(-dist - n[1] * r[3]) / n[0], r[3]];

  if (n[0] === 0) {
    ext.a = p1;
    ext.b = p2;
  } else if (n[1] === 0) {
    ext.a = p3;
    ext.b = p4;
  } else {
    var keep = [];
    if (between(r[1], r[3], p1[1])) keep.push(p1);
    if (between(r[1], r[3], p2[1])) keep.push(p2);
    if (between(r[0], r[2], p3[0])) keep.push(p3);
    if (between(r[0], r[2], p4[0])) keep.push(p4);
    if (keep.length != 2) {
      ext.a = p1;
      ext.b = p3;
      if (p1 == p3)
        ext.b = p4;
    } else {
      ext.a = keep[0];
      ext.b = keep[1];
    }
  }

  return ext;
}

function segment_points(st, segment) {
  var a = st.vertexes[segment.v0];
  var b = st.vertexes[segment.v1];
  return {
    a: [a.x, a.y],
    b: [b.x, b.y]
  };
}

function joint_points(st, joint) {
  var a = st.discs[joint.d0 - 1];
  var b = st.discs[joint.d1 - 1];
  return {
    a: [a.pos[0], a.pos[1]],
    b: [b.pos[0], b.pos[1]]
  };
}

function rectangle_contains(a, b, pt) {
  return between(a[0], b[0], pt[0]) &&
    between(a[1], b[1], pt[1]);
}

function near(a, b, d) {
  return Math.abs(a - b) <= d;
}

function point_add(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}

function point_subtract(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}

function dot_product(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}


// Replace the current stadium with a new stadium
function load(st) {
  stadium = st;

  if (!st.bg) st.bg = {};
  if (!st.vertexes) st.vertexes = {};
  if (!st.segments) st.segments = {};
  if (!st.discs) st.discs = {};
  if (!st.goals) st.goals = {};
  if (!st.planes) st.planes = {};
  if (!st.traits) st.traits = {};
  if (!st.joints) st.joints = [];
  if (!st.redSpawnPoints) st.redSpawnPoints = [];
  if (!st.blueSpawnPoints) st.blueSpawnPoints = [];

  field_setters = $.grep(field_setters, function (f) { return f(); });

  reset_selection();

  for_all_shapes(st, function (shape) {
    if (selected(shape.object)) {
      trigger('select', shape);
    }
  });

  resize_canvas();

  // TODO: ui and stadium validation
  // validation: all required elems are there, warn on unrelated elems
  // no elems are out of bounds or invalid values
  // max 255 of each type
}

function update_savepoint() {
  if (undo_savepoints.length)
    undo_savepoints[0] = JSON.parse(JSON.stringify(stadium));
  queue_render();
}

function savepoint() {
  undo_savepoints.unshift(JSON.parse(JSON.stringify(stadium)))
  undo_savepoints.splice(undo_levels);
  redo_savepoints = [];
}

function undo() {
  if (undo_savepoints.length <= 1)
    return false;
  redo_savepoints.unshift(undo_savepoints.shift());
  redo_savepoints.splice(undo_levels);
  load(undo_savepoints[0]);
  initialiseProperties = false;
  modified(true);
  return true;
}

function redo() {
  if (redo_savepoints.length <= 0)
    return false;
  var state1 = redo_savepoints.shift();
  undo_savepoints.unshift(state1);
  undo_savepoints.splice(undo_levels);
  load(state1);
  initialiseProperties = false;
  modified(true);
  return true;
}

function delete_selected(st) {
  for (var i = 0; i < st.discs.length; i++) {
    var a = st.discs[i];
    if (a._selected) {
      for (var j = 0; j < stadium.joints.length; j++) {
        var b = stadium.joints[j];
        if (b.d0 - 1 == i || b.d1 - 1 == i) {
          stadium.joints[j] = "kasuj";
          continue;
        }
        console.log(i, a, j, b);
        if (b.d0 - 1 > i) stadium.joints[j].d0--;
        if (b.d1 - 1 > i) stadium.joints[j].d1--;
      }
      for (var j = 0; j < stadium.joints.length; j++) {
        if (stadium.joints[j] == "kasuj") stadium.joints.splice(j, 1);
      }
    }
  }
  var vertex_del_log = [];
  var count = 0;
  // delete segments BEFORE vertices
  $.each(['segments', 'vertexes', 'goals', 'discs', 'planes'], function (i, name) {
    var group = st[name];
    if (group) {
      st[name] = $.grep(group, function (obj, i) {
        var del = selected(obj) === true; // possibly 'segment'
        if (name == 'segments') {
          var a = st.vertexes[obj.v0];
          var b = st.vertexes[obj.v1];
          if (!del) {
            if (selected(a) === true || selected(b) === true) {
              del = true;
            }
          }
          if (del) {
            if (selected(a) == 'segment') {
              shape_set_selected(Shape('vertexes', a, obj.v0), false);
            }
            if (selected(b) == 'segment') {
              shape_set_selected(Shape('vertexes', b, obj.v1), false);
            }
          }
        }
        if (del) {
          if (name == 'vertexes') {
            vertex_del_log.push(i);
          }
          count++;
          obj._deleted = true;
          return false;
        }
        return true;
      });
    }
  });
  fix_segments(st, vertex_del_log);
  resize_canvas();
  reset_selection();
  return count;
}

function fix_segments(st, vertex_del_log) {
  if (vertex_del_log.length === 0) {
    return;
  }
  var new_index = [];
  var diff = 0;
  var sz = st.vertexes.length + vertex_del_log.length;
  for (var i = 0; i <= sz; i++) {
    if (i == vertex_del_log[0]) {
      vertex_del_log.shift();
      diff++;
      new_index.push(false);
    } else {
      new_index.push(i - diff);
    }
  }
  $.each(st.segments, function (i, segment) {
    segment.v0 = new_index[segment.v0];
    segment.v1 = new_index[segment.v1];
  });
}

var tool_vertex = {
  name: 'vertex',
  cursor: 'default',
  init: function () { },
  click: function (pt) {
    var shape = add_vertex(stadium, pt);
    select_shape(stadium, shape);
    modified();
  },
  end_drag: function () { },
  key: function () { },
  down: function (pt, ev) { }
};

var tool_goal = {
  name: 'goal',
  cursor: 'default',
  init: function () { },
  click: function () { },
  end_drag: function (from, to, ev) {
    var shape = add_goal(stadium, from, to);
    select_shape(stadium, shape);
    modified();
  },
  key: function () { },
  down: function (pt, ev) {
    this.drag_from = pt;
  },
  dragging: function (from, to, ev) {
    this.drag_to = to;
    $('#mousepos').text(Math.round(dist(from, to)) + '; ' + Math.round(angle_to(from, to) / Math.PI * 180) + '°');
    queue_render();
    return false;
  },
  render: function (ctx) {
    if (mouse_dragging) {
      ctx.lineWidth = 1;
      if (this.drag_from[0] < 0 || get_prop_val('team', 'blue') == 'red') {
        ctx.strokeStyle = 'rgb(255,0,0)';
      } else {
        ctx.strokeStyle = 'rgb(0,0,255)';
      }
      ctx.beginPath();
      ctx.moveTo(this.drag_from[0], this.drag_from[1]);
      ctx.lineTo(this.drag_to[0], this.drag_to[1]);
      ctx.stroke();
    }
  }
};

var tool_plane = {
  name: 'plane',
  cursor: 'default',
  init: function () { },
  down: function () { },
  click: function (pt) {
    // TODO: proper snapping
    snap_point_for_plane(pt);
    var shape = add_plane(stadium, pt);
    select_shape(stadium, shape);
    modified();
  },
  end_drag: function () { },
  key: function () { },
  dragging: function (from, to, ev) { },
  render: function (ctx) {
    var pt = this.mouse_pos;
    if (pt) {
      // TODO: proper snapping
      snap_point_for_plane(pt);
      var ext = plane_extremes_at_point(stadium, pt);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgb(255,255,255)';
      ctx.beginPath();
      ctx.moveTo(ext.a[0], ext.a[1]);
      ctx.lineTo(ext.b[0], ext.b[1]);
      ctx.stroke();
    }
  },
  moving: function (pt, ev) {
    this.mouse_pos = pt;
    $('#mousepos').text(pt[0] + ', ' + pt[1] + '; ' + Math.round(angle_to(pt, [0, 0]) / Math.PI * 180) + '°');
    queue_render();
    return false;
  }
};

function snap_point_for_plane(pt) {
  if (Math.abs(pt[0]) < 5) {
    pt[0] = 0;
  } else if (Math.abs(pt[1]) < 5) {
    pt[1] = 0;
  }
}

function add_goal(st, a, b, is_mirror) {
  var obj = {
    p0: a,
    p1: b,
    team: a[0] > 0 ? 'blue' : 'red'
  };

  obj = $.extend({}, get_props_for_type('goals'), obj);

  st.goals.push(obj);
  var shape = Shape('goals', obj, st.goals.length - 1);

  if (mirror_mode && !is_mirror) {
    $.each(mirror_directions, function (i, dir) {
      if (!mirroring_disabled(dir) && can_mirror_segment(a, b, dir)) {
        var goa = add_goal(st, mirror_point(a, dir), mirror_point(b, dir), true);
        link_shapes(shape, goa, dir);
      }
    });
  }

  return shape;
}

function add_plane(st, pt, is_mirror) {
  var obj;
  if (pt[0] === 0 && pt[1] === 0) {
    obj.dist = 0;
    obj.normal = [1, 0];
  } else {
    obj = {
      dist: -dist([0, 0], pt),
      normal: normalise([-pt[0], -pt[1]])
    };
  }

  obj = $.extend({}, get_props_for_type('planes'), obj);

  st.planes.push(obj);
  var shape = Shape('planes', obj, st.planes.length - 1);

  if (mirror_mode && !is_mirror) {
    $.each(mirror_directions, function (i, dir) {
      if (!mirroring_disabled(dir) && can_mirror_vertex(pt, dir)) {
        var pla = add_plane(st, mirror_point(pt, dir), true);
        link_shapes(shape, pla, dir);
      }
    });
  }

  return shape;
}

function define_tab(name) {
  var button = $('#button_tab_' + name);
  var tab = $('#tab_' + name);
  button.click(function () {
    button.siblings('button').removeClass('active');
    button.addClass('active');
    tab.siblings().hide();
    tab.show();
  });
}

function point_rotate(pt, center, cos, sin) {
  var v = point_subtract(pt, center);
  return point_add(center, [
    v[0] * cos - v[1] * sin,
    v[0] * sin + v[1] * cos
  ]);
}

function rotate_obj(st, shape, center, cos, sin) {
  var type = shape.type;
  var obj = shape.object;

  var o = complete(st, obj);

  if (type == 'vertexes') {
    var n = point_rotate([o.x, o.y], center, cos, sin);
    obj.x = n[0];
    obj.y = n[1];
  }

  if (type == 'discs') {
    obj.pos = point_rotate(o.pos, center, cos, sin);
  }

  if (type == 'goals') {
    obj.p0 = point_rotate(o.p0, center, cos, sin);
    obj.p1 = point_rotate(o.p1, center, cos, sin);
  }

  if (type == 'planes') {
    var no = normalise(o.normal);
    var nn = point_rotate(no, [0, 0], cos, sin);
    var pt = point_rotate([no[0] * o.dist, no[1] * o.dist], center, cos, sin);
    var d = projected_dist(nn, pt);
    obj.normal = nn;
    obj.dist = d;
  }
}

function update_mirrored_geometry_selected(st) {
  var dm = {};
  if (mirror_mode) {
    for_all_shapes(st, function (shape) {
      if (!selected(shape.object)) {
        return;
      }
      var obj = complete(st, shape.object);
      var dat = mirror_data(shape.object);
      $.each(dat, function (dir, sh2) {
        if (!mirroring_disabled(dir)) {
          switch (sh2.type) {
            case 'vertexes':
              var pt = mirror_point([obj.x, obj.y], dir);
              sh2.object.x = pt[0];
              sh2.object.y = pt[1];
              break;
            case 'discs':
              sh2.object.pos = mirror_point(obj.pos, dir);
              sh2.object.radius = obj.radius;
              break;
            case 'goals':
              sh2.object.p0 = mirror_point(obj.p0, dir);
              sh2.object.p1 = mirror_point(obj.p1, dir);
              break;
            case 'planes':
              sh2.object.normal = mirror_point(obj.normal, dir);
              sh2.object.dist = obj.dist;
              break;
            default:
              console.warn('Unexpected shape type')
          }
        } else {
          if (selected(dat[dir].object)) {
            dm[dir] = (dm[dir] || 0) + 1;
          }
          $.each(dat, function (d1, sh1) {
            var dat1 = mirror_data(sh1.object);
            if (dat1[dir]) {
              if (selected(sh1.object) && selected(dat1[dir].object)) {
                dm[dir] = (dm[dir] || 0) + 1;
              }
              delete dat1[dir];
            }
          });
          delete dat[dir];
        }
      });
    });
  }
  $.each(dm, function (dir, count) {
    disabled_mirroring[dir] -= count / 2;
  });
}

function projected_dist(normal, pt) {
  var n = normalise(normal);
  return norm(pt) * Math.sin(Math.PI / 2 - three_point_angle(n, [0, 0], pt));
}

function add_tool(tool) {
  $('#button_tool_' + tool.name).click(function () {
    set_tool(tool);
  });
}

function select_all(test) {
  if (!test)
    test = function () { return true; };
  for_all_shapes(stadium, function (shape) {
    shape_set_selected(shape, test(shape));
  });
  queue_render();
}

function sign(n) {
  return n < 0 ? -1 : 1;
}

function resize_canvas() {
  // TODO: use scrollLeft and scrollTop to recenter the view
  var st = stadium;
  var rect;

  rect = [-st.width, -st.height, st.width, st.height];

  var consider = function (pt, r) {
    var x = pt[0];
    var y = pt[1];
    if (x - r < rect[0]) rect[0] = x - r;
    if (y - r < rect[1]) rect[1] = y - r;
    if (x + r > rect[2]) rect[2] = x + r;
    if (y + r > rect[3]) rect[3] = y + r;
  };

  for_all_shapes(stadium, function (shape) {
    var obj = shape.object;
    var o = complete(st, obj);
    switch (shape.type) {
      case 'vertexes':
        consider([o.x, o.y], 0);
        break;
      case 'goals':
        consider(o.p0, 0);
        consider(o.p1, 0);
        break;
      case 'discs':
        consider(o.pos, o.radius);
        break;
      case 'planes':
        // TODO: find a better way to ensure that a plane is reachable
        var ext = plane_extremes(st, obj);
        consider(midpoint(ext.a, ext.b), 0);
        break;
      default:
      // console.log('default case');
    }
  });

  var cd = $('#canvas_div');
  var canvas_div_size = [cd.innerWidth() - 20, cd.innerHeight() - 20];

  var rectBeforeZoom = [
    round(min(rect[0] - margin, -canvas_div_size[0] / 2)),
    round(min(rect[1] - margin, -canvas_div_size[1] / 2)),
    round(max(rect[2] + margin, canvas_div_size[0] / 2)),
    round(max(rect[3] + margin, canvas_div_size[1] / 2))
  ];

  rect = rectBeforeZoom.map(el => el * zoomScale)

  if (rect[2] - rect[0] >= 65500 || rect[3] - rect[1] >= 65500) {
    alert("Map is too big, it will be displayed in a limited way (8000x8000). Limits: height:65535, width:65535");
    rect = [-4000, -4000, 4000, 4000];
    canvas_rect = rect;
    var wh = { width: rect[2] - rect[0], height: rect[3] - rect[1] };
    $(canvas).attr(wh);
    $(canvas).css(wh);

    queue_render();
    return;
  }
  canvas_rect = rect;
  var wh = { width: rect[2] - rect[0], height: rect[3] - rect[1] };
  $(canvas).attr(wh);
  $(canvas).css(wh);

  queue_render();
}

var tool_scale = {
  name: 'scale',
  cursor: 'default',
  init: function () {
    queue_render();
  },
  down: function (pt, ev) {
    this.drag_from = pt;
  },
  click: function (pt, ev) {
    transformation_center = pt;
    queue_render();
  },
  end_drag: function (from, to, ev) {
    var v = snap_for_scale(transformation_center, from, to);
    if (scale_selected(stadium, transformation_center, v)) {
      resize_canvas();
      modified();
    }
  },
  key: function () { },
  render: render_transformation_center,
  dragging: function (from, to, ev) {
    this.drag_to = to;
    queue_render();
    return false;
  },
  transform: function (st, ctx, shape, draw) {
    if (mouse_dragging && shape_fully_selected(st, shape)) {
      var o = transformation_center;
      ctx.translate(o[0], o[1]);
      var v = snap_for_scale(o, this.drag_from, this.drag_to);
      ctx.scale(v[0], v[1]);
      ctx.translate(-o[0], -o[1]);

      $('#mousepos').text(Math.round(v[0] * 100) + '% x ' +
        Math.round(v[1] * 100) + '%');
    }
    draw();
  }
};

function render_transformation_center(ctx) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgb(0,0,0)';
  ctx.beginPath();
  ctx.arc(transformation_center[0], transformation_center[1], 2, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(transformation_center[0], transformation_center[1], 6, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.strokeStyle = 'rgb(255,255,255)';
  ctx.beginPath();
  ctx.arc(transformation_center[0], transformation_center[1], 4, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(transformation_center[0], transformation_center[1], 8, 0, Math.PI * 2, true);
  ctx.stroke();
}

function snap_for_scale(o, from, to) {
  var a = point_subtract(from, o);
  a = [a[0] || 1, a[1] || 1];
  var b = point_subtract(to, o);

  var v = [
    min(b[0] / a[0], 3),
    min(b[1] / a[1], 3)
  ];

  var k = (abs(v[0]) + abs(v[1])) / 2;

  var angle = abs(abs(angle_to([0, 0], b)) - pi / 2);

  if (angle < pi / 8) {
    v[0] = sign(v[0]);
  } else if (angle > pi * 3 / 8) {
    v[1] = sign(v[1]);
  } else {
    v[0] = sign(v[0]) * k;
    v[1] = sign(v[1]) * k;
  }

  return v;
}

function scale_selected(st, c, v) {

  var count = 0;

  // scaling segemnts requires the original vertex value, so scale them first

  for_all_shapes(st, ['segments', 'vertexes', 'discs', 'goals', 'planes', 'joints'], function (shape) {
    if (!selected(shape.object))
      return;

    count++;

    var type = shape.type;
    var obj = shape.object;

    var o = complete(st, obj);

    var m = Math.sqrt(abs(v[0] * v[1]));

    if (type == 'vertexes') {
      var pt = point_scale([o.x, o.y], c, v);
      obj.x = pt[0];
      obj.y = pt[1];
    }

    else if (type == 'discs') {
      obj.pos = point_scale(o.pos, c, v);
      obj.radius = abs(m) * o.radius;
    }

    else if (type == 'goals') {
      obj.p0 = point_scale(o.p0, c, v);
      obj.p1 = point_scale(o.p1, c, v);
    }

    else if (type == 'planes') {
      var n = normalise(o.normal);
      var vi = [v[1], v[0]];
      obj.normal = normalise(point_scale(n, [0, 0], vi));
      var pt = point_scale([n[0] * o.dist, n[1] * o.dist], c, v);
      obj.dist = projected_dist(obj.normal, pt);
    }

    else if (type == 'segments') {
      if (o.curve && v[0] != v[1]) {
        var av = [abs(v[0]), abs(v[1])];
        var arc = segment_arc(st, o);
        var vi = [av[1], av[0]];
        var oac = point_subtract(arc.a, arc.center);
        //var obc = point_subtract(arc.b, arc.center);
        var ap = point_scale([-oac[1], oac[0]], [0, 0], av);
        //var bp = point_scale([-obc[1], obc[0]], [0,0], av);
        var ac = [-ap[1], ap[0]];
        //var bc = [-bp[1], bp[0]];
        var a = point_scale(arc.a, c, av);
        var b = point_scale(arc.b, c, av);
        var m = midpoint(a, b);
        var ma = point_subtract(a, m);
        var u = [-ma[1], ma[0]];
        var centera = intersect_lines(m, point_add(m, u), a, point_add(a, ac));
        //var centerb = intersect_lines(m, point_add(m, u), b, point_add(b, bc));
        if (centera /* && centerb */) {
          var cua = curve_from_center(centera, a, b, o.curve);
          //var cub = curve_from_center(centerb, a, b, o.curve)
          //obj.curve = (cua + cub) / 2 * sign(v[0]*v[1]);
          obj.curve = cua * sign(v[0] * v[1]);
        }
      }
    }
  });

  update_mirrored_geometry_selected(st);

  return count;
}

function intersect_lines(p1, p2, p3, p4) {
  // http://en.wikipedia.org/wiki/Line-line_intersection
  var d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
  var k = p1[0] * p2[1] - p1[1] * p2[0];
  var l = p3[0] * p4[1] - p3[1] * p4[0];
  return [
    (k * (p3[0] - p4[0]) - (p1[0] - p2[0]) * l) / d,
    (k * (p3[1] - p4[1]) - (p1[1] - p2[1]) * l) / d
  ];
}

function midpoint(a, b) {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function shape_fully_selected(st, shape) {
  if (shape.type != 'segments')
    return selected(shape.object);
  else
    return (selected(st.vertexes[shape.object.v0]) &&
      selected(st.vertexes[shape.object.v1]));
}

function point_scale(pt, o, v) {
  return [
    (pt[0] - o[0]) * v[0] + o[0],
    (pt[1] - o[1]) * v[1] + o[1]
  ];
}

function initialise_properties_css() {
  var rules = [];

  $.each(type_properties, function (type, props) {
    $.each(props, function (i, prop) {
      var opts = properties[prop];
      rules.push('.selected_' + type + '.selected_tool_other .prop_' + prop + ' { display: block }');
      if (opts.def)
        rules.push('.selected_tool_' + type + ' .prop_' + prop + '{ display: block }');
    });
  });

  $('<style type="text/css">' + rules.join('\n') + '</style>').appendTo($('head'));
}

function populate_tab_properties() {
  var tp = $('#tab_properties');
  $.each(properties, function (prop, opts) {
    var type = opts.type;
    if (type != 'ref') {
      var div = $('<div class="property prop_' + prop + '"></div>').appendTo(tp);
      var label = $('<label class="prop">' + prop + '</label>').appendTo(div);
      var apply = function () {
        property_apply(prop, property_data[prop]);
      };
      switch (type) {

        // TODO: number point color team trait bool

        case 'point':
        case 'number':
        case 'color':
        case 'team':
        case 'layers':
        case 'trait':
        case 'bool':
          var inp = $('<input type="text" class="prop">').appendTo(div);
          property_data[prop] = inp;
          inp.change(apply);
          break;
        default:
          console.log('default case');
          break;
      }
    }
  });
}

function property_apply(prop, inp) {
  var val = get_prop_val(prop);
  if (val !== undefined) {
    for_selected(stadium, function (st, shape) {
      shape.object[prop] = val;
      // TODO: mirror the property update
    });
    modified();
  }
}

function get_prop_val(prop, def) {
  var inp = property_data[prop];
  if (!inp)
    return def;
  var type = properties[prop].type;
  var val = inp.val();
  switch (type) {
    case 'point':
      var m = val.match(/^(-?[0-9]+(\.[0-9]+)?)[,;] ?(-?[0-9]+(\.[0-9]+)?)$/);
      if (m) return [parseFloat(m[1]), parseFloat(m[3])];
      break;
    case 'number':
      var m = val.match(/^(-?[0-9]+(\.[0-9]+)?)$/);
      if (m) return parseFloat(m[1]);
      break;
    case 'color':
      if (val == "transparent") {
        return "transparent";
        break;
      }
      var m = val.match(/^[A-Z0-9]{6}$/i);
      if (m) return m[0];
      break;
    case 'team':
      var m = val.match(/^red|blue$/i);
      if (m) return m[0];
      break;
    case 'layers':
      var layers = val.split(/[,; ]+/);
      var good = true;
      $.each(layers, function (i, layer) {
        if ($.inArray(layer, ['ball', 'red', 'blue', 'wall', 'redKO', 'blueKO', 'all', 'kick', 'score', 'c0', 'c1', 'c2', 'c3']) == -1)
          good = false;
      });
      if (good) return layers;
      break;
    case 'trait':
      if (stadium.traits[val])
        return val;
      break;
    case 'bool':
      var m = val.match(/^true|false$/i);
      if (m == 'true') return true;
      if (m == 'false') return false;
      break;
    default:
      console.warn('Unexpected type')
  }
  if (val !== '') {
    inp.addClass('error');
  }
  return def;
}

function set_prop_val(prop, val) {
  var inp = property_data[prop];
  if (!inp)
    return;

  inp.removeClass('error');

  if (val === undefined) {
    inp.val('');
    return;
  }

  var type = properties[prop].type;
  switch (type) {
    case 'point':
      inp.val(val[0] + ',' + val[1]);
      break;
    case 'number':
    case 'team':
    case 'trait':
    case 'bool':
      inp.val('' + val);
      break;
    case 'color':
      if (val instanceof Array) {
        inp.val(rgb_to_hex(val));
      } else {
        inp.val(val);
      }
      break;
    case 'layers':
      inp.val(val.join(','));
      break;
    default:
      console.warn('Unexpected type')
  }
}

triggers.set_tool.push(function (tool, old_tool) {
  var tp = $('#tab_properties');
  tp.removeClass(tool_class_name(old_tool));
  tp.addClass(tool_class_name(tool));
});

function tool_class_name(tool) {
  if (!tool)
    return 'selected_tool_none';
  switch (tool.name) {
    case 'segment': return 'selected_tool_segments';
    case 'vertex': return 'selected_tool_vertexes';
    case 'plane': return 'selected_tool_planes';
    case 'disc': return 'selected_tool_discs';
    case 'goal': return 'selected_tool_goals';
    default: return 'selected_tool_other';
  }
}

function get_props_for_type(type) {
  // TODO: if the prop is the same as from the trait, don't return it
  var props = {};
  $.each(type_properties[type], function (i, prop) {
    var opts = properties[prop];
    if (opts.def) {
      var val = get_prop_val(prop);
      if (val !== undefined)
        props[prop] = val;
    }
  });
  return props;
}

function reset_selection() {
  trigger('reset_selection');
}

function add_props_from_shape(shape) {
  var obj = complete(stadium, shape.object);

  total_selected_by_type[shape.type] = (total_selected_by_type[shape.type] || 0) + 1;

  $('#tab_properties').addClass('selected_' + shape.type);

  $.each(type_properties[shape.type], function (i, prop) {
    var n = total_selected_by_prop[prop] || 0;
    total_selected_by_prop[prop] = n + 1;

    var val = obj[prop];
    if (n === 0) {
      set_prop_val(prop, val);
    } else if (!equal(val, get_prop_val(prop))) {
      set_prop_val(prop, undefined);
    }
  });
}

triggers.select.push(add_props_from_shape);


triggers.unselect.push(function (shape) {
  var count = total_selected_by_type[shape.type] - 1;
  total_selected_by_type[shape.type] = count;
  if (count === 0) {
    $('#tab_properties').removeClass('selected_' + shape.type);
  }
  $.each(type_properties[shape.type], function (i, prop) {
    total_selected_by_prop[prop] -= 1;
  });
});

triggers.reset_selection.push(function () {
  total_selected_by_type = {};
  total_selected_by_prop = {};
});

function list_equal(a, b) {
  if (a.length != b.length)
    return false;
  for (var i = 0; i < a.length; i++) {
    if (!equal(a[i], b[i]))
      return false;
  }
  return true;
}

function equal(a, b) {
  // TODO: other types. atm this is just used to compare numbers, strings and arrays
  if (a instanceof Array) {
    return (b instanceof Array) && list_equal(a, b);
  } else {
    return a == b;
  }
}

function modified(do_not_save) {
  if (!do_not_save) savepoint(stadium);
  update_props(stadium);
  $('#button_save').addClass('modified');
  queue_render();
}

function update_props(st) {
  $('#tab_properties').attr('class', tool_class_name(current_tool));

  total_selected_by_type = {};
  total_selected_by_prop = {};

  for_all_shapes(st, function (shape) {
    if (selected(shape.object)) {
      add_props_from_shape(shape);
    }
  });
}

function rgb_to_hex(rgb) {
  return rgb[0].toString(16) +
    rgb[1].toString(16) +
    rgb[2].toString(16);
}

function copy() {
  clipboard = clone_selected(stadium);
}

function paste() {
  import_snippet(stadium, clipboard);
}

function cut() {
  copy();
  delete_selected(stadium);
}

function duplicate() {
  import_snippet(stadium, clone_selected(stadium));
}

function clone_selected(st) {
  // TODO: also clone traits, and on pasting if traits don't exist, create them with cloned properties
  var snip = {
    shapes: []
  };
  for_all_shapes(st, function (shape) {
    if (selected(shape.object)) {
      snip.shapes.push(shape_clone(shape));
      if (shape.type == 'segments') {
        var a = st.vertexes[shape.object.v0];
        if (!selected(a)) {
          snip.shapes.push(shape_clone(Shape('vertexes', a, shape.object.v0)));
        }
        var b = st.vertexes[shape.object.v1];
        if (!selected(b)) {
          snip.shapes.push(shape_clone(Shape('vertexes', b, shape.object.v1)));
        }
      }
    }
  });
  return snip;
}

function import_snippet(st, snip) {
  if (!snip)
    return;
  clear_selection(st);
  var svl = st.vertexes.length;
  var newi = {};
  $.each(snip.shapes, function (i, shape) {
    var index = st[shape.type].length;
    var copy = $.extend(true, {}, shape.object);
    if (shape.type == 'vertexes') {
      if (!(shape.index in newi)) {
        newi[shape.index] = svl++;
      }
      index = newi[shape.index];
    } else if (shape.type == 'segments') {
      var v0 = copy.v0;
      var v1 = copy.v1;

      if (!(v0 in newi))
        newi[v0] = svl++;
      copy.v0 = newi[v0];

      if (!(v1 in newi))
        newi[v1] = svl++;
      copy.v1 = newi[v1];
    }
    st[shape.type][index] = copy;
    shape_set_selected(Shape(shape.type, st[shape.type][index], index), true);
  });
}

function eachRev(l, f) {
  var n = l.length;
  $.each(l.slice().reverse(), function (i, v) {
    return f(n - i - 1, v);
  });
}

function mirror_data(object) {
  var dat = data(object, 'mirror');
  if (dat === undefined) {
    dat = {};
    data(object, 'mirror', dat);
  }
  return dat;
}

function reset_mirror_data(st) {
  // TODO: how to handle shapes at exactly the same position?

  clear_selection(st);

  var link_types = ['horizontal', 'vertical', 'across'];

  for_all_shapes(st, ['vertexes', 'segments', 'goals', 'discs', 'planes'], function (sh1) {
    if (!emptyp(mirror_data(sh1.object)))
      return;
    for_all_shapes(st, [sh1.type], function (sh2) {
      if (!emptyp(mirror_data(sh2.object)))
        return;
      switch (sh1.type) {
        case 'vertexes':
          var pt1 = [sh1.object.x, sh1.object.y];
          var pt2 = [sh2.object.x, sh2.object.y];
          $.each(link_types, function (i, type) {
            if (mirror_of(pt1, pt2, type)) {
              link_shapes(sh1, sh2, type);
            }
          });
          break;

        case 'segments':
          var v0 = st.vertexes[sh1.object.v0];
          var v1 = st.vertexes[sh1.object.v1];
          var ma = mirror_data(st.vertexes[sh2.object.v0]);
          var mb = mirror_data(st.vertexes[sh2.object.v1]);
          $.each(link_types, function (i, type) {
            if (ma[type] == v0 && mb[type] == v1 &&
              complete(st, sh1.object).curve == complete(st, sh2.object).curve) {
              link_shapes(sh1, sh2, type);
            } else if (ma[type] == v1 && mb[type] == v0 &&
              complete(st, sh1.object).curve == -complete(st, sh2.object).curve) {
              shape_switch_ends(sh1);
              link_shapes(sh1, sh2, type);
            }
          });
          break;

        case 'discs':
          if (sh1.object.radius == sh2.object.radius) {
            $.each(link_types, function (i, type) {
              if (mirror_of(sh1.object.pos, sh2.object.pos, type)) {
                link_shapes(sh1, sh2, type);
              }
            });
          }
          break;

        case 'goals':
          $.each(link_types, function (i, type) {
            if (mirror_of(sh1.object.p0, sh2.object.p0, type) &&
              mirror_of(sh1.object.p1, sh2.object.p1, type)) {
              link_shapes(sh1, sh2, type);
            } else if (mirror_of(sh1.object.p0, sh2.object.p1, type) &&
              mirror_of(sh1.object.p1, sh2.object.p0, type)) {
              shape_switch_ends(sh1);
              link_shapes(sh1, sh2, type);
            }
          });
          break;

        case 'planes':
          $.each(link_types, function (i, type) {
            if (sh1.object.dist == sh2.object.dist &&
              mirror_of(sh1.object.normal, sh2.object.normal, type)) {
              link_shapes(sh1, sh2, type);
            }
          });
          break;
        default:
          console.warn('Unexpected shape type')
      }
    });
  });

  queue_render();
}

function mirror_of(pt1, pt2, type) {
  return !equal(pt1, pt2) && equal(pt1, mirror_point(pt2, type));
}

function mirror_point(pt, type) {
  switch (type) {
    case 'horizontal':
      return [-pt[0], pt[1]];
    case 'vertical':
      return [pt[0], -pt[1]];
    case 'across':
      return [-pt[0], -pt[1]];
    default:
      console.warn('unexpected type')
  }
}

function link_shapes(sh1, sh2, dir) {
  if (sh1.object == sh2.object)
    return;
  var dat1 = mirror_data(sh1.object)
  var dat2 = {};
  var cancel = false;
  $.each(dat1, function (k, sh3) {
    if (sh3.object == sh1.object || sh3.object == sh2.object)
      cancel = true;
  });
  if (cancel)
    return;
  $.each(dat1, function (k, sh3) {
    dat2[compose_mirror_directions(dir, k)] = sh3;
    mirror_data(sh3.object)[compose_mirror_directions(dir, k)] = sh2;
  });
  dat1[dir] = sh2;
  dat2[dir] = sh1;
  data(sh2.object, 'mirror', dat2)
}

function emptyp(o) {
  for (let i in o) {
    return false;
  }
  return true;
}

function shape_switch_ends(sh) {
  switch (sh.type) {
    case 'segments':
      var seg = sh.object;
      seg.curve = -seg.curve;
      var tmp = seg.v0;
      seg.v0 = seg.v1;
      seg.v1 = tmp;
      break;

    case 'goals':
      var tmp = sh.object.p0;
      sh.object.p0 = sh.object.p1;
      sh.object.p1 = tmp;
      break;
    default:
      console.warn('unexpected type')
  }
}

function clear_mirror_data(st) {
  for_all_shapes(st, function (shape) {
    data(shape.object, 'mirror', {});
  });
  disabled_mirroring = {};
}

triggers.select.push(function (sh1) {
  //if mirror of shape is selected too, disable mirroring in that direction
  $.each(mirror_data(sh1.object), function (dir, sh2) {
    if (selected(sh2.object)) {
      disabled_mirroring[dir] = (disabled_mirroring[dir] || 0) + 1;
    }
  });
});

triggers.unselect.push(function (sh1) {
  $.each(mirror_data(sh1.object), function (dir, sh2) {
    if (selected(sh2.object)) {
      disabled_mirroring[dir]--;
    }
  });
});

triggers.reset_selection.push(function () {
  disabled_mirroring = {};
});

function compose_mirror_directions(d1, d2) {
  return {
    'horizontal vertical': 'across',
    'vertical horizontal': 'across',
    'across vertical': 'horizontal',
    'vertical across': 'horizontal',
    'across horizontal': 'vertical',
    'horizontal across': 'vertical'
  }[d1 + ' ' + d2];
}

function segment_vertices(st, seg) {
  var v0 = seg.object.v0;
  var v1 = seg.object.v1;
  return [
    Shape('vertexes', st.vertexes[v0], v0),
    Shape('vertexes', st.vertexes[v1], v1)
  ];
}

function mirroring_disabled(dir) {
  if (!mirror_mode)
    return true;
  if (disabled_mirroring['across'])
    return true;
  if (dir == 'across')
    return disabled_mirroring['across'] || disabled_mirroring['horizontal'] || disabled_mirroring['vertical'];
  if (disabled_mirroring[dir])
    return true;
  return false;
}

function shape_clone(shape) {
  return Shape(shape.type, object_clone(shape.object), shape.index);
}

function object_clone(obj) {
  var clone = {};
  $.each(obj, function (k, v) {
    if (k != '_data') {
      if (v instanceof Array) {
        clone[k] = $.extend([], v);
      } else if (typeof v == 'object') {
        clone[k] = $.extend({}, v);
      } else {
        clone[k] = v;
      }
    }
  });
  return clone;
}

function allowJoint() {
  document.getElementById("button_addJoint").style = "background-color: #347c40";
}

function disallowJoint() {
  document.getElementById("button_addJoint").style = "background-color: #696969";
}

function jointAlertOn() {
  if (total_selected_by_type.discs == 2) {
    allowJoint();
  } else {
    disallowJoint();
    document.getElementById("joint_alert").innerHTML = "⚠️ 2 discs must be selected. Now selected: " + total_selected_by_type.discs;
    if (total_selected_by_type.discs == undefined) document.getElementById("joint_alert").innerHTML = "⚠️ 2 discs must be selected. Now selected: 0";
  }
}

function jointAlertOff() {
  document.getElementById("joint_alert").innerHTML = "";
}



function plane_extremes(st, plane) {
  var ext = data(plane, 'extremes');

  // TODO: complete the plane object

  if (ext && ext.normal[0] == plane.normal[0] && ext.normal[1] == plane.normal[1] && ext.dist == plane.dist &&
    list_equal(canvas_rect, ext.canvas_rect)) {
    return ext;
  }
  ext = { normal: [plane.normal[0], plane.normal[1]], dist: plane.dist, canvas_rect: canvas_rect };

  var pts = plane_extremes_helper(st, ext.normal, ext.dist);

  ext.a = pts.a;
  ext.b = pts.b;

  data(plane, 'extremes', ext);
  return ext;
}


// handler for the window resize event
function resize() {
  var h = $(window).height();
  $('#table').height(h - 96);
  $('#box').height(h - 126);
  var w = $(window).width();
  window_width = w;
  var cdp = $('#canvas_div_placeholder');
  var off = cdp.offset();
  var cd = $('#canvas_div');
  cd.css(off);
  w = cdp.width();
  cd.width(w);
  h = cdp.height();
  cd.height(h);
  resize_canvas();
}


function renderStadium(st) {

  var transform;
  canvas = document.getElementById('canvas');

  if (current_tool && current_tool.transform) {
    transform = function (shape, draw) {
      ctx.save();
      current_tool.transform(st, ctx, shape, draw);
      ctx.restore();
    };
  } else {
    transform = function (shape, draw) { draw(); };
  }

  var ctx = canvas.getContext('2d');

  try {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  } catch (error) {
    alert('You can\'t zoom in any more');
    zoomScale /= zoomFactor;
    resize_canvas()
    return;
  }

  ctx.clearRect(0, 0, canvas_rect[2] - canvas_rect[0], canvas_rect[3] - canvas_rect[1]);

  ctx.translate(-canvas_rect[0], -canvas_rect[1]);

  ctx.scale(zoomScale, zoomScale);

  if (settings.preview) {
    ctx.beginPath();
    ctx.moveTo(-st.width, -st.height);
    ctx.lineTo(st.width, -st.height);
    ctx.lineTo(st.width, st.height);
    ctx.lineTo(-st.width, st.height);
    ctx.clip();
  }

  renderbg(st, ctx);

  if (!settings.preview) $.each(st.planes, function (i, plane) {
    transform(Shape('planes', plane, i), function () {
      var ext = plane_extremes(st, plane);
      ctx.beginPath();
      ctx.moveTo(ext.a[0], ext.a[1]);
      ctx.lineTo(ext.b[0], ext.b[1]);
      if (selected(plane)) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = colors.selected;
        ctx.stroke();
      }
      ctx.lineWidth = 2;
      ctx.strokeStyle = colors.plane_thick;
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.plane_thin;
      ctx.stroke();
    });
  });

  if (!settings.preview) $.each(st.vertexes, function (i, vertex) {
    transform(Shape('vertexes', vertex, i), function () {
      vertex = complete(st, vertex);
      ctx.fillStyle = selected(vertex) ? colors.selected : colors.vertex;
      ctx.fillRect(vertex.x - 3, vertex.y - 3, 6, 6);
    });
  });

  $.each(st.segments, function (i, segment) {
    transform(Shape('segments', segment, i), function () {
      segment = complete(st, segment);
      render_segment_arc(ctx, segment, segment_arc(st, segment));
    });
  });

  if (!settings.preview) $.each(st.goals, function (i, goal) {
    transform(Shape('goals', goal, i), function () {
      goal = complete(st, goal);
      ctx.beginPath();
      ctx.moveTo(goal.p0[0], goal.p0[1]);
      ctx.lineTo(goal.p1[0], goal.p1[1]);
      if (selected(goal)) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = colors.selected;
        ctx.stroke();
      }
      ctx.lineWidth = 2;
      ctx.strokeStyle = colors[goal.team].thick;
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors[goal.team].thin;
      ctx.stroke();
    });
  });

  $.each(st.joints, function (i, joint) {
    transform(Shape('joints', joint, i), function () {
      joint = complete(st, joint);
      ctx.beginPath();
      ctx.moveTo(stadium.discs[joint.d0 - 1].pos[0], stadium.discs[joint.d0 - 1].pos[1]);
      ctx.lineTo(stadium.discs[joint.d1 - 1].pos[0], stadium.discs[joint.d1 - 1].pos[1]);
      if (selected(joint)) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = colors.selected;
        ctx.stroke();
      }
      ctx.strokeStyle = 'rgb(0,0,0)';
      if (joint.color != "transparent") {
        ctx.strokeStyle = "#" + joint.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        ctx.lineWidth = 2;
        ctx.strokeStyle = colors.invisible_thick;
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = colors.invisible_thin;
        ctx.stroke();
      }
    });
  });

  $.each(st.discs, function (i, disc) {
    transform(Shape('discs', disc, i), function () {
      disc = complete(st, disc);
      ctx.beginPath();
      var radius = disc.radius !== undefined ? disc.radius : haxball.default_disc_radius;
      ctx.arc(disc.pos[0], disc.pos[1], radius, 0, Math.PI * 2, true);
      if (selected(disc) && !settings.preview) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = colors.selected;
        ctx.stroke();
      }
      ctx.strokeStyle = 'rgb(0,0,0)';
      ctx.lineWidth = 2;
      if (disc.color != "transparent") ctx.fillStyle = color_to_style(disc.color, haxball.disc_color);
      if (disc.color != "transparent") {
        ctx.fill();
      }
      ctx.stroke();
    });
  });



  $.each(debug_render, function (i, f) { f(ctx); });

  if (settings.preview) {
    // TODO: use exact colors and sizes

    ctx.beginPath();
    ctx.arc(0, 0, (stadium.ballPhysics?.radius ?? 10), 0, Math.PI * 2, true);
    ctx.fillStyle = 'rgb(255,255,255)';
    if (stadium.ballPhysics.color !== undefined) ctx.fillStyle = '#' + stadium.ballPhysics.color;
    ctx.strokeStyle = 'rgb(0,0,0)';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    if (st.redSpawnPoints && st.redSpawnPoints.length > 0) {
      for (var i = 0; i < st.redSpawnPoints.length; i++) {
        ctx.beginPath();
        ctx.arc(st.redSpawnPoints[i][0], st.redSpawnPoints[i][1], 15, 0, Math.PI * 2, true);
        ctx.fillStyle = 'rgb(229,110,86)';
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.font = 'bold 15px Arial';
        var odl = (i + 1).toString().length > 1 ? 7.5 : 3.75
        ctx.fillText('' + (i + 1), st.redSpawnPoints[i][0] - odl, st.redSpawnPoints[i][1] + 3.75)
      }
    } else {
      ctx.beginPath();
      ctx.arc(-st.spawnDistance, 0, 15, 0, Math.PI * 2, true);
      ctx.fillStyle = 'rgb(229,110,86)';
      ctx.lineWidth = 2.5;
      ctx.fill();
      ctx.stroke();
    }

    if (st.blueSpawnPoints && st.blueSpawnPoints.length > 0) {
      for (var i = 0; i < st.blueSpawnPoints.length; i++) {
        ctx.beginPath();
        ctx.arc(st.blueSpawnPoints[i][0], st.blueSpawnPoints[i][1], 15, 0, Math.PI * 2, true);
        ctx.fillStyle = 'rgb(86,137,229)';
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.font = 'bold 15px Arial';
        var odl = (i + 1).toString().length > 1 ? 7.5 : 3.75
        ctx.fillText('' + (i + 1), st.blueSpawnPoints[i][0] - odl, st.blueSpawnPoints[i][1] + 3.75)
      }
    } else {
      ctx.beginPath();
      ctx.arc(st.spawnDistance, 0, 15, 0, Math.PI * 2, true);
      ctx.fillStyle = 'rgb(86,137,229)';
      ctx.lineWidth = 2.5;
      ctx.fill();
      ctx.stroke();
    }

  }

  if (!settings.preview && current_tool && current_tool.render) {
    current_tool.render(ctx);
  }

}

function saveCanvas() {
  canvas = document.getElementById('canvas');
}

function reloadStadium() {
  zoomScale = 1;
  resize_canvas();
  renderStadium(stadium);
  var el = document.getElementById('canvas_div');
  el.scrollLeft = canvas_rect[2] - el.clientWidth / 2;
  el.scrollTop = canvas_rect[3] - el.clientHeight / 2;
}

function new_stadium() {

  return {
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
  };
}

function handleZoomChange(e) {
  var x = e.target.value;
  if (x <= 20) zoomScale = x / 20
  else zoomScale = (x - 18) / 2;
  document.getElementById('zoomLabel').innerHTML = 'x' + zoomScale.toFixed(2);
  renderStadium(stadium);
}

function handleButtonClick(e) {
  var a = e.target.id;
  if (e.target.tagName == 'IMG') a = e.target.parentElement.id;
  if (a == 'button_mirror_mode') {
    mirror_mode = mirror_mode ? false : true;
    if (mirror_mode) {
      $('#button_mirror_mode').addClass('active');
      reset_mirror_data(stadium);
    } else {
      $('#button_mirror_mode').removeClass('active');
      clear_mirror_data(stadium);
    }
  } else if (a == 'button_redSpawnPoint') {
    var xxx = document.getElementById('prop_spawnPointX').value;
    var yyy = document.getElementById('prop_spawnPointY').value;
    document.getElementById("prop_spawnPointX").value = "";
    document.getElementById("prop_spawnPointY").value = "";
    stadium.redSpawnPoints.push([Number(xxx), Number(yyy)]);
  } else if (a == 'button_blueSpawnPoint') {
    var xxx = document.getElementById('prop_spawnPointX').value;
    var yyy = document.getElementById('prop_spawnPointY').value;
    document.getElementById("prop_spawnPointX").value = "";
    document.getElementById("prop_spawnPointY").value = "";
    stadium.blueSpawnPoints.push([Number(xxx), Number(yyy)]);
  } else if (a == 'button_resetRed') {
    stadium.redSpawnPoints = [];
    document.getElementById("button_resetRed").innerHTML = "Spawnpoints resetted!";
    setTimeout(function () {
      document.getElementById("button_resetRed").innerHTML = "Reset Spawnpoints";
    }, 1200);
  } else if (a == 'button_resetBlue') {
    stadium.blueSpawnPoints = [];
    document.getElementById("button_resetBlue").innerHTML = "Spawnpoints resetted!";
    setTimeout(function () {
      document.getElementById("button_resetBlue").innerHTML = "Reset Spawnpoints";
    }, 1200);
  } else if (a == 'pref_preview') {
    $('#pref_preview').toggleClass('active');
    settings.preview = $('#pref_preview').hasClass('active');
    queue_render();
  } else if (a == 'button_addJoint') {
    if (total_selected_by_type.discs != 2) return;
    document.getElementById("button_addJoint").innerHTML = "Joint added!";
    setTimeout(function () {
      document.getElementById("button_addJoint").innerHTML = "Add Joint";
    }, 1200);
    var joint = {}
    for (var i = 0; i < stadium.discs.length; i++) {
      if (stadium.discs[i]._selected) {
        if (joint.d0) joint.d1 = i + 1
        else joint.d0 = i + 1;
      }
    }
    var le = document.getElementById("inputLength").value;
    if (le == "null") joint.length = "null";
    else {
      var tap = le.split(",");
      if (tap.length == 2) {
        joint.length = [];
        joint.length[0] = Number(tap[0]);
        joint.length[1] = Number(tap[1]);
      } else joint.length = Number(le);
    }
    if (document.getElementById("inputStrength").value == "rigid") joint.strength = "rigid";
    else joint.strength = Number(document.getElementById("inputStrength").value);
    if (isNaN(joint.strength)) joint.strength = "rigid";
    joint.color = document.getElementById("inputColor").value;
    stadium.joints.push(joint);
    queue_render();
  } else if (a == 'button_delete') {
    if (delete_selected(stadium))
      modified();
  } else if (a == 'button_select_all') {
    select_all();
  } else if (a == 'button_select_none') {
    select_all(function () { return false; });
  } else if (a == 'button_inverse_selection') {
    select_all(function (shape) { return !selected(shape.object); });
  } else if (a == 'copy') {
    copy();
  } else if (a == 'button_paste') {
    paste();
    modified();
  } else if (a == 'button_cut') {
    cut();
    modified();
  } else if (a == 'button_duplicate') {
    duplicate();
    modified();
  } else if (a.startsWith('button_zoom')) {
    var scroll = [document.getElementById('canvas_div').scrollTop, document.getElementById('canvas_div').scrollLeft, zoomScale];
    zoomScale = Number(a.substring(11));
    resize_canvas();
    renderStadium(stadium);
    document.getElementById('canvas_div').scrollTop = scroll[0] * zoomScale / scroll[2];
    document.getElementById('canvas_div').scrollLeft = scroll[1] * zoomScale / scroll[2];
  } else if (a == 'test_button') {
    document.getElementById("zoom").classList.toggle("hidden");
    document.getElementById("zoomLabel").classList.toggle("hidden");
  } else if (a.startsWith('button_loadBasic')) {
    stadium = JSON.parse(JSON.stringify(basicStadiums[a.substring(17)]));
    load(stadium);
    reloadStadium();
    initialiseProperties = false;
  }
}

function StadiumCreator() {

  const [counter, setCounter] = useState(0);
  const stadiumState = useSelector((state) => state.stadium.value);
  const mainMode = useSelector((state) => state.mainMode.value);
  const dispatch = useDispatch();

  stadium = JSON.parse(JSON.stringify(stadiumState))

  useEffect(() => {
    var can = document.getElementById('canvas');
    if (can == null) return;
    setCounter(counter + 1);
    if (counter > 1) {
      starting();
    }
  }, [stadiumState]);

  useEffect(() => {
    if (mainMode == 'stadiumCreator') $("#table").fadeTo(300, 1)
  }, [mainMode]);

  useEffect(() => {
    if (stadium == '') {
      stadium = new_stadium();
      dispatch(editStadium(stadium));
    }
    saveCanvas();
    load_tile('grass');
    load_tile('hockey');

    $(document).bind('keydown', handle_key);

    define_tab('properties');
    define_tab('advanced');
    define_tab('edit');
    define_tab('joints');
    define_tab('spawnpoints');
    define_tab('basic_stadiums');
    // define_tab('haxmaps')

    initialise_properties_css();
    populate_tab_properties();

    reset_selection();

    window.addEventListener('resize', resize)

    resize();

    load(stadium);
    modified();
    reloadStadium();

    add_tool(tool_select);
    add_tool(tool_segment);
    add_tool(tool_disc);
    add_tool(tool_vertex);
    add_tool(tool_plane);
    add_tool(tool_goal);
    add_tool(tool_rotate);
    add_tool(tool_scale);

    set_tool(tool_select);

    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', resize)
    }
  }, []);

  function updateStadium() {
    dispatch(editStadium(stadium));
  }

  function addtoHaxmaps(e) {
    // e.preventDefault();
    // console.log(e);
    // var err = 0;

    // if ($('#map-name').val() == 'Name:' || $('#map-name').val() == '' || $('#map-name').val() == 'Goal Name/Owner:') {
    //   $('#map-name').css("border", "1px solid red");
    //   err = 1;
    // } else
    //   $('#map-name').css("border", "1px solid #3C312B");

    // if ($('#map').val() != '') {
    //   if ($('#map').val().indexOf($('#map').attr('rel')) == -1) {
    //     $('.upload').css("border", "1px solid red");
    //     err = 1;
    //   } else
    //     $('.upload').css("border", "1px solid #3C312B");
    // } else {
    //   $('.upload').css("border", "1px solid red");
    //   err = 1;
    // }

    // stadium = props.stadium;
    // for (let joint of stadium.joints) if (joint.length == "null") joint.length = null;
    // if (stadium.canBeStored == "true" || stadium.canBestored == true) stadium.canBeStored = true;
    // else stadium.canBeStored = false;
    // var blob = new Blob([JSON.stringify(stadium)], { type: 'text/plain' });

    // const formData = new FormData();
    // formData.append('map-name', 'Test map by HBSE');
    // formData.append('authornick', 'Haxball Stadium Editor');
    // formData.append('description', 'Map made and uploaded by Haxball Stadium Editor');

    // formData.append("map", blob, 'testStadium.hbs');

    // const request = new XMLHttpRequest();
    // request.open("POST", "https://haxmaps.com/hb/form");
    // request.send(formData);

    // request.onreadystatechange = function () {
    //   if (request.readyState === 4) {
    //     console.log(request.status);
    //     console.log(request.responseText);
    //   }
    // };

    // const file = new File([blob], "Test Stadium.hbs", {
    //   type: "text/plain",
    // });
    // var a = window.document.createElement("a");
    // a.href = window.URL.createObjectURL(blob);
    // a.download = stadium.name + ".hbs";
    // document.body.appendChild(a);
    // console.log(a);
    // $('#map').val = file
    // if (err == 0) $('#upload').submit();
    // $('#upload').submit();
  }

  function handleWheel(e) {
    if (e.target.id === 'canvas') {
      var oldZoom = zoomScale;
      if (e.deltaY > 0) zoomScale /= zoomFactor;
      else zoomScale *= zoomFactor;

      var oldScrollLeft = {}, newScrollLeft = {}, moveScroll = {};
      oldScrollLeft.x = current_mouse_position[0];
      newScrollLeft.x = (e.layerX - canvas_rect[2] * zoomScale / oldZoom) / zoomScale;
      moveScroll.x = (newScrollLeft.x - oldScrollLeft.x) * zoomScale;

      oldScrollLeft.y = current_mouse_position[1];
      newScrollLeft.y = (e.layerY - canvas_rect[3] * zoomScale / oldZoom) / zoomScale;
      moveScroll.y = (newScrollLeft.y - oldScrollLeft.y) * zoomScale;

      resize_canvas();
      renderStadium(stadium);

      e.target.parentElement.scrollLeft -= moveScroll.x;
      e.target.parentElement.scrollTop -= moveScroll.y;

      e.preventDefault();
    }
  }

  return (

    <table id="table" cellSpacing="7px" style={{ height: 864, opacity: 0.01 }}>
      <tbody>
        <tr>
          <td colSpan="2" id="topbox" valign="top">
            <table style={{ width: '100%', height: '100%' }}>
              <tbody>
                <CreatorHeader updateStadium={updateStadium} />
                <tr>
                  <td style={{ height: "100%" }}>
                    <div id="canvas_div_placeholder">
                      <div id="canvas_div" style={{ top: 86, left: 49, width: 860, height: 612 }}>
                        {/* <canvas id="canvas" style={{ width: 840, height: 592, cursor: "default" }}></canvas> */}
                        <canvas id="canvas" onMouseUpCapture={handle_up} style={{ width: 840, height: 592 }} onMouseDownCapture={handle_down} onMouseMove={handle_move} ></canvas>
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
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td id="left_tabs">
                    <button id="button_tab_properties" className="active">
                      <img alt='img' src={logoProperties} style={{ height: 12, width: 12 }} />Properties
                    </button>
                    {/* <button id="button_tab_edit">Edit</button> */}
                    <button id="button_tab_advanced" >
                      <img alt='img' src={logoTools} style={{ height: 12, width: 12 }} />Tools
                    </button>
                    {/* <button id="button_tab_spawnpoints">SpawnPoints</button> */}
                  </td>
                  <td>
                    <div id="tab_parent">
                      <div id="tab_properties" className="selected_tool_other">
                      </div>
                      <div id="tab_advanced" className="hidden">
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <button id="button_tab_spawnpoints">SpawnPoints</button>
                                <button id="button_tab_joints">Joints</button>
                                <button id="button_mirror_mode" onClick={handleButtonClick}>
                                  <img alt='img' src={imgMirror} style={{ height: 12, width: 12 }} />Automatic Mirror
                                </button>
                                <button id="pref_preview" onClick={handleButtonClick}>
                                  <img alt='img' src={imgPreview} style={{ height: 12, width: 12 }} />Preview
                                </button>
                                <button id="button_tab_basic_stadiums">Load Basic Stadiums</button>
                                {/* <button id="button_tab_haxmaps">HaxMaps</button> */}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div id="tab_joints" className="hidden" style={{ width: '100%' }}>
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <label className="prop" style={{ width: 40 }}>length:</label>
                                <input className="prop" type="text" id="inputLength" defaultValue="null" />
                                <label className="prop" style={{ width: 35 }}>color:</label>
                                <input className="prop" type="text" id="inputColor" defaultValue="transparent" />
                                <label className="prop" style={{ width: 53 }}>strength:</label>
                                <input className="prop" type="text" id="inputStrength" defaultValue="rigid" />
                                <button id="button_addJoint" onClick={handleButtonClick} style={{ backgroundColor: "#696969" }} onMouseOver={jointAlertOn} onMouseOut={jointAlertOff} >
                                  Add Joint
                                </button>
                                <label id="joint_alert"></label>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div id="tab_spawnpoints" className="hidden">
                        <table>
                          <tbody><tr>
                            <td>
                              <label className="prop" style={{ width: 25 }}>x:</label>
                              <input className="prop" type="text" id="prop_spawnPointX" />
                              <label className="prop" style={{ width: 25 }}>y:</label>
                              <input className="prop" type="text" id="prop_spawnPointY" />
                              <button id="button_redSpawnPoint" onClick={handleButtonClick} style={{ backgroundColor: "#e56e56" }}>
                                Add Spawn Point
                              </button>
                              <button id="button_blueSpawnPoint" onClick={handleButtonClick} style={{ backgroundColor: "#598ae5" }}>
                                Add Spawn Point
                              </button>
                              <button id="button_resetRed" onClick={handleButtonClick} style={{ backgroundColor: "#e56e56", color: 'black' }}>
                                Reset Spawnpoints
                              </button>
                              <button id="button_resetBlue" onClick={handleButtonClick} style={{ backgroundColor: "#598ae5", color: 'black' }}>
                                Reset Spawnpoints
                              </button>
                            </td>
                          </tr></tbody>
                        </table>
                      </div>

                      <div id="tab_basic_stadiums" className="hidden">
                        <table>
                          <tbody><tr>
                            <td>
                              <button id="button_loadBasic_big_easy" onClick={handleButtonClick}>Big Easy</button>
                              <button id="button_loadBasic_big_hockey" onClick={handleButtonClick}>Big Hockey</button>
                              <button id="button_loadBasic_big_rounded" onClick={handleButtonClick}>Big Rounded</button>
                              <button id="button_loadBasic_big" onClick={handleButtonClick}>Big</button>
                              <button id="button_loadBasic_classic" onClick={handleButtonClick}>Classic</button>
                              <button id="button_loadBasic_easy" onClick={handleButtonClick}>Easy</button>
                              <button id="button_loadBasic_hockey" onClick={handleButtonClick}>Hockey</button>
                              <button id="button_loadBasic_huge" onClick={handleButtonClick}>Huge</button>
                              <button id="button_loadBasic_rounded" onClick={handleButtonClick}>Rounded</button>
                              <button id="button_loadBasic_small" onClick={handleButtonClick}>Small</button>
                            </td>
                          </tr></tbody>
                        </table>
                      </div>

                      <div id="tab_haxmaps" className="hidden">
                        <table><tbody><tr>
                          <td>
                            <button onClick={addtoHaxmaps}></button>
                            {/* <form id="upload" action="https://haxmaps.com/hb/form" method="post" enctype="multipart/form-data">
                              <input type="text" name="map-name" id="map-name" defaultValue="Name:" />
                              <input type="text" name="authornick" id="authornick" defaultValue="Author (optional):" />
                              <textarea name="description" id="description">About (optional):</textarea>
                              <div className="hidden3">
                                <input type="file" name="map" id="map" rel=".hbs" accept=".hbs" />
                              </div>
                              <div class="upload">
                                Choose Map (.hbs)
                              </div>
                              <input type="file" name="map" id="map" rel=".hbs" accept=".hbs" />
                              <p></p><center>
                                <h2>If you want to update one of your maps, please use the "Update map" button bellow the map instead.</h2>
                              </center><p></p>
                              <p></p><center>You can also connect with <a href="https://haxrec.com">HaxRec</a> or <a href="https://haxcolors.com">HaxColors</a>.</center><p></p>
                              <div className="hidden">
                                <input type="text" name="goal" value="Enter Replay ID from HaxRec.com (Optional):" onfocus="if(this.value=='Enter Replay ID from HaxRec.com (Optional):') this.value='';" onblur="if(this.value=='') this.value='Enter Replay ID from HaxRec.com (Optional):';" />
                                <input type="text" name="color" value="Enter Color ID from HaxColors.com (Optional):" onfocus="if(this.value=='Enter Color ID from HaxColors.com (Optional):') this.value='';" onblur="if(this.value=='') this.value='Enter Color ID from HaxColors.com (Optional):';" />
                              </div>
                              <input value="Upload" class="submit" type="button" onClick={addtoHaxmaps} />
                            </form> */}
                          </td>
                        </tr></tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div id="tab_sub" className="active" style={{ position: 'fixed', bottom: 5, left: 37, height: 27.5, width: '100%', display: 'inline' }}>
                      <button id="button_undo" onClick={undo} style={{ backgroundColor: '#5872A5' }}><img alt='img' src={imgUndo} style={{ height: 12, width: 12 }} />Undo</button>
                      <button id="button_redo" onClick={redo} style={{ backgroundColor: "#5872A5" }}> <img alt='img' src={imgRedo} style={{ height: 12, width: 12 }} />Redo</button>
                      <button id="button_copy" onClick={handleButtonClick} style={{ backgroundColor: "#5872A5" }} > <img alt='img' src={imgCopy} style={{ height: 12, width: 12 }} />Copy</button>
                      <button id="button_paste" onClick={handleButtonClick} style={{ backgroundColor: "#5872A5" }} > <img alt='img' src={imgPaste} style={{ height: 12, width: 12 }} />Paste</button>
                      <button id="button_delete" onClick={handleButtonClick} style={{ backgroundColor: "#BB2929" }}> <img alt='img' src={imgDelete} style={{ height: 12, width: 12 }} />Delete</button>
                      <button id="button_select_all" onClick={handleButtonClick} style={{ backgroundColor: "#5872A5" }} > <img alt='img' src={imgSelectAll} style={{ height: 12, width: 12 }} />Select All</button>
                      <button id="button_select_none" onClick={handleButtonClick} style={{ backgroundColor: "#5872A5" }}> <img alt='img' src={imgSelectNone} style={{ height: 12, width: 12 }} />Select None</button>
                      <button id="button_inverse_selection" onClick={handleButtonClick} style={{ backgroundColor: "#5872A5" }}> <img alt='img' src={imgInverse} style={{ height: 12, width: 12 }} />Inverse Selection</button>
                      <button id="button_duplicate" onClick={handleButtonClick} style={{ backgroundColor: "#5872A5" }}> <img alt='img' src={imgDuplicate} style={{ height: 12, width: 12 }} />Duplicate</button >
                      <button id="button_cut" onClick={handleButtonClick} style={{ backgroundColor: "#BB2929" }}> <img alt='img' src={imgClear} style={{ height: 12, width: 12 }} />Cut</button >
                      <button id="test_button" onClick={handleButtonClick} style={{ backgroundColor: '#9b009b' }}>Zoom</button >
                      <input className='hidden' onChange={handleZoomChange} style={{ height: 12 }} type="range" id="zoom" name="zoom"
                        min="1" max="39" step="0.1" defaultValue="20" />
                      <label className='hidden' id='zoomLabel'>x1</label>
                    </div >
                  </td >
                </tr >
              </tbody >
            </table >
          </td >
          <td id="rightbox" valign="top">
            <pre id="mousepos" className="right">285, 23</pre>
            <button id="button_tool_select" className="active" style={{ width: 95 }}><img alt='img' src={logoSelect} style={{ height: 12, width: 12 }} />Select</button>
            <button id="button_tool_rotate" style={{ width: 100 }}><img alt='img' src={logoRotate} style={{ height: 12, width: 12 }} />Rotate</button>
            <button id="button_tool_scale" style={{ width: 100 }}><img alt='img' src={logoScale} style={{ height: 12, width: 12 }} />Scale</button>
            <button id="button_tool_segment" style={{ width: 130 }}><img alt='img' src={logoSegment} style={{ height: 12, width: 12 }} />Segment</button>
            <button id="button_tool_vertex" style={{ width: 137 }}><img alt='img' src={logoVertex} style={{ height: 12, width: 12 }} />Vertex</button>
            <button id="button_tool_disc" style={{ width: 95 }}><img alt='img' src={logoDisc} style={{ height: 12, width: 12 }} />Disc</button>
            <button id="button_tool_goal" style={{ width: 95 }}><img alt='img' src={logoGoal} style={{ height: 12, width: 12 }} />Goal</button>
            <button id="button_tool_plane" style={{ width: 100 }}><img alt='img' src={logoPlane} style={{ height: 12, width: 12 }} />Plane</button>
          </td>
        </tr >
      </tbody >
    </table >
  );
}

export default StadiumCreator;