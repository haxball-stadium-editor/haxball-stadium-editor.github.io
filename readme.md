<h1 id="title" align="center">Haxball Stadium Editor</h1>

<h4 align="center">https://haxball-stadium-editor.github.io</h4>

<h4 align="center">Tool for creating and editing haxball maps (.hbs). It let you use all new features added in latest <a href="https://www.haxball.com/play">HaxBall</a> updates - <a href="https://github.com/haxball/haxball-issues/wiki/Stadium-(.hbs)-File">HaxBall .hbs file wiki</a> </h4>

### Content:

- [Stadium Creator](#stadium-creator)
- [Text Mode](#text-mode)
- [Properties Tab](#properties-tab)
- [HBS wiki](#wiki)
- [Incoming features](#incoming)

---

<h2 id="stadium-creator">Stadium Creator</h2>

Main page with canvas and all the tools you need to create a new map. If you want to load already existing map, click [Text Mode](#text-mode) button and upload the file.

![stadium creator](https://user-images.githubusercontent.com/103112562/212488744-c732cf76-6bc8-4cdc-85a2-ca25b2565d56.png)

- 1 - Map name, click to edit
- 2 - Main tabs - Stadium Creator, [Text Mode](#text-mode), [Properties Tab](#properties-tab) and Help tab
- 3 - Canvas - everything you do with stadium will appear here
- 4 - Left tools:
  - Properties - click on any element to change its properties
  - Tools:
    - SpawnPoints: you can create them by entering {x,y} coordinates and clickick "Add Red/Blue Spawnpoint". Buttons "Reset spawnpoints" will delete all spawnpoints for choosen team
    - Joints - tab for creating joints (physical connections between two Discs). 2 discs have to be selected.
    - Automatic Mirror - everything you create will be mirrored in both X and Y axis. Helpful when creating symmetric stadiums.
    - Preview - look how your stadium will be displayed in Haxball game
- 5 - Right tools:
   - Select - default one, click to select one object, or drag to select multiple elements (if they are fully marked by selection rectangle)
   - Rotate - move rotation axis and drag to rotate selected objects
   - Scale - move anchor point and drag to scale selected objects
   - Segment - line (curved or straight) that connects two vertexes. Discs can collide with segments and they can also be used as decoration. If you start/stop close to existing vertexes, it will use them instead of creating new ones
   - Vertex - the most basic element of stadium. Point which can collide with discs but cannot move and is not visible. Used to create segments and goal lines
   - Disc - circular physical objects that are placed in the stadium, they can move and collide with other discs
   - Goal - lines belonging to a team, when the ball crosses this line the opossite team scores a goal. Draw between two vertexes.
   - Plane - collision objects that divide the map in two by an infinite line. They are useful for creating the boundaries of the stadium
- 6 - Bottom tools:
  - Undo - delete your last change
  - Redo - well, maybe you deleted it by accident
  - Copy - copy selected object with all its properties
  - Paste - paste copied object
  - Delete - delete all selected objects
  - Select All
  - Select None
  - Inverse Selection
  - Duplicate - copy and paste all selected objects. They will be pasted in the exactly the same coordinates as parent elements.
  - Cut - just like Copy, but delete seleced objects
  - Zoom buttons - zoom out or zoom in

---

<h2 id="text-mode">Text Mode</h2>

Text area, where you can directly change your stadium JSON file, download the .hbs file and upload existing stadium from your computer.

![text mode](https://user-images.githubusercontent.com/103112562/212491329-8545bdf9-48cc-4b40-9193-9fc80e53e4f5.png)

- Save - go back to Stadium Creator
- Cancel Changes - undo changes. Helpful when you edit some values, that cause an error to be displayed
- Clear - delete all the text and start from scratch
- Goto Character - this function is currently under development
- Copy All - copy all the text area
- Download .hbs file - your stadium is converted to .hbs file, so you can load it in Haxball
- Upload .hbs file - loads the existing stadium from your file

---

<h2 id="properties-tab">Properties Tab</h2>

![properties tab](https://user-images.githubusercontent.com/103112562/212548576-f4718d66-3ccf-4283-a31d-0d8791e80862.png)

Modify your stadium just like you want. Every property has a built-in error checker, so if you enter a wrong value, it will switch back to previous one. Read more about the stadium properties [HERE](https://github.com/haxball/haxball-issues/wiki/Stadium-(.hbs)-File)

---

<h2 id="wiki"> HBS wiki</h2>

https://github.com/haxball-stadium-editor/haxball-stadium-editor.github.io/wiki - every important information about .hbs format

---

<h2 id="incoming> Incoming features</h2>

Features that I will be working on in the near future:
- uploading directly to Haxmaps.com
- increasing zooming capabilities
- extracting stadiums from .hbr recordings (but I'll limit it to those stadiums, that don't have the 'canBeStored' property set to false)
- loading basic haxball stadiums
- spawnpoints - to make them more visible and placeable

