/* ═══════════════════════════════════════════════
   Dumpling Coin Hunt — game.js
═══════════════════════════════════════════════ */

// ── Config ──────────────────────────────────────
const DIFFICULTIES = [
  { label: 'Easy',   dumplings: 4,  tries: 4 },
  { label: 'Normal', dumplings: 6,  tries: 3 },
  { label: 'Hard',   dumplings: 9,  tries: 3 },
  { label: 'Expert', dumplings: 12, tries: 3 },
];

// Face type names used per state
const FACES_NORMAL = ['smile', 'squint', 'blush', 'wink', 'sparkleyes', 'uwu'];
const FACES_WARM   = ['nervous', 'flushed'];
const FACE_COIN    = 'starry';
const FACE_WRONG   = 'sad';

// ── SVG face definitions ─────────────────────────
// viewBox: 0 0 60 44  — eyes ~y16, mouth ~y30
const C = '#3d2b1f';   // dark brown for features
const FACE_DEFS = {

  smile: `
    <circle cx="20" cy="16" r="4" fill="${C}"/>
    <circle cx="40" cy="16" r="4" fill="${C}"/>
    <circle cx="22" cy="14" r="1.5" fill="rgba(255,255,255,.75)"/>
    <circle cx="42" cy="14" r="1.5" fill="rgba(255,255,255,.75)"/>
    <path d="M17 27 Q30 39 43 27" stroke="${C}" stroke-width="2.8"
          fill="none" stroke-linecap="round"/>`,

  squint: `
    <path d="M14 17 Q20 11 26 17" stroke="${C}" stroke-width="3"
          fill="none" stroke-linecap="round"/>
    <path d="M34 17 Q40 11 46 17" stroke="${C}" stroke-width="3"
          fill="none" stroke-linecap="round"/>
    <path d="M15 27 Q30 40 45 27" stroke="${C}" stroke-width="2.8"
          fill="none" stroke-linecap="round"/>`,

  blush: `
    <circle cx="20" cy="16" r="4" fill="${C}"/>
    <circle cx="40" cy="16" r="4" fill="${C}"/>
    <circle cx="22" cy="14" r="1.5" fill="rgba(255,255,255,.75)"/>
    <circle cx="42" cy="14" r="1.5" fill="rgba(255,255,255,.75)"/>
    <ellipse cx="11" cy="24" rx="6" ry="4" fill="#ffb3b3" opacity=".55"/>
    <ellipse cx="49" cy="24" rx="6" ry="4" fill="#ffb3b3" opacity=".55"/>
    <path d="M20 29 Q30 38 40 29" stroke="${C}" stroke-width="2.8"
          fill="none" stroke-linecap="round"/>`,

  wink: `
    <circle cx="20" cy="16" r="4" fill="${C}"/>
    <circle cx="22" cy="14" r="1.5" fill="rgba(255,255,255,.75)"/>
    <path d="M36 15 Q40 11 44 15" stroke="${C}" stroke-width="3"
          fill="none" stroke-linecap="round"/>
    <path d="M17 27 Q30 39 43 27" stroke="${C}" stroke-width="2.8"
          fill="none" stroke-linecap="round"/>`,

  sparkleyes: `
    <text x="12" y="22" font-size="14" fill="#f7b731" font-family="sans-serif">✦</text>
    <text x="36" y="22" font-size="14" fill="#f7b731" font-family="sans-serif">✦</text>
    <path d="M15 30 Q30 42 45 30" stroke="${C}" stroke-width="2.8"
          fill="none" stroke-linecap="round"/>`,

  uwu: `
    <path d="M14 17 Q20 12 26 17" stroke="${C}" stroke-width="3"
          fill="none" stroke-linecap="round"/>
    <path d="M34 17 Q40 12 46 17" stroke="${C}" stroke-width="3"
          fill="none" stroke-linecap="round"/>
    <path d="M21 29 Q25 35 30 29 Q35 35 39 29" stroke="${C}" stroke-width="2.6"
          fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,

  nervous: `
    <circle cx="20" cy="16" r="4" fill="${C}"/>
    <circle cx="40" cy="16" r="4" fill="${C}"/>
    <circle cx="22" cy="14" r="1.5" fill="rgba(255,255,255,.75)"/>
    <circle cx="42" cy="14" r="1.5" fill="rgba(255,255,255,.75)"/>
    <path d="M18 31 Q23 27 28 31 Q33 27 38 31 Q43 27 44 31"
          stroke="${C}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="52" cy="8" rx="3.5" ry="2.5" fill="#aadcff" opacity=".8"/>
    <path d="M49 10 Q52 19 55 10" stroke="#aadcff" stroke-width="2.5"
          fill="none" stroke-linecap="round"/>`,

  flushed: `
    <path d="M14 18 Q20 13 26 18" stroke="${C}" stroke-width="3"
          fill="none" stroke-linecap="round"/>
    <path d="M34 18 Q40 13 46 18" stroke="${C}" stroke-width="3"
          fill="none" stroke-linecap="round"/>
    <ellipse cx="11" cy="25" rx="7" ry="5" fill="#ff6b6b" opacity=".45"/>
    <ellipse cx="49" cy="25" rx="7" ry="5" fill="#ff6b6b" opacity=".45"/>
    <ellipse cx="30" cy="33" rx="5" ry="4" fill="${C}"/>`,

  sad: `
    <circle cx="20" cy="15" r="4" fill="${C}"/>
    <circle cx="40" cy="15" r="4" fill="${C}"/>
    <circle cx="22" cy="13" r="1.5" fill="rgba(255,255,255,.75)"/>
    <circle cx="42" cy="13" r="1.5" fill="rgba(255,255,255,.75)"/>
    <path d="M18 34 Q30 25 42 34" stroke="${C}" stroke-width="2.8"
          fill="none" stroke-linecap="round"/>
    <ellipse cx="19" cy="22" rx="2" ry="3.5" fill="#aadcff" opacity=".8"/>
    <ellipse cx="39" cy="22" rx="2" ry="3.5" fill="#aadcff" opacity=".8"/>`,

  starry: `
    <text x="10" y="22" font-size="16" fill="#f7b731" font-family="sans-serif">★</text>
    <text x="34" y="22" font-size="16" fill="#f7b731" font-family="sans-serif">★</text>
    <path d="M13 31 Q30 44 47 31" stroke="${C}" stroke-width="3"
          fill="none" stroke-linecap="round"/>
    <path d="M19 31 Q30 38 41 31" fill="${C}"/>
    <text x="2"  y="10" font-size="9" fill="#f7b731" opacity=".7" font-family="sans-serif">✦</text>
    <text x="49" y="10" font-size="9" fill="#f7b731" opacity=".7" font-family="sans-serif">✦</text>`,
};

function makeFaceSVG(type) {
  const inner = FACE_DEFS[type] ?? FACE_DEFS.smile;
  return `<svg viewBox="0 0 60 44" xmlns="http://www.w3.org/2000/svg"
               class="face-svg" aria-hidden="true">${inner}</svg>`;
}

// ── State ────────────────────────────────────────
let state = {
  coinIndex:   -1,
  dumplings:   0,
  triesLeft:   0,
  triesMax:    0,
  score:       0,
  best:        0,
  round:       1,
  diffIndex:   1,
  guessed:     false,
  revealed:    [],
  faces:       [],
};

// ── DOM refs ─────────────────────────────────────
const bowlEl      = document.getElementById('bowl-container');
const scoreEl     = document.getElementById('score');
const roundEl     = document.getElementById('round');
const bestEl      = document.getElementById('best');
const triesEl     = document.getElementById('tries');
const msgBox      = document.getElementById('message-box');
const msgText     = document.getElementById('message-text');
const hintBar     = document.getElementById('hint-bar');
const newGameBtn  = document.getElementById('new-game-btn');
const overlay     = document.getElementById('overlay');
const overlayIcon = document.getElementById('overlay-icon');
const overlayTitle= document.getElementById('overlay-title');
const overlayMsg  = document.getElementById('overlay-msg');
const overlayBtn  = document.getElementById('overlay-btn');

// ── Helpers ───────────────────────────────────────
const randInt  = (n)     => Math.floor(Math.random() * n);
const pick     = (arr)   => arr[randInt(arr.length)];
const clamp    = (v,a,b) => Math.max(a, Math.min(b, v));

function assignFaces(n) {
  return Array.from({ length: n }, () => pick(FACES_NORMAL));
}

// ── Proximity helper ──────────────────────────────
function proximity(guessIdx, coinIdx, total) {
  const cols  = Math.ceil(Math.sqrt(total));
  const gRow  = Math.floor(guessIdx / cols);
  const gCol  = guessIdx % cols;
  const cRow  = Math.floor(coinIdx  / cols);
  const cCol  = coinIdx  % cols;
  const dist  = Math.abs(gRow - cRow) + Math.abs(gCol - cCol);

  if (dist === 0)  return 'exact';
  if (dist === 1)  return 'hot';
  if (dist <= 2)   return 'warm';
  return 'cold';
}

// ── Score formula ─────────────────────────────────
function calcPoints(triesLeft, triesMax, round) {
  return 100 + triesLeft * 30 + (round - 1) * 15;
}

// ── Build board ───────────────────────────────────
function buildBoard() {
  const diff = DIFFICULTIES[state.diffIndex];
  state.dumplings = diff.dumplings;
  state.triesLeft = diff.tries;
  state.triesMax  = diff.tries;
  state.coinIndex = randInt(state.dumplings);
  state.guessed   = false;
  state.revealed  = [];
  state.faces     = assignFaces(state.dumplings);

  bowlEl.innerHTML = '';

  for (let i = 0; i < state.dumplings; i++) {
    const card = document.createElement('div');
    card.className   = 'dumpling';
    card.dataset.idx = i;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Dumpling ${i + 1}`);
    card.tabIndex    = 0;

    const face = document.createElement('div');
    face.className  = 'dumpling-face';
    face.innerHTML  = makeFaceSVG(state.faces[i]);

    card.appendChild(face);
    card.addEventListener('click',   () => handleGuess(i, card, face));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') handleGuess(i, card, face);
    });

    bowlEl.appendChild(card);
  }

  updateHUD();
  setMessage('Pick a dumpling to find the coin! 🥟', '');
  hintBar.textContent = `${diff.dumplings} dumplings · ${diff.tries} tries · ${diff.label}`;
}

// ── Guess handler ─────────────────────────────────
function handleGuess(idx, card, face) {
  if (state.guessed) return;
  if (state.revealed.includes(idx)) return;

  state.revealed.push(idx);
  card.classList.add('disabled');

  if (idx === state.coinIndex) {
    face.innerHTML = makeFaceSVG(FACE_COIN);
    card.classList.add('correct');

    const pts = calcPoints(state.triesLeft, state.triesMax, state.round);
    state.score += pts;
    state.best   = Math.max(state.best, state.score);
    state.guessed = true;

    updateHUD();
    setMessage(`🎉 Found it! +${pts} points!`, 'good');
    hintBar.textContent = 'Nice one! Starting next round…';

    disableAll();
    setTimeout(() => nextRound(), 1800);

  } else {
    face.innerHTML = makeFaceSVG(FACE_WRONG);
    card.classList.add('wrong');

    state.triesLeft = clamp(state.triesLeft - 1, 0, state.triesMax);
    updateHUD();

    if (state.triesLeft === 0) {
      revealCoin();
      state.guessed = true;
      disableAll();
      setMessage('😔 No more tries! The coin hides no more.', 'bad');
      setTimeout(() => showOverlay('lose'), 2000);
    } else {
      const prox = proximity(idx, state.coinIndex, state.dumplings);
      applyHint(prox);
    }
  }
}

// ── Reveal coin for game-over ─────────────────────
function revealCoin() {
  const cards    = bowlEl.querySelectorAll('.dumpling');
  const coinCard = cards[state.coinIndex];
  const coinFace = coinCard.querySelector('.dumpling-face');

  coinFace.innerHTML = makeFaceSVG(FACE_COIN);
  coinCard.classList.add('revealed-coin');

  const badge = document.createElement('span');
  badge.className   = 'coin-badge';
  badge.textContent = '✨';
  coinCard.appendChild(badge);
}

// ── Proximity hints ───────────────────────────────
function applyHint(prox) {
  const cards = bowlEl.querySelectorAll('.dumpling');

  if (prox === 'hot') {
    setMessage('🔥 Scorching! The coin is RIGHT next door!', 'hot');
    hintBar.textContent = 'One step away…';
    cards.forEach((c, i) => {
      if (!state.revealed.includes(i) && i !== state.coinIndex) {
        const p = proximity(i, state.coinIndex, state.dumplings);
        if (p === 'hot')  c.classList.add('hot');
        if (p === 'warm') c.classList.add('warm');
      }
    });
  } else if (prox === 'warm') {
    setMessage('🌡️ Getting warmer! You\'re close!', 'warm');
    hintBar.textContent = 'Keep searching nearby…';
    cards.forEach((c, i) => {
      if (!state.revealed.includes(i) && i !== state.coinIndex) {
        const p = proximity(i, state.coinIndex, state.dumplings);
        if (p === 'warm') c.classList.add('warm');
      }
    });
  } else {
    setMessage('🧊 Cold! The coin is far away.', 'info');
    hintBar.textContent = 'Try the other side of the bowl…';
  }

  // swap face for warm/hot dumplings
  cards.forEach((c, i) => {
    if (!state.revealed.includes(i) && !c.classList.contains('wrong')) {
      if (c.classList.contains('hot') || c.classList.contains('warm')) {
        c.querySelector('.dumpling-face').innerHTML = makeFaceSVG(pick(FACES_WARM));
      }
    }
  });
}

// ── Next round ────────────────────────────────────
function nextRound() {
  state.round++;
  state.diffIndex = clamp(Math.floor((state.round - 1) / 3), 0, DIFFICULTIES.length - 1);
  buildBoard();
  setMessage(`Round ${state.round} — ${DIFFICULTIES[state.diffIndex].label} mode!`, 'info');
}

// ── Overlay ───────────────────────────────────────
function showOverlay(type) {
  overlay.classList.remove('hidden');

  if (type === 'lose') {
    overlayIcon.textContent  = '🥟💸';
    overlayTitle.textContent = 'The coin escaped!';
    overlayMsg.textContent   = `You reached round ${state.round} with ${state.score} points. Best: ${state.best}.`;
  }

  overlayBtn.onclick = () => {
    overlay.classList.add('hidden');
    resetGame();
  };
}

function resetGame() {
  state.score     = 0;
  state.round     = 1;
  state.diffIndex = 1;
  buildBoard();
  setMessage('New game! Find the coin 🪙', 'info');
}

// ── Utilities ─────────────────────────────────────
function disableAll() {
  bowlEl.querySelectorAll('.dumpling').forEach(c => c.classList.add('disabled'));
}

function setMessage(text, type = '') {
  msgText.textContent = text;
  msgBox.className    = 'message-box' + (type ? ` ${type}` : '');
}

function updateHUD() {
  scoreEl.textContent = state.score;
  roundEl.textContent = state.round;
  bestEl.textContent  = state.best;
  triesEl.textContent = state.triesLeft;
  triesEl.style.color = state.triesLeft <= 1 ? 'var(--red)' : '';
}

// ── Button ────────────────────────────────────────
newGameBtn.addEventListener('click', () => {
  overlay.classList.add('hidden');
  resetGame();
});

// ── Kick off ──────────────────────────────────────
buildBoard();
