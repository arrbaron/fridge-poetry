const App = {
  currentUser: "",

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
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/api/auth/login",
      contentType: "application/json",
      data: JSON.stringify({ username: username, password: password })
    })
      .done(function (result) {
        const {authToken} = result;
        App.currentUser = username;
        localStorage.setItem("token", authToken);
        HTMLRenderer.showSection(".fridge");
        HTMLRenderer.displayUserInfo(App.currentUser);
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  getRandomFridgeFromAPI: function() {
    $.ajax({
      method: "GET",
      url: "http://localhost:8080/fridges/random",
      contentType: "application/json"
    })
      .done(function (result) {
        console.log(result);
        HTMLRenderer.displayFridge(result);
        // return result;
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  getAllFridgesFromAPI: function() {
    $.ajax({
      method: "GET",
      url: "http://localhost:8080/fridges",
      contentType: "application/json"
    })
      .done(function (result) {
        
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  getFridgeFromAPI: function(id) {
    $.ajax({
      method: "GET",
      url: `http://localhost:8080/fridges/${id}`,
      contentType: "application/json"
    })
      .done(function (result) {
        HTMLRenderer.displayFridge(result);
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  saveFridgeToAPI: function(wordBank, poem, author) {
    const token = localStorage.getItem("token");
    
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/fridges",
      contentType: "application/json",
      data: JSON.stringify({ wordBank: wordBank, poem: poem, authors: author }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .done(function (result) {
        console.log(result);
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  updateFridgeInAPI: function (id, wordBank, poem, author) {
    const token = localStorage.getItem("token");
    console.log(id);
    $.ajax({
      method: "PUT",
      url: `http://localhost:8080/fridges/${id}`,
      contentType: "application/json",
      data: JSON.stringify({id: id, wordBank: wordBank, poem: poem, authors: author }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .done(function (result) {
        return result;
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  deleteFridgeInAPI: function(id) {
    const token = localStorage.getItem("token");
    console.log(id);
    $.ajax({
      method: "DELETE",
      url: `http://localhost:8080/fridges/${id}`,
      contentType: "application/json",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .done(function (result) {
        App.getRandomFridgeFromAPI();
        return result;
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  reset: function() {
    this.getRandomFridgeFromAPI();
    EventListeners.startListeners();
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
};

$(App.reset());