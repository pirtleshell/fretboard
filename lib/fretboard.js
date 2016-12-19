'use strict';
const MusicString = require('./music-string');
const MusicNote = require('./music-note');

class Fretboard {
  constructor(tuning, numFrets) {
    // turn string into array of notes
    if (!(tuning instanceof Array)) {
      tuning = tuning ? tuning : 'EADGBE';
      tuning = Fretboard.parseTuningString(tuning);
    }

    this.length = tuning.length;
    this.numStrings = tuning.length;
    this.numFrets = numFrets ? numFrets : 20;

    // create array of MusicStrings
    for (let s = 0; s < tuning.length; s++) {
      this[s] = new MusicString(tuning[s], this.numFrets);
    }
  }

  get tuning() {
    const tuning = [];
    this.forEach(string => {
      tuning.push(string.key);
    });
    return tuning;
  }

  find(note) {
    const notes = [];
    this.forEach((string, i) => {
      notes[i] = string.find(note);
    });
    return notes;
  }

  retune(tuning) {
    const self = this;
    let tuneArr = tuning;
    if (!(tuning instanceof Array)) {
      tuneArr = Fretboard.parseTuningString(tuning);
    }
    if (tuneArr.length !== self.length) {
      throw new Error(`Not enough notes given to retune. Expected ${self.length}, found ${tuneArr.length}`);
    }

    tuneArr.forEach((note, string) => {
      self[string].tuneTo(note);
    });
    return this;
  }

  tuneAll(steps) {
    this.forEach(string => string.tune(steps));
    return this;
  }

  // for each string
  forEach(func) {
    // console.log(this);
    for (let i = 0; i < this.numStrings; i++) {
      func.call(this, this[i], i, this);
    }
  }

  static parseTuningString(tuning) {
    if (typeof tuning !== 'string') {
      throw new Error(`Expected tuning to be string. Found ${tuning}`);
    }
    const arr = [];
    let current = '';
    for (let s = 0; s < tuning.length; s++) {
      current += tuning[s];
      if (tuning[s + 1] !== '#' && tuning[s + 1] !== 'b') {
        arr.push(MusicNote.resolve(current));
        current = '';
      }
    }
    return arr;
  }
}

module.exports = Fretboard;
