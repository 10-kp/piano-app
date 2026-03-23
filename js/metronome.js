/**
 * Piano Master - Metronome
 * Precise AudioContext-based metronome with lookahead scheduling
 */
(function () {
  'use strict';

  const SCHEDULE_AHEAD_TIME = 0.1; // seconds
  const LOOKAHEAD_MS = 25; // milliseconds

  const Metronome = {
    bpm: 120,
    beatsPerMeasure: 4,
    isPlaying: false,
    currentBeat: 0,
    nextNoteTime: 0,
    timerID: null,
    audioContext: null,
    onBeat: null, // callback(beatNumber, time)

    init(audioContext) {
      this.audioContext = audioContext;
    },

    start(bpm, onBeat) {
      if (bpm) this.bpm = bpm;
      if (onBeat) this.onBeat = onBeat;
      if (!this.audioContext) {
        const AC = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AC();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      this.isPlaying = true;
      this.currentBeat = 0;
      this.nextNoteTime = this.audioContext.currentTime + 0.05;
      this._schedule();
      this.timerID = setInterval(() => this._schedule(), LOOKAHEAD_MS);
    },

    stop() {
      this.isPlaying = false;
      if (this.timerID) {
        clearInterval(this.timerID);
        this.timerID = null;
      }
      this.currentBeat = 0;
    },

    setBpm(bpm) {
      this.bpm = Math.max(40, Math.min(208, bpm));
    },

    setBeatsPerMeasure(beats) {
      this.beatsPerMeasure = beats;
    },

    _schedule() {
      while (this.nextNoteTime < this.audioContext.currentTime + SCHEDULE_AHEAD_TIME) {
        this._playClick(this.nextNoteTime, this.currentBeat);
        if (this.onBeat) {
          this.onBeat(this.currentBeat, this.nextNoteTime);
        }
        this._advance();
      }
    },

    _advance() {
      const secondsPerBeat = 60.0 / this.bpm;
      this.nextNoteTime += secondsPerBeat;
      this.currentBeat = (this.currentBeat + 1) % this.beatsPerMeasure;
    },

    _playClick(time, beat) {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      // Accent on beat 1
      const isAccent = beat === 0;
      osc.frequency.value = isAccent ? 880 : 440;
      gain.gain.value = isAccent ? 0.6 : 0.3;

      // Sharp attack, quick decay
      gain.gain.setValueAtTime(gain.gain.value, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

      osc.start(time);
      osc.stop(time + 0.05);
    },

    // Tap tempo: call this on each tap
    _tapTimes: [],
    tapTempo() {
      const now = performance.now();
      this._tapTimes.push(now);

      // Keep only last 5 taps
      if (this._tapTimes.length > 5) {
        this._tapTimes.shift();
      }

      if (this._tapTimes.length < 2) return this.bpm;

      // Average interval between taps
      let totalInterval = 0;
      for (let i = 1; i < this._tapTimes.length; i++) {
        totalInterval += this._tapTimes[i] - this._tapTimes[i - 1];
      }
      const avgInterval = totalInterval / (this._tapTimes.length - 1);
      const newBpm = Math.round(60000 / avgInterval);
      this.bpm = Math.max(40, Math.min(208, newBpm));

      // Reset if gap > 2 seconds
      if (this._tapTimes.length >= 2) {
        const lastGap = this._tapTimes[this._tapTimes.length - 1] - this._tapTimes[this._tapTimes.length - 2];
        if (lastGap > 2000) {
          this._tapTimes = [now];
        }
      }

      return this.bpm;
    }
  };

  window.PianoApp = window.PianoApp || {};
  window.PianoApp.Metronome = Metronome;
})();
