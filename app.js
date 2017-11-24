const App = {
  haikus: [],

  reset: function () {
    EventListeners.startListeners();
  },

  createHaiku: function (parts) {
    let newHaiku = {
      beginning: parts[0],
      middle: parts[1],
      ending: parts[2]
    };

    this.haikus.push(newHaiku);
    // HTMLRenderer.displayNewHaiku(newHaiku);
    return newHaiku;
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

    // TODO - validate this is a valid verse
    // this.insertVerse(newVerse);
    return newVerse;
  },

  insertVerse: function (newVerse) {
    console.log("insertVerse" + newVerse.text);

    const { edges, centers } = MOCK_VERSES;
    let partsToInsert = [this.getRandomVerse(edges), this.getRandomVerse(centers), this.getRandomVerse(edges)];

    // choose a list randomly
    let lines = [edges, centers];
    let randomIndex = Math.floor(Math.random() * lines.length);
    let randomLine = lines[randomIndex];

    // put our verse into that list
    randomLine.push(newVerse);

    // replace the appropriate part with our new verse
    for (let i = 0; i < partsToInsert.length; i++) {
      if (i === randomIndex) {
        partsToInsert[i] = newVerse;
      }
    }
    // create a new haiku with our verse and two other verses

    return [partsToInsert[0], partsToInsert[1], partsToInsert[2]];
  },

  seedData: function (data) {
    const seedCount = 3;

    for (let i = 0; i < seedCount; i++) {
      this.createHaiku([this.getRandomVerse(MOCK_VERSES.edges), this.getRandomVerse(MOCK_VERSES.centers), this.getRandomVerse(MOCK_VERSES.edges)]);
    }

    HTMLRenderer.displayHaikus(this.haikus);
  },

  getRandomWords: function(words, count) {
    let randomWords = [];

    for (let partOfSpeech in WORD_POOL) {
      for (let i = 0; i < count; i++) {
        let wordToAdd = WORD_POOL[partOfSpeech][Math.floor(Math.random() * WORD_POOL[partOfSpeech].length)];
        randomWords.push(wordToAdd);
      }
    }

    console.log(randomWords);
    return randomWords;
  },

  addWord: function(word) {
    
  }
};

HTMLRenderer.displayWords(App.getRandomWords(WORD_POOL, 3));
$(App.reset());