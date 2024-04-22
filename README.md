# Tetris AI Challenge


### Open [tetris.zackhu.com](https://tetris.zackhu.com) to play!

### Feature:
- Beside the sprint and infinite mode, **AI competition mode** is supported, with **3 dificulty levels.**
- Easy level AI is implemented with **heuristic based method**, while medium and hard is implemented with **DQN**. 


### AI Competition Mode
![AI competition mode](./public/Screen%20Recording%202024-04-21%20at%202.50.13 PM.gif)
<video>
<source src="./public/AI_illustration.mov" type="video/mp4">
</video> 

**Folder structure:**
```
src
| - app
|    | - firebase           - configuration file for firebase backend
|    | - globals.css        - global css configuration file
|    | - layout.tsx         - UI that shared between routes
|    | - page.tsx           - root page, with route '/'
|
| - components
     | - MenuButton         - Unify menu button style
     | - Modal
        | - BasicModal      - The basic modal component (all the followinng components would be rendered on top of it)
        | - Control         - The control page that would be displayed on the modal when user click control on the main menu
        | - MainMenu        - The main menu page ...
        | - Pause           - The pause page ...
        | - Setting         - The setting page ...
     | - Panels             - Controls the behavior of all those panels
     | - PlayField          - The area where the main gameplay occurs
     | - Timer              - 'functional' component as its name suggests 
     | - GameBoard          - Store global game states
```

**To accomplish:**
- Create four distinct Modal pages, encompassing both UI construction and the implementation of their respective functionalities.
- Develop NextPanel, PlayField, and StatusPanel concurrently, as they are closely interconnected.

**Overall Milestones:**
- M1: Develop a foundational UI for single-player mode implementation     (anticipated duration: one week).
- M2: Integrate reinforcement learning into the competition mode          (anticipated duration: one week).
- M3: Dedicate time to organizing, documenting, and reporting             (anticipated duration: one week).


## To run this project

#### Install dependency
```
npm install
```

#### Run on local server
```
npm run dev
```

#### Build pacakge
```
npm run build
```


## Deploy AI model on server
