// The whole story lives here.
//
// Every passage has an id (its key in `passages`), a title, some text
// (one string per paragraph, HTML like <em> is allowed), and a list of
// choices. Each choice sends the reader to another passage's id with `to`:
//
//   choices: [
//     { text: "Dig into the server logs right now", to: "logs" },
//   ],
//
// A passage with `revised: N` shows as unread again to anyone who read an
// older version, on the map and in the choices. You don't have to add it by
// hand: `node tools/mark-revised.js` bumps it on every passage that changed
// since the last commit, and the pre-commit hook in tools/ runs it for you.
//
// A passage with no choices shows "To be continued…". Add `ending: true`
// to show "The End" instead. Either way it's a dead end, and glows blue on
// the map. `maxEndings` is how many dead ends the story is allowed.
// `targetScenes` is how many scenes the finished book should have
// (one scene per page, plus about 10 pages of extras, going by
// Keyboard Heist).
//
// Run `node tools/check-story.js` after changing anything here. It checks
// for broken choices, loops, stray dead ends and scenes nothing leads to.

const STORY = {
  start: "start",
  maxEndings: 5,
  targetScenes: 100,

  passages: {
    start: {
      title: "2:47 a.m.",
      text: [
        "The alarm goes off at 2:47 a.m., and Dale Pruitt wakes up with a raging hard-on for the first time since the Obama administration.",
        "He stares at it like it’s a ticket that got escalated to him by mistake. “Oh. Hey, buddy. Didn’t know you still worked here.”",
        "Week six on the happy pills. Week six of food tasting like food and his brain actually firing. Week six of noticing shit, like how the company server crashes at exactly 3:00 a.m. every goddamn night and not one person at Brightline Solutions gives a fuck.",
        "Dale’s laptop glows on the nightstand. Server status: green. 2:58. 2:59.",
        "3:00. Red. Dead. Gone.",
        "“Gotcha, you little bitch,” Dale whispers, to the server or his dick. Honestly, either one.",
      ],
      choices: [
        { text: "Dig into the server logs right now", to: "logs" },
        { text: "Get dressed and drive to the office to catch it in the act", to: "office" },
      ],
    },

    // Not written yet (page 4 in the notes).
    logs: {
      title: "The Server Logs",
      text: [],
      choices: [],
    },

    // Not written yet (page 7 in the notes).
    office: {
      title: "Catch It in the Act",
      text: [],
      choices: [],
    },
  },
};
