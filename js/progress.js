/**
 * Piano Master - Progress Tracking
 * localStorage-based persistence for lessons, scores, streaks, and practice time
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'pianoMasterProgress';

  const Progress = {
    _data: null,

    getDefaultData() {
      return {
        currentGrade: 'grade4',
        lessons: {},
        settings: { theme: 'light', metronomeBpm: 120 },
        streakDays: 0,
        lastPracticeDate: null,
        totalPracticeMinutes: 0,
        dailyLog: [],
        customSongs: []
      };
    },

    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          this._data = JSON.parse(raw);
        } else {
          this._data = this.getDefaultData();
          this.save();
        }
      } catch (e) {
        console.warn('Failed to load progress, resetting:', e);
        this._data = this.getDefaultData();
      }
      return this._data;
    },

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._data));
      } catch (e) {
        console.error('Failed to save progress:', e);
      }
    },

    getData() {
      if (!this._data) this.load();
      return this._data;
    },

    getLessonResult(lessonId) {
      const data = this.getData();
      return data.lessons[lessonId] || null;
    },

    completeLesson(lessonId, accuracy) {
      const data = this.getData();
      const existing = data.lessons[lessonId];

      if (!existing || accuracy > existing.bestAccuracy) {
        data.lessons[lessonId] = {
          completed: accuracy >= 70,
          bestAccuracy: existing ? Math.max(existing.bestAccuracy, accuracy) : accuracy,
          lastAccuracy: accuracy,
          attempts: (existing ? existing.attempts : 0) + 1,
          lastPracticed: new Date().toISOString(),
          stars: accuracy >= 95 ? 3 : accuracy >= 80 ? 2 : accuracy >= 60 ? 1 : 0
        };
      } else {
        data.lessons[lessonId].attempts += 1;
        data.lessons[lessonId].lastAccuracy = accuracy;
        data.lessons[lessonId].lastPracticed = new Date().toISOString();
      }

      this.save();
      return data.lessons[lessonId];
    },

    isLessonCompleted(lessonId) {
      const result = this.getLessonResult(lessonId);
      return result ? result.completed : false;
    },

    getGradeProgress(gradeId) {
      const data = this.getData();
      const curriculum = window.PianoApp.Curriculum;
      if (!curriculum) return { completed: 0, total: 0, percentage: 0 };

      const grade = curriculum.grades.find(g => g.id === gradeId);
      if (!grade) return { completed: 0, total: 0, percentage: 0 };

      let total = 0;
      let completed = 0;
      grade.lessons.forEach(lesson => {
        lesson.exercises.forEach(ex => {
          total++;
          if (this.isLessonCompleted(ex.id)) completed++;
        });
      });

      return {
        completed,
        total,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0
      };
    },

    isGradeUnlocked(gradeId) {
      const curriculum = window.PianoApp.Curriculum;
      if (!curriculum) return false;

      const gradeIndex = curriculum.grades.findIndex(g => g.id === gradeId);
      if (gradeIndex <= 0) return true; // First grade always unlocked

      const prevGrade = curriculum.grades[gradeIndex - 1];
      const progress = this.getGradeProgress(prevGrade.id);
      return progress.percentage >= 80;
    },

    logPracticeTime(minutes) {
      const data = this.getData();
      const today = new Date().toISOString().split('T')[0];

      data.totalPracticeMinutes += minutes;

      // Update streak
      if (data.lastPracticeDate) {
        const lastDate = new Date(data.lastPracticeDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          data.streakDays++;
        } else if (diffDays > 1) {
          data.streakDays = 1;
        }
        // Same day: streak stays the same
      } else {
        data.streakDays = 1;
      }

      data.lastPracticeDate = today;

      // Daily log
      const existingLog = data.dailyLog.find(d => d.date === today);
      if (existingLog) {
        existingLog.minutes += minutes;
      } else {
        data.dailyLog.push({ date: today, minutes });
        // Keep only last 30 days
        if (data.dailyLog.length > 30) data.dailyLog.shift();
      }

      this.save();
    },

    getStats() {
      const data = this.getData();
      const totalLessonsCompleted = Object.values(data.lessons).filter(l => l.completed).length;
      const avgAccuracy = Object.values(data.lessons).length > 0
        ? Math.round(Object.values(data.lessons).reduce((sum, l) => sum + l.bestAccuracy, 0) / Object.values(data.lessons).length)
        : 0;

      return {
        currentGrade: data.currentGrade,
        streakDays: data.streakDays,
        totalPracticeMinutes: data.totalPracticeMinutes,
        totalLessonsCompleted,
        avgAccuracy
      };
    },

    getSetting(key) {
      const data = this.getData();
      return data.settings[key];
    },

    setSetting(key, value) {
      const data = this.getData();
      data.settings[key] = value;
      this.save();
    },

    addCustomSong(song) {
      const data = this.getData();
      song.id = 'custom-' + Date.now();
      data.customSongs.push(song);
      this.save();
      return song;
    },

    getCustomSongs() {
      return this.getData().customSongs || [];
    },

    removeCustomSong(songId) {
      const data = this.getData();
      data.customSongs = data.customSongs.filter(s => s.id !== songId);
      this.save();
    },

    exportData() {
      return JSON.stringify(this.getData(), null, 2);
    },

    importData(jsonString) {
      try {
        const parsed = JSON.parse(jsonString);
        if (parsed && typeof parsed === 'object' && parsed.lessons !== undefined) {
          this._data = parsed;
          this.save();
          return true;
        }
      } catch (e) {
        console.error('Invalid import data:', e);
      }
      return false;
    },

    resetAll() {
      this._data = this.getDefaultData();
      this.save();
    }
  };

  window.PianoApp = window.PianoApp || {};
  window.PianoApp.Progress = Progress;
})();
