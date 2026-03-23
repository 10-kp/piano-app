/**
 * Piano Master - Pitch Detection Engine
 * Uses Web Audio API + autocorrelation to detect piano notes via microphone
 */
(function () {
  'use strict';

  const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const MIN_RMS = 0.01;
  const BUFFER_SIZE = 4096;

  const PitchDetector = {
    audioContext: null,
    analyser: null,
    mediaStream: null,
    sourceNode: null,
    buffer: null,
    isListening: false,

    async init() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!this.audioContext) {
        this.audioContext = new AC();
      }
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = BUFFER_SIZE;
      this.analyser.minDecibels = -90;
      this.analyser.maxDecibels = -10;
      this.analyser.smoothingTimeConstant = 0.85;
      this.buffer = new Float32Array(BUFFER_SIZE);
    },

    async startMicrophone() {
      if (this.isListening) return;
      if (!this.audioContext) await this.init();

      try {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false
          }
        });
        this.sourceNode = this.audioContext.createMediaStreamSource(this.mediaStream);
        this.sourceNode.connect(this.analyser);
        this.isListening = true;
      } catch (err) {
        console.error('Microphone access denied:', err);
        throw new Error('Microphone access is required. Please allow microphone access and try again.');
      }
    },

    stopMicrophone() {
      if (this.sourceNode) {
        this.sourceNode.disconnect();
        this.sourceNode = null;
      }
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach(t => t.stop());
        this.mediaStream = null;
      }
      this.isListening = false;
    },

    detectPitch() {
      if (!this.isListening || !this.analyser) return null;

      this.analyser.getFloatTimeDomainData(this.buffer);

      // Check if signal is loud enough
      let rms = 0;
      for (let i = 0; i < this.buffer.length; i++) {
        rms += this.buffer[i] * this.buffer[i];
      }
      rms = Math.sqrt(rms / this.buffer.length);
      if (rms < MIN_RMS) return null;

      const frequency = this.autocorrelate(this.buffer, this.audioContext.sampleRate);
      if (frequency === -1) return null;

      // Piano range: A0 (27.5 Hz) to C8 (4186 Hz)
      if (frequency < 25 || frequency > 4500) return null;

      const midiNote = this.frequencyToMidi(frequency);
      const noteName = this.midiToNoteName(midiNote);
      const octave = Math.floor(midiNote / 12) - 1;
      const cents = this.getCentsOff(frequency, midiNote);

      return { frequency, midiNote, noteName, octave, cents, fullName: noteName + octave };
    },

    autocorrelate(buffer, sampleRate) {
      const size = buffer.length;
      const halfSize = Math.floor(size / 2);

      // Trim leading/trailing quiet samples
      let start = 0;
      let end = size - 1;
      const threshold = 0.2;
      while (start < halfSize && Math.abs(buffer[start]) < threshold) start++;
      while (end > halfSize && Math.abs(buffer[end]) < threshold) end--;

      if (end - start < halfSize) {
        // Not enough signal after trimming
        const trimmed = buffer;
        return this._correlate(trimmed, size, sampleRate);
      }

      const trimmed = buffer.slice(start, end + 1);
      return this._correlate(trimmed, trimmed.length, sampleRate);
    },

    _correlate(buf, len, sampleRate) {
      const correlations = new Float32Array(Math.floor(len / 2));

      for (let offset = 1; offset < correlations.length; offset++) {
        let sum = 0;
        for (let j = 0; j < correlations.length; j++) {
          sum += buf[j] * buf[j + offset];
        }
        correlations[offset] = sum;
      }

      // Find the first zero crossing
      let zeroCrossing = 1;
      while (zeroCrossing < correlations.length && correlations[zeroCrossing] > 0) {
        zeroCrossing++;
      }

      if (zeroCrossing >= correlations.length) return -1;

      // Find the first peak after zero crossing
      let peakIdx = zeroCrossing;
      let peakVal = -Infinity;
      for (let i = zeroCrossing; i < correlations.length; i++) {
        if (correlations[i] > peakVal) {
          peakVal = correlations[i];
          peakIdx = i;
        }
        // Stop searching after we pass the peak and start declining significantly
        if (correlations[i] < peakVal * 0.8 && peakVal > 0) break;
      }

      if (peakVal <= 0) return -1;

      // Parabolic interpolation for sub-sample accuracy
      let shift = 0;
      if (peakIdx > 0 && peakIdx < correlations.length - 1) {
        const prev = correlations[peakIdx - 1];
        const curr = correlations[peakIdx];
        const next = correlations[peakIdx + 1];
        const denom = 2 * (2 * curr - prev - next);
        if (denom !== 0) {
          shift = (next - prev) / denom;
        }
      }

      return sampleRate / (peakIdx + shift);
    },

    frequencyToMidi(freq) {
      return Math.round(12 * Math.log2(freq / 440) + 69);
    },

    midiToNoteName(midi) {
      return NOTE_NAMES[((midi % 12) + 12) % 12];
    },

    getCentsOff(frequency, targetMidi) {
      const targetFreq = 440 * Math.pow(2, (targetMidi - 69) / 12);
      return Math.round(1200 * Math.log2(frequency / targetFreq));
    },

    getAudioContext() {
      return this.audioContext;
    }
  };

  window.PianoApp = window.PianoApp || {};
  window.PianoApp.PitchDetector = PitchDetector;
})();
