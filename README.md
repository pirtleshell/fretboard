# fretboard

> :guitar: Programatically handle the notes of fretted string instruments, like the guitar

## Table of Contents

- [Install](#install)
- [Usage](#usage)
	- [Find Notes](#find-notes)
	- [Change tunings](#change-tunings)
	- [Find notes](#find-notes)
- [API](#api)
	- [Fretboard Object](#fretboard-object)
		- [Properties](#properties)
		- [Methods](#methods)
		- [Array-like properties & methods](#array-like-properties-methods)
		- [Static Methods](#static-methods)
	- [MusicString Object](#musicstring-object)
		- [Properties](#properties)
		- [Methods](#methods)
		- [Array-like properties & methods](#array-like-properties-methods)
	- [MusicNote Object](#musicnote-object)
		- [Methods](#methods)
- [License](#license)

## Install

```sh
$ npm install --save fretboard
```

The module has three classes, [Fretboard](#fretboard-object), [MusicString](#musicstring-object), [MusicNote](#musicnote-object), available as follows:

```js
var Fretboard = require('fretboard');
var MusicString = Fretboard.MusicString;
var MusicNote = Fretboard.MusicNote;
```

A `Fretboard` is an array-like object of `MusicString`s, which are array-like objects of `MusicNote`s.

## Usage

```js
var Fretboard = require('fretboard');

var guitar = new Fretboard();
// or, explicitly stating the default tuning and number of frets
var guitar = new Fretboard('EADGBE', 20);

// or make your own arrangement of strings and frets
var ukulele = new Fretboard('GCEA', 15);
```

Compatible with all tunings available in  [string-tunings](https://github.com/PirtleShell/string-tunings). Build yourself a whole string orchestra!

```js
var tunings = require('string-tunings');
var openG = new Fretboard(tunings.guitar.open.G),
     bass = new Fretboard(tunings.bass.standard),
 mandolin = new Fretboard(tunings.mandolin.standard);
```

### Find Notes

A [`Fretboard`](#fretboard-object) is a zero-indexed array-like object of [`MusicString`](#musicstring-object)s, which are array-like objects of [`MusicNote`](#musicnote-object)s. The 0th element of a string is the open note, and so the 1st element is the 1st fret, etc. Thus, the fretboard acts as a 2D array of note names.

```js
// 1st string, 5th fret should be an A
guitar[0][5]
//=> MusicNote { note: 'A' }

ukulele[3][5].note
//=> 'D'
```

### Change tunings

On individual strings:

```js
// tune individual strings to a specific key
guitar[5].tuneTo('D')
guitar[5][0]
//=> MusicNote { note: 'D' }

// or a specific number of half steps
guitar[3].tune(-1)
guitar[3].key
//=> 'F#'

// Now the tuning is:
guitar.tuning
//=> [ 'E', 'A', 'D', 'F#', 'B', 'D' ]
```

On the whole fretboard:

```js
// Retune the whole guitar:
guitar.retune('DADGbAD')
guitar.tuning
// flats are converted into sharps.
//=> [ 'D', 'A', 'D', 'F#', 'A', 'D' ]

// or tune the whole guitar up or down a number of half steps
guitar.tuneAll(5)
//=> [ 'G', 'D', 'G', 'B', 'D', 'G' ]
```

### Find notes

Retrieve an array of fret numbers corresponding to the note.

On individual strings:
```js
var guitar = new Fretboard('EADGBE', 24);
guitar[0].find('E')
//=> [ 0, 12, 24 ]
```

On the whole fretboard:
```js
guitar.find('E')
//=> [ [ 0, 12, 24 ],
//     [ 7, 19 ],
//     [ 2, 14 ],
//     [ 9, 21 ],
//     [ 5, 17 ],
//     [ 0, 12, 24 ] ]
```

## API

### Fretboard Object

A `Fretboard` acts as an array of [`MusicString` Objects](#musicstring-object).

#### Properties

| Property     | Type          | Description                     |              Default              |
|:-------------|:--------------|:--------------------------------|:---------------------------------:|
| `tuning`     | Array<string> | the keys of each of the strings | `[ 'E', 'A', 'D', 'G' 'B', 'E' ]` |
| `numStrings` | integer       | the number of strings           |                `6`                |
| `numFrets`   | integer       | the number of frets             |               `20`                |

#### Methods

##### `fretboard.find( note )`

Returns all occurrences of a note across the fretboard in a 2D array of fret numbers. For example, if the first occurrence of an `A` occurs on the 1st string, 5th fret, `fretboard.find('A')[0][0] = 5`.

 ##### `fretboard.retune( tuningString )`

 Re-tunes the fretboard. Must be string of same length as number of strings. Also accepts array of notes.

example:
```js
var bass = new Fretboard('EADG');

bass.retune('BEAD')
bass.tuning
//=> [ 'B', 'E', 'A', 'D' ]
```

##### `fretboard.tuneAll( steps )`

Tunes the fretboard up or down a given number of half-steps.

example:
```js
var guitar = new Fretboard();

guitar.tuneAll(-2)
guitar.tuning
//=> [ 'D', 'G', 'C', 'F', 'A', 'D' ]

guitar.tuneAll(2)
guitar.tuning
//=> [ 'E', 'A', 'D', 'G' 'B', 'E' ]
```

#### Array-like properties & methods

These are provided to treat the `Fretboard` as an array of `MusicString`s.

`fretboard.length <integer>`: equivalent to `numStrings`

`fretboard.forEach( function(element, index, strings) )`: an `Array.forEach` equivalent for the strings

#### Static Methods

##### `Fretboard.parseTuningString( tuningString )`

Parses a string of notes into an array of note names.

example:
```js
Fretboard.parseTuningString('EADGBE')
//=> ['E', 'A', 'D', 'G' 'B', 'E']

Fretboard.parseTuningString('GCEA');
//=> ['G', 'C', 'E', 'A']

Fretboard.parseTuningString('DADF#AD')
//=> ['D', 'A', 'D', 'F#', 'A', 'D']
```

---------

### MusicString Object

A `MusicString` acts as an array of [`MusicNote` Objects](#musicnote-object).

#### Properties
| Property   | Type    | Description                 |    Default     |
|:-----------|:--------|:----------------------------|:--------------:|
| `key`      | String  | The note of the open string | Required input |
| `numFrets` | integer | The number of frets         |       20       |

#### Methods

##### `musicString.find( note )`

Finds all occurrences of a note. Returns an array of the fret numbers.

##### `musicString.tuneTo( note )`

Tunes the whole string to a given key.

##### `musicString.tune( steps )`

Tune the string up or down a given number of half-steps.


#### Array-like properties & methods

These are provided to treat the `MusicString` as an array of `MusicNote`s.

`musicString.length <integer>`: equivalent to `numFrets`

`musicString.forEach( function(element, index, strings) )`: an `Array.forEach` equivalent for the notes

---------

### MusicNote Object

A `MusicNote` is an object with a `note` property and the following methods. Sharps (`#`) are preferred to flats (`b`), and flats will be translated accordingly.

#### Methods

None of the methods affect the `note` value, and all of them have static counterparts.

##### `musicNote.diff( note )`

Returns the number of half-steps between the current note and a given one. This is always positive, assuming the current note is lower in pitch.

**Static version**: `MusicNote.diff(note, note)`

example:
```js
var note = new MusicNote('A');below
note.diff('G#')
//=> 11

note = new MusicNote('G#');
note.diff('A')
//=> 1
```

##### `musicNote.tuned( steps )`

Returns the pitch value of a note that is `steps` half-steps away.

**Static version**: `MusicNote.tuned(note, steps)`

example:
```js
var note = new MusicNote('A');
note.tuned(5)
//=> 'D'
note.tuned(-5)
//=> 'E'
```

##### `musicNote.up( steps )`

Returns the pitch value of a note that is `steps` half-steps higher.

**Static version**: `MusicNote.up(note, steps)`

##### `musicNote.down( steps )`

Returns the pitch value of a note that is `steps` half-steps lower.

**Static version**: `MusicNote.down(note, steps)`

##### `musicNote.flat()`

Returns the pitch value of the note one half-step lower the note.

**Static version**: `MusicNote.flat(note)`

##### `musicNote.sharp()`

Returns the pitch value of the note one half-step higher the note.

**Static version**: `MusicNote.sharp(note)`


## License

MIT &copy; 2016 [Robert Pirtle](https://pirtle.xyz/)
