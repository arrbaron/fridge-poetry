const App = {
  fridges: [],
  activeFridge: {},

  reset: function() {
    this.seedFridges(5);
    EventListeners.startListeners();
    HTMLRenderer.displayWords(App.getRandomWords(WORD_POOL, 3));
    HTMLRenderer.displayNewFridge(this.getRandomFridge());
  },

  getRandomFridge: function() {
    let randomFridge = this.fridges[Math.floor(Math.random() * this.fridges.length)];

    activeFridge = randomFridge;
    console.log(this.fridges);
    return randomFridge;
  },


  saveFridge: function(data) {
    let newFridge = {
      words: [],
      authors: [
        "newguy123"
      ],
      votes: 8000,
      dates: 12345,
    };
    
    data.forEach(function(item, index) {
      newFridge.words.push(data[index]);
    });

    this.fridges.push(newFridge);
    return newFridge;
  },

  getRandomWords: function(words, count) {
    let randomWords = [];

    for (let partOfSpeech in WORD_POOL) {
      for (let i = 0; i < count; i++) {
        let wordToAdd = WORD_POOL[partOfSpeech][Math.floor(Math.random() * WORD_POOL[partOfSpeech].length)];
        randomWords.push(wordToAdd);
      }
    }
    return randomWords;
  },

  seedFridges: function(count) {
    for (let i = 0; i < count; i++) {
      this.saveFridge(this.getRandomWords(WORD_POOL, 1));
    }
  }
};

$(App.reset());