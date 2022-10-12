/*
@title: Hectic Hockey
@author: Colton

Instructions:
WASD to control your player
Reach the right side without getting hit by an enemy player
Getting hit will reset your score and send you back to the start
Reaching the end will reset your score and send you back to the start

*/


const player = "p";
const opp = "o";
const ice = "i";
const rL = "r";
const bL = "b";
let score = 0;
let y1 = 0;
let y2 = 0;
let y3 = 0;
const music = tune`
145.63106796116506,
145.63106796116506: f5-145.63106796116506 + c4-145.63106796116506,
145.63106796116506: e5-145.63106796116506 + c4-145.63106796116506,
145.63106796116506: f5-145.63106796116506 + c4-145.63106796116506,
145.63106796116506: e5-145.63106796116506 + c4-145.63106796116506,
145.63106796116506: f5-145.63106796116506 + c4-145.63106796116506,
145.63106796116506: e5-145.63106796116506 + c4-145.63106796116506,
145.63106796116506: f5-145.63106796116506 + c4-145.63106796116506,
145.63106796116506: e5-145.63106796116506 + c4-145.63106796116506,
145.63106796116506: f5-145.63106796116506 + c4-145.63106796116506,
145.63106796116506: c4-145.63106796116506 + e5/145.63106796116506,
145.63106796116506: c4-145.63106796116506 + d5/145.63106796116506,
145.63106796116506: e5/145.63106796116506 + c4-145.63106796116506,
145.63106796116506: d5/145.63106796116506 + c4-145.63106796116506,
145.63106796116506: e5/145.63106796116506 + c4-145.63106796116506,
145.63106796116506: d5/145.63106796116506 + c4-145.63106796116506,
145.63106796116506,
145.63106796116506: c4-145.63106796116506 + g4-145.63106796116506,
145.63106796116506: f4-145.63106796116506 + c4-145.63106796116506,
145.63106796116506: g4-145.63106796116506 + c4-145.63106796116506,
145.63106796116506,
145.63106796116506: c4-145.63106796116506 + g5/145.63106796116506,
145.63106796116506: c4-145.63106796116506,
145.63106796116506: g5/145.63106796116506 + c4-145.63106796116506,
145.63106796116506,
145.63106796116506: g4-145.63106796116506 + c4-145.63106796116506,
145.63106796116506: f4-145.63106796116506 + c4-145.63106796116506,
145.63106796116506: g4-145.63106796116506 + c4-145.63106796116506,
145.63106796116506,
145.63106796116506: c4-145.63106796116506 + g5/145.63106796116506,
145.63106796116506: c4-145.63106796116506,
145.63106796116506: g5/145.63106796116506 + c4-145.63106796116506`
const hit = tune`
30: b4-30 + c5-30 + a4-30,
30: c5-30 + b4-30 + a4-30,
30: c5-30 + a4-30 + b4-30,
30: c5-30 + a4-30 + b4-30,
30: c5-30 + a4-30 + b4-30,
30: c5-30 + a4-30 + b4-30,
30: c5-30 + b4-30 + a4-30,
30: a4-30 + b4-30 + c5-30,
30: a4-30 + c5-30 + b4-30,
30: a4-30 + b4-30 + c5-30,
30: a4-30 + c5-30 + b4-30,
30: a4-30 + b4-30 + c5-30,
600`
const goalSound = tune`
162.16216216216216,
81.08108108108108: a5/81.08108108108108 + b5-81.08108108108108,
81.08108108108108: g5/81.08108108108108 + a5-81.08108108108108,
81.08108108108108: a5/81.08108108108108 + b5-81.08108108108108,
81.08108108108108: g5/81.08108108108108 + a5-81.08108108108108,
81.08108108108108: a5/81.08108108108108 + b5-81.08108108108108,
81.08108108108108: g5/81.08108108108108 + a5-81.08108108108108,
81.08108108108108: a5/81.08108108108108 + b5-81.08108108108108,
1864.8648648648648`

function updateScore() {
  clearText()
  addText(`Score:${score}`, {
    x: 1, 
    y: 4, 
    color: [ 255, 255, 255]
  })
}

setLegend(
  [player,bitmap`
....0000000.....
...000000000....
...000111111....
...00166767.....
...00166767.....
...11166666.....
.....55666......
....55725.......
...557275.......
...5527555......
..55555.50......
..22222..00.....
1052222...C.....
100555.....C....
10..000.....C...
....111......C0C`],
  [opp,bitmap`
......0000000...
.....000000000..
.....111111000..
......36366100..
......36366100..
......66666111..
.......6633.....
.......30L33....
.......3L0L33...
......333L033...
......03.33333..
.....00..LLLLL..
.....C...LLLL301
....C.....333001
...C.....000..01
C0C......111....`],
  [ice,bitmap`
7277777777277777
2777777772777777
7777777727777772
7777727777777727
7777277777777777
7772777777777777
7727777777277777
7777777772777777
7777777727777777
7777777777777777
7777777777777777
7727777777277777
7277777772777777
2777777727777777
7777777777777772
7777777777772777`],
  [bL,bitmap`
7727775555777777
7777775555777777
7777775555777727
7777775555777277
7777775555772777
7777775555777777
7777775555777777
7777275555777777
7772775555777777
7727775555777777
7777775555777777
7777775555777727
7777775555777277
7777775555772777
7772775555777777
7727775555777777`],
  [rL,bitmap`
7277773333777777
7777773333777277
7777773333772777
7777773333727777
7777773333777777
7777773333777777
7772773333777777
7727773333777777
7277773333772777
7777773333727777
7777773333777777
7777773333777777
7777773333777777
7777773333777727
7772773333777277
7727773333772777`]
);

setBackground(ice)
const level = map`
....b...r...b....
....b...r...b....
p...b...r...b....
....b...r...b....
....b...r...b....`
setMap(level)

setSolids([ player, ]);

setPushables({
  [player]: []
});

updateScore()

playTune(music, Infinity)

// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

//collision
setInterval(() => {
  if (tilesWith(player, opp).length > 0) {
    playTune(hit)
    setMap(level)
    score = 0
    updateScore()
  }
  //opp despawning
  getAll(opp).forEach((oppObj) => {
    if (oppObj.x === 0) {
      oppObj.remove()
    }
    })
  //player scoring
  getAll(player).forEach((playerObj) => {
    if (playerObj.x === 16) {
      playTune(goalSound)
      score = score + 1
      updateScore()
      setMap(level)
    }
  })
})

//opp movement
setInterval(() => {
  getAll(opp).forEach((oppObj) => {
    oppObj.x -= 1
  })
}, 200)

//opp spawning
setInterval(() => {
  let spawn1 = Math.random();
  let spawn2 = Math.random();
  let spawn3 = Math.random();

  if (spawn1 < 0.2) {
    y1 = 0;
  }
  else if (spawn1 < 0.4) {
    y1 = 1;
  }
  else if (spawn1 < 0.6) {
    y1 = 2;
  }
  else if (spawn1 < 0.8) {
    y1 = 3;
  }
  else {
    y1 = 4;
  }
  
  if (spawn2 < 0.2) {
    y2 = 0;
  }
  else if (spawn2 < 0.4) {
    y2 = 1;
  }
  else if (spawn2 < 0.6) {
    y2 = 2;
  }
  else if (spawn2 < 0.8) {
    y2 = 3;
  }
  else {
    y2 = 4;
  }

    if (spawn3 < 0.2) {
    y3 = 0;
  }
  else if (spawn3 < 0.4) {
    y3 = 1;
  }
  else if (spawn3 < 0.6) {
    y3 = 2;
  }
  else if (spawn3 < 0.8) {
    y3 = 3;
  }
  else {
    y3 = 4;
  }
  
  addSprite(16, y1, opp);
  addSprite(16, y2, opp);
  addSprite(16, y3, opp);
}, 800)
