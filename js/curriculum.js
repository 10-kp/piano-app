(function () {
  'use strict';

  window.PianoApp = window.PianoApp || {};

  window.PianoApp.Curriculum = {
    grades: [
      // ============================================================
      // GRADE 4
      // ============================================================
      {
        id: 'grade4',
        name: 'Grade 4',
        description: 'Foundation technique with two-octave scales, simple arpeggios, and early classical repertoire.',
        lessons: [
          // --- Grade 4: Scales ---
          {
            id: 'g4-scales-major',
            type: 'scales',
            title: 'Major Scales (Grade 4)',
            description: 'D Major, A Major, and E Major scales over two octaves, right hand, in eighth notes.',
            exercises: [
              {
                id: 'g4-scale-d-major',
                title: 'D Major Scale (2 octaves)',
                abc: [
                  'X:1',
                  'T:D Major Scale - 2 Octaves',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=92',
                  'K:D',
                  'V:1 clef=treble',
                  'D E F G A B c d | e f g a b c\' d\' e\' |',
                  'e\' d\' c\' b a g f e | d c B A G F E D |]'
                ].join('\n'),
                bpm: 92
              },
              {
                id: 'g4-scale-a-major',
                title: 'A Major Scale (2 octaves)',
                abc: [
                  'X:1',
                  'T:A Major Scale - 2 Octaves',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=92',
                  'K:A',
                  'A, B, C D E F G A | B c d e f g a b |',
                  'b a g f e d c B | A G F E D C B, A, |]'
                ].join('\n'),
                bpm: 92
              },
              {
                id: 'g4-scale-e-major',
                title: 'E Major Scale (2 octaves)',
                abc: [
                  'X:1',
                  'T:E Major Scale - 2 Octaves',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=88',
                  'K:E',
                  'E, F, G, A, B, C D E | F G A B c d e f |',
                  'f e d c B A G F | E D C B, A, G, F, E, |]'
                ].join('\n'),
                bpm: 88
              }
            ]
          },
          // --- Grade 4: Arpeggios ---
          {
            id: 'g4-arpeggios',
            type: 'arpeggios',
            title: 'Arpeggios (Grade 4)',
            description: 'D Major and A Major arpeggios over two octaves, right hand.',
            exercises: [
              {
                id: 'g4-arp-d-major',
                title: 'D Major Arpeggio (2 octaves)',
                abc: [
                  'X:1',
                  'T:D Major Arpeggio - 2 Octaves',
                  'M:3/4',
                  'L:1/8',
                  'Q:1/4=80',
                  'K:D',
                  'V:1 clef=treble',
                  'D F A | d f a | d\' f\' a\' |',
                  'a\' f\' d\' | a f d | A F D |]'
                ].join('\n'),
                bpm: 80
              },
              {
                id: 'g4-arp-a-major',
                title: 'A Major Arpeggio (2 octaves)',
                abc: [
                  'X:1',
                  'T:A Major Arpeggio - 2 Octaves',
                  'M:3/4',
                  'L:1/8',
                  'Q:1/4=80',
                  'K:A',
                  'V:1 clef=treble',
                  'A, C E | A c e | a c\' e\' |',
                  'e\' c\' a | e c A | E C A, |]'
                ].join('\n'),
                bpm: 80
              }
            ]
          },
          // --- Grade 4: Sight-Reading ---
          {
            id: 'g4-sight-reading',
            type: 'sight-reading',
            title: 'Sight-Reading (Grade 4)',
            description: 'Short exercises in G major and D major with quarter and eighth notes in 4/4 and 3/4 time.',
            exercises: [
              {
                id: 'g4-sr-1',
                title: 'Sight-Reading 1 (G Major, 4/4)',
                abc: [
                  'X:1',
                  'T:Sight-Reading 1',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=84',
                  'K:G',
                  'V:1 clef=treble',
                  'G2 A2 B2 c2 | d4 B2 G2 | A2 B2 c2 A2 | G6 z2 |',
                  'B2 c2 d2 e2 | d4 c2 B2 | A2 G2 A2 B2 | G6 z2 |]'
                ].join('\n'),
                bpm: 84
              },
              {
                id: 'g4-sr-2',
                title: 'Sight-Reading 2 (D Major, 3/4)',
                abc: [
                  'X:1',
                  'T:Sight-Reading 2',
                  'M:3/4',
                  'L:1/8',
                  'Q:1/4=80',
                  'K:D',
                  'V:1 clef=treble',
                  'D2 F2 A2 | d4 c2 | B2 A2 G2 | F4 z2 |',
                  'A2 B2 c2 | d4 e2 | d2 c2 B2 | A4 z2 |]'
                ].join('\n'),
                bpm: 80
              },
              {
                id: 'g4-sr-3',
                title: 'Sight-Reading 3 (G Major, 4/4)',
                abc: [
                  'X:1',
                  'T:Sight-Reading 3',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=80',
                  'K:G',
                  'V:1 clef=treble',
                  'G A B c d2 B2 | A G A B c2 A2 | B c d e d2 B2 | c B A G G4 |]'
                ].join('\n'),
                bpm: 80
              }
            ]
          },
          // --- Grade 4: Pieces ---
          {
            id: 'g4-pieces',
            type: 'piece',
            title: 'Pieces (Grade 4)',
            description: 'Study pieces from the classical repertoire suitable for Grade 4.',
            exercises: [
              {
                id: 'g4-piece-bach-minuet',
                title: 'Minuet in G - J.S. Bach',
                songRef: 'bach-minuet-g',
                bpm: 108
              },
              {
                id: 'g4-piece-ode-to-joy',
                title: 'Ode to Joy - Beethoven',
                songRef: 'ode-to-joy',
                bpm: 100
              }
            ]
          }
        ]
      },

      // ============================================================
      // GRADE 5
      // ============================================================
      {
        id: 'grade5',
        name: 'Grade 5',
        description: 'Expanding key signatures, minor scales, chromatic work, and more expressive repertoire.',
        lessons: [
          // --- Grade 5: Scales ---
          {
            id: 'g5-scales',
            type: 'scales',
            title: 'Scales (Grade 5)',
            description: 'Bb Major, Eb Major, D harmonic minor, and chromatic scale from C over two octaves.',
            exercises: [
              {
                id: 'g5-scale-bb-major',
                title: 'Bb Major Scale (2 octaves)',
                abc: [
                  'X:1',
                  'T:Bb Major Scale - 2 Octaves',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=96',
                  'K:Bb',
                  'V:1 clef=treble',
                  'B, C D E F G A B | c d e f g a b c\' |',
                  'c\' b a g f e d c | B A G F E D C B, |]'
                ].join('\n'),
                bpm: 96
              },
              {
                id: 'g5-scale-eb-major',
                title: 'Eb Major Scale (2 octaves)',
                abc: [
                  'X:1',
                  'T:Eb Major Scale - 2 Octaves',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=92',
                  'K:Eb',
                  'V:1 clef=treble',
                  'E, F, G, A, B, C D E | F G A B c d e f |',
                  'f e d c B A G F | E D C B, A, G, F, E, |]'
                ].join('\n'),
                bpm: 92
              },
              {
                id: 'g5-scale-d-harm-minor',
                title: 'D Harmonic Minor Scale (2 octaves)',
                abc: [
                  'X:1',
                  'T:D Harmonic Minor - 2 Octaves',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=88',
                  'K:Dm',
                  'V:1 clef=treble',
                  'D E F G A B ^c d | e f g a b c\' ^c\' d\' |',
                  'd\' ^c\' c\' b a g f e | d ^c B A G F E D |]'
                ].join('\n'),
                bpm: 88
              },
              {
                id: 'g5-scale-chromatic-c',
                title: 'Chromatic Scale from C (2 octaves)',
                abc: [
                  'X:1',
                  'T:Chromatic Scale from C - 2 Octaves',
                  'M:4/4',
                  'L:1/16',
                  'Q:1/4=72',
                  'K:C',
                  'V:1 clef=treble',
                  'C ^C D ^D E F ^F G ^G A ^A B | c ^c d ^d e f ^f g ^g a ^a b |',
                  'c\' b _b a _a g _g f e _e d _d | c B _B A _A G _G F E _E D _D C4 |]'
                ].join('\n'),
                bpm: 72
              }
            ]
          },
          // --- Grade 5: Arpeggios ---
          {
            id: 'g5-arpeggios',
            type: 'arpeggios',
            title: 'Arpeggios (Grade 5)',
            description: 'Bb Major and D minor arpeggios over two octaves.',
            exercises: [
              {
                id: 'g5-arp-bb-major',
                title: 'Bb Major Arpeggio (2 octaves)',
                abc: [
                  'X:1',
                  'T:Bb Major Arpeggio - 2 Octaves',
                  'M:3/4',
                  'L:1/8',
                  'Q:1/4=84',
                  'K:Bb',
                  'V:1 clef=treble',
                  'B, D F | B d f | b d\' f\' |',
                  'f\' d\' b | f d B | F D B, |]'
                ].join('\n'),
                bpm: 84
              },
              {
                id: 'g5-arp-d-minor',
                title: 'D Minor Arpeggio (2 octaves)',
                abc: [
                  'X:1',
                  'T:D Minor Arpeggio - 2 Octaves',
                  'M:3/4',
                  'L:1/8',
                  'Q:1/4=80',
                  'K:Dm',
                  'V:1 clef=treble',
                  'D F A | d f a | d\' f\' a\' |',
                  'a\' f\' d\' | a f d | A F D |]'
                ].join('\n'),
                bpm: 80
              }
            ]
          },
          // --- Grade 5: Sight-Reading ---
          {
            id: 'g5-sight-reading',
            type: 'sight-reading',
            title: 'Sight-Reading (Grade 5)',
            description: 'Exercises with dotted rhythms and 6/8 time, up to three sharps or flats.',
            exercises: [
              {
                id: 'g5-sr-1',
                title: 'Sight-Reading 1 (F Major, 6/8)',
                abc: [
                  'X:1',
                  'T:Sight-Reading 1',
                  'M:6/8',
                  'L:1/8',
                  'Q:3/8=56',
                  'K:F',
                  'V:1 clef=treble',
                  'F2 A c2 A | G2 B d2 B | c2 A F2 G | A3 G3 |',
                  'F2 A c2 d | c2 B A2 G | F2 E D2 E | F3 z3 |]'
                ].join('\n'),
                bpm: 56
              },
              {
                id: 'g5-sr-2',
                title: 'Sight-Reading 2 (A Major, 4/4 dotted)',
                abc: [
                  'X:1',
                  'T:Sight-Reading 2',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=76',
                  'K:A',
                  'V:1 clef=treble',
                  'A3 B c2 d2 | e3 d c2 B2 | A3 c e2 c2 | d4 z4 |',
                  'c3 d e2 f2 | e3 d c2 B2 | A3 B c2 A2 | A4 z4 |]'
                ].join('\n'),
                bpm: 76
              },
              {
                id: 'g5-sr-3',
                title: 'Sight-Reading 3 (Eb Major, 6/8)',
                abc: [
                  'X:1',
                  'T:Sight-Reading 3',
                  'M:6/8',
                  'L:1/8',
                  'Q:3/8=52',
                  'K:Eb',
                  'V:1 clef=treble',
                  'E2 G B2 G | A2 B c2 B | A2 G F2 E | F3 G3 |',
                  'B2 c d2 e | d2 c B2 A | G2 F E2 F | E3 z3 |]'
                ].join('\n'),
                bpm: 52
              }
            ]
          },
          // --- Grade 5: Pieces ---
          {
            id: 'g5-pieces',
            type: 'piece',
            title: 'Pieces (Grade 5)',
            description: 'Expressive repertoire suitable for Grade 5 examination.',
            exercises: [
              {
                id: 'g5-piece-fur-elise',
                title: 'Fur Elise - Beethoven',
                songRef: 'fur-elise',
                bpm: 120
              },
              {
                id: 'g5-piece-prelude-c',
                title: 'Prelude in C Major - J.S. Bach',
                songRef: 'prelude-c-major',
                bpm: 72
              }
            ]
          }
        ]
      },

      // ============================================================
      // GRADE 6
      // ============================================================
      {
        id: 'grade6',
        name: 'Grade 6',
        description: 'Advanced key signatures, four-octave scales, melodic minor, dominant 7th arpeggios, and contrapuntal repertoire.',
        lessons: [
          // --- Grade 6: Scales ---
          {
            id: 'g6-scales',
            type: 'scales',
            title: 'Scales (Grade 6)',
            description: 'F# Major and Ab Major over four octaves, and C melodic minor.',
            exercises: [
              {
                id: 'g6-scale-fsharp-major',
                title: 'F# Major Scale (4 octaves)',
                abc: [
                  'X:1',
                  'T:F# Major Scale - 4 Octaves',
                  'M:4/4',
                  'L:1/16',
                  'Q:1/4=80',
                  'K:F#',
                  'V:1 clef=treble',
                  'F,G,A,B, CDEF GABC defg | abcd\' e\'f\'g\'a\' b\'4 |',
                  'b\'a\'g\'f\' e\'d\'cb agfe dcBA | GFED CB,A,G, F,4 |]'
                ].join('\n'),
                bpm: 80
              },
              {
                id: 'g6-scale-ab-major',
                title: 'Ab Major Scale (4 octaves)',
                abc: [
                  'X:1',
                  'T:Ab Major Scale - 4 Octaves',
                  'M:4/4',
                  'L:1/16',
                  'Q:1/4=80',
                  'K:Ab',
                  'V:1 clef=treble',
                  'A,B,CD EFGA Bcde fgab | c\'d\'e\'f\' g\'4 z4 |',
                  'g\'f\'e\'d\' c\'bag fedc BAGF | EDCB, A,4 z4 |]'
                ].join('\n'),
                bpm: 80
              },
              {
                id: 'g6-scale-c-mel-minor',
                title: 'C Melodic Minor Scale (2 octaves)',
                abc: [
                  'X:1',
                  'T:C Melodic Minor - 2 Octaves',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=88',
                  'K:Cm',
                  'V:1 clef=treble',
                  'C D _E F G =A =B c | d e _f g =a =b c\' d\' |',
                  'd\' c\' _b _a g f _e d | c _B _A G F _E D C |]'
                ].join('\n'),
                bpm: 88
              }
            ]
          },
          // --- Grade 6: Arpeggios ---
          {
            id: 'g6-arpeggios',
            type: 'arpeggios',
            title: 'Arpeggios (Grade 6)',
            description: 'F# Major, C minor, and dominant 7th on G arpeggios.',
            exercises: [
              {
                id: 'g6-arp-fsharp-major',
                title: 'F# Major Arpeggio (2 octaves)',
                abc: [
                  'X:1',
                  'T:F# Major Arpeggio - 2 Octaves',
                  'M:3/4',
                  'L:1/8',
                  'Q:1/4=84',
                  'K:F#',
                  'V:1 clef=treble',
                  'F, A, C | F A c | f a c\' |',
                  'c\' a f | c A F | C A, F, |]'
                ].join('\n'),
                bpm: 84
              },
              {
                id: 'g6-arp-c-minor',
                title: 'C Minor Arpeggio (2 octaves)',
                abc: [
                  'X:1',
                  'T:C Minor Arpeggio - 2 Octaves',
                  'M:3/4',
                  'L:1/8',
                  'Q:1/4=80',
                  'K:Cm',
                  'V:1 clef=treble',
                  'C _E G | c _e g | c\' _e\' g\' |',
                  'g\' _e\' c\' | g _e c | G _E C |]'
                ].join('\n'),
                bpm: 80
              },
              {
                id: 'g6-arp-dom7-g',
                title: 'Dominant 7th Arpeggio on G (2 octaves)',
                abc: [
                  'X:1',
                  'T:Dominant 7th on G - 2 Octaves',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=76',
                  'K:C',
                  'V:1 clef=treble',
                  'G, B, D F | G B d f | g b d\' f\' |',
                  'f\' d\' b g | f d B G | F D B, G, |]'
                ].join('\n'),
                bpm: 76
              }
            ]
          },
          // --- Grade 6: Sight-Reading ---
          {
            id: 'g6-sight-reading',
            type: 'sight-reading',
            title: 'Sight-Reading (Grade 6)',
            description: 'Exercises with syncopation and mixed meters.',
            exercises: [
              {
                id: 'g6-sr-1',
                title: 'Sight-Reading 1 (D minor, syncopation)',
                abc: [
                  'X:1',
                  'T:Sight-Reading 1',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=88',
                  'K:Dm',
                  'V:1 clef=treble',
                  'D2 F A2 G F2 | E2 G A2 B c2 | d2 c A2 F E2 | D4 z4 |',
                  'A2 d c2 A G2 | F2 A d2 c A2 | G2 F E2 D ^C2 | D4 z4 |]'
                ].join('\n'),
                bpm: 88
              },
              {
                id: 'g6-sr-2',
                title: 'Sight-Reading 2 (Bb Major, 5/4)',
                abc: [
                  'X:1',
                  'T:Sight-Reading 2',
                  'M:5/4',
                  'L:1/8',
                  'Q:1/4=80',
                  'K:Bb',
                  'V:1 clef=treble',
                  'B2 d2 f2 d2 B2 | c2 e2 g2 f2 e2 | d2 c2 B2 A2 G2 | F4 z2 B,4 |',
                  'D2 F2 B2 d2 c2 | B2 A2 G2 F2 E2 | D2 F2 B,2 D2 F2 | B,4 z6 |]'
                ].join('\n'),
                bpm: 80
              },
              {
                id: 'g6-sr-3',
                title: 'Sight-Reading 3 (G minor, 7/8)',
                abc: [
                  'X:1',
                  'T:Sight-Reading 3',
                  'M:7/8',
                  'L:1/8',
                  'Q:1/4=76',
                  'K:Gm',
                  'V:1 clef=treble',
                  'G2 B d2 cB | A2 c d2 cB | G2 A B2 AG | ^F2 G A2 z2 |',
                  'd2 c B2 AG | A2 B c2 BA | G2 ^F G2 AG | G4 z3 |]'
                ].join('\n'),
                bpm: 76
              }
            ]
          },
          // --- Grade 6: Pieces ---
          {
            id: 'g6-pieces',
            type: 'piece',
            title: 'Pieces (Grade 6)',
            description: 'Contrapuntal and Romantic repertoire for Grade 6.',
            exercises: [
              {
                id: 'g6-piece-invention-1',
                title: 'Invention No.1 in C Major - J.S. Bach',
                songRef: 'invention-1',
                bpm: 104
              },
              {
                id: 'g6-piece-waltz-a-minor',
                title: 'Waltz in A Minor - Chopin',
                songRef: 'waltz-a-minor',
                bpm: 138
              }
            ]
          }
        ]
      },

      // ============================================================
      // GRADE 7
      // ============================================================
      {
        id: 'grade7',
        name: 'Grade 7',
        description: 'Contrary motion scales, diminished 7th arpeggios, complex rhythms, and advanced repertoire.',
        lessons: [
          // --- Grade 7: Scales ---
          {
            id: 'g7-scales',
            type: 'scales',
            title: 'Scales (Grade 7)',
            description: 'Db Major in contrary motion and E harmonic minor over four octaves.',
            exercises: [
              {
                id: 'g7-scale-db-contrary',
                title: 'Db Major Contrary Motion (2 octaves)',
                abc: [
                  'X:1',
                  'T:Db Major Contrary Motion',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=76',
                  'K:Db',
                  'V:1 clef=treble name="RH"',
                  'D E F G A B c d | e f g a b c\' d\' e\' |',
                  'e\' d\' c\' b a g f e | d c B A G F E D |]',
                  'V:2 clef=bass name="LH"',
                  'D, C, B,, A,, G,, F,, E,, D,, | D,,8 |',
                  'D,, E,, F,, G,, A,, B,, C, D, | D,8 |]'
                ].join('\n'),
                bpm: 76
              },
              {
                id: 'g7-scale-e-harm-minor',
                title: 'E Harmonic Minor Scale (4 octaves)',
                abc: [
                  'X:1',
                  'T:E Harmonic Minor - 4 Octaves',
                  'M:4/4',
                  'L:1/16',
                  'Q:1/4=76',
                  'K:Em',
                  'V:1 clef=treble',
                  'E,F,G,A, B,C^DE FGAB c^def |',
                  'gab^c\' d\'e\'f\'g\' a\'4 z4 |',
                  'a\'g\'f\'e\' d\'^c\'ba gfed ^cBAG |',
                  'FEDA, B,A,G,F, E,4 z4 |]'
                ].join('\n'),
                bpm: 76
              }
            ]
          },
          // --- Grade 7: Arpeggios ---
          {
            id: 'g7-arpeggios',
            type: 'arpeggios',
            title: 'Arpeggios (Grade 7)',
            description: 'Db Major and diminished 7th on C# arpeggios.',
            exercises: [
              {
                id: 'g7-arp-db-major',
                title: 'Db Major Arpeggio (2 octaves)',
                abc: [
                  'X:1',
                  'T:Db Major Arpeggio - 2 Octaves',
                  'M:3/4',
                  'L:1/8',
                  'Q:1/4=80',
                  'K:Db',
                  'V:1 clef=treble',
                  'D F A | d f a | d\' f\' a\' |',
                  'a\' f\' d\' | a f d | A F D |]'
                ].join('\n'),
                bpm: 80
              },
              {
                id: 'g7-arp-dim7-csharp',
                title: 'Diminished 7th Arpeggio on C# (2 octaves)',
                abc: [
                  'X:1',
                  'T:Diminished 7th on C#',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=72',
                  'K:C',
                  'V:1 clef=treble',
                  '^C E G _B | ^c e g _b | ^c\' e\' g\' _b\' |',
                  '_b\' g\' e\' ^c\' | _b g e ^c | _B G E ^C |]'
                ].join('\n'),
                bpm: 72
              }
            ]
          },
          // --- Grade 7: Sight-Reading ---
          {
            id: 'g7-sight-reading',
            type: 'sight-reading',
            title: 'Sight-Reading (Grade 7)',
            description: 'Exercises with complex rhythms and key changes.',
            exercises: [
              {
                id: 'g7-sr-1',
                title: 'Sight-Reading 1 (E minor to G Major)',
                abc: [
                  'X:1',
                  'T:Sight-Reading 1',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=84',
                  'K:Em',
                  'V:1 clef=treble',
                  'E2 G B3 A G | ^F2 A B3 c d | e3 ^d e2 B2 | e4 z4 |',
                  'K:G',
                  'G2 A B3 c d | e2 d c3 B A | G2 A B3 A G | G4 z4 |]'
                ].join('\n'),
                bpm: 84
              },
              {
                id: 'g7-sr-2',
                title: 'Sight-Reading 2 (Ab Major, triplets)',
                abc: [
                  'X:1',
                  'T:Sight-Reading 2',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=72',
                  'K:Ab',
                  'V:1 clef=treble',
                  '(3ABc (3dcB A2 G2 | (3ABc (3def e2 d2 | c3 B A2 G2 | A4 z4 |',
                  '(3efg (3agf e2 c2 | (3dcB (3AGF E2 C2 | (3DEF (3GAB A2 G2 | A4 z4 |]'
                ].join('\n'),
                bpm: 72
              },
              {
                id: 'g7-sr-3',
                title: 'Sight-Reading 3 (F# minor, dotted complex)',
                abc: [
                  'X:1',
                  'T:Sight-Reading 3',
                  'M:3/4',
                  'L:1/16',
                  'Q:1/4=66',
                  'K:F#m',
                  'V:1 clef=treble',
                  'F4 A3B c2d2 | e4 d3c B2A2 | G4 A3B c2A2 | F4 z4 z4 |',
                  'c4 d3e f2e2 | d4 c3B A2G2 | F4 ^E3F G2A2 | F4 z4 z4 |]'
                ].join('\n'),
                bpm: 66
              }
            ]
          },
          // --- Grade 7: Pieces ---
          {
            id: 'g7-pieces',
            type: 'piece',
            title: 'Pieces (Grade 7)',
            description: 'Advanced Romantic and Classical repertoire for Grade 7.',
            exercises: [
              {
                id: 'g7-piece-nocturne',
                title: 'Nocturne Op.9 No.2 - Chopin',
                songRef: 'nocturne-op9-no2',
                bpm: 60
              },
              {
                id: 'g7-piece-sonata-k545',
                title: 'Sonata in C Major K.545 - Mozart',
                songRef: 'sonata-k545',
                bpm: 120
              }
            ]
          }
        ]
      },

      // ============================================================
      // GRADE 8
      // ============================================================
      {
        id: 'grade8',
        name: 'Grade 8',
        description: 'Concert-level technique with double thirds, whole tone scales, chromatic arpeggios, and advanced repertoire.',
        lessons: [
          // --- Grade 8: Scales ---
          {
            id: 'g8-scales',
            type: 'scales',
            title: 'Scales (Grade 8)',
            description: 'Major scale in double thirds (simplified), whole tone scale.',
            exercises: [
              {
                id: 'g8-scale-c-double-thirds',
                title: 'C Major in Double 3rds (simplified, 1 octave)',
                abc: [
                  'X:1',
                  'T:C Major Double 3rds (simplified)',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=66',
                  'K:C',
                  'V:1 clef=treble',
                  '[CE] [DF] [EG] [FA] [GB] [Ac] [Bd] [ce] |',
                  '[ce] [Bd] [Ac] [GB] [FA] [EG] [DF] [CE] |]'
                ].join('\n'),
                bpm: 66
              },
              {
                id: 'g8-scale-g-double-thirds',
                title: 'G Major in Double 3rds (simplified, 1 octave)',
                abc: [
                  'X:1',
                  'T:G Major Double 3rds (simplified)',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=66',
                  'K:G',
                  'V:1 clef=treble',
                  '[GB] [Ac] [Bd] [ce] [df] [eg] [fa] [gb] |',
                  '[gb] [fa] [eg] [df] [ce] [Bd] [Ac] [GB] |]'
                ].join('\n'),
                bpm: 66
              },
              {
                id: 'g8-scale-whole-tone',
                title: 'Whole Tone Scale from C (2 octaves)',
                abc: [
                  'X:1',
                  'T:Whole Tone Scale from C',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=80',
                  'K:none',
                  'V:1 clef=treble',
                  'C D E ^F ^G ^A | c d e ^f ^g ^a |',
                  '^a ^g ^f e d c | ^A ^G ^F E D C |]'
                ].join('\n'),
                bpm: 80
              },
              {
                id: 'g8-scale-whole-tone-db',
                title: 'Whole Tone Scale from Db (2 octaves)',
                abc: [
                  'X:1',
                  'T:Whole Tone Scale from Db',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=80',
                  'K:none',
                  'V:1 clef=treble',
                  '_D _E F G A B | _d _e f g a b |',
                  'b a g f _e _d | B A G F _E _D |]'
                ].join('\n'),
                bpm: 80
              }
            ]
          },
          // --- Grade 8: Arpeggios ---
          {
            id: 'g8-arpeggios',
            type: 'arpeggios',
            title: 'Arpeggios (Grade 8)',
            description: 'Chromatic arpeggio patterns ascending in minor thirds.',
            exercises: [
              {
                id: 'g8-arp-chromatic-pattern-1',
                title: 'Chromatic Arpeggio Pattern (Major triads, ascending)',
                abc: [
                  'X:1',
                  'T:Chromatic Arpeggio Pattern - Major Triads',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=72',
                  'K:C',
                  'V:1 clef=treble',
                  'C E G c | ^C ^E ^G ^c | D ^F A d | _E G _B _e |',
                  'E ^G B e | F A c f | ^F ^A ^c ^f | G B d g |]'
                ].join('\n'),
                bpm: 72
              },
              {
                id: 'g8-arp-chromatic-pattern-2',
                title: 'Chromatic Arpeggio Pattern (Minor triads, ascending)',
                abc: [
                  'X:1',
                  'T:Chromatic Arpeggio Pattern - Minor Triads',
                  'M:4/4',
                  'L:1/8',
                  'Q:1/4=72',
                  'K:C',
                  'V:1 clef=treble',
                  'C _E G c | ^C E ^G ^c | D F A d | _E _G _B _e |',
                  'E G B e | F _A c f | ^F A ^c ^f | G _B d g |]'
                ].join('\n'),
                bpm: 72
              }
            ]
          },
          // --- Grade 8: Sight-Reading ---
          {
            id: 'g8-sight-reading',
            type: 'sight-reading',
            title: 'Sight-Reading (Grade 8)',
            description: 'Concert-level excerpts with advanced rhythms, chromaticism, and key changes.',
            exercises: [
              {
                id: 'g8-sr-1',
                title: 'Sight-Reading 1 (Romantic style, Db Major)',
                abc: [
                  'X:1',
                  'T:Sight-Reading 1 - Romantic Excerpt',
                  'M:4/4',
                  'L:1/16',
                  'Q:1/4=72',
                  'K:Db',
                  'V:1 clef=treble',
                  'D2F2 A2c2 d2f2 a2f2 | e2d2 c2B2 A2G2 F2E2 |',
                  'D2F2 A2d2 f4 e2d2 | c2B2 A2G2 F4 D4 |',
                  'A2B2 c2d2 e2f2 g2a2 | f4 e2d2 c4 A4 |',
                  'B2c2 d2e2 f2e2 d2c2 | D4 F4 D8 |]'
                ].join('\n'),
                bpm: 72
              },
              {
                id: 'g8-sr-2',
                title: 'Sight-Reading 2 (Chromatic, mixed meter)',
                abc: [
                  'X:1',
                  'T:Sight-Reading 2 - Chromatic',
                  'M:5/8',
                  'L:1/8',
                  'Q:1/4=76',
                  'K:C',
                  'V:1 clef=treble',
                  'c B A ^G A | B c d ^d e | f e ^d e d | c B A G2 |',
                  'M:7/8',
                  'E ^F ^G A B c d | e d c B A G ^F | E F G A B c2 |',
                  'M:4/4',
                  'd c B A G ^F E D | C8 |]'
                ].join('\n'),
                bpm: 76
              },
              {
                id: 'g8-sr-3',
                title: 'Sight-Reading 3 (Impressionist style, key change)',
                abc: [
                  'X:1',
                  'T:Sight-Reading 3 - Impressionist',
                  'M:6/8',
                  'L:1/8',
                  'Q:3/8=50',
                  'K:F',
                  'V:1 clef=treble',
                  'F2 A c2 e | d2 c B2 A | G2 B d2 f | e3 c3 |',
                  'K:Gb',
                  'G2 B d2 f | e2 d c2 B | A2 G F2 E | D3 F3 |',
                  'K:F',
                  'A2 c f2 e | d2 c A2 G | F3 A3 | F3 z3 |]'
                ].join('\n'),
                bpm: 50
              }
            ]
          },
          // --- Grade 8: Pieces ---
          {
            id: 'g8-pieces',
            type: 'piece',
            title: 'Pieces (Grade 8)',
            description: 'Concert-level repertoire for Grade 8 examination.',
            exercises: [
              {
                id: 'g8-piece-moonlight',
                title: 'Moonlight Sonata (1st mvt) - Beethoven',
                songRef: 'moonlight-sonata',
                bpm: 56
              },
              {
                id: 'g8-piece-arabesque',
                title: 'Arabesque No.1 - Debussy',
                songRef: 'arabesque-1',
                bpm: 66
              }
            ]
          }
        ]
      }
    ]
  };
})();
