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

// Cute face variants — shown on un-flipped dumplings
const FACES_NORMAL = ['😊', '🥰', '☺️', '😄', '😁', '🤗', '😋'];
// Faces used when the coin is nearby (warm/hot hints)
const FACES_WARM   = ['😅', '🥵', '😰', '🤔'];
const FACE_COIN    = '🪙';
const FACE_WRONG   = '😢';

// ── State ────────────────────────────────────────
let state = {
  coinIndex:   -1,
  dumplings:   0,
  triesLeft:   0,
  triesMax:    0,
  score:       0,
  best:        0,
  round:       1,
  diffIndex:   1,          // start at Normal
  guessed:     false,
  revealed:    [],         // indices already clicked
  faces:       [],         // assigned face per dumpling
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
// Returns 'cold' | 'warm' | 'hot' based on how many
// dumplings away from the coin the guess index is
// (uses a grid-distance heuristic)
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
  const base     = 100;
  const triesBonus = triesLeft * 30;
  const roundBonus = (round - 1) * 15;
  return base + triesBonus + roundBonus;
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
    face.className   = 'dumpling-face';
    face.textContent = state.faces[i];

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
    // ✅ Correct!
    face.textContent = FACE_COIN;
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
    // ❌ Wrong
    face.textContent = FACE_WRONG;
    card.classList.add('wrong');

    state.triesLeft = clamp(state.triesLeft - 1, 0, state.triesMax);
    updateHUD();

    if (state.triesLeft === 0) {
      // Game over — reveal coin
      revealCoin();
      state.guessed = true;
      disableAll();
      setMessage('😔 No more tries! The coin hides no more.', 'bad');

      setTimeout(() => showOverlay('lose'), 2000);
    } else {
      // Give a proximity hint
      const prox = proximity(idx, state.coinIndex, state.dumplings);
      applyHint(prox);
    }
  }
}

// ── Reveal coin for game-over ─────────────────────
function revealCoin() {
  const cards = bowlEl.querySelectorAll('.dumpling');
  const coinCard = cards[state.coinIndex];
  const coinFace = coinCard.querySelector('.dumpling-face');

  coinFace.textContent = FACE_COIN;
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
    // tint neighbours
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
        c.querySelector('.dumpling-face').textContent = pick(FACES_WARM);
      }
    }
  });
}

// ── Next round ────────────────────────────────────
function nextRound() {
  state.round++;
  // scale difficulty every 3 rounds
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
  state.score    = 0;
  state.round    = 1;
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
