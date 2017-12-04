const App = {
  fridges: [],
  activeFridge: {},

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
        console.log(authToken);
        console.log(password);
        HTMLRenderer.showSection(".fridge");
        // const authToken = localStorage.getItem("token");
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  accessEndPoint: function() {
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/api/auth/login",
      contentType: "application/json",
      data: JSON.stringify({ username: "user", password: "password" }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      } 
    })
      .done(function (result) {
        const { authToken } = result;
        localStorage.setItem("token", authToken);
        // const authToken = localStorage.getItem("token");
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
        // add it to the database
        
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

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