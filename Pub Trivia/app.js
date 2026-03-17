/* ============================================================
   THE BRASS LANTERN – PUB TRIVIA  |  app.js
   ============================================================ */

'use strict';

// ── Category metadata ────────────────────────────────────────
const CATEGORIES = [
  { id: 'History',            emoji: '📜', label: 'History' },
  { id: 'Science & Nature',   emoji: '🔬', label: 'Science & Nature' },
  { id: 'Geography',          emoji: '🌍', label: 'Geography' },
  { id: 'Movies & TV',        emoji: '🎬', label: 'Movies & TV' },
  { id: 'Music',              emoji: '🎵', label: 'Music' },
  { id: 'Sports',             emoji: '⚽', label: 'Sports' },
  { id: 'Food & Drink',       emoji: '🍺', label: 'Food & Drink' },
  { id: 'Literature',         emoji: '📚', label: 'Literature' },
  { id: 'Technology',         emoji: '💻', label: 'Technology' },
  { id: 'Pop Culture',        emoji: '🌟', label: 'Pop Culture' },
  { id: 'Art & Design',       emoji: '🎨', label: 'Art & Design' },
  { id: 'Mythology & Religion', emoji: '⚡', label: 'Mythology & Religion' },
];

const QUESTIONS_PER_ROUND = 10;
const TIMER_SECONDS       = 30;
const HS_KEY              = 'brassLantern_highScores';

// ── State ────────────────────────────────────────────────────
const state = {
  playerName:       'Anonymous',
  selectedCats:     [],   // 3 category ids
  rounds:           [],   // array of { category, questions[], results[] }
  currentRound:     0,
  currentQuestion:  0,
  totalScore:       0,
  timerInterval:    null,
  timerValue:       0,
  answered:         false,
  hostMode:         false,  // true = host/group mode
};

// ── Helpers ──────────────────────────────────────────────────
function $(id) { return document.getElementById(id); }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(id);
  screen.classList.add('active');
  screen.scrollTop = 0;
  // Show home button on every screen except home itself
  const homeBtn = $('btn-home-nav');
  if (homeBtn) homeBtn.style.display = (id === 'screen-home') ? 'none' : 'block';
}

function goHome() {
  stopTimer();
  resetSetup();
  showScreen('screen-home');
}

function getCategoryEmoji(catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  return cat ? cat.emoji : '❓';
}

function showToast(msg, duration = 2500) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ── Question selection ───────────────────────────────────────
function pickQuestions(categoryId) {
  const pool = QUESTIONS.filter(q => q.category === categoryId);
  return shuffle(pool).slice(0, QUESTIONS_PER_ROUND);
}

// Shuffle options but preserve correct answer tracking
function prepareQuestion(q) {
  const indices = shuffle([0, 1, 2, 3]);
  const shuffledOptions = indices.map(i => q.options[i]);
  const newCorrectIdx = indices.indexOf(q.answer);
  return { ...q, displayOptions: shuffledOptions, displayAnswer: newCorrectIdx };
}

// ── Home Screen ──────────────────────────────────────────────
function initHome() {
  $('btn-new-game').addEventListener('click', () => {
    state.hostMode = false;
    resetSetup();
    showScreen('screen-setup');
  });
  $('btn-host-game').addEventListener('click', () => {
    state.hostMode = true;
    resetSetup();
    showScreen('screen-setup');
  });
  $('btn-high-scores').addEventListener('click', () => { buildHighScores(); showScreen('screen-highscores'); });
}

// ── Setup Screen ─────────────────────────────────────────────
function initSetup() {
  buildCategoryGrid();
  $('btn-start').addEventListener('click', startGame);
}

function resetSetup() {
  state.selectedCats = [];
  document.querySelectorAll('.cat-card').forEach(c => {
    c.classList.remove('selected', 'disabled-card');
  });
  updateSetupUI();

  // Update setup screen for current mode
  const badge = $('setup-mode-badge');
  const nameRow = $('player-name-row');
  if (state.hostMode) {
    badge.textContent = '🎤 Host Mode — Group Game';
    badge.className = 'mode-badge host';
    nameRow.style.display = 'none';
  } else {
    badge.textContent = '▶ Solo Game';
    badge.className = 'mode-badge solo';
    nameRow.style.display = 'flex';
  }
}

function buildCategoryGrid() {
  const grid = $('category-grid');
  grid.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const pool = QUESTIONS.filter(q => q.category === cat.id);
    const card = document.createElement('div');
    card.className = 'cat-card';
    card.dataset.catId = cat.id;
    card.innerHTML = `
      <span class="cat-emoji">${cat.emoji}</span>
      <div class="cat-name">${cat.label}</div>
      <div class="cat-count">${pool.length} questions</div>
    `;
    card.addEventListener('click', () => toggleCategory(cat.id, card));
    grid.appendChild(card);
  });
}

function toggleCategory(catId, card) {
  const idx = state.selectedCats.indexOf(catId);
  if (idx !== -1) {
    // Deselect
    state.selectedCats.splice(idx, 1);
    card.classList.remove('selected');
  } else {
    if (state.selectedCats.length >= 3) return; // max 3
    state.selectedCats.push(catId);
    card.classList.add('selected');
  }
  updateSetupUI();
}

function updateSetupUI() {
  const n = state.selectedCats.length;
  $('selection-count').textContent = `${n} / 3 selected`;
  $('btn-start').disabled = (n !== 3);

  // Dim unselected cards when 3 chosen
  document.querySelectorAll('.cat-card').forEach(c => {
    const isSelected = state.selectedCats.includes(c.dataset.catId);
    if (n === 3 && !isSelected) {
      c.classList.add('disabled-card');
    } else {
      c.classList.remove('disabled-card');
    }
  });
}

// ── Game Start ───────────────────────────────────────────────
function startGame() {
  state.playerName = ($('player-name').value.trim() || 'Anonymous');
  state.totalScore = 0;
  state.currentRound = 0;

  state.rounds = state.selectedCats.map(catId => ({
    category:  catId,
    questions: pickQuestions(catId).map(prepareQuestion),
    results:   [],
  }));

  loadRound(0);
}

function loadRound(roundIdx) {
  state.currentRound    = roundIdx;
  state.currentQuestion = 0;

  const round = state.rounds[roundIdx];
  $('round-badge').textContent  = `Round ${roundIdx + 1} of 3`;
  $('category-name').textContent = `${getCategoryEmoji(round.category)} ${round.category}`;

  showScreen('screen-game');
  loadQuestion();
}

// ── Question Display ─────────────────────────────────────────
function loadQuestion() {
  const round = state.rounds[state.currentRound];
  const qObj  = round.questions[state.currentQuestion];
  state.answered = false;

  // Meta
  const qNum = state.currentQuestion + 1;
  $('question-counter').textContent = `Question ${qNum} of ${QUESTIONS_PER_ROUND}`;
  $('progress-bar').style.width = `${((qNum - 1) / QUESTIONS_PER_ROUND) * 100}%`;
  $('score-display').textContent = `Score: ${state.totalScore}`;

  // Clean up any answer banner from previous easy question
  const oldBanner = document.querySelector('.host-answer-banner');
  if (oldBanner) oldBanner.remove();

  // Question text
  $('question-text').textContent = qObj.question;

  // Options
  const optBtns = document.querySelectorAll('.option-btn');
  const labels  = ['A', 'B', 'C', 'D'];
  const isEasy  = qObj.difficulty === 'easy';
  if (state.hostMode) {
    if (isEasy) {
      // No multiple choice for easy questions — hide options grid
      $('options-grid').style.display = 'none';
    } else {
      $('options-grid').style.display = 'grid';
      optBtns.forEach((btn, i) => {
        btn.className = 'option-btn host-option';
        btn.disabled  = true;
        btn.innerHTML = `<span class="option-label">${labels[i]}</span>${qObj.displayOptions[i]}`;
        btn.onclick   = null;
      });
    }
  } else {
    $('options-grid').style.display = 'grid';
    optBtns.forEach((btn, i) => {
      btn.className = 'option-btn';
      btn.disabled  = false;
      btn.innerHTML = `<span class="option-label">${labels[i]}</span>${qObj.displayOptions[i]}`;
      btn.onclick   = () => selectAnswer(i);
    });
  }

  // Hide fun fact, next, and reveal buttons
  $('fun-fact-box').style.display = 'none';
  $('btn-next').style.display     = state.hostMode ? 'inline-flex' : 'none';
  $('btn-reveal').style.display   = state.hostMode ? 'inline-flex' : 'none';

  // Timer: only in solo mode
  if (state.hostMode) {
    $('timer-display').style.display = 'none';
    $('score-display').style.display = 'none';
  } else {
    $('timer-display').style.display = 'inline';
    $('score-display').style.display = 'inline';
    startTimer();
  }
}

// ── Timer ────────────────────────────────────────────────────
function startTimer() {
  clearInterval(state.timerInterval);
  state.timerValue = TIMER_SECONDS;
  updateTimerDisplay();

  state.timerInterval = setInterval(() => {
    state.timerValue--;
    updateTimerDisplay();
    if (state.timerValue <= 0) {
      clearInterval(state.timerInterval);
      timeOut();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const el = $('timer-display');
  el.textContent = `⏱ ${state.timerValue}`;
  if (state.timerValue <= 10) {
    el.classList.add('warning');
  } else {
    el.classList.remove('warning');
  }
}

function stopTimer() {
  clearInterval(state.timerInterval);
  $('timer-display').classList.remove('warning');
}

function timeOut() {
  if (state.answered) return;
  state.answered = true;
  const round = state.rounds[state.currentRound];
  const qObj  = round.questions[state.currentQuestion];

  // Disable all buttons, reveal correct
  const optBtns = document.querySelectorAll('.option-btn');
  optBtns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === qObj.displayAnswer) btn.classList.add('reveal-correct');
  });

  round.results.push({ correct: false, timeout: true, question: qObj });

  showFunFact(qObj);
  $('btn-next').style.display = 'inline-flex';
}

// ── Answer Selection ─────────────────────────────────────────
function selectAnswer(idx) {
  if (state.answered) return;
  state.answered = true;
  stopTimer();

  const round = state.rounds[state.currentRound];
  const qObj  = round.questions[state.currentQuestion];
  const isCorrect = (idx === qObj.displayAnswer);

  const optBtns = document.querySelectorAll('.option-btn');
  optBtns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === idx && isCorrect)  btn.classList.add('correct');
    if (i === idx && !isCorrect) btn.classList.add('wrong');
    if (!isCorrect && i === qObj.displayAnswer) btn.classList.add('reveal-correct');
  });

  if (isCorrect) state.totalScore++;
  round.results.push({ correct: isCorrect, timeout: false, chosenIdx: idx, question: qObj });

  showFunFact(qObj);
  $('btn-next').style.display     = 'inline-flex';
  $('score-display').textContent  = `Score: ${state.totalScore}`;
  $('progress-bar').style.width   = `${((state.currentQuestion + 1) / QUESTIONS_PER_ROUND) * 100}%`;
}

function showFunFact(qObj) {
  $('fun-fact-text').textContent  = qObj.fun_fact;
  $('fun-fact-box').style.display = 'block';
}

// ── Host Mode: Reveal Answer ─────────────────────────────────
function revealAnswer() {
  if (state.answered) return;
  state.answered = true;

  const round  = state.rounds[state.currentRound];
  const qObj   = round.questions[state.currentQuestion];
  const isEasy = qObj.difficulty === 'easy';

  if (isEasy) {
    // Show the answer as a text banner (no options grid to highlight)
    const answerBanner = document.createElement('div');
    answerBanner.className = 'host-answer-banner';
    answerBanner.innerHTML = `<span class="host-answer-banner-label">✓ Answer</span>${qObj.displayOptions[qObj.displayAnswer]}`;
    const optGrid = $('options-grid');
    optGrid.parentNode.insertBefore(answerBanner, optGrid.nextSibling);
  } else {
    // Highlight the correct option in the grid
    const optBtns = document.querySelectorAll('.option-btn');
    optBtns.forEach((btn, i) => {
      btn.className = 'option-btn host-option';
      if (i === qObj.displayAnswer) btn.classList.add('reveal-correct');
    });
  }

  round.results.push({ correct: true, timeout: false, question: qObj });

  $('btn-reveal').style.display = 'none';
  showFunFact(qObj);

  // Update progress
  $('progress-bar').style.width = `${((state.currentQuestion + 1) / QUESTIONS_PER_ROUND) * 100}%`;
}

// ── Next Question / Round ────────────────────────────────────
function initNextButton() {
  $('btn-next').addEventListener('click', () => {
    // In host mode, if host skips without revealing, still record the question
    if (state.hostMode && !state.answered) {
      const round = state.rounds[state.currentRound];
      const qObj  = round.questions[state.currentQuestion];
      round.results.push({ correct: true, timeout: false, question: qObj });
    }
    state.currentQuestion++;
    if (state.currentQuestion >= QUESTIONS_PER_ROUND) {
      showRoundSummary();
    } else {
      loadQuestion();
    }
  });
}

// ── Round Summary ────────────────────────────────────────────
function showRoundSummary() {
  const round    = state.rounds[state.currentRound];
  const correct  = round.results.filter(r => r.correct).length;
  const isLast   = (state.currentRound === 2);

  // Header
  $('summary-emoji').textContent    = correct >= 8 ? '🎉' : correct >= 5 ? '👍' : '😅';
  $('summary-title').textContent    = `Round ${state.currentRound + 1} Complete!`;
  $('summary-score').textContent    = `${correct} / ${QUESTIONS_PER_ROUND}`;
  $('summary-category').textContent = `${getCategoryEmoji(round.category)} ${round.category}`;

  // Breakdown
  const breakdown = $('question-breakdown');
  breakdown.innerHTML = '';
  round.results.forEach((r, i) => {
    const qObj = r.question;
    const item = document.createElement('div');
    item.className = `breakdown-item ${r.correct ? 'correct-item' : r.timeout ? 'timeout-item' : 'wrong-item'}`;
    const icon  = r.correct ? '✅' : r.timeout ? '⏱' : '❌';
    const answerLine = r.correct
      ? `Correct: <em>${qObj.displayOptions[qObj.displayAnswer]}</em>`
      : r.timeout
        ? `Time's up! Answer: <em>${qObj.displayOptions[qObj.displayAnswer]}</em>`
        : `Your answer: <em>${qObj.displayOptions[r.chosenIdx]}</em> — Correct: <em>${qObj.displayOptions[qObj.displayAnswer]}</em>`;
    item.innerHTML = `
      <div class="breakdown-icon">${icon}</div>
      <div class="breakdown-q">
        <div>${i + 1}. ${qObj.question}</div>
        <div class="breakdown-a">${answerLine}</div>
      </div>
    `;
    breakdown.appendChild(item);
  });

  if (state.hostMode) {
    showHostAnswerSheet();
    return;
  }

  // Button
  const nextRoundBtn = $('btn-next-round');
  nextRoundBtn.textContent = isLast ? 'See Results 🏁' : 'Next Round →';

  showScreen('screen-round-summary');
}

function initRoundSummary() {
  $('btn-next-round').addEventListener('click', () => {
    const isLast = (state.currentRound === 2);
    if (isLast) {
      showFinalResults();
    } else {
      loadRound(state.currentRound + 1);
    }
  });
}

// ── Final Results ────────────────────────────────────────────
function showFinalResults() {
  const total   = state.totalScore;
  const pct     = Math.round((total / 30) * 100);
  const rating  = getRating(pct);
  const trophy  = pct >= 80 ? '🏆' : pct >= 60 ? '🥈' : pct >= 40 ? '🥉' : '🍺';

  $('results-trophy').textContent      = trophy;
  $('results-title').textContent       = 'Quiz Complete!';
  $('results-total-score').textContent = `${total} / 30`;
  $('results-percentage').textContent  = `${pct}%`;
  $('results-rating').textContent      = rating;

  // Per-category breakdown
  const bd = $('results-breakdown');
  bd.innerHTML = '';
  state.rounds.forEach(round => {
    const correct = round.results.filter(r => r.correct).length;
    const fillPct = (correct / QUESTIONS_PER_ROUND) * 100;
    const card = document.createElement('div');
    card.className = 'results-cat-card';
    card.innerHTML = `
      <div class="results-cat-emoji">${getCategoryEmoji(round.category)}</div>
      <div class="results-cat-name">${round.category}</div>
      <div class="results-cat-score">${correct} / 10</div>
      <div class="results-cat-bar"><div class="results-cat-fill" style="width:${fillPct}%"></div></div>
    `;
    bd.appendChild(card);
  });

  // Save high score
  saveHighScore(total, pct);
  showScreen('screen-results');
  showToast('Score saved! 🏆');
}

function getRating(pct) {
  if (pct === 100) return '🌟 Perfect Legend!';
  if (pct >= 90)   return '🏆 Pub Champion!';
  if (pct >= 75)   return '🎯 Trivia Ace';
  if (pct >= 60)   return '👍 Sharp Cookie';
  if (pct >= 45)   return '🍻 Regular Punter';
  if (pct >= 30)   return '😅 Needs Another Pint';
  return '🍺 Bottom of the Barrel';
}

function initResults() {
  $('btn-play-again').addEventListener('click', () => {
    resetSetup();
    showScreen('screen-setup');
  });
  $('btn-high-scores-2').addEventListener('click', () => { buildHighScores(); showScreen('screen-highscores'); });
  $('btn-share').addEventListener('click', shareScore);
  $('btn-back-home').addEventListener('click', () => showScreen('screen-home'));
}

function shareScore() {
  const cats = state.rounds.map(r => `${getCategoryEmoji(r.category)} ${r.category}`).join(', ');
  const roundLines = state.rounds.map((r, i) => {
    const correct = r.results.filter(x => x.correct).length;
    return `Round ${i+1} (${r.category}): ${correct}/10`;
  }).join('\n');
  const pct = Math.round((state.totalScore / 30) * 100);
  const text = `🏮 The Brass Lantern – Pub Trivia\n${state.playerName}: ${state.totalScore}/30 (${pct}%)\n${getRating(pct)}\n\n${roundLines}\n\nCategories: ${cats}`;
  copyToClipboard(text, 'share-confirm');
}

// ── High Scores ──────────────────────────────────────────────
function loadHighScores() {
  try { return JSON.parse(localStorage.getItem(HS_KEY)) || []; }
  catch { return []; }
}

function saveHighScore(score, pct) {
  const scores = loadHighScores();
  const entry = {
    name:  state.playerName,
    score,
    pct,
    cats:  state.rounds.map(r => r.category),
    date:  new Date().toLocaleDateString(),
  };
  scores.push(entry);
  scores.sort((a, b) => b.score - a.score || b.pct - a.pct);
  scores.splice(10); // keep top 10
  localStorage.setItem(HS_KEY, JSON.stringify(scores));
}

function buildHighScores() {
  const scores = loadHighScores();
  const table  = $('highscore-table');
  table.innerHTML = '';

  if (scores.length === 0) {
    table.innerHTML = '<div class="hs-empty">No scores yet — play your first game!</div>';
    return;
  }

  scores.forEach((entry, i) => {
    const row = document.createElement('div');
    row.className = 'hs-row';
    const medals = ['🥇', '🥈', '🥉'];
    const rankStr = i < 3 ? medals[i] : `#${i + 1}`;
    const catEmojis = entry.cats.map(c => getCategoryEmoji(c)).join(' ');
    row.innerHTML = `
      <div class="hs-rank">${rankStr}</div>
      <div>
        <div class="hs-name">${escapeHtml(entry.name)}</div>
        <div class="hs-date">${entry.date} · ${catEmojis} ${entry.cats.join(', ')}</div>
      </div>
      <div class="hs-score">${entry.score} / 30</div>
    `;
    table.appendChild(row);
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ── Host Answer Sheet ────────────────────────────────────────
function showHostAnswerSheet() {
  const round   = state.rounds[state.currentRound];
  const isLast  = (state.currentRound === 2);

  $('host-answer-title').textContent    = `Round ${state.currentRound + 1} Answer Sheet`;
  $('host-answer-category').textContent = `${getCategoryEmoji(round.category)} ${round.category}`;

  const list = $('host-answer-list');
  list.innerHTML = '';
  round.questions.forEach((qObj, i) => {
    const item = document.createElement('div');
    item.className = 'host-answer-item';
    item.innerHTML = `
      <div class="host-answer-num">${i + 1}</div>
      <div class="host-answer-q">${qObj.question}</div>
      <div class="host-answer-a">${qObj.displayOptions[qObj.displayAnswer]}</div>
    `;
    list.appendChild(item);
  });

  $('btn-host-next-round').textContent = isLast ? 'See Full Answer Sheet 🏁' : 'Next Round →';
  $('copy-answers-confirm').style.display = 'none';
  showScreen('screen-host-answers');
}

function initHostAnswerSheet() {
  $('btn-copy-answers').addEventListener('click', () => {
    const round = state.rounds[state.currentRound];
    const lines = round.questions.map((q, i) =>
      `${i + 1}. ${q.question}\n   ✓ ${q.displayOptions[q.displayAnswer]}`
    ).join('\n\n');
    const text = `🎤 The Brass Lantern – Round ${state.currentRound + 1} (${round.category})\n\n${lines}`;
    copyToClipboard(text, 'copy-answers-confirm');
  });

  $('btn-host-next-round').addEventListener('click', () => {
    const isLast = (state.currentRound === 2);
    if (isLast) {
      showHostFinal();
    } else {
      loadRound(state.currentRound + 1);
    }
  });
}

function showHostFinal() {
  const container = $('host-final-list');
  container.innerHTML = '';

  state.rounds.forEach((round, ri) => {
    const section = document.createElement('div');
    section.className = 'host-final-round';
    section.innerHTML = `
      <div class="host-final-round-header">
        <span style="font-size:1.5rem">${getCategoryEmoji(round.category)}</span>
        <span class="host-final-round-title">Round ${ri + 1} — ${round.category}</span>
      </div>
    `;
    const list = document.createElement('div');
    list.className = 'host-answer-list';
    round.questions.forEach((qObj, i) => {
      const item = document.createElement('div');
      item.className = 'host-answer-item';
      item.innerHTML = `
        <div class="host-answer-num">${i + 1}</div>
        <div class="host-answer-q">${qObj.question}</div>
        <div class="host-answer-a">${qObj.displayOptions[qObj.displayAnswer]}</div>
      `;
      list.appendChild(item);
    });
    section.appendChild(list);
    container.appendChild(section);
  });

  $('copy-all-confirm').style.display = 'none';
  showScreen('screen-host-final');
}

function initHostFinal() {
  $('btn-copy-all-answers').addEventListener('click', () => {
    const lines = state.rounds.map((round, ri) => {
      const qs = round.questions.map((q, i) =>
        `  ${i + 1}. ${q.question}\n     ✓ ${q.displayOptions[q.displayAnswer]}`
      ).join('\n\n');
      return `ROUND ${ri + 1} — ${round.category}\n\n${qs}`;
    }).join('\n\n' + '─'.repeat(40) + '\n\n');
    copyToClipboard(`🎤 The Brass Lantern – Full Answer Sheet\n\n${lines}`, 'copy-all-confirm');
  });

  $('btn-host-play-again').addEventListener('click', () => {
    resetSetup();
    showScreen('screen-setup');
  });
}

function copyToClipboard(text, confirmId) {
  const confirm = $(confirmId);
  const done = () => {
    confirm.style.display = 'block';
    setTimeout(() => confirm.style.display = 'none', 3000);
  };
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(done);
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    done();
  }
}

// ── Init ─────────────────────────────────────────────────────
function init() {
  initHome();
  initSetup();
  initNextButton();
  initRoundSummary();
  initResults();
  initHostAnswerSheet();
  initHostFinal();

  // Verify questions loaded
  if (typeof QUESTIONS === 'undefined' || !QUESTIONS.length) {
    console.error('questions.js failed to load or is empty!');
  } else {
    console.log(`Loaded ${QUESTIONS.length} questions across ${[...new Set(QUESTIONS.map(q=>q.category))].length} categories.`);
  }
}

document.addEventListener('DOMContentLoaded', init);
