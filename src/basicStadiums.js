const basicStadiums = {
  big_easy: {
    "name": "Big Easy",

    "width": 600,
    "height": 270,

    "spawnDistance": 350,

    "bg": { "type": "grass", "width": 550, "height": 240, "kickOffRadius": 80, "cornerRadius": 0 },

    "vertexes": [
      { "x": -550, "y": 240, "trait": "ballArea" },
      { "x": -550, "y": 95, "trait": "ballArea" },
      { "x": -550, "y": -95, "trait": "ballArea" },
      { "x": -550, "y": -240, "trait": "ballArea" },

      { "x": 550, "y": 240, "trait": "ballArea" },
      { "x": 550, "y": 95, "trait": "ballArea" },
      { "x": 550, "y": -95, "trait": "ballArea" },
      { "x": 550, "y": -240, "trait": "ballArea" },

      { "x": 0, "y": 270, "trait": "kickOffBarrier" },
      { "x": 0, "y": 80, "trait": "kickOffBarrier" },
      { "x": 0, "y": -80, "trait": "kickOffBarrier" },
      { "x": 0, "y": -270, "trait": "kickOffBarrier" },

      { "x": -560, "y": -95, "trait": "goalNet" },
      { "x": -580, "y": -75, "trait": "goalNet" },
      { "x": -580, "y": 75, "trait": "goalNet" },
      { "x": -560, "y": 95, "trait": "goalNet" },

      { "x": 560, "y": -95, "trait": "goalNet" },
      { "x": 580, "y": -75, "trait": "goalNet" },
      { "x": 580, "y": 75, "trait": "goalNet" },
      { "x": 560, "y": 95, "trait": "goalNet" }
    ],

    "segments": [
      { "v0": 0, "v1": 1, "trait": "ballArea" },
      { "v0": 2, "v1": 3, "trait": "ballArea" },
      { "v0": 4, "v1": 5, "trait": "ballArea" },
      { "v0": 6, "v1": 7, "trait": "ballArea" },

      { "v0": 12, "v1": 13, "trait": "goalNet", "curve": -90 },
      { "v0": 13, "v1": 14, "trait": "goalNet" },
      { "v0": 14, "v1": 15, "trait": "goalNet", "curve": -90 },

      { "v0": 16, "v1": 17, "trait": "goalNet", "curve": 90 },
      { "v0": 17, "v1": 18, "trait": "goalNet" },
      { "v0": 18, "v1": 19, "trait": "goalNet", "curve": 90 },

      { "v0": 8, "v1": 9, "trait": "kickOffBarrier" },
      { "v0": 9, "v1": 10, "trait": "kickOffBarrier", "curve": 180, "cGroup": ["blueKO"] },
      { "v0": 9, "v1": 10, "trait": "kickOffBarrier", "curve": -180, "cGroup": ["redKO"] },
      { "v0": 10, "v1": 11, "trait": "kickOffBarrier" }
    ],

    "goals": [
      { "p0": [-550, 95], "p1": [-550, -95], "team": "red" },
      { "p0": [550, 95], "p1": [550, -95], "team": "blue" }
    ],

    "discs": [
      { "pos": [-550, 95], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [-550, -95], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [550, 95], "trait": "goalPost", "color": "CCCCFF" },
      { "pos": [550, -95], "trait": "goalPost", "color": "CCCCFF" }
    ],

    "planes": [
      { "normal": [0, 1], "dist": -240, "trait": "ballArea" },
      { "normal": [0, -1], "dist": -240, "trait": "ballArea" },
      { "normal": [0, 1], "dist": -270, "bCoef": 0.1 },
      { "normal": [0, -1], "dist": -270, "bCoef": 0.1 },
      { "normal": [1, 0], "dist": -600, "bCoef": 0.1 },
      { "normal": [-1, 0], "dist": -600, "bCoef": 0.1 }
    ],

    "traits": {
      "ballArea": { "vis": false, "bCoef": 1, "cMask": ["ball"] },
      "goalPost": { "radius": 8, "invMass": 0, "bCoef": 0.5 },
      "goalNet": { "vis": true, "bCoef": 0.1, "cMask": ["ball"] },
      "kickOffBarrier": { "vis": false, "bCoef": 0.1, "cGroup": ["redKO", "blueKO"], "cMask": ["red", "blue"] }
    }
  },
  big_hockey: {
    "name": "Big Hockey",

    "width": 600,
    "height": 270,

    "spawnDistance": 280,

    "bg": { "type": "hockey", "width": 550, "height": 240, "kickOffRadius": 75, "cornerRadius": 150, "goalLine": 160 },

    "vertexes": [
      { "x": 0, "y": 270, "trait": "kickOffBarrier" },
      { "x": 0, "y": 75, "trait": "kickOffBarrier" },
      { "x": 0, "y": -75, "trait": "kickOffBarrier" },
      { "x": 0, "y": -270, "trait": "kickOffBarrier" },

      { "x": -400, "y": -90, "trait": "goalNet" },
      { "x": -420, "y": -70, "trait": "goalNet" },
      { "x": -420, "y": 70, "trait": "goalNet" },
      { "x": -400, "y": 90, "trait": "goalNet" },

      { "x": 400, "y": -90, "trait": "goalNet" },
      { "x": 420, "y": -70, "trait": "goalNet" },
      { "x": 420, "y": 70, "trait": "goalNet" },
      { "x": 400, "y": 90, "trait": "goalNet" },

      { "x": -400, "y": -240, "trait": "ballArea" },
      { "x": -550, "y": -90, "trait": "ballArea" },
      { "x": -550, "y": 90, "trait": "ballArea" },
      { "x": -400, "y": 240, "trait": "ballArea" },

      { "x": 400, "y": -240, "trait": "ballArea" },
      { "x": 550, "y": -90, "trait": "ballArea" },
      { "x": 550, "y": 90, "trait": "ballArea" },
      { "x": 400, "y": 240, "trait": "ballArea" }
    ],

    "segments": [
      { "v0": 0, "v1": 1, "trait": "kickOffBarrier" },
      { "v0": 1, "v1": 2, "trait": "kickOffBarrier", "curve": 180, "cGroup": ["blueKO"] },
      { "v0": 1, "v1": 2, "trait": "kickOffBarrier", "curve": -180, "cGroup": ["redKO"] },
      { "v0": 2, "v1": 3, "trait": "kickOffBarrier" },

      { "v0": 4, "v1": 5, "trait": "goalNet", "curve": -90 },
      { "v0": 5, "v1": 6, "trait": "goalNet" },
      { "v0": 6, "v1": 7, "trait": "goalNet", "curve": -90 },

      { "v0": 8, "v1": 9, "trait": "goalNet", "curve": 90 },
      { "v0": 9, "v1": 10, "trait": "goalNet" },
      { "v0": 10, "v1": 11, "trait": "goalNet", "curve": 90 },

      { "v0": 12, "v1": 13, "trait": "ballArea", "curve": -90 },
      { "v0": 14, "v1": 15, "trait": "ballArea", "curve": -90 },
      { "v0": 16, "v1": 17, "trait": "ballArea", "curve": 90 },
      { "v0": 18, "v1": 19, "trait": "ballArea", "curve": 90 }
    ],

    "goals": [
      { "p0": [-390, 90], "p1": [-390, -90], "team": "red" },
      { "p0": [390, 90], "p1": [390, -90], "team": "blue" }
    ],

    "discs": [
      { "pos": [-390, 90], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [-390, -90], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [390, 90], "trait": "goalPost", "color": "CCCCFF" },
      { "pos": [390, -90], "trait": "goalPost", "color": "CCCCFF" }
    ],

    "planes": [
      { "normal": [0, 1], "dist": -240, "trait": "ballArea" },
      { "normal": [0, -1], "dist": -240, "trait": "ballArea" },
      { "normal": [1, 0], "dist": -550, "trait": "ballArea" },
      { "normal": [-1, 0], "dist": -550, "trait": "ballArea" },
      { "normal": [0, 1], "dist": -270, "bCoef": 0.1 },
      { "normal": [0, -1], "dist": -270, "bCoef": 0.1 },
      { "normal": [1, 0], "dist": -600, "bCoef": 0.1 },
      { "normal": [-1, 0], "dist": -600, "bCoef": 0.1 }
    ],

    "traits": {
      "ballArea": { "vis": false, "bCoef": 1, "cMask": ["ball"] },
      "goalPost": { "radius": 8, "invMass": 0, "bCoef": 0.5 },
      "goalNet": { "vis": true, "bCoef": 0.1, "cMask": ["all"] },
      "kickOffBarrier": { "vis": false, "bCoef": 0.1, "cGroup": ["redKO", "blueKO"], "cMask": ["red", "blue"] }
    }
  },
  big_rounded: {
    "name": "Big Rounded",

    "width": 600,
    "height": 270,

    "spawnDistance": 350,

    "bg": { "type": "grass", "width": 550, "height": 240, "kickOffRadius": 80, "cornerRadius": 100 },

    "vertexes": [
      { "x": -550, "y": 240, "trait": "ballArea" },
      { "x": -550, "y": 80, "trait": "ballArea" },
      { "x": -550, "y": -80, "trait": "ballArea" },
      { "x": -550, "y": -240, "trait": "ballArea" },

      { "x": 550, "y": 240, "trait": "ballArea" },
      { "x": 550, "y": 80, "trait": "ballArea" },
      { "x": 550, "y": -80, "trait": "ballArea" },
      { "x": 550, "y": -240, "trait": "ballArea" },

      { "x": 0, "y": 270, "trait": "kickOffBarrier" },
      { "x": 0, "y": 80, "trait": "kickOffBarrier" },
      { "x": 0, "y": -80, "trait": "kickOffBarrier" },
      { "x": 0, "y": -270, "trait": "kickOffBarrier" },

      { "x": -560, "y": -80, "trait": "goalNet" },
      { "x": -580, "y": -60, "trait": "goalNet" },
      { "x": -580, "y": 60, "trait": "goalNet" },
      { "x": -560, "y": 80, "trait": "goalNet" },

      { "x": 560, "y": -80, "trait": "goalNet" },
      { "x": 580, "y": -60, "trait": "goalNet" },
      { "x": 580, "y": 60, "trait": "goalNet" },
      { "x": 560, "y": 80, "trait": "goalNet" },

      { "x": -450, "y": -240, "trait": "ballArea" },
      { "x": -550, "y": -140, "trait": "ballArea" },
      { "x": -550, "y": 140, "trait": "ballArea" },
      { "x": -450, "y": 240, "trait": "ballArea" },

      { "x": 450, "y": -240, "trait": "ballArea" },
      { "x": 550, "y": -140, "trait": "ballArea" },
      { "x": 550, "y": 140, "trait": "ballArea" },
      { "x": 450, "y": 240, "trait": "ballArea" }
    ],

    "segments": [
      { "v0": 0, "v1": 1, "trait": "ballArea" },
      { "v0": 2, "v1": 3, "trait": "ballArea" },
      { "v0": 4, "v1": 5, "trait": "ballArea" },
      { "v0": 6, "v1": 7, "trait": "ballArea" },

      { "v0": 12, "v1": 13, "trait": "goalNet", "curve": -90 },
      { "v0": 13, "v1": 14, "trait": "goalNet" },
      { "v0": 14, "v1": 15, "trait": "goalNet", "curve": -90 },

      { "v0": 16, "v1": 17, "trait": "goalNet", "curve": 90 },
      { "v0": 17, "v1": 18, "trait": "goalNet" },
      { "v0": 18, "v1": 19, "trait": "goalNet", "curve": 90 },

      { "v0": 8, "v1": 9, "trait": "kickOffBarrier" },
      { "v0": 9, "v1": 10, "trait": "kickOffBarrier", "curve": 180, "cGroup": ["blueKO"] },
      { "v0": 9, "v1": 10, "trait": "kickOffBarrier", "curve": -180, "cGroup": ["redKO"] },
      { "v0": 10, "v1": 11, "trait": "kickOffBarrier" },

      { "v0": 20, "v1": 21, "trait": "ballArea", "curve": -90 },
      { "v0": 22, "v1": 23, "trait": "ballArea", "curve": -90 },
      { "v0": 24, "v1": 25, "trait": "ballArea", "curve": 90 },
      { "v0": 26, "v1": 27, "trait": "ballArea", "curve": 90 }
    ],

    "goals": [
      { "p0": [-550, 80], "p1": [-550, -80], "team": "red" },
      { "p0": [550, 80], "p1": [550, -80], "team": "blue" }
    ],

    "discs": [
      { "pos": [-550, 80], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [-550, -80], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [550, 80], "trait": "goalPost", "color": "CCCCFF" },
      { "pos": [550, -80], "trait": "goalPost", "color": "CCCCFF" }
    ],

    "planes": [
      { "normal": [0, 1], "dist": -240, "trait": "ballArea" },
      { "normal": [0, -1], "dist": -240, "trait": "ballArea" },
      { "normal": [0, 1], "dist": -270, "bCoef": 0.1 },
      { "normal": [0, -1], "dist": -270, "bCoef": 0.1 },
      { "normal": [1, 0], "dist": -600, "bCoef": 0.1 },
      { "normal": [-1, 0], "dist": -600, "bCoef": 0.1 }
    ],

    "traits": {
      "ballArea": { "vis": false, "bCoef": 1, "cMask": ["ball"] },
      "goalPost": { "radius": 8, "invMass": 0, "bCoef": 0.5 },
      "goalNet": { "vis": true, "bCoef": 0.1, "cMask": ["ball"] },
      "kickOffBarrier": { "vis": false, "bCoef": 0.1, "cGroup": ["redKO", "blueKO"], "cMask": ["red", "blue"] }
    }
  },
  big: {
    "name": "Big",

    "width": 600,
    "height": 270,

    "spawnDistance": 350,

    "bg": { "type": "grass", "width": 550, "height": 240, "kickOffRadius": 80, "cornerRadius": 0 },

    "vertexes": [
      { "x": -550, "y": 240, "trait": "ballArea" },
      { "x": -550, "y": 80, "trait": "ballArea" },
      { "x": -550, "y": -80, "trait": "ballArea" },
      { "x": -550, "y": -240, "trait": "ballArea" },

      { "x": 550, "y": 240, "trait": "ballArea" },
      { "x": 550, "y": 80, "trait": "ballArea" },
      { "x": 550, "y": -80, "trait": "ballArea" },
      { "x": 550, "y": -240, "trait": "ballArea" },

      { "x": 0, "y": 270, "trait": "kickOffBarrier" },
      { "x": 0, "y": 80, "trait": "kickOffBarrier" },
      { "x": 0, "y": -80, "trait": "kickOffBarrier" },
      { "x": 0, "y": -270, "trait": "kickOffBarrier" },

      { "x": -560, "y": -80, "trait": "goalNet" },
      { "x": -580, "y": -60, "trait": "goalNet" },
      { "x": -580, "y": 60, "trait": "goalNet" },
      { "x": -560, "y": 80, "trait": "goalNet" },

      { "x": 560, "y": -80, "trait": "goalNet" },
      { "x": 580, "y": -60, "trait": "goalNet" },
      { "x": 580, "y": 60, "trait": "goalNet" },
      { "x": 560, "y": 80, "trait": "goalNet" }
    ],

    "segments": [
      { "v0": 0, "v1": 1, "trait": "ballArea" },
      { "v0": 2, "v1": 3, "trait": "ballArea" },
      { "v0": 4, "v1": 5, "trait": "ballArea" },
      { "v0": 6, "v1": 7, "trait": "ballArea" },

      { "v0": 12, "v1": 13, "trait": "goalNet", "curve": -90 },
      { "v0": 13, "v1": 14, "trait": "goalNet" },
      { "v0": 14, "v1": 15, "trait": "goalNet", "curve": -90 },

      { "v0": 16, "v1": 17, "trait": "goalNet", "curve": 90 },
      { "v0": 17, "v1": 18, "trait": "goalNet" },
      { "v0": 18, "v1": 19, "trait": "goalNet", "curve": 90 },

      { "v0": 8, "v1": 9, "trait": "kickOffBarrier" },
      { "v0": 9, "v1": 10, "trait": "kickOffBarrier", "curve": 180, "cGroup": ["blueKO"] },
      { "v0": 9, "v1": 10, "trait": "kickOffBarrier", "curve": -180, "cGroup": ["redKO"] },
      { "v0": 10, "v1": 11, "trait": "kickOffBarrier" }
    ],

    "goals": [
      { "p0": [-550, 80], "p1": [-550, -80], "team": "red" },
      { "p0": [550, 80], "p1": [550, -80], "team": "blue" }
    ],

    "discs": [
      { "pos": [-550, 80], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [-550, -80], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [550, 80], "trait": "goalPost", "color": "CCCCFF" },
      { "pos": [550, -80], "trait": "goalPost", "color": "CCCCFF" }
    ],

    "planes": [
      { "normal": [0, 1], "dist": -240, "trait": "ballArea" },
      { "normal": [0, -1], "dist": -240, "trait": "ballArea" },
      { "normal": [0, 1], "dist": -270, "bCoef": 0.1 },
      { "normal": [0, -1], "dist": -270, "bCoef": 0.1 },
      { "normal": [1, 0], "dist": -600, "bCoef": 0.1 },
      { "normal": [-1, 0], "dist": -600, "bCoef": 0.1 }
    ],

    "traits": {
      "ballArea": { "vis": false, "bCoef": 1, "cMask": ["ball"] },
      "goalPost": { "radius": 8, "invMass": 0, "bCoef": 0.5 },
      "goalNet": { "vis": true, "bCoef": 0.1, "cMask": ["ball"] },
      "kickOffBarrier": { "vis": false, "bCoef": 0.1, "cGroup": ["redKO", "blueKO"], "cMask": ["red", "blue"] }
    }
  },
  classic: {
    "name": "Classic",

    "width": 420,
    "height": 200,

    "spawnDistance": 170,

    "bg": { "type": "grass", "width": 370, "height": 170, "kickOffRadius": 75, "cornerRadius": 0 },

    "vertexes": [
      { "x": -370, "y": 170, "trait": "ballArea" },
      { "x": -370, "y": 64, "trait": "ballArea" },
      { "x": -370, "y": -64, "trait": "ballArea" },
      { "x": -370, "y": -170, "trait": "ballArea" },

      { "x": 370, "y": 170, "trait": "ballArea" },
      { "x": 370, "y": 64, "trait": "ballArea" },
      { "x": 370, "y": -64, "trait": "ballArea" },
      { "x": 370, "y": -170, "trait": "ballArea" },

      { "x": 0, "y": 200, "trait": "kickOffBarrier" },
      { "x": 0, "y": 75, "trait": "kickOffBarrier" },
      { "x": 0, "y": -75, "trait": "kickOffBarrier" },
      { "x": 0, "y": -200, "trait": "kickOffBarrier" },

      { "x": -380, "y": -64, "trait": "goalNet" },
      { "x": -400, "y": -44, "trait": "goalNet" },
      { "x": -400, "y": 44, "trait": "goalNet" },
      { "x": -380, "y": 64, "trait": "goalNet" },

      { "x": 380, "y": -64, "trait": "goalNet" },
      { "x": 400, "y": -44, "trait": "goalNet" },
      { "x": 400, "y": 44, "trait": "goalNet" },
      { "x": 380, "y": 64, "trait": "goalNet" }
    ],

    "segments": [
      { "v0": 0, "v1": 1, "trait": "ballArea" },
      { "v0": 2, "v1": 3, "trait": "ballArea" },
      { "v0": 4, "v1": 5, "trait": "ballArea" },
      { "v0": 6, "v1": 7, "trait": "ballArea" },

      { "v0": 12, "v1": 13, "trait": "goalNet", "curve": -90 },
      { "v0": 13, "v1": 14, "trait": "goalNet" },
      { "v0": 14, "v1": 15, "trait": "goalNet", "curve": -90 },

      { "v0": 16, "v1": 17, "trait": "goalNet", "curve": 90 },
      { "v0": 17, "v1": 18, "trait": "goalNet" },
      { "v0": 18, "v1": 19, "trait": "goalNet", "curve": 90 },

      { "v0": 8, "v1": 9, "trait": "kickOffBarrier" },
      { "v0": 9, "v1": 10, "trait": "kickOffBarrier", "curve": 180, "cGroup": ["blueKO"] },
      { "v0": 9, "v1": 10, "trait": "kickOffBarrier", "curve": -180, "cGroup": ["redKO"] },
      { "v0": 10, "v1": 11, "trait": "kickOffBarrier" }
    ],

    "goals": [
      { "p0": [-370, 64], "p1": [-370, -64], "team": "red" },
      { "p0": [370, 64], "p1": [370, -64], "team": "blue" }
    ],

    "discs": [
      { "pos": [-370, 64], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [-370, -64], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [370, 64], "trait": "goalPost", "color": "CCCCFF" },
      { "pos": [370, -64], "trait": "goalPost", "color": "CCCCFF" }
    ],

    "planes": [
      { "normal": [0, 1], "dist": -170, "trait": "ballArea" },
      { "normal": [0, -1], "dist": -170, "trait": "ballArea" },
      { "normal": [0, 1], "dist": -200, "bCoef": 0.1 },
      { "normal": [0, -1], "dist": -200, "bCoef": 0.1 },
      { "normal": [1, 0], "dist": -420, "bCoef": 0.1 },
      { "normal": [-1, 0], "dist": -420, "bCoef": 0.1 }
    ],

    "traits": {
      "ballArea": { "vis": false, "bCoef": 1, "cMask": ["ball"] },
      "goalPost": { "radius": 8, "invMass": 0, "bCoef": 0.5 },
      "goalNet": { "vis": true, "bCoef": 0.1, "cMask": ["ball"] },
      "kickOffBarrier": { "vis": false, "bCoef": 0.1, "cGroup": ["redKO", "blueKO"], "cMask": ["red", "blue"] }
    }
  },
  easy: {
    "name": "Easy",

    "width": 420,
    "height": 200,

    "spawnDistance": 170,

    "bg": { "type": "grass", "width": 370, "height": 170, "kickOffRadius": 75, "cornerRadius": 0 },

    "vertexes": [
      { "x": -370, "y": 170, "trait": "ballArea" },
      { "x": -370, "y": 90, "trait": "ballArea" },
      { "x": -370, "y": -90, "trait": "ballArea" },
      { "x": -370, "y": -170, "trait": "ballArea" },

      { "x": 370, "y": 170, "trait": "ballArea" },
      { "x": 370, "y": 90, "trait": "ballArea" },
      { "x": 370, "y": -90, "trait": "ballArea" },
      { "x": 370, "y": -170, "trait": "ballArea" },

      { "x": 0, "y": 200, "trait": "kickOffBarrier" },
      { "x": 0, "y": 75, "trait": "kickOffBarrier" },
      { "x": 0, "y": -75, "trait": "kickOffBarrier" },
      { "x": 0, "y": -200, "trait": "kickOffBarrier" },

      { "x": -380, "y": -90, "trait": "goalNet" },
      { "x": -400, "y": -70, "trait": "goalNet" },
      { "x": -400, "y": 70, "trait": "goalNet" },
      { "x": -380, "y": 90, "trait": "goalNet" },

      { "x": 380, "y": -90, "trait": "goalNet" },
      { "x": 400, "y": -70, "trait": "goalNet" },
      { "x": 400, "y": 70, "trait": "goalNet" },
      { "x": 380, "y": 90, "trait": "goalNet" }
    ],

    "segments": [
      { "v0": 0, "v1": 1, "trait": "ballArea" },
      { "v0": 2, "v1": 3, "trait": "ballArea" },
      { "v0": 4, "v1": 5, "trait": "ballArea" },
      { "v0": 6, "v1": 7, "trait": "ballArea" },

      { "v0": 12, "v1": 13, "trait": "goalNet", "curve": -90 },
      { "v0": 13, "v1": 14, "trait": "goalNet" },
      { "v0": 14, "v1": 15, "trait": "goalNet", "curve": -90 },

      { "v0": 16, "v1": 17, "trait": "goalNet", "curve": 90 },
      { "v0": 17, "v1": 18, "trait": "goalNet" },
      { "v0": 18, "v1": 19, "trait": "goalNet", "curve": 90 },

      { "v0": 8, "v1": 9, "trait": "kickOffBarrier" },
      { "v0": 9, "v1": 10, "trait": "kickOffBarrier", "curve": 180, "cGroup": ["blueKO"] },
      { "v0": 9, "v1": 10, "trait": "kickOffBarrier", "curve": -180, "cGroup": ["redKO"] },
      { "v0": 10, "v1": 11, "trait": "kickOffBarrier" }
    ],

    "goals": [
      { "p0": [-370, 90], "p1": [-370, -90], "team": "red" },
      { "p0": [370, 90], "p1": [370, -90], "team": "blue" }
    ],

    "discs": [
      { "pos": [-370, 90], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [-370, -90], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [370, 90], "trait": "goalPost", "color": "CCCCFF" },
      { "pos": [370, -90], "trait": "goalPost", "color": "CCCCFF" }
    ],

    "planes": [
      { "normal": [0, 1], "dist": -170, "trait": "ballArea" },
      { "normal": [0, -1], "dist": -170, "trait": "ballArea" },
      { "normal": [0, 1], "dist": -200, "bCoef": 0.1 },
      { "normal": [0, -1], "dist": -200, "bCoef": 0.1 },
      { "normal": [1, 0], "dist": -420, "bCoef": 0.1 },
      { "normal": [-1, 0], "dist": -420, "bCoef": 0.1 }
    ],

    "traits": {
      "ballArea": { "vis": false, "bCoef": 1, "cMask": ["ball"] },
      "goalPost": { "radius": 8, "invMass": 0, "bCoef": 0.5 },
      "goalNet": { "vis": true, "bCoef": 0.1, "cMask": ["ball"] },
      "kickOffBarrier": { "vis": false, "bCoef": 0.1, "cGroup": ["redKO", "blueKO"], "cMask": ["red", "blue"] }
    }
  },
  hockey: {
    "name": "Hockey",

    "width": 420,
    "height": 204,

    "spawnDistance": 180,

    "bg": { "type": "hockey", "width": 398, "height": 182, "kickOffRadius": 75, "cornerRadius": 100, "goalLine": 120 },

    "vertexes": [
      { "x": 0, "y": 204, "trait": "kickOffBarrier" },
      { "x": 0, "y": 75, "trait": "kickOffBarrier" },
      { "x": 0, "y": -75, "trait": "kickOffBarrier" },
      { "x": 0, "y": -204, "trait": "kickOffBarrier" },

      { "x": -288, "y": -68, "trait": "goalNet" },
      { "x": -308, "y": -44, "trait": "goalNet" },
      { "x": -308, "y": 44, "trait": "goalNet" },
      { "x": -288, "y": 68, "trait": "goalNet" },

      { "x": 288, "y": -68, "trait": "goalNet" },
      { "x": 308, "y": -44, "trait": "goalNet" },
      { "x": 308, "y": 44, "trait": "goalNet" },
      { "x": 288, "y": 68, "trait": "goalNet" },

      { "x": -295, "y": -182, "trait": "ballArea" },
      { "x": -398, "y": -95, "trait": "ballArea" },
      { "x": -398, "y": 95, "trait": "ballArea" },
      { "x": -295, "y": 182, "trait": "ballArea" },

      { "x": 295, "y": -182, "trait": "ballArea" },
      { "x": 398, "y": -95, "trait": "ballArea" },
      { "x": 398, "y": 95, "trait": "ballArea" },
      { "x": 295, "y": 182, "trait": "ballArea" }
    ],

    "segments": [
      { "v0": 0, "v1": 1, "trait": "kickOffBarrier" },
      { "v0": 1, "v1": 2, "trait": "kickOffBarrier", "curve": 180, "cGroup": ["blueKO"] },
      { "v0": 1, "v1": 2, "trait": "kickOffBarrier", "curve": -180, "cGroup": ["redKO"] },
      { "v0": 2, "v1": 3, "trait": "kickOffBarrier" },

      { "v0": 4, "v1": 5, "trait": "goalNet", "curve": -90 },
      { "v0": 5, "v1": 6, "trait": "goalNet" },
      { "v0": 6, "v1": 7, "trait": "goalNet", "curve": -90 },

      { "v0": 8, "v1": 9, "trait": "goalNet", "curve": 90 },
      { "v0": 9, "v1": 10, "trait": "goalNet" },
      { "v0": 10, "v1": 11, "trait": "goalNet", "curve": 90 },

      { "v0": 12, "v1": 13, "trait": "ballArea", "curve": -90 },
      { "v0": 14, "v1": 15, "trait": "ballArea", "curve": -90 },
      { "v0": 16, "v1": 17, "trait": "ballArea", "curve": 90 },
      { "v0": 18, "v1": 19, "trait": "ballArea", "curve": 90 }
    ],

    "goals": [
      { "p0": [-278, 68], "p1": [-278, -68], "team": "red" },
      { "p0": [278, 68], "p1": [278, -68], "team": "blue" }
    ],

    "discs": [
      { "pos": [-278, 68], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [-278, -68], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [278, 68], "trait": "goalPost", "color": "CCCCFF" },
      { "pos": [278, -68], "trait": "goalPost", "color": "CCCCFF" }
    ],

    "planes": [
      { "normal": [0, 1], "dist": -182, "trait": "ballArea" },
      { "normal": [0, -1], "dist": -182, "trait": "ballArea" },
      { "normal": [1, 0], "dist": -398, "trait": "ballArea" },
      { "normal": [-1, 0], "dist": -398, "trait": "ballArea" },
      { "normal": [0, 1], "dist": -204, "bCoef": 0.1 },
      { "normal": [0, -1], "dist": -204, "bCoef": 0.1 },
      { "normal": [1, 0], "dist": -420, "bCoef": 0.1 },
      { "normal": [-1, 0], "dist": -420, "bCoef": 0.1 }
    ],

    "traits": {
      "ballArea": { "vis": false, "bCoef": 1, "cMask": ["ball"] },
      "goalPost": { "radius": 8, "invMass": 0, "bCoef": 0.5 },
      "goalNet": { "vis": true, "bCoef": 0.1, "cMask": ["all"] },
      "kickOffBarrier": { "vis": false, "bCoef": 0.1, "cGroup": ["redKO", "blueKO"], "cMask": ["red", "blue"] }
    }
  },
  huge: {
    "name": "Huge",

    "width": 800,
    "height": 350,

    "spawnDistance": 350,

    "bg": { "type": "grass", "width": 700, "height": 320, "kickOffRadius": 80, "cornerRadius": 0 },

    "vertexes": [
      { "x": -700, "y": 320, "trait": "ballArea" },
      { "x": -700, "y": 100, "trait": "ballArea" },
      { "x": -700, "y": -100, "trait": "ballArea" },
      { "x": -700, "y": -320, "trait": "ballArea" },

      { "x": 700, "y": 320, "trait": "ballArea" },
      { "x": 700, "y": 100, "trait": "ballArea" },
      { "x": 700, "y": -100, "trait": "ballArea" },
      { "x": 700, "y": -320, "trait": "ballArea" },

      { "x": 0, "y": 350, "trait": "kickOffBarrier" },
      { "x": 0, "y": 80, "trait": "kickOffBarrier" },
      { "x": 0, "y": -80, "trait": "kickOffBarrier" },
      { "x": 0, "y": -350, "trait": "kickOffBarrier" },

      { "x": -710, "y": -100, "trait": "goalNet" },
      { "x": -730, "y": -80, "trait": "goalNet" },
      { "x": -730, "y": 80, "trait": "goalNet" },
      { "x": -710, "y": 100, "trait": "goalNet" },

      { "x": 710, "y": -100, "trait": "goalNet" },
      { "x": 730, "y": -80, "trait": "goalNet" },
      { "x": 730, "y": 80, "trait": "goalNet" },
      { "x": 710, "y": 100, "trait": "goalNet" }
    ],

    "segments": [
      { "v0": 0, "v1": 1, "trait": "ballArea" },
      { "v0": 2, "v1": 3, "trait": "ballArea" },
      { "v0": 4, "v1": 5, "trait": "ballArea" },
      { "v0": 6, "v1": 7, "trait": "ballArea" },

      { "v0": 12, "v1": 13, "trait": "goalNet", "curve": -90 },
      { "v0": 13, "v1": 14, "trait": "goalNet" },
      { "v0": 14, "v1": 15, "trait": "goalNet", "curve": -90 },

      { "v0": 16, "v1": 17, "trait": "goalNet", "curve": 90 },
      { "v0": 17, "v1": 18, "trait": "goalNet" },
      { "v0": 18, "v1": 19, "trait": "goalNet", "curve": 90 },

      { "v0": 8, "v1": 9, "trait": "kickOffBarrier" },
      { "v0": 9, "v1": 10, "trait": "kickOffBarrier", "curve": 180, "cGroup": ["blueKO"] },
      { "v0": 9, "v1": 10, "trait": "kickOffBarrier", "curve": -180, "cGroup": ["redKO"] },
      { "v0": 10, "v1": 11, "trait": "kickOffBarrier" }
    ],

    "goals": [
      { "p0": [-700, 100], "p1": [-700, -100], "team": "red" },
      { "p0": [700, 100], "p1": [700, -100], "team": "blue" }
    ],

    "discs": [
      { "pos": [-700, 100], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [-700, -100], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [700, 100], "trait": "goalPost", "color": "CCCCFF" },
      { "pos": [700, -100], "trait": "goalPost", "color": "CCCCFF" }
    ],

    "planes": [
      { "normal": [0, 1], "dist": -320, "trait": "ballArea" },
      { "normal": [0, -1], "dist": -320, "trait": "ballArea" },
      { "normal": [0, 1], "dist": -350, "bCoef": 0.1 },
      { "normal": [0, -1], "dist": -350, "bCoef": 0.1 },
      { "normal": [1, 0], "dist": -800, "bCoef": 0.1 },
      { "normal": [-1, 0], "dist": -800, "bCoef": 0.1 }
    ],

    "traits": {
      "ballArea": { "vis": false, "bCoef": 1, "cMask": ["ball"] },
      "goalPost": { "radius": 8, "invMass": 0, "bCoef": 0.5 },
      "goalNet": { "vis": true, "bCoef": 0.1, "cMask": ["ball"] },
      "kickOffBarrier": { "vis": false, "bCoef": 0.1, "cGroup": ["redKO", "blueKO"], "cMask": ["red", "blue"] }
    }
  },
  rounded: {
    "name": "Rounded",

    "width": 420,
    "height": 200,

    "spawnDistance": 170,

    "bg": { "type": "grass", "width": 370, "height": 170, "kickOffRadius": 75, "cornerRadius": 75 },

    "vertexes": [
      { "x": -370, "y": 170, "trait": "ballArea" },
      { "x": -370, "y": 64, "trait": "ballArea" },
      { "x": -370, "y": -64, "trait": "ballArea" },
      { "x": -370, "y": -170, "trait": "ballArea" },

      { "x": 370, "y": 170, "trait": "ballArea" },
      { "x": 370, "y": 64, "trait": "ballArea" },
      { "x": 370, "y": -64, "trait": "ballArea" },
      { "x": 370, "y": -170, "trait": "ballArea" },

      { "x": 0, "y": 200, "trait": "kickOffBarrier" },
      { "x": 0, "y": 75, "trait": "kickOffBarrier" },
      { "x": 0, "y": -75, "trait": "kickOffBarrier" },
      { "x": 0, "y": -200, "trait": "kickOffBarrier" },

      { "x": -380, "y": -64, "trait": "goalNet" },
      { "x": -400, "y": -44, "trait": "goalNet" },
      { "x": -400, "y": 44, "trait": "goalNet" },
      { "x": -380, "y": 64, "trait": "goalNet" },

      { "x": 380, "y": -64, "trait": "goalNet" },
      { "x": 400, "y": -44, "trait": "goalNet" },
      { "x": 400, "y": 44, "trait": "goalNet" },
      { "x": 380, "y": 64, "trait": "goalNet" },

      { "x": -295, "y": -170, "trait": "ballArea" },
      { "x": -370, "y": -95, "trait": "ballArea" },
      { "x": -370, "y": 95, "trait": "ballArea" },
      { "x": -295, "y": 170, "trait": "ballArea" },

      { "x": 295, "y": -170, "trait": "ballArea" },
      { "x": 370, "y": -95, "trait": "ballArea" },
      { "x": 370, "y": 95, "trait": "ballArea" },
      { "x": 295, "y": 170, "trait": "ballArea" }
    ],

    "segments": [
      { "v0": 0, "v1": 1, "trait": "ballArea" },
      { "v0": 2, "v1": 3, "trait": "ballArea" },
      { "v0": 4, "v1": 5, "trait": "ballArea" },
      { "v0": 6, "v1": 7, "trait": "ballArea" },

      { "v0": 12, "v1": 13, "trait": "goalNet", "curve": -90 },
      { "v0": 13, "v1": 14, "trait": "goalNet" },
      { "v0": 14, "v1": 15, "trait": "goalNet", "curve": -90 },

      { "v0": 16, "v1": 17, "trait": "goalNet", "curve": 90 },
      { "v0": 17, "v1": 18, "trait": "goalNet" },
      { "v0": 18, "v1": 19, "trait": "goalNet", "curve": 90 },

      { "v0": 8, "v1": 9, "trait": "kickOffBarrier" },
      { "v0": 9, "v1": 10, "trait": "kickOffBarrier", "curve": 180, "cGroup": ["blueKO"] },
      { "v0": 9, "v1": 10, "trait": "kickOffBarrier", "curve": -180, "cGroup": ["redKO"] },
      { "v0": 10, "v1": 11, "trait": "kickOffBarrier" },

      { "v0": 20, "v1": 21, "trait": "ballArea", "curve": -90 },
      { "v0": 22, "v1": 23, "trait": "ballArea", "curve": -90 },
      { "v0": 24, "v1": 25, "trait": "ballArea", "curve": 90 },
      { "v0": 26, "v1": 27, "trait": "ballArea", "curve": 90 }
    ],

    "goals": [
      { "p0": [-370, 64], "p1": [-370, -64], "team": "red" },
      { "p0": [370, 64], "p1": [370, -64], "team": "blue" }
    ],

    "discs": [
      { "pos": [-370, 64], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [-370, -64], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [370, 64], "trait": "goalPost", "color": "CCCCFF" },
      { "pos": [370, -64], "trait": "goalPost", "color": "CCCCFF" }
    ],

    "planes": [
      { "normal": [0, 1], "dist": -170, "trait": "ballArea" },
      { "normal": [0, -1], "dist": -170, "trait": "ballArea" },
      { "normal": [0, 1], "dist": -200, "bCoef": 0.1 },
      { "normal": [0, -1], "dist": -200, "bCoef": 0.1 },
      { "normal": [1, 0], "dist": -420, "bCoef": 0.1 },
      { "normal": [-1, 0], "dist": -420, "bCoef": 0.1 }
    ],

    "traits": {
      "ballArea": { "vis": false, "bCoef": 1, "cMask": ["ball"] },
      "goalPost": { "radius": 8, "invMass": 0, "bCoef": 0.5 },
      "goalNet": { "vis": true, "bCoef": 0.1, "cMask": ["ball"] },
      "kickOffBarrier": { "vis": false, "bCoef": 0.1, "cGroup": ["redKO", "blueKO"], "cMask": ["red", "blue"] }
    }
  },
  small: {
    "name": "Small",

    "width": 420,
    "height": 200,

    "spawnDistance": 130,

    "bg": { "type": "grass", "width": 320, "height": 130, "kickOffRadius": 70, "cornerRadius": 0 },

    "vertexes": [
      { "x": -320, "y": 130, "trait": "ballArea" },
      { "x": -320, "y": 55, "trait": "ballArea" },
      { "x": -320, "y": -55, "trait": "ballArea" },
      { "x": -320, "y": -130, "trait": "ballArea" },

      { "x": 320, "y": 130, "trait": "ballArea" },
      { "x": 320, "y": 55, "trait": "ballArea" },
      { "x": 320, "y": -55, "trait": "ballArea" },
      { "x": 320, "y": -130, "trait": "ballArea" },

      { "x": 0, "y": 200, "trait": "kickOffBarrier" },
      { "x": 0, "y": 70, "trait": "kickOffBarrier" },
      { "x": 0, "y": -70, "trait": "kickOffBarrier" },
      { "x": 0, "y": -200, "trait": "kickOffBarrier" },

      { "x": -330, "y": -55, "trait": "goalNet" },
      { "x": -350, "y": -35, "trait": "goalNet" },
      { "x": -350, "y": 35, "trait": "goalNet" },
      { "x": -330, "y": 55, "trait": "goalNet" },

      { "x": 330, "y": -55, "trait": "goalNet" },
      { "x": 350, "y": -35, "trait": "goalNet" },
      { "x": 350, "y": 35, "trait": "goalNet" },
      { "x": 330, "y": 55, "trait": "goalNet" }
    ],

    "segments": [
      { "v0": 0, "v1": 1, "trait": "ballArea" },
      { "v0": 2, "v1": 3, "trait": "ballArea" },
      { "v0": 4, "v1": 5, "trait": "ballArea" },
      { "v0": 6, "v1": 7, "trait": "ballArea" },

      { "v0": 12, "v1": 13, "trait": "goalNet", "curve": -90 },
      { "v0": 13, "v1": 14, "trait": "goalNet" },
      { "v0": 14, "v1": 15, "trait": "goalNet", "curve": -90 },

      { "v0": 16, "v1": 17, "trait": "goalNet", "curve": 90 },
      { "v0": 17, "v1": 18, "trait": "goalNet" },
      { "v0": 18, "v1": 19, "trait": "goalNet", "curve": 90 },

      { "v0": 8, "v1": 9, "trait": "kickOffBarrier" },
      { "v0": 9, "v1": 10, "trait": "kickOffBarrier", "curve": 180, "cGroup": ["blueKO"] },
      { "v0": 9, "v1": 10, "trait": "kickOffBarrier", "curve": -180, "cGroup": ["redKO"] },
      { "v0": 10, "v1": 11, "trait": "kickOffBarrier" }
    ],

    "goals": [
      { "p0": [-320, 55], "p1": [-320, -55], "team": "red" },
      { "p0": [320, 55], "p1": [320, -55], "team": "blue" }
    ],

    "discs": [
      { "pos": [-320, 55], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [-320, -55], "trait": "goalPost", "color": "FFCCCC" },
      { "pos": [320, 55], "trait": "goalPost", "color": "CCCCFF" },
      { "pos": [320, -55], "trait": "goalPost", "color": "CCCCFF" }
    ],

    "planes": [
      { "normal": [0, 1], "dist": -130, "trait": "ballArea" },
      { "normal": [0, -1], "dist": -130, "trait": "ballArea" },
      { "normal": [0, 1], "dist": -200, "bCoef": 0.1 },
      { "normal": [0, -1], "dist": -200, "bCoef": 0.1 },
      { "normal": [1, 0], "dist": -420, "bCoef": 0.1 },
      { "normal": [-1, 0], "dist": -420, "bCoef": 0.1 }
    ],

    "traits": {
      "ballArea": { "vis": false, "bCoef": 1, "cMask": ["ball"] },
      "goalPost": { "radius": 8, "invMass": 0, "bCoef": 0.5 },
      "goalNet": { "vis": true, "bCoef": 0.1, "cMask": ["ball"] },
      "kickOffBarrier": { "vis": false, "bCoef": 0.1, "cGroup": ["redKO", "blueKO"], "cMask": ["red", "blue"] }
    }
  }
}

export default basicStadiums;