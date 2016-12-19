'use strict';
const MusicNote = require('./music-note');

class MusicString {
  constructor(key, numFrets) {
    if (typeof key !== 'string') {
      throw new Error('String must have a key.');
    }
    this.key = MusicNote.resolve(key);
    this.numFrets = numFrets ? numFrets : 20;
    this.length = this.numFrets;
    for (let i = 0; i <= this.numFrets; i++) {
      this[i] = new MusicNote(MusicNote.up(key, i));
    }
  }

  find(note) {
    const resolved = MusicNote.resolve(note);
    const frets = [];
    this.forEach((n, i) => {
      if (n.note === resolved) {
        frets.push(i);
      }
    });
    return frets;
  }

  tuneTo(note) {
    const steps = MusicNote.diff(this.key, note);
    this.forEach(n => {
      n.note = n.tuned(steps);
    });
    this.key = MusicNote.resolve(note);
    return this;
  }

  tune(steps) {
    this.forEach(n => {
      n.note = n.tuned(steps);
    });
    this.key = this[0].note;
    return this;
  }

  forEach(func) {
    for (let i = 0; i <= this.numFrets; i++) {
      func.call(this, this[i], i, this);
    }
  }
}

module.exports = MusicString;
