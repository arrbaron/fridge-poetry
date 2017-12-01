const App = {
  fridges: [],
  activeFridge: {},

  reset: function() {
    this.seedFridges(5);
    EventListeners.startListeners();
    HTMLRenderer.displayFridge(this.getRandomFridge());
  },

  getRandomFridge: function() {
    let randomFridge = this.fridges[Math.floor(Math.random() * this.fridges.length)];

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

    for (let partOfSpeech in WORD_BANK) {
      for (let i = 0; i < count; i++) {
        let wordToAdd = WORD_BANK[partOfSpeech][Math.floor(Math.random() * WORD_BANK[partOfSpeech].length)];
        randomWords.push(wordToAdd);
      }
    }
    return randomWords;
  },

  seedFridges: function(count) {
    for (let i = 0; i < count; i++) {
      this.saveFridge(this.getRandomWords(WORD_BANK, 1));
    }
  }
};

$(App.reset());