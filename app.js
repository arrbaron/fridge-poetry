const App = {
  poems: [],

  reset: function () {
    EventListeners.startListeners();
    HTMLRenderer.displayWords(App.getRandomWords(WORD_POOL, 3));
  },

  createPoem: function (parts) {
    let newPoem = {
      beginning: parts[0],
      middle: parts[1],
      ending: parts[2]
    };

    this.poems.push(newPoem);
    return newPoem;
  },

  getRandomVerse: function (data) {
    let randomVerse;

    randomVerse = data[Math.floor(Math.random() * data.length)];
    return randomVerse;
  },

  createVerse: function (verse) {
    let newVerse = {
      id: 190880,
      text: verse,
      author: "newAuthor",
      date: 190909
    };

    return newVerse;
  },

  insertVerse: function (newVerse) {
    // get 3 random verses
    let partsToInsert = [this.getRandomVerse(MOCK_VERSES), this.getRandomVerse(MOCK_VERSES), this.getRandomVerse(MOCK_VERSES)];
    let randomIndex = Math.floor(Math.random() * partsToInsert.length);

    MOCK_VERSES.push(newVerse);

    // replace a random verse with our new verse
    for (let i = 0; i < partsToInsert.length; i++) {
      if (i === randomIndex) {
        partsToInsert[i] = newVerse;
      }
    }

    // return our verse and two other random verses
    return [partsToInsert[0], partsToInsert[1], partsToInsert[2]];
  },

  seedData: function (data) {
    const seedCount = 3;

    for (let i = 0; i < seedCount; i++) {
      this.createPoem([this.getRandomVerse(MOCK_VERSES.verses), this.getRandomVerse(MOCK_VERSES.centers), this.getRandomVerse(MOCK_VERSES.verses)]);
    }

    HTMLRenderer.displayPoems(this.poems);
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

  addWord: function(word) {
    
  }
};

$(App.reset());