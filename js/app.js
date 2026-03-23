/**
 * Piano Master - Main Application
 * Router, UI orchestration, play-along integration
 */
(function () {
  'use strict';

  const App = {
    currentPage: 'home',
    visualObj: null,
    timingCallbacks: null,
    isPlayingAlong: false,
    expectedNotes: [],
    playAlongStats: { total: 0, correct: 0, incorrect: 0, missed: 0 },
    detectionLoop: null,
    practiceStartTime: null,
    wakeLock: null,

    init() {
      PianoApp.Progress.load();

      // Apply saved theme
      const theme = PianoApp.Progress.getSetting('theme') || 'light';
      document.documentElement.setAttribute('data-theme', theme);

      // Set up navigation
      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const page = btn.dataset.page;
          if (page) window.location.hash = page;
        });
      });

      // Router
      window.addEventListener('hashchange', () => this.route());

      // Initial route
      this.route();

      // Track practice time
      this.practiceStartTime = Date.now();
      window.addEventListener('beforeunload', () => {
        const minutes = Math.round((Date.now() - this.practiceStartTime) / 60000);
        if (minutes > 0) PianoApp.Progress.logPracticeTime(minutes);
      });

      // Visibility change — log practice when app goes to background
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && this.practiceStartTime) {
          const minutes = Math.round((Date.now() - this.practiceStartTime) / 60000);
          if (minutes > 0) {
            PianoApp.Progress.logPracticeTime(minutes);
            this.practiceStartTime = Date.now();
          }
        }
      });
    },

    route() {
      const hash = window.location.hash.slice(1) || 'home';
      const parts = hash.split('/');
      const page = parts[0];
      const param = parts[1];

      // Hide all pages
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

      // Update nav
      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === page ||
          (btn.dataset.page === 'curriculum' && (page === 'lesson' || page === 'grade')));
      });

      // Stop any active play-along
      if (this.isPlayingAlong) this.stopPlayAlong();

      switch (page) {
        case 'home':
          this.renderHome();
          break;
        case 'curriculum':
          this.renderCurriculum();
          break;
        case 'grade':
          this.renderGrade(param);
          break;
        case 'lesson':
          this.renderLesson(param);
          break;
        case 'songs':
          this.renderSongs();
          break;
        case 'song':
          this.renderSongDetail(param);
          break;
        case 'practice':
          this.renderPractice();
          break;
        case 'settings':
          this.renderSettings();
          break;
        default:
          this.renderHome();
      }
    },

    showPage(id) {
      const page = document.getElementById('page-' + id);
      if (page) page.classList.add('active');
    },

    // ─── HOME ───────────────────────────────────────────────
    renderHome() {
      this.showPage('home');
      const stats = PianoApp.Progress.getStats();
      const container = document.getElementById('home-content');

      const currentGrade = PianoApp.Curriculum.grades.find(g => g.id === stats.currentGrade);
      const gradeProgress = PianoApp.Progress.getGradeProgress(stats.currentGrade);

      container.innerHTML = `
        <div class="welcome-card">
          <h2>Welcome back!</h2>
          <div class="stats-row">
            <div class="stat-box">
              <span class="stat-number">${stats.streakDays}</span>
              <span class="stat-label">Day Streak</span>
            </div>
            <div class="stat-box">
              <span class="stat-number">${Math.round(stats.totalPracticeMinutes)}</span>
              <span class="stat-label">Minutes Practiced</span>
            </div>
            <div class="stat-box">
              <span class="stat-number">${stats.totalLessonsCompleted}</span>
              <span class="stat-label">Lessons Done</span>
            </div>
            <div class="stat-box">
              <span class="stat-number">${stats.avgAccuracy}%</span>
              <span class="stat-label">Avg Accuracy</span>
            </div>
          </div>
        </div>

        <div class="current-grade-card">
          <h3>Current Level: ${currentGrade ? currentGrade.name : 'Grade 4'}</h3>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${gradeProgress.percentage}%"></div>
          </div>
          <p class="progress-text">${gradeProgress.completed} / ${gradeProgress.total} exercises completed (${gradeProgress.percentage}%)</p>
          <button class="btn btn-primary" onclick="window.location.hash='grade/${stats.currentGrade}'">
            Continue Learning
          </button>
        </div>

        <div class="quick-actions">
          <button class="btn btn-secondary" onclick="window.location.hash='practice'">
            <span class="btn-icon">&#9835;</span> Free Practice
          </button>
          <button class="btn btn-secondary" onclick="window.location.hash='songs'">
            <span class="btn-icon">&#9836;</span> Song Library
          </button>
        </div>
      `;
    },

    // ─── CURRICULUM ─────────────────────────────────────────
    renderCurriculum() {
      this.showPage('curriculum');
      const container = document.getElementById('curriculum-content');

      let html = '<h2>Curriculum</h2><div class="grade-list">';

      PianoApp.Curriculum.grades.forEach(grade => {
        const progress = PianoApp.Progress.getGradeProgress(grade.id);
        const unlocked = PianoApp.Progress.isGradeUnlocked(grade.id);

        html += `
          <div class="grade-card ${unlocked ? '' : 'locked'}"
               ${unlocked ? `onclick="window.location.hash='grade/${grade.id}'"` : ''}>
            <div class="grade-header">
              <h3>${grade.name}</h3>
              ${!unlocked ? '<span class="lock-icon">&#128274;</span>' : ''}
            </div>
            <p class="grade-desc">${grade.description}</p>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: ${progress.percentage}%"></div>
            </div>
            <p class="progress-text">${progress.completed}/${progress.total} (${progress.percentage}%)</p>
          </div>
        `;
      });

      html += '</div>';
      container.innerHTML = html;
    },

    // ─── GRADE DETAIL ───────────────────────────────────────
    renderGrade(gradeId) {
      this.showPage('grade');
      const container = document.getElementById('grade-content');
      const grade = PianoApp.Curriculum.grades.find(g => g.id === gradeId);

      if (!grade) {
        container.innerHTML = '<p>Grade not found.</p>';
        return;
      }

      let html = `
        <button class="btn-back" onclick="window.location.hash='curriculum'">&larr; Back</button>
        <h2>${grade.name}</h2>
        <p>${grade.description}</p>
        <div class="lesson-list">
      `;

      grade.lessons.forEach(lesson => {
        const typeIcon = { scales: '&#127932;', arpeggios: '&#127929;', 'sight-reading': '&#128065;', piece: '&#127926;' }[lesson.type] || '';

        html += `
          <div class="lesson-card">
            <div class="lesson-header">
              <span class="lesson-icon">${typeIcon}</span>
              <h4>${lesson.title}</h4>
            </div>
            <p class="lesson-desc">${lesson.description}</p>
            <div class="exercise-list">
        `;

        lesson.exercises.forEach((ex, idx) => {
          const result = PianoApp.Progress.getLessonResult(ex.id);
          const stars = result ? '&#9733;'.repeat(result.stars) + '&#9734;'.repeat(3 - result.stars) : '&#9734;&#9734;&#9734;';
          const statusClass = result && result.completed ? 'completed' : '';

          html += `
            <div class="exercise-item ${statusClass}" onclick="window.location.hash='lesson/${ex.id}'">
              <span class="exercise-title">${ex.title}</span>
              <span class="exercise-stars">${stars}</span>
              ${result ? `<span class="exercise-accuracy">${result.bestAccuracy}%</span>` : ''}
            </div>
          `;
        });

        html += '</div></div>';
      });

      html += '</div>';
      container.innerHTML = html;
    },

    // ─── LESSON (PLAY-ALONG) ────────────────────────────────
    renderLesson(exerciseId) {
      this.showPage('lesson');
      const container = document.getElementById('lesson-content');

      // Find the exercise in curriculum
      let exercise = null;
      let parentLesson = null;
      for (const grade of PianoApp.Curriculum.grades) {
        for (const lesson of grade.lessons) {
          const found = lesson.exercises.find(e => e.id === exerciseId);
          if (found) {
            exercise = found;
            parentLesson = lesson;
            break;
          }
        }
        if (exercise) break;
      }

      // Also check songs
      let songData = null;
      if (exercise && exercise.songRef) {
        songData = PianoApp.Songs.find(s => s.id === exercise.songRef);
      }
      if (!exercise) {
        songData = PianoApp.Songs.find(s => s.id === exerciseId);
        if (songData) {
          exercise = { id: songData.id, title: songData.title, abc: songData.abc, bpm: 100 };
        }
      }

      if (!exercise) {
        container.innerHTML = '<p>Exercise not found.</p>';
        return;
      }

      const abcString = exercise.abc || (songData ? songData.abc : '');
      if (!abcString) {
        container.innerHTML = '<p>No sheet music available for this exercise.</p>';
        return;
      }

      container.innerHTML = `
        <button class="btn-back" onclick="history.back()">&larr; Back</button>
        <h3>${exercise.title}</h3>
        <div id="sheet-music"></div>
        <div id="play-along-bar">
          <div id="feedback-display">
            <span id="detected-note" class="note-display">--</span>
            <span id="accuracy-display">Accuracy: --%</span>
          </div>
          <div id="play-controls">
            <button id="btn-play" class="btn btn-primary" onclick="PianoApp.App.startPlayAlong('${exerciseId}', ${exercise.bpm || 100})">
              &#9654; Play Along
            </button>
            <button id="btn-stop" class="btn btn-danger" style="display:none" onclick="PianoApp.App.stopPlayAlong()">
              &#9632; Stop
            </button>
            <label class="tempo-label">
              BPM: <input type="range" id="tempo-slider" min="40" max="200" value="${exercise.bpm || 100}"
                     oninput="document.getElementById('tempo-value').textContent=this.value">
              <span id="tempo-value">${exercise.bpm || 100}</span>
            </label>
          </div>
        </div>
      `;

      // Render sheet music
      try {
        this.visualObj = ABCJS.renderAbc('sheet-music', abcString, {
          add_classes: true,
          responsive: 'resize',
          staffwidth: 700,
          paddingtop: 10,
          paddingbottom: 10
        });
      } catch (e) {
        console.error('ABC render error:', e);
        document.getElementById('sheet-music').innerHTML = '<p class="error">Error rendering sheet music.</p>';
      }
    },

    async startPlayAlong(exerciseId, bpm) {
      const tempoSlider = document.getElementById('tempo-slider');
      const actualBpm = tempoSlider ? parseInt(tempoSlider.value) : bpm;

      // Request wake lock to keep screen on
      this.requestWakeLock();

      // Initialize pitch detector
      try {
        await PianoApp.PitchDetector.init();
        await PianoApp.PitchDetector.startMicrophone();
      } catch (e) {
        alert(e.message || 'Could not access microphone. Please allow microphone access.');
        return;
      }

      this.isPlayingAlong = true;
      this.playAlongStats = { total: 0, correct: 0, incorrect: 0, missed: 0 };
      this.expectedNotes = [];

      document.getElementById('btn-play').style.display = 'none';
      document.getElementById('btn-stop').style.display = 'inline-block';

      // Set up timing callbacks from abcjs
      if (this.visualObj && this.visualObj[0]) {
        this.timingCallbacks = new ABCJS.TimingCallbacks(this.visualObj[0], {
          qpm: actualBpm,
          extraMeasuresAtBeginning: 1,
          eventCallback: (event) => this.onNoteEvent(event),
          beatCallback: (beatNumber, totalBeats, totalTime) => {
            // Could add visual beat indicator here
          }
        });
        this.timingCallbacks.start();
      }

      // Start pitch detection loop
      this.runDetectionLoop();
    },

    stopPlayAlong() {
      this.isPlayingAlong = false;

      if (this.timingCallbacks) {
        this.timingCallbacks.stop();
        this.timingCallbacks = null;
      }

      if (this.detectionLoop) {
        cancelAnimationFrame(this.detectionLoop);
        this.detectionLoop = null;
      }

      PianoApp.PitchDetector.stopMicrophone();
      this.releaseWakeLock();

      document.getElementById('btn-play').style.display = 'inline-block';
      document.getElementById('btn-stop').style.display = 'none';

      // Remove highlights
      document.querySelectorAll('.abcjs-note.correct, .abcjs-note.incorrect').forEach(el => {
        el.classList.remove('correct', 'incorrect');
      });

      // Show results
      this.showResults();
    },

    onNoteEvent(event) {
      if (!event) {
        // End of piece
        setTimeout(() => this.stopPlayAlong(), 500);
        return;
      }

      // Clear previous highlights
      document.querySelectorAll('.abcjs-note.correct, .abcjs-note.incorrect, .abcjs-note_selected').forEach(el => {
        el.classList.remove('correct', 'incorrect', 'abcjs-note_selected');
      });

      // Highlight current position
      if (event.elements) {
        event.elements.forEach(elArr => {
          elArr.forEach(el => el.classList.add('abcjs-note_selected'));
        });
      }

      // Store expected MIDI pitches
      if (event.midiPitches && event.midiPitches.length > 0) {
        this.expectedNotes = event.midiPitches.map(p => p.pitch);
        this.playAlongStats.total += this.expectedNotes.length;
        this._currentElements = event.elements;
        this._noteMatched = false;
      }
    },

    runDetectionLoop() {
      if (!this.isPlayingAlong) return;

      const result = PianoApp.PitchDetector.detectPitch();
      const noteDisplay = document.getElementById('detected-note');
      const accuracyDisplay = document.getElementById('accuracy-display');

      if (result) {
        noteDisplay.textContent = result.fullName;
        noteDisplay.className = 'note-display';

        // Compare with expected notes
        if (this.expectedNotes.length > 0 && !this._noteMatched) {
          const matchIdx = this.expectedNotes.findIndex(expected =>
            Math.abs(result.midiNote - expected) <= 1
          );

          if (matchIdx !== -1) {
            this.playAlongStats.correct++;
            this._noteMatched = true;
            noteDisplay.classList.add('correct');
            // Highlight the note green
            if (this._currentElements) {
              this._currentElements.forEach(elArr => {
                elArr.forEach(el => {
                  el.classList.remove('abcjs-note_selected');
                  el.classList.add('correct');
                });
              });
            }
          } else {
            this.playAlongStats.incorrect++;
            noteDisplay.classList.add('incorrect');
            if (this._currentElements) {
              this._currentElements.forEach(elArr => {
                elArr.forEach(el => {
                  el.classList.add('incorrect');
                });
              });
            }
          }
        }

        // Update accuracy display
        if (this.playAlongStats.total > 0) {
          const accuracy = Math.round((this.playAlongStats.correct / this.playAlongStats.total) * 100);
          accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
        }
      }

      this.detectionLoop = requestAnimationFrame(() => this.runDetectionLoop());
    },

    showResults() {
      const total = this.playAlongStats.total;
      if (total === 0) return;

      const accuracy = Math.round((this.playAlongStats.correct / total) * 100);
      const stars = accuracy >= 95 ? 3 : accuracy >= 80 ? 2 : accuracy >= 60 ? 1 : 0;
      const starStr = '&#9733;'.repeat(stars) + '&#9734;'.repeat(3 - stars);

      // Save result
      const hash = window.location.hash.slice(1);
      const exerciseId = hash.split('/')[1];
      if (exerciseId) {
        PianoApp.Progress.completeLesson(exerciseId, accuracy);
      }

      // Show result overlay
      const overlay = document.createElement('div');
      overlay.className = 'result-overlay';
      overlay.innerHTML = `
        <div class="result-card">
          <h2>Results</h2>
          <div class="result-stars">${starStr}</div>
          <div class="result-accuracy">${accuracy}%</div>
          <p>Correct: ${this.playAlongStats.correct} / ${total}</p>
          <p>${accuracy >= 70 ? 'Great work! Lesson completed!' : 'Keep practicing! You need 70% to complete.'}</p>
          <div class="result-actions">
            <button class="btn btn-primary" onclick="this.closest('.result-overlay').remove(); PianoApp.App.renderLesson('${exerciseId}')">
              Try Again
            </button>
            <button class="btn btn-secondary" onclick="this.closest('.result-overlay').remove(); history.back()">
              Back to Lessons
            </button>
          </div>
        </div>
      `;
      document.getElementById('page-lesson').appendChild(overlay);
    },

    // ─── SONGS ──────────────────────────────────────────────
    renderSongs() {
      this.showPage('songs');
      const container = document.getElementById('songs-content');
      const songs = PianoApp.Songs;
      const customSongs = PianoApp.Progress.getCustomSongs();
      const allSongs = [...songs, ...customSongs];

      let html = `
        <h2>Song Library</h2>
        <div class="song-filters">
          <select id="genre-filter" onchange="PianoApp.App.filterSongs()">
            <option value="all">All Genres</option>
            <option value="classical">Classical</option>
            <option value="custom">My Songs</option>
          </select>
          <select id="difficulty-filter" onchange="PianoApp.App.filterSongs()">
            <option value="all">All Levels</option>
            <option value="4">Grade 4</option>
            <option value="5">Grade 5</option>
            <option value="6">Grade 6</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
          </select>
          <input type="text" id="song-search" placeholder="Search songs..." oninput="PianoApp.App.filterSongs()">
        </div>
        <div id="song-grid" class="song-grid">
      `;

      allSongs.forEach(song => {
        html += this.renderSongCard(song);
      });

      html += `</div>
        <div class="add-song-section">
          <button class="btn btn-secondary" onclick="PianoApp.App.showAddSongModal()">
            + Add Custom Song
          </button>
        </div>
      `;

      container.innerHTML = html;
    },

    renderSongCard(song) {
      return `
        <div class="song-card" data-genre="${song.genre || 'custom'}" data-difficulty="${song.difficulty || 5}"
             onclick="window.location.hash='song/${song.id}'">
          <h4>${song.title}</h4>
          <p class="song-composer">${song.composer || 'Custom'}</p>
          <span class="song-difficulty">Grade ${song.difficulty || '?'}</span>
        </div>
      `;
    },

    filterSongs() {
      const genre = document.getElementById('genre-filter').value;
      const difficulty = document.getElementById('difficulty-filter').value;
      const search = document.getElementById('song-search').value.toLowerCase();

      document.querySelectorAll('.song-card').forEach(card => {
        const matchGenre = genre === 'all' || card.dataset.genre === genre;
        const matchDiff = difficulty === 'all' || card.dataset.difficulty === difficulty;
        const matchSearch = !search || card.textContent.toLowerCase().includes(search);
        card.style.display = (matchGenre && matchDiff && matchSearch) ? '' : 'none';
      });
    },

    renderSongDetail(songId) {
      // Reuse lesson renderer for songs
      this.renderLesson(songId);
    },

    showAddSongModal() {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-card">
          <h3>Add Custom Song</h3>
          <p>Paste ABC notation below. You can find ABC notation for many songs online.</p>
          <input type="text" id="custom-song-title" placeholder="Song title" class="input-field">
          <input type="text" id="custom-song-composer" placeholder="Composer" class="input-field">
          <select id="custom-song-difficulty" class="input-field">
            <option value="4">Grade 4</option>
            <option value="5">Grade 5</option>
            <option value="6">Grade 6</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
          </select>
          <textarea id="custom-song-abc" rows="10" placeholder="X:1&#10;T:Song Title&#10;M:4/4&#10;L:1/8&#10;K:C&#10;CDEF GABc|..." class="input-field"></textarea>
          <div class="modal-actions">
            <button class="btn btn-primary" onclick="PianoApp.App.saveCustomSong()">Save</button>
            <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    },

    saveCustomSong() {
      const title = document.getElementById('custom-song-title').value.trim();
      const composer = document.getElementById('custom-song-composer').value.trim();
      const difficulty = parseInt(document.getElementById('custom-song-difficulty').value);
      const abc = document.getElementById('custom-song-abc').value.trim();

      if (!title || !abc) {
        alert('Please enter a title and ABC notation.');
        return;
      }

      PianoApp.Progress.addCustomSong({
        title,
        composer: composer || 'Unknown',
        genre: 'custom',
        difficulty,
        abc
      });

      document.querySelector('.modal-overlay').remove();
      this.renderSongs();
    },

    // ─── FREE PRACTICE ──────────────────────────────────────
    renderPractice() {
      this.showPage('practice');
      const container = document.getElementById('practice-content');
      const savedBpm = PianoApp.Progress.getSetting('metronomeBpm') || 120;

      container.innerHTML = `
        <h2>Practice Tools</h2>

        <div class="practice-section">
          <h3>Note Detector</h3>
          <p>Play a note on your piano and see what it is!</p>
          <div id="live-note-display" class="live-note-display">
            <span class="big-note">--</span>
            <span class="note-octave"></span>
            <span class="note-cents"></span>
          </div>
          <button id="btn-start-listening" class="btn btn-primary" onclick="PianoApp.App.toggleListening()">
            Start Listening
          </button>
        </div>

        <div class="practice-section">
          <h3>Metronome</h3>
          <div class="metronome-display">
            <div id="metronome-bpm" class="metronome-bpm">${savedBpm}</div>
            <span class="metronome-label">BPM</span>
          </div>
          <input type="range" id="metronome-slider" min="40" max="208" value="${savedBpm}"
                 class="metronome-slider"
                 oninput="PianoApp.App.updateMetronomeBpm(this.value)">
          <div class="metronome-controls">
            <button class="btn btn-secondary" onclick="PianoApp.App.tapTempo()">Tap Tempo</button>
            <button id="btn-metronome" class="btn btn-primary" onclick="PianoApp.App.toggleMetronome()">
              Start
            </button>
            <select id="time-sig" class="input-field" onchange="PianoApp.App.updateTimeSig(this.value)">
              <option value="4">4/4</option>
              <option value="3">3/4</option>
              <option value="6">6/8</option>
              <option value="2">2/4</option>
            </select>
          </div>
          <div id="beat-indicators" class="beat-indicators">
            <span class="beat-dot"></span>
            <span class="beat-dot"></span>
            <span class="beat-dot"></span>
            <span class="beat-dot"></span>
          </div>
        </div>
      `;
    },

    _listeningLoop: null,
    _isListening: false,

    async toggleListening() {
      const btn = document.getElementById('btn-start-listening');
      if (this._isListening) {
        this._isListening = false;
        PianoApp.PitchDetector.stopMicrophone();
        if (this._listeningLoop) cancelAnimationFrame(this._listeningLoop);
        btn.textContent = 'Start Listening';
        btn.classList.remove('btn-danger');
        btn.classList.add('btn-primary');
        return;
      }

      try {
        await PianoApp.PitchDetector.init();
        await PianoApp.PitchDetector.startMicrophone();
        this._isListening = true;
        btn.textContent = 'Stop Listening';
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-danger');
        this.requestWakeLock();
        this._runListeningLoop();
      } catch (e) {
        alert(e.message || 'Could not access microphone.');
      }
    },

    _runListeningLoop() {
      if (!this._isListening) return;

      const result = PianoApp.PitchDetector.detectPitch();
      const display = document.getElementById('live-note-display');
      if (!display) return;

      if (result) {
        display.querySelector('.big-note').textContent = result.noteName;
        display.querySelector('.note-octave').textContent = result.octave;
        const centsEl = display.querySelector('.note-cents');
        centsEl.textContent = (result.cents >= 0 ? '+' : '') + result.cents + ' cents';
        centsEl.className = 'note-cents ' + (Math.abs(result.cents) <= 10 ? 'in-tune' : 'out-of-tune');
        display.className = 'live-note-display active';
      }

      this._listeningLoop = requestAnimationFrame(() => this._runListeningLoop());
    },

    _metronomeRunning: false,

    toggleMetronome() {
      const btn = document.getElementById('btn-metronome');
      if (this._metronomeRunning) {
        PianoApp.Metronome.stop();
        this._metronomeRunning = false;
        btn.textContent = 'Start';
        btn.classList.remove('btn-danger');
        btn.classList.add('btn-primary');
        document.querySelectorAll('.beat-dot').forEach(d => d.classList.remove('active'));
      } else {
        const bpm = parseInt(document.getElementById('metronome-slider').value);
        const audioCtx = PianoApp.PitchDetector.getAudioContext();
        if (audioCtx) PianoApp.Metronome.init(audioCtx);
        PianoApp.Metronome.start(bpm, (beatNum) => {
          const dots = document.querySelectorAll('.beat-dot');
          dots.forEach((d, i) => d.classList.toggle('active', i === beatNum));
        });
        this._metronomeRunning = true;
        btn.textContent = 'Stop';
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-danger');
      }
    },

    updateMetronomeBpm(val) {
      const bpm = parseInt(val);
      document.getElementById('metronome-bpm').textContent = bpm;
      PianoApp.Metronome.setBpm(bpm);
      PianoApp.Progress.setSetting('metronomeBpm', bpm);
    },

    updateTimeSig(beats) {
      const num = parseInt(beats);
      PianoApp.Metronome.setBeatsPerMeasure(num);
      const container = document.getElementById('beat-indicators');
      container.innerHTML = '';
      for (let i = 0; i < num; i++) {
        container.innerHTML += '<span class="beat-dot"></span>';
      }
    },

    tapTempo() {
      const bpm = PianoApp.Metronome.tapTempo();
      document.getElementById('metronome-bpm').textContent = bpm;
      document.getElementById('metronome-slider').value = bpm;
      PianoApp.Progress.setSetting('metronomeBpm', bpm);
    },

    // ─── SETTINGS ───────────────────────────────────────────
    renderSettings() {
      this.showPage('settings');
      const container = document.getElementById('settings-content');
      const theme = PianoApp.Progress.getSetting('theme') || 'light';

      container.innerHTML = `
        <h2>Settings</h2>

        <div class="settings-section">
          <h3>Appearance</h3>
          <div class="setting-row">
            <span>Theme</span>
            <button class="btn btn-secondary" onclick="PianoApp.App.toggleTheme()">
              ${theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            </button>
          </div>
        </div>

        <div class="settings-section">
          <h3>Microphone Test</h3>
          <p>Test that your iPad can hear the piano.</p>
          <button class="btn btn-primary" onclick="PianoApp.App.testMicrophone()">Test Microphone</button>
          <div id="mic-test-result"></div>
        </div>

        <div class="settings-section">
          <h3>Data</h3>
          <div class="setting-row">
            <span>Export progress</span>
            <button class="btn btn-secondary" onclick="PianoApp.App.exportProgress()">Export</button>
          </div>
          <div class="setting-row">
            <span>Import progress</span>
            <input type="file" id="import-file" accept=".json" onchange="PianoApp.App.importProgress(event)" class="input-field">
          </div>
          <div class="setting-row">
            <span>Reset all progress</span>
            <button class="btn btn-danger" onclick="PianoApp.App.resetProgress()">Reset</button>
          </div>
        </div>

        <div class="settings-section about">
          <h3>About</h3>
          <p><strong>Piano Master</strong> v1.0</p>
          <p>A personalized piano learning app. Place your iPad near your grand piano, allow microphone access, and start learning!</p>
          <p><em>Tip: For best pitch detection, play one note at a time in a quiet room.</em></p>
        </div>
      `;
    },

    toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      PianoApp.Progress.setSetting('theme', next);
      this.renderSettings();
    },

    async testMicrophone() {
      const result = document.getElementById('mic-test-result');
      try {
        await PianoApp.PitchDetector.init();
        await PianoApp.PitchDetector.startMicrophone();
        result.innerHTML = '<p class="success">Microphone is working! Play a note on the piano...</p>';

        let attempts = 0;
        const check = () => {
          const note = PianoApp.PitchDetector.detectPitch();
          if (note) {
            result.innerHTML = `<p class="success">Detected: ${note.fullName} (${Math.round(note.frequency)} Hz) - Microphone working perfectly!</p>`;
            PianoApp.PitchDetector.stopMicrophone();
          } else if (attempts < 300) {
            attempts++;
            requestAnimationFrame(check);
          } else {
            result.innerHTML = '<p class="warning">No notes detected. Try moving the iPad closer to the piano.</p>';
            PianoApp.PitchDetector.stopMicrophone();
          }
        };
        requestAnimationFrame(check);
      } catch (e) {
        result.innerHTML = `<p class="error">Microphone access denied. Please enable in iPad Settings > Safari > Microphone.</p>`;
      }
    },

    exportProgress() {
      const data = PianoApp.Progress.exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'piano-master-progress.json';
      a.click();
      URL.revokeObjectURL(url);
    },

    importProgress(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (PianoApp.Progress.importData(e.target.result)) {
          alert('Progress imported successfully!');
          this.renderSettings();
        } else {
          alert('Invalid file. Please select a valid Piano Master export file.');
        }
      };
      reader.readAsText(file);
    },

    resetProgress() {
      if (confirm('Are you sure? This will delete all your progress, scores, and custom songs. This cannot be undone.')) {
        PianoApp.Progress.resetAll();
        alert('Progress has been reset.');
        window.location.hash = 'home';
      }
    },

    // ─── UTILITIES ──────────────────────────────────────────
    async requestWakeLock() {
      try {
        if ('wakeLock' in navigator) {
          this.wakeLock = await navigator.wakeLock.request('screen');
        }
      } catch (e) {
        // Wake lock not supported or denied — not critical
      }
    },

    releaseWakeLock() {
      if (this.wakeLock) {
        this.wakeLock.release();
        this.wakeLock = null;
      }
    }
  };

  window.PianoApp = window.PianoApp || {};
  window.PianoApp.App = App;

  // Boot the app when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }
})();
