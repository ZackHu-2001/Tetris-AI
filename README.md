### Tetris

**Basic structure:**
```
src
| - app
|    | - firebase           - configuration file for firebase backend
|    | - globals.css        - global css configuration file
|    | - layout.tsx         - UI that shared between routes
|    | - page.tsx           - root page, with route '/'
|
| - components
     | - Modal
        | - BasicModal      - The basic modal component (all the followinng components would be rendered on top of it)
        | - Control         - The control page that would be displayed on the modal when user click control on the main menu
        | - MainMenu        - The main menu page ...
        | - Pause           - The pause page ...
        | - Setting         - The setting page ...
     | - NextPanel          - Right hand side next mino hint
     | - PlayField          - The area where the main gameplay occurs
     | - StatusPanel        - Left hand side status panel
     | - Timer              - 'functional' component as its name suggests 
```

**To accomplish:**
- Create four distinct Modal pages, encompassing both UI construction and the implementation of their respective functionalities.
- Develop NextPanel, PlayField, and StatusPanel concurrently, as they are closely interconnected.

**Overall Milestones:**
M1: Develop a foundational UI for single-player mode implementation     (anticipated duration: one week).
M2: Integrate reinforcement learning into the competition mode          (anticipated duration: one week).
M3: Dedicate time to organizing, documenting, and reporting             (anticipated duration: one week).