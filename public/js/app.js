const App = {
  fridges: [],
  activeFridge: 0,

  registerUser: function(username, password) {
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/api/auth/register",
      contentType: "application/json",
      data: JSON.stringify({ username: username, password: password })
    })
      .done(function (result) {
        console.log(result);
        HTMLRenderer.showSection(".form--login");
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  loginUser: function(username, password) {
    console.log(`${username} ${password}`);
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/api/auth/login",
      contentType: "application/json",
      data: JSON.stringify({ username: username, password: password })
    })
      .done(function (result) {
        const {authToken} = result;
        localStorage.setItem("token", authToken);
        HTMLRenderer.showSection(".fridge");
        // const authToken = localStorage.getItem("token");
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  getFridges: function() {
    $.ajax({
      method: "GET",
      url: "http://localhost:8080/fridges",
      contentType: "application/json"
    })
      .done(function (result) {
        return App.populateFridges(result);
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  addFridge: function(wordBank, poem) {
    const token = localStorage.getItem("token");
    
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/fridges",
      contentType: "application/json",
      data: JSON.stringify({ wordBank: wordBank, poem: poem }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .done(function (result) {
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  updateFridge: function (id, wordBank, poem) {
    const token = localStorage.getItem("token");
    console.log(id);
    $.ajax({
      method: "PUT",
      url: `http://localhost:8080/fridges/${id}`,
      contentType: "application/json",
      data: JSON.stringify({id: id, wordBank: wordBank, poem: poem }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .done(function (result) {
        console.log("updating fridge locally");
        return App.updateFridgeLocal(poem, wordBank);
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  reset: function() {
    this.getFridges();
  },

  getRandomFridge: function() {
    let randomIndex = Math.floor(Math.random() * this.fridges.length);
    let randomFridge = this.fridges[randomIndex];

    this.activeFridge = randomIndex;
    return randomFridge;
  },

  saveFridge: function(wordbank, poem) {
    let newFridge = {
      wordBank: wordbank,
      poem: poem,
      authors: ["newguy123"]
    };
    
    this.fridges.push(newFridge);
    return newFridge;
  },

  updateFridgeLocal: function(poem, wordBank) {
    let currentFridge = this.fridges[this.activeFridge];
    currentFridge.poem = poem;
    currentFridge.wordBank = wordBank;
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

  populateFridges(data) {
    App.fridges = [];
    data.forEach((item, index) => {
      App.fridges.push(item);
    });
    // TODO - clean this up
    EventListeners.startListeners();
    HTMLRenderer.displayFridge(this.getRandomFridge());
  }
};

$(App.reset());