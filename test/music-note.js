'use strict';
const should = require('chai').should(); // eslint-disable-line no-unused-vars
const MusicNote = require('../lib/music-note');

describe('Music Notes', () => {
  it('should have notes property', () => {
    const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    MusicNote.notes.should.deep.equal(notes);
  });

  describe('diff', () => {
    it('should return half-step difference', () => {
      MusicNote.diff('A', 'G#').should.equal(11);
      MusicNote.diff('D#', 'D#').should.equal(0);
      MusicNote.diff('G#', 'A').should.equal(1);
    });
  });

  describe('resolve', () => {
    it('should return same if recognized', () => {
      MusicNote.resolve('A').should.equal('A');
      MusicNote.resolve('G#').should.equal('G#');
    });

    it('should throw error if not valid', () => {
      const bad = () => {
        MusicNote.resolve('H');
      };
      bad.should.throw(Error);
    });

    it('should fix case', () => {
      MusicNote.resolve('a').should.equal('A');
      MusicNote.resolve('b').should.equal('B');
      MusicNote.resolve('g#').should.equal('G#');
      MusicNote.resolve('bb').should.equal('A#');
    });

    it('should fix flats', () => {
      MusicNote.resolve('Ab').should.equal('G#');
      MusicNote.resolve('Bb').should.equal('A#');
      MusicNote.resolve('Cb').should.equal('B');
      MusicNote.resolve('Db').should.equal('C#');
      MusicNote.resolve('Eb').should.equal('D#');
      MusicNote.resolve('Fb').should.equal('E');
      MusicNote.resolve('Gb').should.equal('F#');
    });
  });

  describe('up', () => {

    it('should default to 1 step', () => {
      MusicNote.up('A').should.equal('A#');
      MusicNote.up('D#').should.equal('E');
      MusicNote.up('G#').should.equal('A');
      MusicNote.up('Ab').should.equal('A');
    });

    it('should take steps', () => {
      MusicNote.up('A', 11).should.equal('G#');
      MusicNote.up('A', 12).should.equal('A');
      MusicNote.up('D', 5).should.equal('G');
    });
  });

  describe('down', () => {
    it('should default to 1 step', () => {
      MusicNote.down('G#').should.equal('G');
      MusicNote.down('D').should.equal('C#');
      MusicNote.down('A').should.equal('G#');
      MusicNote.down('Ab').should.equal('G');
    });

    it('should cycle notes', () => {
      MusicNote.down('G#', 11).should.equal('A');
      MusicNote.down('A', 12).should.equal('A');
      MusicNote.down('D', 5).should.equal('A');
    });
  });

  describe('flat', () => {
    it('should cycle properly', () => {
      MusicNote.flat('A').should.equal('G#');
    });
  });

  describe('sharp', () => {
    it('should cycle properly', () => {
      MusicNote.sharp('G#').should.equal('A');
    });
  });
});
