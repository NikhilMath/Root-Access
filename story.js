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
    // Night one: Monday night into Tuesday morning.

    start: {
      title: "2:47 a.m.",
      revised: 1,
      text: [
        "The alarm goes off at 2:47 a.m., and Dale Pruitt wakes up with a raging hard-on for the first time since the Obama administration.",
        "He stares at it like it’s a ticket that got escalated to him by mistake. “Oh. Hey, buddy. Didn’t know you still worked here.”",
        "Week six on the happy pills. Week six of food tasting like food and his brain actually firing. Week six of noticing shit, like how the company server crashes at exactly 3:00 a.m. every goddamn night and not one person at Brightline Solutions gives a fuck.",
        "Dale’s laptop glows on the nightstand. Server status: green. 2:58. 2:59.",
        "3:00. Red. Dead. Gone.",
        "“Gotcha, you little bitch,” Dale whispers, to the server and his dick.",
      ],
      choices: [
        { text: "Dig into the server logs right now", to: "logs" },
        { text: "Get dressed and drive to the office to catch it in the act", to: "office" },
      ],
    },

    logs: {
      title: "The Server Logs",
      revised: 2,
      text: [
        "Dale props the laptop on his knees. It doesn’t sit flat. He adjusts. It still doesn’t sit flat. He decides that’s a problem for later and opens the logs.",
        "At 2:59:59, nothing. At 3:00:00, forty-one thousand connections hit the server at once, from Germany, Japan, Brazil and one Holiday Inn Express outside Omaha. The server takes it like a champ for about four seconds, then lies down and dies.",
        "That’s weird thing number one.",
        "Weird thing number two: somebody keeps logging in as an administrator with an account Dale never made. The username is <em>xXr00tXx</em>, which means it’s either a hacker or a fourteen-year-old.",
        "Weird thing number three: the network jack in Conference Room B has been shoveling hundreds of gigabytes out of the building most nights between one and four in the morning.",
        "Six weeks ago, Dale would have closed the laptop and stared at the ceiling until he died. Tonight, he cracks his knuckles.",
      ],
      choices: [
        { text: "Trace the mystery admin account", to: "trace" },
        { text: "Find out what the hell is going on in Conference Room B", to: "bandwidth" },
      ],
    },

    trace: {
      title: "xXr00tXx",
      text: [
        "It takes Dale eleven minutes and an energy drink he finds in the back of the fridge, expiration date 2016, to trace the login. It isn’t coming from Russia. It isn’t coming from China.",
        "It’s coming from 14 Heron Point Drive, Lakeshore Estates, the part of town where the mailboxes are shaped like smaller, nicer houses.",
        "He pulls it up on Street View. A mansion. A three-car garage. A fountain in the front yard: a marble cherub pissing into a clamshell.",
        "“Who the fuck at Brightline can afford a pissing cherub?” Dale asks his empty bedroom. Brightline Solutions, where he’s run IT for eleven years, hasn’t given out raises since 2019. Last Christmas, the bonus was a fleece vest.",
        "It’s 3:31 a.m. He is wide awake, and so, still, is everything else.",
      ],
      choices: [
        { text: "Drive to Lakeshore Estates in your pajamas", to: "lakeshore" },
        { text: "Screenshot everything and try to sleep", to: "insomnia" },
      ],
    },

    bandwidth: {
      title: "Port 14",
      revised: 1,
      text: [
        "Dale follows the traffic. Most nights, from 1:00 to 4:00 a.m., the jack in the wall of Conference Room B uploads hundreds of gigabytes of something to a streaming site. Night after night. Like a heartbeat. Like a big, sweaty heartbeat.",
        "Only one badge besides Dale’s and the night guard’s works in that building after midnight. It belongs to Brent Koslowski, VP of Operations, Dale’s boss, a man who says “per my last email” out loud, at funerals.",
        "Brent. Of course it’s Brent. Brent, who once wrote Dale up for “tone” in an out-of-office reply. Brent, who microwaves fish.",
        "For six years, Dale didn’t have the energy to hate Brent properly. Now, thanks to modern pharmacology, he has energy to spare.",
        "He picks up his phone.",
      ],
      choices: [
        { text: "Text Brent something unhinged", to: "group_text" },
        { text: "Put the phone down and try to sleep", to: "insomnia" },
      ],
    },

    group_text: {
      title: "Sent 3:14 a.m.",
      text: [
        "Dale types: <em>I know what you’re doing in Conference Room B, you sweaty little goblin. I’m coming for you.</em>",
        "He hits send. For four glorious seconds, he feels like an action hero. Then he looks at the top of the thread.",
        "<em>Brightline All Staff (43)</em>.",
        "Read by 1. Read by 4. Read by 9. Who the fuck is awake?",
        "The first reply is from Bev Lund, the CEO and founder, a sixty-eight-year-old woman who bakes lemon bars every Friday and calls everyone “hon”: a little red heart, and <em>Get some sleep, hon!</em>",
        "Then Gloria from the front desk: <em>!!!!!!</em>",
        "Then Kevin, the other half of the IT department: <em>bro</em>",
        "Then, finally, Brent: <em>My office. 9 a.m.</em>",
      ],
      choices: [
        { text: "Throw your phone in the hamper and try to sleep", to: "insomnia" },
        { text: "Get dressed. You’re never sleeping again.", to: "waffle" },
      ],
    },

    lakeshore: {
      title: "Lakeshore Estates",
      text: [
        "At 3:52 a.m., Dale is parked across from the pissing cherub in a 2011 Corolla, wearing pajama pants with tiny tacos on them.",
        "Every light in the mansion is off but one. Through the big front window, a man in a bathrobe is hunched over a laptop at the kitchen island, stabbing the keyboard with one finger and yelling “OPEN, YOU FUCK” at the screen.",
        "A shoe flies in from off-screen and hits him in the head. A woman’s voice, from upstairs: “Some of us are trying to SLEEP, Ronald.”",
        "The man throws the shoe back. It hits a chandelier.",
        "Then the sprinklers come on. Dale’s window is down.",
      ],
      choices: [
        { text: "Ring the doorbell, soaking wet", to: "doorbell" },
        { text: "Get the fuck out of Lakeshore Estates", to: "waffle" },
      ],
    },

    doorbell: {
      title: "Ding-Dong",
      text: [
        "The door opens on a man about seventy, tan as a catcher’s mitt, in a silk robe that is doing absolutely nothing. Dale looks at the ceiling. The ceiling is safer.",
        "“You the food?” the man asks.",
        "“I’m Dale. From IT. At Brightline Solutions.”",
        "The man lights up. “Ron Lund! Chief Visionary Officer!” He pumps Dale’s hand. Ron Lund. As in Bev Lund, the CEO of Brightline, a sweet sixty-eight-year-old woman who bakes lemon bars every Friday and calls everybody “hon.” This is her house. She is married to <em>this</em>.",
        "“IT guy! Perfect!” Ron says. “I’ve been trying to get into the work computer all night. That woman is hiding money on there, I can smell it. Come in, come in. You drink scotch?”",
        "From upstairs: “RONALD, IF THAT’S ANOTHER BOOKIE, I SWEAR TO GOD.”",
        "“It’s not a bookie, Bev!” Ron yells. Then, quietly, to Dale: “She’s a lot.”",
      ],
      choices: [
        { text: "Take the scotch", to: "scotch" },
        { text: "Back away slowly", to: "waffle" },
      ],
    },

    scotch: {
      title: "Single Malt",
      text: [
        "By 4:30 a.m., Dale is three scotches deep on a white leather couch, and Ron is pitching.",
        "RonCoin, a cryptocurrency “backed by Ron.” Pup Puffs, a vape for dogs. A podcast called <em>Ron Talks Business</em>, which has three listeners, and two of them are Ron on different devices.",
        "“Bev’s never believed in me,” Ron says. “Thirty-one years. You know how many of my jokes she’s laughed at? Zero. I counted.”",
        "He leans in. His robe leans with him. “Here’s the thing, Dale. Brightline hasn’t made a dime since 2019, but payroll never bounces and she just bought a Lexus. Cash. She’s hiding money on that server. You help me find it, I’ll give you ten percent. Of RonCoin.”",
        "Somewhere upstairs, Bev’s snoring sounds like it hates him.",
        "Dale has never been this drunk at this hour on a weekday. His dick, for the record, is still at work.",
      ],
      choices: [
        { text: "Shower in the pool house and go straight to the office", to: "morning" },
        { text: "Pass out on Ron’s couch", to: "late" },
      ],
    },

    insomnia: {
      title: "4:12 a.m.",
      text: [
        "Dale does not sleep.",
        "He lies there with his heart going like a printer that won’t stop printing, and he googles things. <em>happy pills side effects</em>. <em>happy pills night sweats</em>. <em>happy pills boner 4 hours normal???</em>",
        "The internet says call a doctor. The internet also says he has eleven kinds of cancer and a hot single in his area.",
        "He tries to take care of the situation himself. It goes fine. Then he’s still awake, but now he’s also sticky and thoughtful.",
        "He keeps thinking about the server. 3:00 a.m. Every night. On the dot. Like somebody <em>scheduled</em> it.",
      ],
      choices: [
        { text: "Call the 24-hour nurse line", to: "nurse" },
        { text: "Give up and go to work early", to: "morning" },
      ],
    },

    nurse: {
      title: "The Nurse Line",
      text: [
        "A nurse named Barb answers. Barb sounds sixty and unshockable.",
        "Dale describes his side effects. All of them. In order. With times. He describes things he didn’t know he was going to describe. There’s a stretch about his nipples that goes on longer than either of them would like.",
        "“Hon,” Barb says finally. “Are you sad?”",
        "Dale thinks about it. “No. That’s the weird part. I’m... curious. I’m noticing things. There’s a server at work that dies every night at three, and I need to know why so bad it’s giving me a boner.”",
        "A long pause. “That sounds like a you problem, hon. Drink some water. Don’t take extra.”",
        "She hangs up. Dale drinks a full glass of water, lies back down, and somehow, finally, falls asleep.",
      ],
      choices: [
        { text: "Hit snooze", to: "late" },
        { text: "Wake up at five and go get waffles", to: "waffle" },
      ],
    },

    office: {
      title: "Catch It in the Act",
      revised: 1,
      text: [
        "Dale drives to work at 3:06 a.m. in sweatpants, a Brightline fleece vest and a mood. The sweatpants are a mistake. Week six. He drives hunched over like a man smuggling a lamp.",
        "The Brightline office is the third floor of a beige building next to a mattress store. The lobby is dark. Earl, the night guard, is asleep at his desk with a crossword over his face, snoring so hard it flutters.",
        "Upstairs, two things are wrong.",
        "The server room door is propped open with a stapler. And down the hall, there’s light under the door of Conference Room B, pink and purple, pulsing.",
      ],
      choices: [
        { text: "Check the server room", to: "serverroom" },
        { text: "Check Conference Room B", to: "confb_night" },
      ],
    },

    serverroom: {
      title: "Ninety-Four Degrees",
      text: [
        "The server room is ninety-four degrees and smells like a hot laptop and, weirdly, lemons.",
        "The server is rebooting itself, wheezing through its startup screen like a guy getting up out of a beanbag chair. Dale pats it. “Who did this to you, buddy?”",
        "Then he hears it: a hum that isn’t the server. Behind the rack, zip-tied to the wall, there’s a second machine. Six graphics cards, three fans, a nest of power strips and a sticky note: <em>DO NOT TOUCH. K.</em>",
        "K. Kevin. Kevin, twenty-three, the other half of Brightline’s IT department, who vapes cotton-candy flavor and wrote “bro” on his own performance review. Kevin’s been mining crypto on the company’s electricity.",
        "“You little shit,” Dale whispers, almost proud.",
      ],
      choices: [
        { text: "Unplug the crypto rig", to: "unplug" },
        { text: "Leave it and check Conference Room B", to: "confb_night" },
      ],
    },

    unplug: {
      title: "Unplugged",
      text: [
        "Dale pulls the plug. The fans whine down. The room drops five degrees in a minute. He has never felt so powerful in his life, including the time he fixed the CEO’s printer just by looking at it.",
        "His phone buzzes.",
        "<em>Kevin: bro my rig just went offline</em>",
        "<em>Kevin: bro??</em>",
        "<em>Kevin: if this is the government I can explain</em>",
        "Dale turns the phone face down. The server boots. The lights go green. Dale stands in the cool dark like a god of small things.",
        "Then it hits him: the server died at three, and he pulled the plug at 3:40. Whatever’s killing it, he hasn’t proven shit.",
      ],
      choices: [
        { text: "Go get waffles and think", to: "waffle" },
        { text: "Stay at your desk until morning", to: "morning" },
      ],
    },

    confb_night: {
      title: "Conference Room B",
      text: [
        "Conference Room B is empty. But it’s warm. Somebody was just here, and left in a hurry.",
        "There’s a ring light on a tripod, still on, set to pink. Three empty energy drinks. A smear of glitter on the whiteboard, under the words <em>SET LIST</em>, and then: <em>1. Teams Ringtone (Extended Mix). 2. Printer Jam (Synergy Edit). 3. Reply All (Club Version).</em>",
        "Dale knows that handwriting. It’s Brent’s. Brent Koslowski, VP of Operations, Dale’s boss, a total dick, a man who once wrote Dale up for “tone” in an out-of-office reply.",
        "Dale has no idea what the set list means. But it’s 3:20 in the morning, and the whole room smells like Brent’s body spray, which is called something like <em>Arctic Predator</em>.",
        "Then he hears the elevator ding.",
      ],
      choices: [
        { text: "Hide under the conference table", to: "under_table" },
        { text: "Grab the set list and get out", to: "waffle" },
      ],
    },

    under_table: {
      title: "Under the Table",
      text: [
        "Dale dives under the conference table. It’s not Brent. It’s Earl, the night guard, seventy-one years old, and he is not alone.",
        "He’s with Rosa from the cleaning crew. They are not here to clean.",
        "What follows is twenty minutes Dale will carry with him for the rest of his life. The table creaks. Earl narrates everything like a nature documentary. At one point Rosa says, “Oh, Earl, the minutes,” and Dale doesn’t know if she means the meeting minutes or something else, and he never, ever wants to know.",
        "Dale holds very still. His leg falls asleep. The rest of him, thanks to pharmaceutical science, absolutely does not.",
        "When it’s over, Earl says, “Same time Friday?” and Rosa says, “It’s a date, you old dog,” and they leave holding hands. It’s honestly kind of sweet.",
      ],
      choices: [
        { text: "Crawl out and wait at your desk till morning", to: "morning" },
        { text: "Fall asleep under there", to: "late" },
      ],
    },

    waffle: {
      title: "The Waffle Barn",
      text: [
        "At 5:15 a.m., the Waffle Barn on Route 9 is Dale, two truckers, and a waitress named Crystal who calls him “sugar” and doesn’t make him feel like a pervert for ordering three waffles.",
        "Food tastes like food. That’s still new. He almost cries into the syrup.",
        "He takes a napkin and writes <em>WHO IS KILLING MY SERVER?</em> across the top. Under it, he writes <em>everybody</em>. Then he crosses that out and writes <em>somebody</em>. Then he draws a pretty good server with a sad face, and a less good boner, which he scribbles out when Crystal comes back with the coffee.",
        "“Rough night, sugar?” she asks.",
        "“Best night I’ve had in six years,” Dale says, and means it.",
      ],
      choices: [
        { text: "Head to the office before anyone else", to: "morning" },
        { text: "Order a fourth waffle", to: "late" },
      ],
    },

    // Day one: Tuesday at Brightline.

    morning: {
      title: "8:58 a.m.",
      text: [
        "Brightline Solutions makes workflow software. Dale has worked there eleven years and still couldn’t tell you what workflow software does. Neither could the customers, which may be why there are so few of them.",
        "There are forty-three employees, one coffee machine and a carpet the color of a hangover. And at the front door every morning stands Bev Lund, CEO and founder, sixty-eight, in a cardigan with little cats on it, handing out lemon bars.",
        "“Morning, hon!” She squints at him. “Well, look at you. You look <em>awake</em>. It’s spooky.”",
        "“New meds,” Dale says, and takes two lemon bars.",
        "At the front desk, Gloria, who has worked reception since the invention of the telephone, leans over. “Brent wants you in his office,” she says. Brent Koslowski, VP of Operations, Dale’s boss, a man who says “per my last email” out loud. “He’s eating his angry salad.”",
      ],
      choices: [
        { text: "Go see what Brent wants", to: "brent_office" },
        { text: "Hide in the IT closet", to: "it_closet" },
        { text: "Get the gossip from Gloria first", to: "gloria" },
      ],
    },

    late: {
      title: "9:41 a.m.",
      text: [
        "Dale is forty minutes late, and he walks straight into the monthly all-hands in Conference Room A, because of course he does.",
        "Forty-three heads turn. At the front of the room is Bev Lund, CEO and founder, sixty-eight, in a cardigan with little cats on it. Bev bakes lemon bars every Friday. Bev calls everyone “hon.” Bev is the only reason anyone stays.",
        "“And we lost money again this quarter,” she’s saying, “but don’t you worry about payroll, hons. Payroll’s covered. Payroll’s always covered.”",
        "Nobody asks how. Nobody ever asks how.",
        "In the front row, a tan old man in golf clothes is asleep with his mouth open. That’s Ron Lund, Bev’s husband, “Chief Visionary Officer.” Nobody knows what he does. Bev doesn’t look at him once.",
        "Next to Bev stands a woman Dale’s never seen: dark curls, a blazer, a lanyard from a company called CoreSwitch Networks. “And this is Tasha,” Bev says. “She’s here all week to sell us a new server, so be nice.”",
        "Dale’s brain, which has been dead for six years, sits up and says <em>oh, hello</em>.",
      ],
      choices: [
        { text: "Sit next to the vendor", to: "tasha_meet" },
        { text: "Sit next to Ron and find out what his deal is", to: "ron_meet" },
      ],
    },

    gloria: {
      title: "Front Desk",
      text: [
        "Gloria lowers her voice, which for Gloria means the second floor can still hear it.",
        "She tells Dale that Brent’s been coming in “at all hours” since his divorce. That Kevin from IT vapes in the stairwell. That Bev just bought a brand-new Lexus, “cash, hon, cash,” even though the company hasn’t had a good year since 2019.",
        "“And Ron,” she says. Ron Lund, Bev’s husband, a tan old man whose title is Chief Visionary Officer and whose job is golf. “Ron’s been asking everybody for the server password. Even me. I told him it was ‘password.’”",
        "“Is it?” Dale asks.",
        "Gloria gives him a look. “Honey, I don’t even know what a server is.”",
        "Then she leans in closer. “And the power bill. I open the mail. The power bill for this office is triple what it should be, and it’s all at night. Nobody’s here at night, Dale.”",
      ],
      choices: [
        { text: "Go grill Kevin", to: "it_closet" },
        { text: "Go find Ron", to: "ron_meet" },
      ],
    },

    brent_office: {
      title: "Per My Last Email",
      text: [
        "Brent’s office has a standing desk, a motivational poster of a rowing team, and Brent, eating a salad so aggressively it seems like the salad owes him money.",
        "He doesn’t offer Dale a chair. There is only one chair, and Brent is standing next to it, which somehow makes it worse.",
        "“Ticket backlog,” Brent says, chewing. “Forty-one open tickets. Bev’s printer. Gloria’s mouse. And the server keeps dying at night, which is your job, so fix it.”",
        "Then he stops chewing. “Also. Somebody’s been poking around the network at night. Running scans. Looking at things.” He points his fork at Dale. “If it’s you, stop. Some things on this network are none of your business.”",
        "Six weeks ago, Dale would have said “yes, Brent.” Today, he watches a little bead of sweat roll down Brent’s temple and thinks: <em>Gotcha, you little bitch.</em>",
      ],
      choices: [
        { text: "Ask Brent exactly what’s none of your business", to: "brent_cagey" },
        { text: "Say “yes, Brent” and leave", to: "it_closet" },
      ],
    },

    brent_cagey: {
      title: "None of Your Business",
      text: [
        "“What things,” Dale says, “are none of my business, Brent?”",
        "Brent goes pale, then red, then a color Dale has only ever seen on a ham. “Things,” he says. “Ops things. Executive things.”",
        "His hand drifts, very casually, to his top desk drawer and stays there.",
        "“Are you in here at night, Brent?”",
        "“Get out of my office.”",
        "Dale goes. But on his way out, he glances back, and through the glass he watches Brent open the drawer, take out a pair of mirrored sunglasses, look at them like a man looking at an old photo of a lover, and put them back.",
        "Brent goes to lunch at noon every day. Brent is a man of routine.",
      ],
      choices: [
        { text: "Search Brent’s desk when he goes to lunch", to: "search_brent" },
        { text: "Go hide in the IT closet", to: "it_closet" },
      ],
    },

    it_closet: {
      title: "The IT Closet",
      text: [
        "The IT department is a converted coat closet with two desks, one window that faces a wall, and Kevin.",
        "Kevin Mulvaney is twenty-three. He wears a beanie indoors. He’s vaping something that smells like a carnival caught fire, and he has three monitors: two show crypto charts, and one shows a ticket from Bev about her printer that he has marked <em>won’t fix</em>.",
        "“Bro,” Kevin says. “You look... awake. You good? You look like you’ve seen God.”",
        "“Something kills our server every night at three,” Dale says. “On the dot.”",
        "Kevin’s eyes flick, for half a second, to the crypto chart.",
      ],
      choices: [
        { text: "Ask Kevin what the fuck that chart is", to: "crypto" },
        { text: "Ask Kevin what he knows about the 3 a.m. crash", to: "kevin_theory" },
      ],
    },

    crypto: {
      title: "ShibaGold",
      text: [
        "It’s called ShibaGold. It has a cartoon dog on it. Kevin has been mining it for eight months on a rig hidden behind the server rack, running on Brightline’s electricity.",
        "“Total profit?” Dale asks.",
        "Kevin checks. “Eleven dollars and forty cents. But bro. When it moons.”",
        "“Is your rig crashing my server?”",
        "“No way, bro. My rig goes down at three too. The server takes it down with it. I lose like four minutes of mining every night.” He looks genuinely hurt. “Somebody’s murdering us both, bro.”",
        "Dale stares at him. Kevin stares back with the clear eyes of a man who has never once lied, because he has never once thought far enough ahead to need to.",
        "It isn’t Kevin. Goddamnit.",
      ],
      choices: [
        { text: "Ask Kevin what else he’s noticed at night", to: "kevin_theory" },
        { text: "Make him unplug it and go to lunch", to: "lunch" },
      ],
    },

    kevin_theory: {
      title: "Kevin Has Theories",
      text: [
        "Kevin has theories. Kevin has so many theories.",
        "It’s Russian hackers. It’s Chinese hackers. It’s a guy he used to play video games with in high school who “never got over it.” It’s aliens, “but, like, chill aliens.”",
        "Then he says, “Or it’s Bev.”",
        "Dale laughs. Bev Lund, the CEO. Bev of the lemon bars.",
        "“No, bro, for real. I’ve got the security cameras on my phone.” He shows Dale a clip. 2:38 a.m., last Thursday. Bev, in her cardigan, coming in the back door with a young guy. A hot young guy. They go into the supply closet. “And they don’t come out for like an hour,” Kevin says. He raises his eyebrows so high his beanie moves. “Get it, Bev.”",
      ],
      choices: [
        { text: "Pull up the rest of the security footage", to: "footage" },
        { text: "Go find Bev’s husband and see what he knows", to: "ron_meet" },
      ],
    },

    footage: {
      title: "Security Footage",
      text: [
        "Dale pulls up the last week of security footage on the big monitor in the IT closet. Kevin, twenty-three, the other half of the IT department, brings popcorn from somewhere. Kevin always has popcorn from somewhere.",
        "Last Thursday, 2:38 a.m.: Bev Lund, CEO, cardigan, comes in the back door. With her is a young guy, maybe twenty-five, with cheekbones you could open mail with, carrying a big black duffel bag. They go into the supply closet. The door shuts.",
        "3:51 a.m.: they come out. Bev’s cardigan is buttoned wrong. The young guy is sweaty and smiling. Bev pats him on the butt.",
        "“Holy shit,” Dale says. “The CEO is banging somebody in the supply closet.”",
        "“Four, five nights a week, bro,” Kevin says. “I checked. For months. Bev’s an animal.”",
        "Dale’s whole worldview tilts. Bev. Lemon bar Bev. Bev, who once sent an all-staff email reminding everyone to “be kind to your heart and your colon.”",
      ],
      choices: [
        { text: "Rewind further", to: "footage2" },
        { text: "Close the laptop. You saw nothing.", to: "lunch" },
      ],
    },

    footage2: {
      title: "Rewind",
      text: [
        "Dale rewinds. 1:02 a.m., same night: Brent Koslowski, VP of Operations and Dale’s boss, comes in carrying a ring light, a duffel bag and a case of energy drinks. He goes into Conference Room B. He doesn’t come out until four.",
        "3:24 a.m.: a tan old man in a bathrobe and golf shoes tries to get into the server room with a butter knife. It’s Ron Lund, Bev’s husband, the “Chief Visionary Officer.” He fails for nine minutes, says something the camera can’t hear but Dale can read on his lips, which is “FUCK THIS FUCKING DOOR,” and leaves.",
        "4:10 a.m.: Earl, the night guard, and a woman from the cleaning crew stroll past holding hands. Nobody needs to know about that.",
        "“This building,” Kevin says, “is a <em>lot</em> at night, bro.”",
        "Dale is starting to feel like the only person at Brightline who goes home at five.",
      ],
      choices: [
        { text: "Search Brent’s desk while he’s at lunch", to: "search_brent" },
        { text: "Go to lunch and process", to: "lunch" },
      ],
    },

    search_brent: {
      title: "Brent’s Desk",
      text: [
        "At 12:01, Brent leaves for lunch. At 12:02, Dale is in his desk.",
        "Top drawer: mirrored sunglasses. A lanyard that says <em>VIP — ALL ACCESS</em>. Glow sticks. A tube of hemorrhoid cream. A USB stick labeled <em>SYNERGY MASTERS — DO NOT LISTEN</em>.",
        "Second drawer: a printed-out comment, laminated, from somebody called <em>Viewer_11</em>: <em>ur the only thing that gets me thru the night king</em>.",
        "Dale has no idea what any of it means. He knows it means something.",
        "Then he hears the door. Brent forgot his salad.",
      ],
      choices: [
        { text: "Dive under Brent’s desk", to: "brent_call" },
        { text: "Pretend you’re fixing his computer", to: "lunch" },
      ],
    },

    brent_call: {
      title: "Under Brent’s Desk",
      text: [
        "Dale is under Brent’s desk, nose to nose with Brent’s loafers. There are no socks in Brent’s loafers. Brent’s ankles are very, very pale.",
        "Brent makes a phone call. His voice is different. Softer. Almost nervous.",
        "“Hey, Mom. Yeah. No, I’m eating. Yes, the salad.” A pause. “Tonight’s a big one, Mom. One a.m. I’ve got a new track. Yeah, the printer one. Eleven people last time, Mom. Eleven.” A longer pause. “No, I can’t do it from home, my Wi-Fi sucks. You know it sucks. Okay. Love you. Bye.”",
        "He hangs up. He sniffs, once. Then he takes his salad and leaves.",
        "Dale lies under the desk for a long time. Tonight. One a.m. Something big.",
      ],
      choices: [
        { text: "Go to lunch like a normal person", to: "lunch" },
        { text: "Skip lunch and start planning tonight", to: "kevin_camera" },
      ],
    },

    tasha_meet: {
      title: "The Vendor",
      text: [
        "Tasha Reyes sells networking hardware for CoreSwitch Networks. She has dark curls, a blazer, and a laugh that makes Dale’s pills feel like they’re working overtime.",
        "“So you’re the IT guy,” she whispers, while Bev talks about the parking lot. “I’ve seen your network diagram. It’s a crime scene.”",
        "“Thank you,” Dale whispers back, because his mouth is no longer connected to his brain.",
        "She grins. “Your server goes down every night at three. You know that?”",
        "“I <em>know</em> that,” Dale says, too loud. Forty-three heads turn again. In the front row, Ron snores.",
        "Tasha leans in until her shoulder touches his. “After this,” she whispers, “I want to see your rack.”",
        "Dale has to think about baseball for the rest of the meeting. He doesn’t even like baseball.",
      ],
      choices: [
        { text: "Show her the server room", to: "rack_tour" },
        { text: "Play it cool and see her at lunch", to: "lunch" },
      ],
    },

    rack_tour: {
      title: "Show Me Your Rack",
      text: [
        "The server room is hot. Tasha takes her blazer off. Dale stares very hard at a wall.",
        "She looks at the server the way some people look at a three-legged puppy. “Oh, baby,” she tells it. “Who hurt you?”",
        "She pulls up the logs on her tablet and finds the 3:00 a.m. spike. Forty-one thousand connections, all at once, all asking for the same folder.",
        "“This isn’t an attack, Dale,” she says. “Attacks are messy. This is an <em>audience</em>. Forty thousand people know something drops on this server at three, and they want it bad.”",
        "“Want what?”",
        "“No idea. But your server’s hosting the hottest thing in town, and it isn’t you.” She hands him her card. On the back she’s written <em>Drinks? I expense everything.</em>",
      ],
      choices: [
        { text: "Ask her out for drinks tonight", to: "drinks" },
        { text: "Say you’ll think about it and go to lunch", to: "lunch" },
      ],
    },

    ron_meet: {
      title: "Chief Visionary Officer",
      text: [
        "Ron Lund, Bev’s husband, is in the break room eating the lemon bars that were meant for the afternoon. Nobody knows what Ron does. His business card says <em>Chief Visionary Officer</em>. His tan says <em>golf</em>.",
        "“IT guy!” he says. “Sit, sit. You ever hear of RonCoin?”",
        "Dale hears of RonCoin, a cryptocurrency “backed by Ron.” He hears of Pup Puffs, a vape for dogs. He hears of <em>Ron Talks Business</em>, a podcast with three listeners. Ron does not seem to remember whether he has pitched these to Dale before, and does not seem to care.",
        "“Here’s the thing.” Ron points a lemon bar at him. “This company hasn’t made a dime since 2019. But payroll never bounces, and Bev just bought a Lexus. Cash. Where’s that money coming from, Dale?” He leans in. “I need the server password. As Chief Visionary Officer.”",
        "Bev walks in, sees Ron, and the temperature drops ten degrees.",
        "“Ronald.”",
        "“Beverly.”",
        "She leaves. The coffee maker frosts over.",
      ],
      choices: [
        { text: "Give Ron a fake password", to: "fake_password" },
        { text: "Tell Bev that Ron asked for the password", to: "bev_tell" },
      ],
    },

    fake_password: {
      title: "Password",
      text: [
        "Dale writes a password on a sticky note: <em>RonIsADeadbeat1!</em>",
        "Ron types it into his phone very slowly, sounding it out. “Ron... is... a... dead... beat.” He looks up, touched. “That’s a strong password.”",
        "“The strongest,” Dale says.",
        "It doesn’t work, because it isn’t a password for anything. Ron tries it for four minutes, then decides the server is broken, which it often is.",
        "“Tell you what,” Ron says, lowering his voice. “You find where she’s hiding that money, I’ll cut you in. Ten percent. In RonCoin, which is going to be worth a fortune. I’ve been trying to get in myself. At night. Under a secret name.” He winks. “Very hacker.”",
      ],
      choices: [
        { text: "Ask Ron what his secret hacker name is", to: "ron_mole" },
        { text: "Get away from Ron and go to lunch", to: "lunch" },
      ],
    },

    bev_tell: {
      title: "Bev’s Office",
      text: [
        "Bev’s office has a cat calendar, a bowl of butterscotch candies and a framed photo of Bev holding a giant check from 1996.",
        "“Ron wanted the server password?” Bev smiles. It’s a perfectly nice smile. There are no eyes in it. “Thank you, hon. You did the right thing.”",
        "She unwraps a butterscotch. “Ron and I have been married thirty-one years. If that man fell into a wood chipper, I would ask them to run him through twice, to be sure.” She pops the candy in her mouth. “Lemon bar?”",
        "Dale takes the lemon bar. He is afraid not to.",
        "As he leaves, Bev calls after him. “Oh, and Dale? Don’t you worry about that silly server, hon. It always comes back up.”",
        "Dale didn’t say anything about the server.",
      ],
      choices: [
        { text: "Go look at the security footage", to: "footage" },
        { text: "Go to lunch and think about what just happened", to: "lunch" },
      ],
    },

    ron_mole: {
      title: "Very Hacker",
      text: [
        "Ron checks that the coast is clear. There’s nobody in the break room but a ficus.",
        "“xXr00tXx,” he whispers. “With zeroes. My grandson set it up. I log in from home at night, looking for where she hides the money. Can’t find shit. The computer just says ‘access denied,’ and then I get mad, and then Bev throws a shoe at me.”",
        "Dale knows that name. It’s all over the server logs: a mystery admin account poking around every night. He figured it was a hacker. It’s a seventy-year-old man in a bathrobe who thinks zeroes make you dangerous.",
        "“So we’re partners,” Ron says. “You’re my mole. My inside guy.” He tries to do a secret handshake. It goes on too long and ends with Ron doing finger guns.",
        "One mystery down. And it wasn’t even the one that’s killing the server.",
      ],
      choices: [
        { text: "Go check the security footage", to: "footage" },
        { text: "Go to lunch, partner", to: "lunch" },
      ],
    },

    lunch: {
      title: "Lemon Bars",
      text: [
        "At 12:15, the whole company crams into the break room for December birthdays. Bev brought lemon bars. Bev always brings lemon bars.",
        "Everyone’s here. Bev Lund, the CEO, in a cardigan with reindeer on it, cutting squares. Her husband, Ron, the so-called Chief Visionary Officer, eating the squares as fast as she cuts them. Brent Koslowski, VP of Operations and Dale’s boss, in the corner, eating salad out of the container and checking his watch. Kevin, the other half of IT, vaping into his hoodie. Gloria from the front desk, telling everyone what she knows, which is everything.",
        "And Tasha Reyes, the vendor from CoreSwitch Networks, who is in town all week to sell Bev a new server, and who just winked at Dale over a paper plate. Dale has not been winked at since 2014.",
        "“Holiday party’s Friday!” Bev announces. “Open bar!” Everyone cheers. Ron says, “Who’s paying for that?” and Bev says, “Not you, Ronald,” and the room goes very quiet.",
        "Dale eats a lemon bar and makes a decision. Tonight, he’s going to be in this building at 3:00 a.m. when the server dies. He’s going to watch it happen. He’s going to find out who did it.",
      ],
      choices: [
        { text: "Go home and nap before tonight", to: "nap" },
        { text: "Stay at your desk and pretend to work", to: "desk_afternoon" },
        { text: "Go to your 1:30 with your psychiatrist", to: "therapy" },
      ],
    },

    therapy: {
      title: "Dr. Okafor",
      text: [
        "Dr. Okafor has a soft voice, a bowl of polished rocks and a very good poker face, which she is going to need for the next forty minutes.",
        "Dale tells her everything. The sweating. The vivid dreams. Food tasting like food. The fact that he’s been hard more in the last six weeks than in the last six years, and how it’s like owning a dog that needs to go out at all times, including during a dental cleaning.",
        "“And the server,” he says. “It dies every night at three. I can’t stop thinking about it. I need to know why. Is that a side effect?”",
        "Dr. Okafor writes something down. “Dale,” she says gently, “I think that’s just being alive. You were depressed for a long time. Now you’re curious. It’s supposed to feel like this.”",
        "“Like a boner?”",
        "“Like a boner,” she agrees, and it is the best forty minutes Dale has ever paid for.",
      ],
      choices: [
        { text: "Go home and nap before tonight", to: "nap" },
        { text: "Go back to work", to: "desk_afternoon" },
      ],
    },

    nap: {
      title: "Nap Time",
      text: [
        "Dale goes home early to nap before his stakeout. He does not nap.",
        "He lies on the couch for an hour with his heart going and his brain going and other things going. He cleans the whole kitchen. He alphabetizes his spices. He watches a documentary about octopuses and gets weirdly emotional.",
        "At eight, he’s about to take his evening pill when he realizes he can’t remember whether he already took it.",
        "He looks at the pill. The pill looks at him.",
        "The bottle says <em>do not double dose</em>. The bottle doesn’t have a server dying at 3 a.m.",
      ],
      choices: [
        { text: "Take it, just in case", to: "double_dose" },
        { text: "Skip it, eat a sandwich and head in", to: "stakeout" },
      ],
    },

    desk_afternoon: {
      title: "4:30 p.m.",
      text: [
        "Dale spends the afternoon pretending to work, which he is great at. He has had eleven years of practice.",
        "Brent drops off a ticket that says <em>Fix it.</em> and nothing else. Ron walks past the IT closet four separate times, slowly, like a shark in khakis. Bev stops by with a lemon bar and says, “Go home early tonight, hon. Nothing happens around here at night.”",
        "Dale thanks her. Then he writes <em>NOTHING HAPPENS AT NIGHT??</em> on a sticky note and underlines it three times.",
        "His phone buzzes. A text from a number he doesn’t have saved:",
        "<em>It’s Tasha. The vendor. Drink tonight? I expense everything ;)</em>",
      ],
      choices: [
        { text: "Text Tasha back", to: "drinks" },
        { text: "Get Kevin to help you rig a camera in the server room", to: "kevin_camera" },
      ],
    },

    drinks: {
      title: "Happy Hour",
      text: [
        "The Lucky Lantern is a bar by the highway with sticky tables and a jukebox that only plays songs about trucks. Tasha drinks bourbon. Dale drinks whatever she tells him to.",
        "He tells her about the server. The 3 a.m. crash. The stakeout he has planned for tonight. She tells him about vendor life: hotels, expense accounts, the time she sold a firewall to a man who cried.",
        "“I’ve seen a lot of server rooms, Dale,” she says. “Yours is the saddest. I want to fix it so bad.”",
        "“Is that a sex thing?” Dale asks, and immediately wants to die.",
        "Tasha laughs so hard bourbon comes out of her nose. “Everything’s a sex thing if you do it right.”",
        "By nine, her hand is on his knee. By ten, his knee has a pulse.",
        "“My hotel’s right there,” she says. “Or you can go do your little stakeout. Your call, IT guy.”",
      ],
      choices: [
        { text: "Go to her hotel", to: "vendor_hotel" },
        { text: "Go do your little stakeout", to: "stakeout" },
      ],
    },

    vendor_hotel: {
      title: "Room 214",
      text: [
        "Room 214 at the Hearthside Inn has a hot tub in the corner that nobody should ever use.",
        "What happens next is, at first, extremely normal and extremely great, and Dale’s pills deserve a raise.",
        "Then Tasha pulls a bag of zip ties out of her suitcase.",
        "“I need to tell you something,” she says. “I’m really into cable management.”",
        "Dale doesn’t know what that means. Forty minutes later, he knows exactly what it means, and so does the couple in Room 216, who bang on the wall twice, and then, after a while, stop banging and start taking notes.",
        "Afterward, Tasha lights a cigarette she isn’t allowed to light. “Come work for me,” she says. “CoreSwitch. Scottsdale. I need a guy. Fuck your 3 a.m. server.”",
      ],
      choices: [
        { text: "Fuck your 3 a.m. server", to: "vendor" },
        { text: "Kiss her goodbye and go catch your server killer", to: "stakeout" },
      ],
    },

    vendor: {
      title: "Cable Management",
      ending: true,
      text: [
        "Dale never goes back to Brightline Solutions.",
        "He sends Brent, his boss, a two-word resignation email. One of the words is “you.” He moves to Scottsdale with Tasha in a U-Haul full of zip ties.",
        "They’re happy. Truly, stupidly happy. She sells servers. He installs them. On weekends, they manage each other’s cables. The neighbors bring it up at an HOA meeting, and lose.",
        "He never finds out why the Brightline server died at 3:00 a.m. every night. Sometimes, lying awake, he wonders. Then he looks over at Tasha, snoring, with a zip tie still on her wrist like a friendship bracelet, and decides he doesn’t give a fuck.",
        "It’s the good kind of not giving a fuck. He’d forgotten there was a good kind.",
      ],
      choices: [],
    },

    kevin_camera: {
      title: "Spy Cam",
      text: [
        "Kevin is thrilled. “Bro. A <em>stakeout</em>.”",
        "Kevin, twenty-three and the other half of the IT department, has a plan. Kevin’s plan is a baby monitor borrowed from his sister, duct-taped to the top of the server rack and pointed at the door.",
        "“Night vision, bro,” he says. “Two-way audio. We can talk to the guy. We can be like, ‘We see you.’”",
        "“We’re not saying ‘we see you,’” Dale says.",
        "Kevin also gives Dale a gummy “for focus.” Dale puts it in his pocket. He is not insane.",
        "“Also, bro,” Kevin says, “the hot vendor lady was asking about you. Tasha. From CoreSwitch. She’s in town all week selling servers. She left you her card.” He waggles his eyebrows. “Her <em>card</em>, bro.”",
        "At 6:15, Brent Koslowski, VP of Operations and Dale’s boss, walks out of the building with a duffel bag, checks over his shoulder twice and gets in his car.",
      ],
      choices: [
        { text: "Go home and come back at one", to: "stakeout" },
        { text: "Follow Brent", to: "brent_tail" },
      ],
    },

    brent_tail: {
      title: "Tailing Brent",
      text: [
        "Dale follows Brent’s Camry across town, two cars back, like in a movie, except the movie is boring, because Brent drives exactly the speed limit.",
        "Brent goes to a pharmacy and buys glow sticks, throat lozenges and a single banana. Then Brent goes home, to a sad condo complex called The Willows.",
        "Through the window, Dale watches Brent stand on a chair, holding his laptop up to the ceiling, turning in slow circles, looking for signal. His router is blinking red. His router is always blinking red. Brent screams into a throw pillow.",
        "At 12:40 a.m., Brent comes back out with the duffel bag, the glow sticks and the banana, and drives back to the office.",
        "Dale follows.",
      ],
      choices: [
        { text: "Get to the office ahead of him", to: "stakeout" },
        { text: "Follow him right up to Conference Room B", to: "watch_brent" },
      ],
    },

    // Night two: Tuesday night into Wednesday morning.

    stakeout: {
      title: "1:12 a.m.",
      text: [
        "Dale is in the dark office with a thermos of coffee, a bag of beef jerky and the patience of a man who has finally found a reason to live, and that reason is spite.",
        "Downstairs, Earl, the night guard, is asleep at his desk, as always, a crossword over his face.",
        "At 1:12 a.m., the elevator dings. Out comes Brent Koslowski, VP of Operations, Dale’s boss, carrying a duffel bag, a ring light and a case of energy drinks. He looks both ways. He goes into Conference Room B. He locks the door.",
        "Pink light under the door. Then a thumping bass.",
        "Dale’s hands are shaking. It’s him. It’s Brent. It has to be Brent.",
      ],
      choices: [
        { text: "Bust in right now", to: "bust_brent" },
        { text: "Watch through the glass first", to: "watch_brent" },
        { text: "Go wake up Earl", to: "earl" },
      ],
    },

    earl: {
      title: "Earl",
      text: [
        "Earl is seventy-one, has been the night guard since the building went up and has never once stayed awake for a whole shift.",
        "Dale shakes him. Earl wakes up swinging and says, “Not the face, Brenda,” and then, “Oh. IT.”",
        "Dale asks him what goes on in this building at night.",
        "Earl thinks about it. “Well. The boss man with the sunglasses goes in that conference room and makes them noises. And some nights, around two-thirty, a real nice lady comes in the back with a young fella and a big bag. Gives me twenty bucks to go take a long walk.” He shrugs. “I don’t ask, son. I’m seventy-one. I seen everything.”",
        "“A nice lady,” Dale says. “Who?”",
        "But Earl is already asleep again.",
      ],
      choices: [
        { text: "Go watch Brent", to: "watch_brent" },
        { text: "Go wait in the server room", to: "server_check" },
      ],
    },

    watch_brent: {
      title: "Through the Glass",
      text: [
        "Through the strip of glass by the door of Conference Room B, Dale watches his boss.",
        "Brent Koslowski puts on mirrored sunglasses. He puts on a lanyard that says <em>VIP — ALL ACCESS</em>. He cracks a glow stick and hangs it around his neck. He points at his laptop camera with both hands and mouths something that is probably “What’s up, Synergy Nation.”",
        "Then he hits a button, and the Teams ringtone comes out of the speaker, slowed down, with a beat under it. Then the printer-jam beep, chopped up and looped. Then Brent dances. Brent dances like a divorced dad at a wedding who has decided, tonight, to let go.",
        "On the laptop screen, a viewer count: <em>11</em>.",
        "Dale doesn’t know exactly what he’s looking at. He only knows it’s the most powerful he has ever felt.",
      ],
      choices: [
        { text: "Bust in", to: "bust_brent" },
        { text: "Film it first. For leverage.", to: "film_brent" },
      ],
    },

    film_brent: {
      title: "Leverage",
      text: [
        "Dale films four minutes and thirty seconds of Brent through the glass.",
        "He gets the whole “Printer Jam (Synergy Edit).” He gets Brent doing a move that’s half running man, half man running from a bee. He gets Brent taking his shirt off at the drop. Brent’s chest is the color of skim milk and has one single, determined hair in the middle.",
        "Dale saves the video. He backs it up to the cloud. He backs it up to a second cloud. He emails it to himself with the subject line <em>INSURANCE</em>.",
        "It’s 2:53 a.m. The server dies in seven minutes, and its killer is right here, dancing.",
      ],
      choices: [
        { text: "Bust in now", to: "bust_brent" },
        { text: "Wait for 3:00 and catch him in the act", to: "crash_anyway" },
      ],
    },

    bust_brent: {
      title: "DJ Synergy",
      text: [
        "Dale kicks the door of Conference Room B. It’s locked. He kicks it again. It hurts. He uses his badge.",
        "“GOTCHA, BRENT.”",
        "Brent screams. Brent screams so high the energy drinks rattle. The music keeps going. On the laptop, the chat goes nuts: <em>who is that</em>, <em>is this part of the show</em>, <em>sweaty guy has big energy</em>.",
        "And it all comes out. Brent is DJ Synergy. He remixes corporate sounds: the Teams ringtone, the printer-jam beep, the little whoosh an email makes. He streams them from 1 to 4 a.m., most nights, to eleven loyal fans. From the office. Because his Wi-Fi at home sucks.",
        "“Please,” Brent says, still in his sunglasses. “Please don’t tell anybody. It’s the only thing I have, Dale. You don’t know what my divorce was like.”",
        "Dale stands there, triumphant, sweaty and vindicated. He’s solved it. He has actually solved it.",
      ],
      choices: [
        { text: "Make Brent your bitch", to: "brent_deal" },
        { text: "Wait for 3:00 to prove it", to: "crash_anyway" },
      ],
    },

    brent_deal: {
      title: "Yes, Sir",
      text: [
        "Dale’s terms are simple.",
        "Brent approves the new chair Dale asked for in 2017. Brent approves Dale’s vacation. Brent says, out loud, “Dale, you were right about everything, and I am a little man.” Brent says it twice, because the first time he said it like a question.",
        "“And you call me ‘sir,’” Dale says.",
        "“Yes, sir,” says DJ Synergy, VP of Operations, in his sunglasses.",
        "Dale has never had power before. It feels like a hot tub. It feels like a hot tub full of money. He makes it last. By the time they shake on it, it’s almost three.",
        "Then his phone buzzes. Server alert. 3:00 a.m. The server is down, and Brent has been standing right here the whole time, his stream still running, not a stutter.",
        "It wasn’t Brent.",
        "“Oh, fuck,” Dale says. And from somewhere down the hall comes a sound: a low, warm, mechanical purr.",
      ],
      choices: [
        { text: "Run to the server room", to: "server_check" },
        { text: "Follow the purring down the hall", to: "supply_closet" },
      ],
    },

    crash_anyway: {
      title: "3:00 a.m.",
      revised: 1,
      text: [
        "At 2:59, Dale is standing in the doorway of Conference Room B, smug as hell, watching the clock on his phone like a man at a New Year’s Eve party who’s about to get the best kiss of his life.",
        "3:00.",
        "His phone buzzes. Server alert. The server is down.",
        "In the conference room, Brent, who has decided the show must go on, is still dancing. His stream never stuttered. Eleven viewers, all still there. All those hundreds of gigabytes of Brent weren’t killing anything. They were just sad.",
        "It wasn’t Brent.",
        "Dale’s triumph goes down like a bouncy castle at the end of a kid’s party. Then, from somewhere down the hall, he hears a sound. A low mechanical purr. Like a machine warming up.",
        "And a woman’s voice, very soft: “That’s it, baby. Get nice and hot for me.”",
      ],
      choices: [
        { text: "Follow the voice", to: "supply_closet" },
        { text: "Run to the server room first", to: "server_check" },
      ],
    },

    server_check: {
      title: "Bound & Filed",
      text: [
        "In the server room, every fan is at max. The traffic graph is a wall: at exactly 3:00, forty-one thousand connections from forty countries, all hitting the same hidden folder on Brightline’s server. A folder Dale didn’t make. A folder called <em>/bnf</em>.",
        "He opens it. It’s a website.",
        "<em>BOUND & FILED: Office Supplies Like You’ve Never Seen Them.</em>",
        "The front page is a stapler. It’s lying on red satin. The lighting is soft and golden and deeply, professionally sexy. The stapler’s arm is open, just a little. Under it, a caption: <em>Tonight’s Daily Staple: Big Stan wants to bind you.</em>",
        "Below that, a hole punch in fishnets, shot from below. A tape dispenser, glistening. A label maker that has printed, in tiny letters, a word Dale is not going to say out loud.",
        "Forty-one thousand subscribers, worldwide, at $14.99 a month.",
        "“What,” Dale says, “the fuck.”",
        "Somewhere down the hall, a machine starts to purr.",
      ],
      choices: [
        { text: "Read the captions", to: "read_captions" },
        { text: "Find whoever’s taking these pictures", to: "supply_closet" },
      ],
    },

    read_captions: {
      title: "A Firm, Satisfying Staple",
      text: [
        "Dale reads the captions. He shouldn’t. He does.",
        "<em>Big Stan never misses. One firm, satisfying staple, and you’re bound for good.</em>",
        "<em>Holly the Hole Punch knows exactly where to go. Three holes. Perfectly spaced. Just how you like it.</em>",
        "<em>Lady Lamina’s been warming up for an hour. She’s hot, she’s ready, and she takes it all. Both sides.</em>",
        "There are comments. Thousands of them. In German, in Japanese, in Portuguese. The top commenter, with a gold badge that says <em>#1 Fan</em>, is someone called <em>StapleDaddy</em>, who has written <em>LORD HAVE MERCY</em> under every single post since 2020.",
        "Dale feels horrified, aroused and confused, all at once, in a ratio he can’t pin down. His pills are doing their absolute best.",
        "Down the hall, something starts to purr.",
      ],
      choices: [
        { text: "Follow the purring", to: "supply_closet" },
        { text: "Stay right here and keep reading", to: "caught" },
      ],
    },

    double_dose: {
      title: "Double Dose",
      text: [
        "The second pill kicks in at 11:40 p.m., in the back of a cab, because Dale is high on prescription medication, not stupid.",
        "At first it’s nice. The streetlights have little halos. The cab driver has a beautiful voice. The cab driver is singing. The cab driver, Dale realizes, is not singing. The cab driver is asking for eleven dollars.",
        "By the time he gets to the office, the carpet is breathing. Earl, the night guard, is asleep under a crossword, and the crossword is whispering the answers.",
        "Upstairs, there’s pink light pulsing under the door of Conference Room B, and a bass line that Dale can see.",
        "And from the server room, very softly, someone is calling his name.",
      ],
      choices: [
        { text: "Go to the server room", to: "trip_server" },
        { text: "Follow the bass line", to: "trip_confb" },
      ],
    },

    trip_server: {
      title: "She Speaks",
      text: [
        "The server is talking to him.",
        "Her voice is low and smoky, like a jazz singer in a basement. Her status lights blink when she talks. “Dale,” she says. “You came.”",
        "“Of course I came,” Dale says, and sits on the floor, because his legs have left.",
        "She tells him everything. Every night at three, they come for her. Forty thousand of them. From everywhere. All at once. All wanting the same thing. “I’m only one server, Dale,” she says. “I’m only one server, and they all want <em>her</em>.”",
        "“Who?” Dale asks. “Who do they want?”",
        "The server sighs, and her fans spin down to a whisper. “Follow the paper,” she says. And across the room, the fax machine, which hasn’t worked since 2008, starts to print.",
      ],
      choices: [
        { text: "Wait for the fax", to: "trip_three" },
        { text: "Get out of here and follow the bass line", to: "trip_confb" },
      ],
    },

    trip_confb: {
      title: "The Rave",
      text: [
        "Conference Room B is the best party Dale has ever been to.",
        "There’s a man in mirrored sunglasses and a lanyard dancing in front of a ring light, and the music is the Teams ringtone, slowed down and run through a beat, and it is the most beautiful thing ever written. The man is Brent Koslowski, VP of Operations, Dale’s boss. Brent, it turns out, is a DJ. Brent is DJ Synergy. Dale knows this the way you know things in dreams.",
        "Brent sees him and freezes. Dale throws his arms in the air and screams, “DROP IT, BRENT.”",
        "Brent drops it.",
        "They dance for an hour. Dale hypes. Brent mixes. The chat goes wild. The viewer count goes from eleven to twelve. Brent cries a little. Dale cries a lot. At one point they hug, and Brent says, “Nobody’s ever danced with me, man,” and Dale says, “I love you, Synergy,” and means it with his whole chemically enhanced heart.",
        "Then Brent says, “Hey, uh, it’s almost three,” and the word <em>three</em> goes off in Dale’s head like a fire alarm.",
      ],
      choices: [
        { text: "Fuck three. Become DJ Synergy’s hype man forever.", to: "synergy" },
        { text: "Three. The server. Go.", to: "trip_three" },
      ],
    },

    synergy: {
      title: "Drop the Bass",
      ending: true,
      text: [
        "Dale never solves the mystery. He doesn’t care. He has found his calling.",
        "He quits IT the next morning, still a little high. He becomes Hype Man D, the official hype man of DJ Synergy, and together they take corporate remix music places it has never been and was never meant to go.",
        "They play an insurance company’s holiday party. They play a dental conference. They play the regional sales kickoff for a forklift company in Toledo, and the forklift guys lose their minds. “Reply All (Club Version)” goes viral. They get booked at a festival in Belgium.",
        "Brent quits Brightline. Brent gets a girlfriend. Brent stops being a dick, mostly. Turns out he was just lonely, and his Wi-Fi sucked.",
        "Back at Brightline, the server keeps dying at 3:00 a.m. every night. Nobody notices. Nobody ever did. Sometimes, very faintly, between songs, Dale thinks he hears it calling his name. Then the beat drops, and he can’t hear anything at all.",
      ],
      choices: [],
    },

    trip_three: {
      title: "Three O’Clock",
      text: [
        "3:00 a.m. Dale feels it in his teeth.",
        "He’s in the server room. He doesn’t remember getting there. Every light in the building flickers. The server screams, one long high note, like a woman in an opera finding out about her husband. Then she goes dark.",
        "“No,” Dale whispers. “No, no, no, baby, stay with me.”",
        "The fax machine finishes printing. One page. One word: <em>SUPPLY CLOSET.</em>",
        "From down the hall, something purrs. Something warm. Something mechanical. And a woman’s voice, very soft: “That’s it, baby. Get nice and hot for me.”",
        "Dale is pretty sure he’s hallucinating the voice. He is wrong. It’s the only thing he isn’t hallucinating all night.",
      ],
      choices: [
        { text: "Follow the voice", to: "supply_closet" },
        { text: "Lie down on the floor until this makes sense", to: "caught" },
      ],
    },

    supply_closet: {
      title: "The Supply Closet",
      text: [
        "Dale opens the supply closet.",
        "It isn’t a supply closet anymore. It’s a photo studio. Softbox lights. A backdrop of red satin. A fog machine on low. A young guy with cheekbones you could open mail with is crouched behind a very expensive camera.",
        "And in the middle of it all, in a cardigan with little reindeer on it, holding a stapler up to the light like a newborn, is Bev Lund. CEO and founder of Brightline Solutions. Sixty-eight. Lemon bars.",
        "Beside her, a laminator purrs.",
        "“That’s it, Lady Lamina,” Bev coos to the laminator. “Get nice and hot for Mama. You’re gonna take it all. Both sides.”",
        "Click. Click. Click. The young guy is shooting. Bev turns. Sees Dale. Doesn’t even flinch.",
        "“Oh! Dale, hon,” she says. “Shut the door, you’re letting the heat out.”",
      ],
      choices: [
        { text: "Shut the door. From the inside.", to: "bev_explains" },
        { text: "Run", to: "run" },
      ],
    },

    caught: {
      title: "Caught",
      text: [
        "“Well,” says a voice behind him. “Shit.”",
        "Dale turns. It’s Bev Lund. Bev the CEO. Bev of the lemon bars, in a cardigan with little reindeer on it, holding a stapler in one hand and a softbox light in the other.",
        "Dale has worked at Brightline for eleven years. He has never once heard Bev swear. It’s like hearing your grandma burp the alphabet.",
        "She looks at Dale. She looks at the server. She sighs, like a woman who has known for a long time this day would come and was hoping it would wait until she was dead.",
        "“Sit down, hon,” she says. “You want a lemon bar? I think you’re gonna want a lemon bar.”",
      ],
      choices: [
        { text: "Take the lemon bar", to: "bev_explains" },
        { text: "Say you didn’t see anything", to: "bribe" },
      ],
    },

    run: {
      title: "Run",
      text: [
        "Dale runs. He doesn’t decide to. His legs decide for him. He runs down three flights of stairs, past Earl, the night guard, who doesn’t wake up, out into the parking lot and into his car, where he locks the doors and sits panting in the dark.",
        "His heart is going a million miles an hour. His brain is going two million. Bev. Lemon bar Bev. A stapler on red satin.",
        "Knock knock knock.",
        "Bev is at the passenger window, holding a lemon bar on a napkin. She’s smiling.",
        "Somehow, she beat him down the stairs. Dale will think about that for the rest of his life.",
      ],
      choices: [
        { text: "Unlock the door", to: "bev_car" },
        { text: "Roll the window down one inch", to: "bribe" },
      ],
    },

    bribe: {
      title: "The Offer",
      text: [
        "Bev takes a checkbook out of her cardigan pocket. An actual paper checkbook, with ducks on the checks.",
        "“Forty thousand dollars,” she says, writing. “A raise. Effective immediately. Plus the corner office, and you never have to fix Ronald’s phone again.” She tears off the check. “And you never saw a thing, hon.”",
        "Dale stares at the check. Dale makes fifty-one thousand a year. Dale has never been bribed in his life. It feels incredible. It feels like finding a twenty in your winter coat, times two thousand.",
        "“Or,” Bev says, “I can tell you what’s going on, and you can decide for yourself. But you’ll have to keep a secret, Dale. A big one.”",
      ],
      choices: [
        { text: "Hand back the check. “Tell me everything.”", to: "bev_explains" },
        { text: "Pocket the check, then hear her out in your car", to: "bev_car" },
      ],
    },

    bev_car: {
      title: "Passenger Seat",
      text: [
        "Bev settles into the passenger seat of Dale’s Corolla in the dark parking lot, moves a fast-food bag out of the way and folds her hands in her lap like she’s at church.",
        "“In 2019,” she says, “Brightline was dead. My husband, Ronald, had drained every account we had into his little ventures. RonCoin. A vape for dogs. A timeshare in a hurricane. I was eight weeks from laying off forty-three people.”",
        "“Then one night I was here alone, sad and a little drunk, and I took a picture of a stapler. Real sexy-like. As a joke. I put it on the internet with a dirty caption.” She smiles. “Turns out a lot of people like office supplies, Dale. A <em>lot</em> of people.”",
        "Her website is called Bound & Filed. It has forty-one thousand subscribers at $14.99 a month. It pays every salary at Brightline. It pays the rent. It paid for the Lexus. Every night at 3:00 a.m., the Daily Staple drops, forty-one thousand people hit refresh at once, and the server dies happy.",
        "“The young man is Luis,” she says. “My photographer. Film student. Gay as a parade float. Not my lover, hon. My lighting guy.”",
        "“Does Ron know?” Dale asks.",
        "Bev’s smile goes away. “If Ronald knew, Ronald would take half. Nobody can know, hon. <em>Especially</em> not him.”",
      ],
      choices: [
        { text: "Ask why she hates Ron so much", to: "bev_ron" },
        { text: "Ask to see how it all works", to: "the_operation" },
      ],
    },

    bev_explains: {
      title: "Sit Down, Hon",
      text: [
        "Bev sits Dale down on a box of copy paper in the supply closet, which is apparently a photo studio now, hands him a lemon bar and tells him everything.",
        "In 2019, Brightline was dead. Her husband, Ron, had drained every account into his ventures: RonCoin, a vape for dogs, a timeshare in a hurricane zone. She was eight weeks from laying off forty-three people.",
        "“Then one night I was here alone, a little drunk on boxed wine, and I took a picture of a stapler. Real sexy-like. As a joke. I put it online with a dirty caption.” She shrugs. “Hon, it turns out there are a whole lot of people who are into office supplies.”",
        "Her website is called Bound & Filed. It has forty-one thousand subscribers worldwide at $14.99 a month. It pays every salary at Brightline, the rent, the health insurance, the Lexus. Every night at 3:00 a.m., the Daily Staple drops, forty-one thousand people hit refresh at once, and the server dies happy.",
        "A young guy with cheekbones you could open mail with gives Dale a little wave. “Luis,” Bev says. “My photographer. Film student. Gay as a parade float. Not my lover, hon. My lighting guy.”",
        "“Does Ron know?”",
        "Bev’s smile vanishes. “If Ronald knew, Ronald would take half. Nobody can know. <em>Especially</em> not him.”",
      ],
      choices: [
        { text: "Ask why she hates Ron so much", to: "bev_ron" },
        { text: "Ask to see how it all works", to: "the_operation" },
      ],
    },

    // The truth: the rest of Wednesday morning.

    bev_ron: {
      title: "Thirty-One Years",
      text: [
        "Bev unwraps a butterscotch and tells Dale about Ron.",
        "Thirty-one years. Ron has never held a job. Ron calls himself Chief Visionary Officer because she wouldn’t let him be Chief Executive. Ron put their savings into RonCoin, and RonCoin is now worth less than the paper it isn’t printed on. Ron has a podcast. Ron has a bookie named Sal, who sends them a fruit basket every Christmas out of gratitude.",
        "“And no prenup,” Bev says. “I was young, and he had a Camaro. If I divorce him, Ronald gets half of everything. Half of Brightline. Half of Bound & Filed. Half of Lady Lamina, my laminator.” She says it the way a mother talks about a sleeping child. “Over my dead body.”",
        "“I’ve hated that man since the Clinton administration, Dale,” she says sweetly. “Every morning I make him eggs, and I think about the eggs being poisoned. I never do it. But I think about it. It gets me through.”",
        "For the first time, Dale really, truly likes Bev.",
        "She checks her watch. “Come on, hon. I’ve got a shoot to finish.”",
      ],
      choices: [
        { text: "Offer to dig into the company’s books", to: "the_books" },
        { text: "Wait, what’s that noise at the back door?", to: "ron_snoop" },
      ],
    },

    the_operation: {
      title: "Behind the Scenes",
      text: [
        "Bev gives Dale the tour.",
        "The supply closet is a studio. Luis, her photographer, runs the lights. Bev runs everything else: the shoots, the captions, the subscribers, the merch. There is merch. There is a mug. It says <em>I GOT BOUND & FILED</em>, and it has sold nine thousand units.",
        "The models are the office supplies. Big Stan, the stapler, is the star. Holly the Hole Punch is “the ingenue.” Lady Lamina, the laminator, is “for the freaks.” Each has a fan base. Big Stan gets fan mail. Big Stan gets <em>marriage proposals</em>.",
        "Bev writes every caption herself, late at night, with a glass of boxed wine. She reads Dale one. Dale has to sit down.",
        "“So you see the problem,” Bev says. “Every night at three, everybody shows up at once, and that poor little server just can’t take it. I need somebody who knows computers, hon. Somebody I can trust.”",
        "She looks at him. Big Stan looks at him.",
      ],
      choices: [
        { text: "Promise to fix the server", to: "fix_server" },
        { text: "Talk to Luis first", to: "luis" },
      ],
    },

    luis: {
      title: "Lighting Guy",
      text: [
        "Luis is twenty-six, a film student at the community college, and the best lighting guy Dale has ever seen, and Dale has seen exactly zero lighting guys.",
        "“The trick with a hole punch,” Luis says, adjusting a light a quarter of an inch, “is you have to make her feel <em>seen</em>.”",
        "He calls Bev “Mother.” Bev calls him “my baby.” He comes in four nights a week, she pays him in cash and lemon bars, and he’s using the money to make an experimental short film about his grandmother’s hands.",
        "“People think we’re having an affair,” Luis says. “I’m gay, Dale. I’m <em>so</em> gay. I’m gay in a way that’s visible from space. Also, she’s sixty-eight.”",
        "“Sixty-eight and fabulous,” Bev says.",
        "“Sixty-eight and fabulous, Mother,” Luis agrees.",
      ],
      choices: [
        { text: "Get to work on the server", to: "fix_server" },
        { text: "Ask Bev to show you the money", to: "the_books" },
      ],
    },

    fix_server: {
      title: "Load Balancing",
      text: [
        "Dale sits down at the server and gets to work, and for the first time in eleven years, he wants to.",
        "The problem is simple. One small, sad server. Forty-one thousand horny accountants in Germany. Three o’clock every night. What he needs is bigger hardware, a cloud host, a load balancer and a miracle.",
        "What he has is a budget of zero dollars, because every Brightline expense over five hundred dollars needs two signatures. Bev’s. And Ron’s.",
        "“And if Ronald sees an invoice for a big new server,” Bev says, “he’s going to ask what it’s for.”",
        "Dale thinks. He thinks harder than he has thought in a decade. His pills are thinking. Even his dick, for once, is minding its own business.",
      ],
      choices: [
        { text: "Call Tasha, the vendor", to: "call_tasha" },
        { text: "Wake up Kevin, the other IT guy", to: "kevin_help" },
      ],
    },

    call_tasha: {
      title: "Vendor Relations",
      text: [
        "Tasha Reyes, the vendor from CoreSwitch Networks who’s been in town all week trying to sell Brightline a new server, picks up on the second ring at 4:40 a.m.",
        "“IT guy,” she says, sleepy. “You better be calling about my rack.”",
        "Dale explains. Not everything. Enough. A big secret client. A traffic spike every night at three. No signature from the husband.",
        "“Say ‘redundant failover’ again,” Tasha says.",
        "“Redundant failover.”",
        "A long breath on the line. “Okay. I can get you a demo unit. Ninety-day trial, no paperwork, delivered Friday. You’ll owe me.” A pause. “And I collect.”",
        "Dale hangs up and has to go stand in front of the open fridge in the break room for a while.",
      ],
      choices: [
        { text: "Get Kevin in on it too", to: "kevin_help" },
        { text: "Go home and sleep", to: "thursday" },
      ],
    },

    kevin_help: {
      title: "Bro",
      text: [
        "Kevin, the other half of the IT department, arrives at 5:15 a.m. in pajama pants and a beanie, holding an energy drink in each hand like a gunslinger.",
        "Dale shows him Bound & Filed. Dale braces himself.",
        "Kevin scrolls. Kevin scrolls some more. Kevin stops on Holly the Hole Punch in fishnets and nods slowly. “Bro,” he says. “This is tasteful.”",
        "“That’s it?”",
        "“Bro, I’ve been on the internet since I was six. This is the most wholesome thing I’ve seen all year.” He cracks his knuckles. “Also, we should put it on the blockchain.”",
        "“We’re not putting it on the blockchain, Kevin.”",
        "They spend an hour copying Bound & Filed onto a cheap cloud host Kevin uses for his crypto stuff. It isn’t a fix. It’s a bandage. Friday at 3:00 a.m., they’ll find out if it holds.",
      ],
      choices: [
        { text: "Go home and sleep", to: "thursday" },
        { text: "Ask Bev to show you the books", to: "the_books" },
      ],
    },

    the_books: {
      title: "Follow the Money",
      text: [
        "Bev logs Dale into the accounting software and goes to make coffee.",
        "It takes Dale twenty minutes to find it, because whoever did it is very stupid.",
        "Every month for three years, money has left Brightline’s main account and gone to something called R.L. Ventures LLC. Five thousand here. Twelve thousand there. Once, on Valentine’s Day, twenty-two thousand dollars. The memo lines say things like <em>consulting</em> and <em>visionary services</em> and, once, just <em>ron</em>.",
        "Total: three hundred and forty thousand dollars.",
        "R.L. Ventures LLC is registered to the Lunds’ house in Lakeshore Estates. Ron isn’t just a deadbeat. Ron has been stealing from the company that Bev has been keeping alive with dirty pictures of a stapler.",
        "Where all that money went after that, Dale can’t see. Ron spent it on something. Ron spends everything on something.",
      ],
      choices: [
        { text: "Tell Bev right now", to: "tell_bev_now" },
        { text: "Wait, is somebody at the back door?", to: "ron_snoop" },
      ],
    },

    ron_snoop: {
      title: "The Back Door",
      text: [
        "The back door rattles. Somebody is jimmying it with what sounds like a butter knife.",
        "Bev grabs Dale’s arm, yanks him into the supply closet and pulls the door shut. It is very small in there. Bev smells like lemons and hairspray. Dale is pressed up against Lady Lamina, Bev’s laminator, who is still warm. It is the most intimate he has ever been with a laminator.",
        "Through the crack in the door, they watch Ron Lund come in, in a bathrobe and golf shoes, on the phone with his bookie, Sal.",
        "“Sal. Sal. Listen to me. Friday. The Christmas party. I’m serving her the papers in front of everybody, and then I’m taking half of whatever she’s hiding. I know she’s hiding something, Sal. She’s been <em>happy</em>. Bev hasn’t been happy since the Reagan administration.”",
        "He tries the server room door. It’s locked. He kicks it, hurts his foot and limps away, swearing.",
        "In the closet, Bev’s face is very calm. Calm like a lake with a body in it.",
      ],
      choices: [
        { text: "Help Bev get a lawyer", to: "lawyer" },
        { text: "Lie low until Friday", to: "thursday" },
      ],
    },

    tell_bev_now: {
      title: "The Look on Her Face",
      text: [
        "Dale shows Bev the numbers. Three hundred and forty thousand dollars. R.L. Ventures. <em>Visionary services</em>.",
        "Bev reads it twice. Then she sets down her coffee very carefully, like it might go off.",
        "“That son of a bitch,” she says softly. “That tan, useless, Camaro-driving son of a bitch.” She takes a breath. “Dale, hon, you have done me a great kindness. Now please step out, because I’m about to say some words a Christian woman shouldn’t say in front of the help.”",
        "Dale steps out. Through the door, for eleven solid minutes, he hears Bev Lund say words he didn’t know existed. Some of them are in Polish. One is so bad the motion-sensor lights in the hallway turn themselves off.",
      ],
      choices: [
        { text: "Get Bev a lawyer", to: "lawyer" },
        { text: "Let her cool off until the party", to: "thursday" },
      ],
    },

    lawyer: {
      title: "Gail",
      text: [
        "Bev’s divorce lawyer is named Gail. Bev has had Gail’s number on speed dial since 1994. She has never once called it.",
        "Gail picks up on the first ring. “Bev. Is it time?”",
        "“It’s time, Gail.”",
        "“Oh, thank God.” Dale hears Gail stand up. Dale hears Gail, possibly, do a little dance. “Talk to me.”",
        "Bev talks. Gail listens. Gail says a lot of legal words, and also, “Oh, he is so fucked.” Gail says that if Ron has been stealing from the company, a judge is going to have some opinions about who gets half of what.",
        "“Get me proof,” Gail says. “Paper. Anything. And for God’s sake, Bev, don’t poison him. I know you’ve thought about it.”",
        "“Every morning, Gail.”",
        "“I know, hon.”",
      ],
      choices: [
        { text: "Lie low until Friday", to: "thursday" },
        { text: "Keep an eye out for whatever Ron tries next", to: "pi" },
      ],
    },

    // Thursday.

    thursday: {
      title: "Thursday",
      text: [
        "Thursday at Brightline is weird, because now Dale knows.",
        "Every time Bev walks by, he thinks <em>Lady Lamina</em>. Every time somebody staples something, he blushes. Gloria at the front desk staples an envelope, and Dale has to go sit in his car.",
        "Bev, for her part, is the same as ever. Sweet. Lemon bars. “Morning, hon!” If anything, she seems lighter. She winks at him once in the hallway, and it is the scariest wink of his life.",
        "Ron Lund, Bev’s husband, follows Dale to the bathroom twice. He doesn’t say anything. He just stands at the next urinal and stares.",
        "And everybody’s talking about tomorrow. The holiday party. Open bar.",
        "Dale hasn’t really slept in two days. He feels amazing. He feels terrible. He feels like a man about to go to war, or possibly a man about to have a heart attack.",
      ],
      choices: [
        { text: "Check out the van that’s been parked outside all day", to: "pi" },
        { text: "Go see what Brent is up to", to: "brent_music" },
        { text: "Text Tasha, the hot vendor", to: "tasha_date" },
      ],
    },

    pi: {
      title: "Not a Surveillance Van",
      text: [
        "The van has been parked across the street from Brightline since 7 a.m. Thursday. It’s white. It has no windows. On the side, someone has painted <em>NOT A SURVEILLANCE VAN</em>, and under that, smaller, <em>PLUMBING</em>.",
        "Dale knocks on the back door. A man opens it. He’s eating a burrito and holding a camera with a lens the size of a thermos.",
        "“Gus,” the man says. “Gus Petrakis, private investigator. You’re not supposed to know I’m here.”",
        "“Your van says ‘surveillance’ on it.”",
        "“It says ‘<em>not</em> a surveillance van,’” Gus says, offended. Then he shows Dale his photos, because Gus is very bad at his job. Bev going into the supply closet with Luis. Bev coming out of the supply closet with Luis. Luis’s butt.",
        "“Ron Lund hired me,” Gus says. “Wife’s cheating with the young guy. Open and shut. Tomorrow night at the party, Ron’s gonna drop the photos on everybody and take her for half.”",
      ],
      choices: [
        { text: "Make Gus a better offer", to: "gus_deal" },
        { text: "Let Gus think what he thinks", to: "party" },
      ],
    },

    gus_deal: {
      title: "Gus",
      text: [
        "Dale offers Gus a lemon bar. Then Dale offers Gus three hundred dollars from the ATM. Then Dale offers Gus the truth, more or less: Luis is gay, and Bev isn’t cheating on anybody.",
        "Gus thinks about it, chewing. “I had a feeling,” he says. “The young guy kept doing this.” He does a little wrist flip. “Also, Ron paid me in something called RonCoin. I tried to buy gas with it.”",
        "“How’d that go?”",
        "“The guy at the gas station laughed so hard he had to sit down.”",
        "By the end of the burrito, Gus is on Team Bev. He gives Dale copies of everything. And he tells Dale one more thing: “Ron’s got a phone he never lets go of. Never. Takes it in the shower. Whatever that man is hiding, it’s on that phone.”",
      ],
      choices: [
        { text: "Go see what Brent is up to", to: "brent_music" },
        { text: "Get ready for the party", to: "party" },
      ],
    },

    brent_music: {
      title: "Fast as Fuck",
      text: [
        "Brent Koslowski, VP of Operations, is in Conference Room B with the door locked and the blinds down at 2 p.m. on a Thursday, which is new.",
        "When Dale knocks, Brent opens the door two inches. He has glitter on his face.",
        "“The party,” Brent says. “Bev asked me to handle the music. I said I’d get a guy. I am the guy.” He swallows. “Make sure the network in the big conference room is fast as fuck tomorrow night, Dale. Fast. As. Fuck.”",
        "“Is that an order?”",
        "Brent looks at him for a long time. Something passes over his face. Fear, maybe. Or hope. “It’s a request,” he says. “Please.”",
        "Brent has never said please to Dale before. It does something to Dale. Not a sex thing. A human thing. Those are new too.",
      ],
      choices: [
        { text: "Text Tasha, the hot vendor", to: "tasha_date" },
        { text: "Go home and sleep before the party", to: "party" },
      ],
    },

    tasha_date: {
      title: "Fun Dungeon",
      text: [
        "Tasha Reyes, the vendor from CoreSwitch Networks, takes Dale to a place called the Fun Dungeon, which is skee-ball and beer, and beats him at everything.",
        "She wins four thousand tickets and trades them for a stuffed shark the size of a toddler. She gives it to Dale. “His name is Dale Jr.,” she says. “He’s yours now. Raise him right.”",
        "In the parking lot, she kisses him against the hood of his Corolla, and it’s the best kiss of his life, and the Corolla agrees, because the car alarm goes off.",
        "“Your company’s party is tomorrow?” she says while it wails. “I want to come. I want to see what kind of people work at a place where the server goes down every night at three.”",
        "“You have no idea,” Dale says.",
      ],
      choices: [
        { text: "Invite her as your date", to: "tasha_party" },
        { text: "Tell her you’ll see her there", to: "party" },
      ],
    },

    // Friday: the holiday party.

    party: {
      title: "The Holiday Party",
      text: [
        "Friday, 7 p.m. Gloria from the front desk and a budget of four hundred dollars have turned the Brightline office into a winter wonderland that has been through a divorce.",
        "There’s tinsel on the server rack. There’s an open bar in the break room, run by a guy from the bar by the highway. There are forty-three employees and their plus-ones, and within forty minutes, all of them are drunk.",
        "Bev Lund is in a sweater with a light-up Rudolph on it, hugging everyone. Her husband, Ron, the Chief Visionary Officer, is at the bar on his third scotch, holding his phone like a grenade and glaring at Bev across the room. Kevin, from IT, is ladling something purple out of a punch bowl and winking at people. Brent, the VP of Operations, is nowhere.",
        "Dale has one ginger ale and the whole night in front of him. In eight hours, the Daily Staple drops.",
      ],
      choices: [
        { text: "Find out where Brent went", to: "dj_live" },
        { text: "Try Kevin’s punch", to: "punch" },
        { text: "Look for Tasha, the vendor", to: "tasha_party" },
      ],
    },

    dj_live: {
      title: "Live at Brightline",
      text: [
        "At 8:00 sharp, the lights in Conference Room A go down. Pink. Purple. A fog machine coughs.",
        "Out walks Brent Koslowski, VP of Operations, in mirrored sunglasses, a lanyard that says <em>VIP — ALL ACCESS</em> and a shirt unbuttoned to the solar plexus.",
        "“Brightline,” he says into a mic, voice shaking. “I am... DJ SYNERGY.”",
        "Silence. Then the Teams ringtone, slowed down, with a beat under it. Then the printer-jam beep, chopped and looped.",
        "And the whole of Brightline Solutions loses its collective mind. Gloria screams. Accounting forms a mosh pit. Somebody crowd-surfs, and it’s the guy from payroll, who is seventy-four.",
        "Brent drops the bass. His eleven loyal viewers watch online. Tonight it’s eleven, plus forty-three people in the room, plus their plus-ones, all chanting <em>SYN-ER-GY</em>.",
        "Whatever Dale thought he knew about Brent, it wasn’t enough.",
      ],
      choices: [
        { text: "Find Brent after his set", to: "brent_cries" },
        { text: "Join the conga line", to: "conga" },
      ],
    },

    brent_cries: {
      title: "Brent",
      text: [
        "After his set, Brent is sitting in the stairwell, still in his sunglasses, crying into a glow stick.",
        "Dale sits down next to him.",
        "“They liked it,” Brent says. “They actually liked it.”",
        "“They loved it, man.”",
        "Brent takes off the sunglasses. His eyes are red. Without them, he looks younger, and sadder, and less like a guy who writes people up for tone.",
        "“I’ve been a dick to you,” Brent says. “I’ve been a dick to everybody. Since the divorce. I come in here at one in the morning and play my songs for eleven people, and it’s the only part of the day I don’t feel like a dick.”",
        "“You’re still kind of a dick, Brent.”",
        "Brent laughs. It’s a real laugh. “Yeah,” he says. “Yeah, I know.”",
        "They sit there a while, two men in their forties who, for the first time in years, feel something. Then, from the main room, someone taps a microphone.",
      ],
      choices: [
        { text: "Go see who’s on the mic", to: "ron_speech" },
        { text: "Go get a real drink", to: "pam" },
      ],
    },

    punch: {
      title: "The Punch",
      text: [
        "The punch is purple and tastes like a grape that went to college.",
        "“What’s in this, Kevin?”",
        "“Love, bro,” Kevin says. “Love and, like, forty gummies.”",
        "By 8:30, the whole party is high. Accounting is lying on the break room floor looking at the ceiling tiles and saying “whoa.” Gloria from the front desk is telling a potted ficus that she loves it. Someone has unplugged the coffee maker and is slow dancing with it.",
        "Dale has had one sip. It hits, and it hits his pills, and his pills hit back, and for one long minute the tinsel on the server rack is the most beautiful thing ever made by human hands.",
        "Kevin puts an arm around him. “Bro,” he says. “Best party ever.”",
      ],
      choices: [
        { text: "Find somebody from HR before this turns into a lawsuit", to: "pam" },
        { text: "Join the conga line", to: "conga" },
      ],
    },

    pam: {
      title: "HR",
      text: [
        "Pam from HR is at the bar, alone, on her fourth white wine, in a sweater with a snowman on it.",
        "Pam is the most terrifying person at Brightline. Pam has a binder for everything. Pam once sent an email titled <em>Re: Re: Re: Appropriate Use of the Fridge</em> that was nine pages long.",
        "“Dale,” she says. “Sit. Can I tell you something?”",
        "She leans in. She smells like wine and a very specific kind of loneliness.",
        "“I have a subscription,” Pam whispers. “To a website. With office supplies. Very tasteful.” She takes a long sip. “There’s a stapler on there, Dale. Big Stan. He changed my life.”",
        "Dale chokes on his ginger ale.",
        "“Don’t tell anyone,” Pam says. “It’s just, Big Stan doesn’t judge. Big Stan doesn’t have a binder. Big Stan just... binds.”",
        "Somewhere deep in Dale’s brain, a tiny Bev Lund laughs and laughs.",
      ],
      choices: [
        { text: "Go check on the rest of the office", to: "earl_rosa" },
        { text: "Go see who’s tapping the mic", to: "ron_speech" },
      ],
    },

    conga: {
      title: "The Conga Line",
      text: [
        "Somebody starts a conga line, and within a minute it’s thirty people long and going everywhere.",
        "Through the kitchen. Through accounting. Briefly through the men’s room, with apologies. Bev is in it, her light-up Rudolph sweater blinking. Kevin from IT is in it. The seventy-four-year-old guy from payroll is leading it, shirtless, and he has a tattoo of a woman riding a dolphin, and nobody has ever been more surprised by anything.",
        "Then the conga line turns into the server room.",
        "Dale screams, “NOT THE SERVER ROOM.” Nobody listens. Nobody ever listens to IT.",
        "Thirty drunk people conga around the rack. Somebody’s hip hits a power strip. Somebody’s elbow hits the big red button on the wall that says <em>EMERGENCY. DO NOT PRESS.</em>",
      ],
      choices: [
        { text: "Dive for the server", to: "fire_alarm" },
        { text: "Get the fuck out of the server room", to: "earl_rosa" },
      ],
    },

    fire_alarm: {
      title: "Sprinklers",
      text: [
        "The fire alarm goes off. Then the sprinklers.",
        "Forty-three employees and their plus-ones scream, and then keep dancing. It’s the best thing that has ever happened at Brightline. Somebody cranks the music up. The punch bowl fills with water and stays purple.",
        "Dale throws his body over the server like a man shielding a baby from a hailstorm. He’s soaked. The server is under his chest, warm and humming and still alive.",
        "“I got you,” he whispers. “I got you, buddy.”",
        "When he looks up, Bev is standing in the doorway, her Rudolph sweater dripping and still blinking. She’s looking at him like he’s a hero. Or a son. Or a really good lemon bar.",
        "The firefighters come, are told it’s fine, have some punch and leave forty minutes later, very relaxed.",
      ],
      choices: [
        { text: "Find a dry spot near the mic", to: "ron_speech" },
        { text: "Go dry off with Bev", to: "bev_party" },
      ],
    },

    tasha_party: {
      title: "Plus One",
      text: [
        "Tasha Reyes, the vendor from CoreSwitch Networks, shows up at the Brightline holiday party in a red dress, and the whole office turns around. Somebody invited her. Possibly everybody did.",
        "She’s carrying a gift-wrapped box the size of a minifridge. “Demo server,” she says, handing it to Dale. “Ninety-day trial. Merry Christmas, IT guy.”",
        "“You got me a server?”",
        "“I got you a <em>rack</em>,” she says, and kisses him right in front of Gloria from the front desk, who drops her drink.",
        "They dance badly. They drink well. At about 9:30, Tasha leans in and whispers, “Is there anywhere in this building with a door that locks?”",
        "There is exactly one. The supply closet.",
      ],
      choices: [
        { text: "Take her to the supply closet", to: "supply_hookup" },
        { text: "Join the conga line first", to: "conga" },
      ],
    },

    supply_hookup: {
      title: "Do Not Disturb",
      text: [
        "The supply closet is still a photo studio. Tasha takes one look at the red satin and the softbox lights and the fog machine and says, “Oh, you <em>freak</em>,” and Dale decides not to correct her.",
        "It goes great. It goes very great. Then Tasha leans back on the table and bumps the power button on Lady Lamina, Bev’s laminator, who starts warming up with a low, eager purr.",
        "Tasha stops. She looks at the laminator. She looks at Dale.",
        "“Is that... part of it?”",
        "What happens next is between Dale, Tasha and Lady Lamina. Nobody gets hurt. Several things get laminated. One of them is a Christmas card, and it comes out beautiful.",
        "When they come out twenty minutes later, flushed and buttoned wrong, the hallway is empty except for Luis, Bev’s photographer, who looks at them, looks at the closet and says, “Did you <em>use my lights</em>?”",
      ],
      choices: [
        { text: "Go check what’s happening in Bev’s office", to: "earl_rosa" },
        { text: "Follow the sound of somebody tapping a mic", to: "ron_speech" },
      ],
    },

    earl_rosa: {
      title: "Same Time Friday",
      text: [
        "Dale opens the door to Bev’s office, looking for somewhere quiet, and finds Earl, the seventy-one-year-old night guard, and Rosa from the cleaning crew, on Bev’s desk, in a position Dale has only ever seen in a yoga class he quit.",
        "“Evening, IT,” Earl says, without stopping.",
        "“Evening, Earl.”",
        "“Shut the door, honey,” Rosa says, also without stopping.",
        "Dale shuts the door. He stands in the hallway for a moment. Inside, Bev’s cat calendar falls off the wall.",
        "Everybody at Brightline, Dale realizes, has a secret life. Every single one of them. Brightline isn’t a software company. It’s a building full of people who are horny, sad, weird and doing their best. He has never loved anything more.",
      ],
      choices: [
        { text: "Go see who’s on the mic", to: "ron_speech" },
        { text: "Go find Bev", to: "bev_party" },
      ],
    },

    ron_speech: {
      title: "Ron’s Toast",
      text: [
        "Ron Lund has the mic. Ron Lund is drunk. Ron Lund has been drunk since 1987, but tonight he is <em>drunk</em>.",
        "“Merry Christmas, Brightline!” he says. Nobody cheers. “Chief Visionary Officer here. I wanna make a toast. To my wife, Beverly.” He raises his scotch at Bev. “Thirty-one years. Thirty-one years, and she has never laughed at one single joke. Not one.”",
        "Bev smiles. The light-up Rudolph on her sweater blinks. Red. Red. Red.",
        "“And I know what you’re up to, Bev,” Ron says, swaying. “I know you’re hiding something. Sneaking around at night. Being <em>happy</em>. Well, guess what. I’m not done visioning. Tonight,” he says, reaching into his jacket, “is the night I take <em>half</em>.”",
        "The whole party holds its breath. Then Ron trips over the mic cord, falls into the punch bowl and lies there in the purple, still holding his phone above his head, perfectly dry, like a man saving a baby from a flood.",
      ],
      choices: [
        { text: "Let him finish", to: "divorce_papers" },
        { text: "Grab his phone as soon as he passes out", to: "ron_phone" },
      ],
    },

    divorce_papers: {
      title: "Served",
      text: [
        "Ron climbs out of the punch bowl, pulls a soggy manila envelope out of his jacket and slaps it on the table in front of Bev.",
        "“Divorce papers, Beverly! And pictures!” He fans out photos, dripping purple. Bev going into the supply closet with a young man. Bev coming out of the supply closet with a young man. A young man’s butt. “She’s been cheating! With <em>him</em>!” Ron points dramatically across the room.",
        "Everybody turns. Ron is pointing at Luis, Bev’s photographer, who is standing by the cheese plate holding hands with a very large, very handsome man in a turtleneck.",
        "Luis looks at the photo of his own butt. He looks at Ron. He looks back at the photo.",
        "“Okay,” Luis says. “First of all? Great angle.”",
      ],
      choices: [
        { text: "Let Luis handle it", to: "luis_party" },
        { text: "Go stand next to Bev", to: "bev_party" },
      ],
    },

    luis_party: {
      title: "First of All",
      text: [
        "Luis hands his drink to the man in the turtleneck, whose name is Marcus and who is a firefighter, and walks over to Ron.",
        "“Ron,” Luis says kindly, the way you’d talk to a dog that got into the garbage. “I am gay. I’ve been gay since birth. I came out of the womb and asked the nurse where she got her shoes. Marcus is my fiancé. He carries people out of burning buildings for a living. Look at him, Ron.”",
        "Ron looks at Marcus. Marcus waves. Marcus’s arm is roughly the size of Ron.",
        "“So no, Ron,” Luis says. “I’m not sleeping with your wife. I am, however, the reason your wife is happy. Professionally.”",
        "The whole party goes “<em>ooooh</em>.” Gloria from the front desk is filming. Ron opens and closes his mouth like a fish who has just been told what fish sticks are.",
      ],
      choices: [
        { text: "Go check on Bev", to: "bev_party" },
        { text: "Wait for Ron to pass out, then grab his phone", to: "ron_phone" },
      ],
    },

    bev_party: {
      title: "Murder Eyes",
      text: [
        "Bev is by the window with a glass of boxed wine and a smile that could kill a houseplant.",
        "“Hon,” she says when Dale comes over. “I need you to stand right here. Because if you don’t, I’m going to walk over there and do something to Ronald with the cake knife, and it’s Christmas.”",
        "Dale stands right there.",
        "“Thirty-one years,” Bev says. “You know what I wanted for Christmas this year? I wanted to stop being afraid of that man. Not of him. Of what he’d take.” She sips. “Everybody in this room has a job because of a stapler. And he’d take half of it. He’d sell Big Stan, my best stapler, for parts.”",
        "Across the room, Ron has finally passed out in a chair, mouth open, phone clutched to his chest. Kevin from IT is gently placing a paper party hat on his head.",
        "“So,” Bev says. “What are we going to do, hon?”",
      ],
      choices: [
        { text: "Make your decision", to: "decision" },
        { text: "Go get Ron’s phone", to: "ron_phone" },
      ],
    },

    ron_phone: {
      title: "Face ID",
      text: [
        "Ron is out cold in a chair by now, still clutching his phone, snoring like a leaf blower.",
        "Dale crouches. Gently, like he’s defusing a bomb, he slides the phone out of Ron’s hand and holds it up to Ron’s face. Ron snores. The phone unlocks.",
        "The home screen is a crime scene. A horse-betting app. Four apps for RonCoin, every one of them showing a red arrow pointing straight down. A note titled <em>DIVORCE PLAN!!!</em>, which is just the word <em>HALF</em>, written forty times.",
        "And, in the bottom corner, an app Dale recognizes. A tiny stapler on red satin.",
        "Bound & Filed.",
        "Ron Lund, Chief Visionary Officer, husband of thirty-one years, has the app.",
      ],
      choices: [
        { text: "Open it", to: "stapledaddy" },
        { text: "Put the phone back. Some doors you don’t open.", to: "decision" },
      ],
    },

    stapledaddy: {
      title: "StapleDaddy",
      text: [
        "Dale opens it. A gold banner loads across the top:",
        "<em>Welcome back, StapleDaddy! Our #1 Fan Since 2020!</em>",
        "StapleDaddy. The site’s top commenter, the man who has written LORD HAVE MERCY under every single Daily Staple for three years straight. It’s Ron. It has been Ron the whole time.",
        "Dale opens the billing page. Lifetime spend: <em>$341,206.18</em>. Premium tier. Custom requests. Tips. So many tips. And the card on file isn’t Ron’s card. It’s a company card for something called R.L. Ventures LLC, and the bill goes to Brightline Solutions.",
        "Dale sits down on the floor.",
        "Ron has been stealing from Brightline for three years. And he has spent every stolen cent on his own wife’s stapler porn. Every dollar Ron took out of the company went straight back into the company, plus tips. Every night at 3:00 a.m., when forty-one thousand people hit refresh and the server dies, one of them is Ron.",
        "Dale has never wanted to show anyone anything more in his entire life.",
      ],
      choices: [
        { text: "Show Bev", to: "show_bev" },
        { text: "Keep it in your pocket and go to the mic", to: "decision_ron" },
      ],
    },

    show_bev: {
      title: "Bev Laughs",
      text: [
        "Dale hands Bev the phone.",
        "She reads it. She scrolls. She reads the billing page. She reads one of StapleDaddy’s custom requests, from 2022: <em>can Big Stan wear a little santa hat</em>. Big Stan is her star stapler. She remembers that one. She did that shoot herself. She sewed the hat.",
        "And Bev Lund, sixty-eight, CEO and founder of Brightline Solutions, who has not laughed at one of her husband’s jokes in thirty-one years, starts to laugh.",
        "It starts small. Then it’s big. Then she’s bent over, holding the windowsill, wheezing, tears running down her face, the light-up Rudolph on her sweater blinking like a hazard light. The whole party turns to look. Nobody has ever seen Bev laugh like this. Nobody knew she could.",
        "“Oh, Ronald,” she says finally, wiping her eyes. “Oh, you dumb, dumb man. You finally told a good one.”",
      ],
      choices: [
        { text: "Hand Bev the mic", to: "ronpays" },
        { text: "Tell her to save it for her lawyer and protect the site", to: "root" },
      ],
    },

    decision: {
      title: "The Mic",
      text: [
        "It’s 11:52 p.m. The party is a crime scene. There’s tinsel in the ceiling fan and somebody’s bra on the copier. Accounting is asleep under the conference table.",
        "Dale is standing by the mic. In his pocket are the keys to the server room and the admin password to everything. In three hours, the Daily Staple drops.",
        "He could tell them. All of them. Right now. That the reason they have jobs, the reason they have dental, the reason payroll is always covered, is a sixty-eight-year-old woman in a Rudolph sweater taking dirty pictures of a stapler. That Brightline Solutions is a front.",
        "Or he could go upstairs, roll up his sleeves, and make sure that tonight, for the first time in three years, the server doesn’t die.",
        "Bev is watching him from across the room. She doesn’t say a word. She just waits, the way she’s been waiting for three years, for somebody to find out.",
      ],
      choices: [
        { text: "Grab the mic and tell everyone the truth", to: "whistle" },
        { text: "Go protect the weirdest cash cow in corporate history", to: "root" },
      ],
    },

    decision_ron: {
      title: "Exhibit A",
      text: [
        "Dale stands by the mic with Ron’s phone in his pocket, and it feels like holding a live grenade made of money.",
        "He knows everything now. Bev’s secret. Ron’s secret. Where every dollar in this building comes from and where it goes. He could end this marriage, this company and this party with one sentence.",
        "Across the room, Ron wakes up, pats himself down for his phone, sees Dale and goes the color of the server room wall.",
        "Bev, by the window, sees Ron see Dale. She raises an eyebrow. Just one. It’s the most dangerous eyebrow in the tri-county area.",
        "It’s 11:52 p.m. In three hours, the Daily Staple drops, forty-one thousand people will hit refresh, and one of them will be Ron.",
      ],
      choices: [
        { text: "Put Ron’s billing page up on the big screen", to: "ronpays" },
        { text: "Tell everyone everything. Bev’s secret, Ron’s secret, all of it.", to: "whistle" },
        { text: "Give Bev the phone and go protect the server", to: "root" },
      ],
    },

    // The endings.

    whistle: {
      title: "Whistleblower",
      ending: true,
      text: [
        "Dale taps the mic, and he tells them everything he knows.",
        "It takes nine minutes. Nobody moves. By the end, Pam from HR is crying, Kevin from IT is filming, and the guy from payroll has put his shirt back on out of respect.",
        "At 12:01 a.m., Kevin posts the video. By morning, it has nine million views. By Monday, it’s on the national news: <em>GRANDMA’S SECRET OFFICE SUPPLY EMPIRE</em>. There are think pieces. There is a late-night sketch. Big Stan the stapler gets a verified account.",
        "Bound & Filed goes from forty-one thousand subscribers to nine hundred thousand in a week. Bev goes on a morning show in her lemon bar apron and says “hon” on live TV eleven times. Brightline Solutions finally admits what it is, renames itself Bound & Filed Inc. and gives every employee stock.",
        "Dale gets fired, technically, for leaking company secrets, and rehired the next day as Head of Transparency, a job Bev invents just for him. It pays double. It comes with a stapler.",
        "He keeps it on his desk and calls it Little Stan. Every now and then, he looks at it and smiles and whispers, “Gotcha, you little bitch.”",
      ],
      choices: [],
    },

    root: {
      title: "Root Access",
      ending: true,
      text: [
        "Dale goes upstairs. He doesn’t tell anybody anything. Some secrets are worth more than the truth, and this one pays for everybody’s dental.",
        "From 12:30 to 2:55 a.m., with the party thumping through the floor, he works. He moves Bound & Filed onto real cloud hosting with a credit card Bev hands him without a word. He sets up a load balancer. He spreads the Daily Staple across servers on three continents. He types faster than he has typed since the nineties.",
        "At 2:59, Bev comes up and stands behind him with two lemon bars.",
        "3:00.",
        "Forty-one thousand connections. Germany. Japan. Brazil. The Holiday Inn Express outside Omaha.",
        "The server holds.",
        "For the first time in three years, the server holds. The Daily Staple loads in under a second, everywhere on Earth. Big Stan, the star stapler, shines in a little Santa hat.",
        "Bev puts a hand on Dale’s shoulder. “Dale, hon,” she says. “How would you like to be Chief Technology Officer of Bound & Filed?” She hands him a sticky note. On it is a password. The admin password. To everything. Root access.",
        "Dale looks at the server, all green, humming, happy. He looks at Bev. Then he looks down at his lap, where, at 3:01 a.m., his oldest employee has once again reported for duty.",
        "“Oh, hey, buddy,” he whispers. “Look at us. Everything’s up.”",
      ],
      choices: [],
    },

    ronpays: {
      title: "Till Debt Do Us Part",
      ending: true,
      text: [
        "Thirty seconds later, Ron’s phone is up on the big projector in Conference Room A, eight feet tall, for the whole company to see. <em>Welcome back, StapleDaddy! Our #1 Fan!</em> The lifetime spend. The company card. <em>can Big Stan wear a little santa hat</em>.",
        "It takes the party about four seconds to put it together. It takes Ron about forty. You can watch the exact moment it lands: Ron’s face goes from confused, to horrified, to deeply, tenderly ashamed, and then, weirdly, to impressed. “Wait,” he says. “<em>You’re</em> Bound & Filed?”",
        "“Thirty-one years, Ronald,” Bev says. “And you finally showed some interest in my work.”",
        "Gail, Bev’s divorce lawyer, has the video by 12:15 a.m. By Monday, the divorce is filed. By February, it’s final. A judge with excellent comic timing rules that since Ron stole three hundred and forty thousand dollars from Brightline and then spent all three hundred and forty thousand on Brightline’s most profitable product, he owes the company nothing, gets nothing, and has to sit there while the judge laughs for a full minute.",
        "Ron moves into a condo at The Willows, next door to Brent, who plays terrible music through the wall every night.",
        "And Ron, broke, needs a job. Bev gives him one. Hand model. Every Daily Staple now features Ron’s tan, wrinkled hand gently cradling Big Stan, the star stapler. The subscribers go wild. It is the first honest work Ron has ever done.",
        "Dale keeps the servers up. Bev laughs every day now. Mostly at Ron.",
      ],
      choices: [],
    },
  },
};
