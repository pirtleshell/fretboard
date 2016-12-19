'use strict';
const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

class MusicNote {
  constructor(note) {
    if (typeof note !== 'string') {
      throw new Error('No note provided.');
    }
    this.note = MusicNote.resolve(note);
  }

  diff(note) {
    return MusicNote.diff(this.note, note);
  }

  tuned(steps) {
    if (steps > 0) {
      return MusicNote.up(this.note, steps);
    } else if (steps < 0) {
      return MusicNote.down(this.note, -1 * steps);
    }
  }

  up(steps) {
    return this.tuned(steps);
  }

  down(steps) {
    return this.tuned(-1 * steps);
  }

  flat() {
    return MusicNote.down(this.note);
  }

  sharp() {
    return MusicNote.up(this.note);
  }

  static get notes() {
    return NOTES;
  }

  static resolve(note) {
    let resolved = note.toUpperCase();
    // fix flats
    if (note[1] === 'b') {
      const index = NOTES.indexOf(resolved[0]);
      if (index === 0) {
        resolved = 'G#';
      } else {
        resolved = NOTES[index - 1];
      }
    }
    if (NOTES.indexOf(resolved) < 0) {
      throw new Error(`Unrecognized note ${resolved}.`);
    }
    return resolved;
  }

  static tuned(note, steps) {
    let out = note;
    if (steps > 0) {
      out = MusicNote.up(note, steps);
    } else if (steps < 0) {
      out = MusicNote.down(note, -1 * steps);
    }
    return out;
  }

  static up(note, num) {
    if (typeof num === 'undefined') {
      num = 1;
    }
    if (num < 0) {
      return MusicNote.down(note, -1 * num);
    }
    const steps = num % 12;
    const resolved = MusicNote.resolve(note);
    const index = NOTES.indexOf(resolved);
    if (index + steps > 11) {
      return NOTES[index - 12 + steps];
    }
    return NOTES[index + steps];
  }

  static down(note, num) {
    if (typeof num === 'undefined') {
      num = 1;
    }
    if (num < 0) {
      return MusicNote.up(note, -1 * num);
    }
    const steps = num % 12;
    const resolved = MusicNote.resolve(note);
    const index = NOTES.indexOf(resolved);
    if (index - steps < 0) {
      return NOTES[index + 12 - steps];
    }
    return NOTES[index - steps];
  }

  static flat(note) {
    return MusicNote.down(note);
  }

  static sharp(note) {
    return MusicNote.up(note);
  }

  static diff(one, two) {
    const c1 = MusicNote.resolve(one);
    const c2 = MusicNote.resolve(two);
    const delta = NOTES.indexOf(c2) - NOTES.indexOf(c1);
    if (delta >= 0) {
      return delta;
    }
    return delta + 12;
  }
}

module.exports = MusicNote;
