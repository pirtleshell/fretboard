'use strict';
const should = require('chai').should(); // eslint-disable-line no-unused-vars
const MusicString = require('../lib/music-string');

const testNotes = (ms, notes) => {
  ms.key.should.equal(notes[0]);
  ms.numFrets.should.equal(notes.length - 1);
  ms.length.should.equal(notes.length - 1);
  ms.forEach((n, i) => {
    n.note.should.equal(notes[i]);
  });
};

describe('Music String', () => {
  describe('construction', () => {
    it('should have proper key and fretNum', () => {
      const ms = new MusicString('A', 12);
      const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'];
      testNotes(ms, notes);
    });

    it('should throw error if no key provided', () => {
      const bad = () => {
        const ohNoes = new MusicString(); // eslint-disable-line no-unused-vars
      };
      bad.should.throw(Error);
    });
  });

  describe('find', () => {
    it('should return array of fret numbers', () => {
      const ms = new MusicString('E', 24);
      ms.find('E').should.deep.equal([0, 12, 24]);
    });
  });

  describe('tuneTo', () => {
    it('should change key', () => {
      const ms = new MusicString('A');
      ms.tuneTo('B').key.should.equal('B');
      ms.tuneTo('G#').key.should.equal('G#');
      ms.tuneTo('Db').key.should.equal('C#');
    });

    it('should change notes', () => {
      const ms = new MusicString('A', 6);
      const notes = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#'];
      ms.tuneTo('E');
      testNotes(ms, notes);
    });
  });

  describe('tune', () => {
    it('should change key and notes', () => {
      const ms = new MusicString('C', 8);
      let notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F'];
      ms.tune(-3);
      testNotes(ms, notes);
      notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
      ms.tune(3);
      testNotes(ms, notes);
    });
  });

  describe('forEach', () => {
    it('should work like Array.forEach', () => {
      const ms = new MusicString('A');
      ms.forEach((note, i, arr) => {
        arr.should.deep.equal(ms);
        note.should.deep.equal(ms[i]);
      });
    });
  });
});
