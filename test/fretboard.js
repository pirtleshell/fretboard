'use strict';
const should = require('chai').should(); // eslint-disable-line no-unused-vars
const Fretboard = require('../lib/fretboard');

const stringsTest = (fb, notes) => {
  const n = notes.length;
  fb.numStrings.should.equal(n);
  fb.length.should.equal(n);
  fb.tuning.should.deep.equal(notes);
  fb.forEach((string, i) => {
    string.key.should.equal(notes[i]);
  });
};

describe('Fretboard', () => {
  describe('construction', () => {
    it('should default to standard-tuned, 20 fret guitar', () => {
      const guitar = new Fretboard();
      const notes = ['E', 'A', 'D', 'G', 'B', 'E'];
      guitar.numFrets.should.equal(20);
      stringsTest(guitar, notes);
    });

    it('should handle tunings', () => {
      let fb = new Fretboard('EADG');
      let notes = ['E', 'A', 'D', 'G'];
      stringsTest(fb, notes);

      fb = new Fretboard('BbEbAbF');
      notes = ['A#', 'D#', 'G#', 'F'];
      stringsTest(fb, notes);
    });

    it('should accept numFrets', () => {
      let fb = new Fretboard('ABC', 24);
      fb.numFrets.should.equal(24);
      fb = new Fretboard('E', 1);
      fb.numFrets.should.equal(1);
    });
  });

  describe('find', () => {
    it('should return 2D array of fret numbers', () => {
      const ostrich = new Fretboard('AAAAAA', 12);
      const theALocations = [
        [0, 12],
        [0, 12],
        [0, 12],
        [0, 12],
        [0, 12],
        [0, 12]
      ];
      ostrich.find('A').should.deep.equal(theALocations);
    });
  });

  describe('retune', () => {
    it('should change all strings', () => {
      const fb = new Fretboard();
      const notes = ['D', 'A', 'D', 'F#', 'A', 'D'];
      fb.retune(notes);
      stringsTest(fb, notes);
    });

    it('should throw error for wrong number of notes', () => {
      const fb = new Fretboard('ABC');
      const bad = () => {
        fb.retune('ABCD');
      };
      bad.should.throw(Error);
    });
  });

  describe('tuneAll', () => {
    it('should change all notes when positive', () => {
      const fb1 = new Fretboard('ABC');
      const fb2 = new Fretboard('CDD#');
      fb1.tuneAll(3).should.deep.equal(fb2);
    });

    it('should change all notes when positive', () => {
      const fb1 = new Fretboard('ABC');
      const fb2 = new Fretboard('CDD#');
      fb2.tuneAll(-3).should.deep.equal(fb1);
    });
  });

  describe('forEach', () => {
    it('should work like Array.forEach', () => {
      const fb = new Fretboard('ABCD');
      fb.forEach((string, i, arr) => {
        arr.should.deep.equal(fb);
        string.should.deep.equal(fb[i]);
      });
    });
  });

  describe('parseTuningString', () => {
    it('should handle flats and sharps', () => {
      let str = 'AA#BCC#DD#EFF#GG#';
      let expected = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
      Fretboard.parseTuningString(str).should.deep.equal(expected);

      str = 'AbBC#Gb';
      expected = ['G#', 'B', 'C#', 'F#'];
      Fretboard.parseTuningString(str).should.deep.equal(expected);
    });

    it('should throw error if not a string', () => {
      const bad = () => {
        Fretboard.parseTuningString(42);
      };
      bad.should.throw(Error);
    });
  });
});
