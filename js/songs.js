(function() {
  'use strict';

  window.PianoApp = window.PianoApp || {};

  window.PianoApp.Songs = [
    // ==================== GRADE 4 ====================
    {
      id: 'bach-minuet-g',
      title: 'Minuet in G Major',
      composer: 'J.S. Bach',
      genre: 'classical',
      difficulty: 4,
      abc: [
        'X:1',
        'T:Minuet in G Major',
        'C:J.S. Bach (BWV Anh. 114)',
        'M:3/4',
        'L:1/8',
        'Q:1/4=120',
        'K:G',
        'd2 GABc|d2 G2 G2|e2 cdef|g2 G2 G2|',
        'c2 dcBA|B2 cBAG|F2 GABc|d2 A2 A2|',
        'd2 GABc|d2 G2 G2|e2 cdef|g2 G2 G2|',
        'c2 dcBA|B2 cBAG|A2 BAGF|G4 z2|',
        'b2 gab2|a2 fga2|g2 efge|d2 B2 d2|',
        'e2 dcBA|B2 cBAG|A2 BcdD|G4 z2|]'
      ].join('\n')
    },
    {
      id: 'ode-to-joy',
      title: 'Ode to Joy',
      composer: 'Ludwig van Beethoven',
      genre: 'classical',
      difficulty: 4,
      abc: [
        'X:1',
        'T:Ode to Joy',
        'C:Ludwig van Beethoven',
        'M:4/4',
        'L:1/4',
        'Q:1/4=108',
        'K:D',
        'F F G A|A G F E|D D E F|F3/2 E/ E2|',
        'F F G A|A G F E|D D E F|E3/2 D/ D2|',
        'E E F D|E F/G/ F D|E F/G/ F E|D E A,2|',
        'F F G A|A G F E|D D E F|E3/2 D/ D2|]'
      ].join('\n')
    },

    // ==================== GRADE 5 ====================
    {
      id: 'fur-elise',
      title: 'Fur Elise',
      composer: 'Ludwig van Beethoven',
      genre: 'classical',
      difficulty: 5,
      abc: [
        'X:1',
        'T:Fur Elise',
        'C:Ludwig van Beethoven',
        'M:3/8',
        'L:1/16',
        'Q:3/8=60',
        'K:Am',
        'e^de|e^deB dc|A2 z CEA|B2 z E^GB|',
        'c2 z Ee^d|e^deB dc|A2 z CEA|B2 z EcB|',
        'A2 z e^de|e^deB dc|A2 z CEA|B2 z E^GB|',
        'c2 z Ee^d|e^deB dc|A2 z CEA|B2 z EcB|',
        'A2 z BcD|E2 F E2 D|C2 D C2 B,|A,2 B, C2 D|',
        'E2 F G2 A|B2 c d2 e|f2 e d2 c|B2 z e^de|',
        'e^deB dc|A2 z CEA|B2 z E^GB|c2 z Ee^d|',
        'e^deB dc|A2 z CEA|B2 z EcB|A2 z2 z|]'
      ].join('\n')
    },
    {
      id: 'prelude-c-major',
      title: 'Prelude in C Major',
      composer: 'J.S. Bach',
      genre: 'classical',
      difficulty: 5,
      abc: [
        'X:1',
        'T:Prelude in C Major',
        'C:J.S. Bach (BWV 846)',
        'M:4/4',
        'L:1/16',
        'Q:1/4=72',
        'K:C',
        'z2 CEGc EGcE GcEG|z2 CEGc EGcE GcEG|',
        'z2 CDA,d DA,dD A,dDA,|z2 CDA,d DA,dD A,dDA,|',
        'z2 B,DGd DGdD GdDG|z2 B,DGd DGdD GdDG|',
        'z2 CEAe EAeE AeEA|z2 CEAe EAeE AeEA|',
        'z2 CEAe EAeE AeEA|z2 CDA,d DA,dD A,dDA,|',
        'z2 B,DGB DGdD GDGB|z2 B,CEG CEcE GECG|',
        'z2 A,CEA CEaE ACEA|z2 D,A,DF A,DfD FA,DF|',
        'z2 G,B,DG B,DgD GB,DG|z2 G,_B,CE _B,CeC E_B,CE|',
        'z2 A,CEA CEaE ACEA|z2 ^F,A,D^F A,D^fD ^FA,D^F|',
        'z2 G,B,DG B,DgD GB,DG|]'
      ].join('\n')
    },

    // ==================== GRADE 6 ====================
    {
      id: 'invention-1',
      title: 'Invention No. 1 in C Major',
      composer: 'J.S. Bach',
      genre: 'classical',
      difficulty: 6,
      abc: [
        'X:1',
        'T:Invention No. 1 in C Major',
        'C:J.S. Bach (BWV 772)',
        'M:4/4',
        'L:1/16',
        'Q:1/4=80',
        'K:C',
        'z2 CDEFDEc2 z2 GFE|z2 G,A,B,CA,B, C2 z2 EDC|',
        'z2 cde^fde g2 z2 bag|z2 e^fga^fg a2 z2 dcB|',
        'ABAG ^FGAB cBcd edcB|AGAB cBcA dcde fedc|',
        'BAGA BGAB cBcd edcB|cBAG ^FGAB cdef gedc|',
        'BAGA BGAB cdec dBcA|BGAd Bgab ceag ^fedc|',
        'Bcdc BABc dcBA GFED|CDEC DEGA BcBA GFED|',
        'EFGE FAdc BGFG ECDC|B,G,A,B, CEDc B,A,G,A, G,4|]'
      ].join('\n')
    },
    {
      id: 'waltz-a-minor',
      title: 'Waltz in A Minor',
      composer: 'Frederic Chopin',
      genre: 'classical',
      difficulty: 6,
      abc: [
        'X:1',
        'T:Waltz in A Minor',
        'C:Frederic Chopin (B.150)',
        'M:3/4',
        'L:1/8',
        'Q:1/4=132',
        'K:Am',
        'E2|c2 B2|A2 Bc|d2 c2|B2 GE|',
        'c2 B2|A2 Bc|d2 cB|A4|',
        'E2 e2|d2 cB|c2 BA|^G2 EE|',
        'c2 B2|A2 Bc|d2 cB|A4|',
        'e2 e2|f2 ed|e2 dc|B2 AB|',
        'c2 BA|^G2 AB|c2 BA|^G4|',
        'e2 e2|f2 ed|e2 dc|B2 AB|',
        'c2 d2|e2 dc|B2 cB|A4|]'
      ].join('\n')
    },

    // ==================== GRADE 7 ====================
    {
      id: 'nocturne-op9-no2',
      title: 'Nocturne Op. 9 No. 2',
      composer: 'Frederic Chopin',
      genre: 'classical',
      difficulty: 7,
      abc: [
        'X:1',
        'T:Nocturne Op. 9 No. 2',
        'C:Frederic Chopin',
        'M:12/8',
        'L:1/8',
        'Q:1/4=60',
        'K:Eb',
        'z3 z2 B|B6 c3 B2 G|',
        'F3-F2 E E6|z3 z2 B|',
        'B3 c3 e3 dcB|c6 z3 z2 B|',
        'B3 BAG A3 GFE|F3 E3 E6|',
        'z6 z3 z2 B|B3 c2 d e3 dcB|',
        'c3 B3 G6|z3 z2 F F3 EFG|',
        'A3 GFE F3-F2 E|E6 z6|',
        'z3 z2 B B6|c3 e2 d c3 BAG|',
        'F3-F3 E6|]'
      ].join('\n')
    },
    {
      id: 'sonata-k545',
      title: 'Sonata K.545 1st Movement',
      composer: 'Wolfgang Amadeus Mozart',
      genre: 'classical',
      difficulty: 7,
      abc: [
        'X:1',
        'T:Sonata K.545 1st Movement',
        'C:Wolfgang Amadeus Mozart',
        'M:4/4',
        'L:1/16',
        'Q:1/4=120',
        'K:C',
        'c4 e4 g4 e4|f8 d8|c4 e4 g4 e4|d8 B8|',
        'c4 dcdc BABc|d4 edcB AGFE|',
        'G4 cdec defg|a4 gfed c4 B4|',
        'c4 z4 z8|cBcA BFGB AEFG FDEG|',
        'CEDc BABc dcde fedc|BAGd BGAB cBcd edcB|',
        'c2B2 c2d2 e4 z4|efge afge dfge cfge|',
        'BGAB cdec defg agfe|dcBA GABc d2e2 f2d2|',
        'e4 c4 d4 B4|c8 z8|]'
      ].join('\n')
    },

    // ==================== GRADE 8 ====================
    {
      id: 'moonlight-sonata',
      title: 'Moonlight Sonata 1st Movement',
      composer: 'Ludwig van Beethoven',
      genre: 'classical',
      difficulty: 8,
      abc: [
        'X:1',
        'T:Moonlight Sonata 1st Movement',
        'C:Ludwig van Beethoven (Op. 27 No. 2)',
        'M:4/4',
        'L:1/8',
        'Q:1/4=56',
        'K:C#m',
        'EEE EEE EEE EEE|EEE EEE EEE EEE|',
        'z ^G,C ^G,C ^G,C E|z ^G,C ^G,C ^G,C E|',
        'z ACA CAC A|z ^G,CE ^G,CE ^G,|',
        'z ^G,B,E B,EB, EB,E|z ACE ACE AC|',
        'z ^G,CE CEG, CE|z A,CE CEA, CE|',
        'z B,EG, EG,B, EG,|z B,^D^F ^DFB, ^DF|',
        'z CEG, EG,C EG,|z B,E^G, E^G,B, E^G,|',
        'z A,CE CEA, CE|z ^G,B,E B,EB, EB,|',
        'z ^G,CE ^G,CE ^G,|z A,CE A,CE A,|',
        'z ^G,CE ^G,CE ^G,|C,8 z4|]'
      ].join('\n')
    },
    {
      id: 'arabesque-1',
      title: 'Arabesque No. 1',
      composer: 'Claude Debussy',
      genre: 'classical',
      difficulty: 8,
      abc: [
        'X:1',
        'T:Arabesque No. 1',
        'C:Claude Debussy',
        'M:4/4',
        'L:1/16',
        'Q:1/4=72',
        'K:E',
        'z4 EFG2 A4 G2FE|F4 E4 z4 B,4|',
        'z4 EFG2 A4 G2FE|F4 E4 z4 E4|',
        'z2 E2 F2G2 A2B2 c2B2|A4 G2F2 E8|',
        'z2 E2 F2G2 A2B2 c2d2|e4 d2c2 B4 A4|',
        'G4 F2E2 F4 G4|A4 B2c2 B4 A4|',
        'G4 A2B2 c4 B2A2|G2A2 B2c2 d4 e4|',
        'z2 e2 d2c2 B2c2 d2c2|B4 A4 G4 F4|',
        'E8 z4 E4|F4 G4 A4 B4|',
        'c4 B2A2 G4 F4|E8 z8|]'
      ].join('\n')
    }
  ];

})();
