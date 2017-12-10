const App = {
  currentUser: "",
  newLogin: true,

  registerUser: function(username, password) {
    $.ajax({
      method: "POST",
      url: "https://fridge-poetry.herokuapp.com/api/auth/register",
      contentType: "application/json",
      data: JSON.stringify({ username: username, password: password })
    })
      .done(function (result) {
        console.log(result);
        HTMLRenderer.showSection(".form--login");
      })
      .fail(function () {
        console.log("couldn't register");
        HTMLRenderer.showAlert(".alert--register");
      });
  },

  loginUser: function(username, password) {
    $.ajax({
      method: "POST",
      url: "https://fridge-poetry.herokuapp.com/api/auth/login",
      contentType: "application/json",
      data: JSON.stringify({ username: username, password: password })
    })
      .done(function (result) {
        const {authToken} = result;
        App.currentUser = username;
        localStorage.setItem("token", authToken);
        HTMLRenderer.displayUserInfo(App.currentUser);
        HTMLRenderer.showSpecificElement(".logout");
        HTMLRenderer.hideSpecificElement(".form--login");
        HTMLRenderer.showElement(".greeting");
        HTMLRenderer.displayUserInfo(App.currentUser);
        HTMLRenderer.hideElement(".login");
        HTMLRenderer.showElement(".logout");
        if (App.newLogin) {
          App.getRandomFridgeFromAPI();
          HTMLRenderer.showSection(".fridge");
          HTMLRenderer.showElement(".buttons");
          App.newLogin = false;
        }
      })
      .fail(function () {
        console.error("couldn't log in");
        HTMLRenderer.showError("Incorrect username/password");
      });
  },

  logoutUser: function() {
    localStorage.removeItem("token");
  },

  getRandomFridgeFromAPI: function() {
    $.ajax({
      method: "GET",
      url: "https://fridge-poetry.herokuapp.com/fridges/random",
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
      url: "https://fridge-poetry.herokuapp.com/fridges",
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
      url: `https://fridge-poetry.herokuapp.com/fridges/${id}`,
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
      url: "https://fridge-poetry.herokuapp.com/fridges",
      contentType: "application/json",
      data: JSON.stringify({ wordBank: wordBank, poem: poem, authors: author }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .done(function (result) {
        console.log(result);
        HTMLRenderer.showAlert(".alert--save");
        // HTMLRenderer.displayFridge(result);
        return result;
      })
      .fail(function () {
        HTMLRenderer.showAlert(".alert--unauthorized");
      });
  },

  updateFridgeInAPI: function (id, wordBank, poem, author) {
    const token = localStorage.getItem("token");
    console.log(id);
    $.ajax({
      method: "PUT",
      url: `https://fridge-poetry.herokuapp.com/fridges/${id}`,
      contentType: "application/json",
      data: JSON.stringify({id: id, wordBank: wordBank, poem: poem, authors: author }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .done(function (result) {
        HTMLRenderer.showAlert(".alert--update");
        HTMLRenderer.displayFridge(result);
        return result;
      })
      .fail(function () {
        HTMLRenderer.showAlert(".alert--unauthorized");
      });
  },

  deleteFridgeInAPI: function(id) {
    const token = localStorage.getItem("token");
    console.log(id);
    $.ajax({
      method: "DELETE",
      url: `https://fridge-poetry.herokuapp.com/fridges/${id}`,
      contentType: "application/json",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .done(function (result) {
        App.getRandomFridgeFromAPI();
        HTMLRenderer.showAlert(".alert--delete");
        return result;
      })
      .fail(function () {
        HTMLRenderer.showAlert(".alert--unauthorized");
      });
  },

  reset: function() {
    // this.getRandomFridgeFromAPI();
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