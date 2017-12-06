const EventListeners = {
  listenersStarted: false,
  
  startListeners: function() {
    if (!this.listenersStarted) {
      this.handleFridgeButtonNew();
      this.handleFridgeButtonCreate();
      this.handleFridgeButtonSave();
      this.handleFridgeButtonClear();
      this.handleFridgeButtonWords();
      this.handleLogin();
      this.handleLogout();
      this.handleLinks();
      this.handleForms();
      this.listenersStarted = true;
    }
  },
  
  handleFridgeButtonNew: function() {
    $("body").on("click", ".fridge__button--new", function(){
      // HTMLRenderer.displayFridge(App.getRandomFridge());
      // HTMLRenderer.displayFridge(App.getRandomFridgeFromAPI());
      App.getRandomFridgeFromAPI();
    });
  },

  handleFridgeButtonCreate: function () {
    $("body").on("click", ".fridge__button--create", function () {
      HTMLRenderer.displayFridge();
    });
  },

  handleFridgeButtonSave: function() {
    $("body").on("click", ".fridge__button--save", function () {
      let sortedPoem = $.makeArray($(".fridge .poem .word"));
      let sortedWordBank = $.makeArray($(".fridge .word-bank .word"));
      let poem = [];
      let wordBank = [];

      sortedPoem.forEach((item, index) => {
        poem.push(item.innerText);
      });

      sortedWordBank.forEach((item, index) => {
        wordBank.push(item.innerText);
      });

      App.saveFridgeToAPI(wordBank, poem, App.currentUser);
    });
  },

  handleFridgeButtonClear: function() {
    $("body").on("click", ".fridge__button--clear", function () {
      HTMLRenderer.emptySection($(".poem"));
    });
  },

  handleFridgeButtonWords: function() {
    $("body").on("click", ".fridge__button--words", function () {
      HTMLRenderer.emptySection($(".words"));
      HTMLRenderer.displayWordBank(App.getRandomWords(WORD_BANK, 3));
    });
  },

  handleFridgeButtonUpdate: function(id) {
    console.log(id);
    $(".fridge__button--update").off();
    $(".fridge__button--update").on("click", function () {
      let sortedPoem = $.makeArray($(".fridge .poem .word"));
      let sortedWordBank = $.makeArray($(".fridge .word-bank .word"));
      let poem = [];
      let wordBank = [];

      sortedPoem.forEach((item, index) => {
        poem.push(item.innerText);
      });

      sortedWordBank.forEach((item, index) => {
        wordBank.push(item.innerText);
      });
      
      App.updateFridgeInAPI(id, wordBank, poem, App.currentUser);
    });
  },

  handleFridgeButtonDelete: function(id) {
    $(".fridge__button--delete").off();
    $(".fridge__button--delete").on("click", function () {
      console.log(id);
      App.deleteFridgeInAPI(id);
    });
  },

  handleLinks: function() {
    $("body").on("click", ".register-link", function() {
      HTMLRenderer.showSection(".form--register");
    });
    $("body").on("click", ".login-link", function () {
      HTMLRenderer.showSection(".form--login");
    });
    $("body").on("click", ".landing-link", function () {
      HTMLRenderer.showSection(".landing");
      HTMLRenderer.hideElement(".greeting");
    });
  },

  handleForms: function() {
    $(".form--register").on("submit", function (event) {
      event.preventDefault();

      let username = $(".form--register__username").val();
      let password = $(".form--register__password").val();
      
      App.registerUser(username, password);

      $(".form--register__username").val("");
      $(".form--register__password").val("");
    });
    $(".form--login").on("submit", function (event) {
      event.preventDefault();

      let username = $(".form--login__username").val();
      let password = $(".form--login__password").val();

      App.loginUser(username, password);
      HTMLRenderer.hideElement(".login");
      HTMLRenderer.showElement(".logout");
      HTMLRenderer.showElement(".greeting");
      HTMLRenderer.displayUserInfo(App.currentUser);

      $(".form--register__username").val("");
      $(".form--register__password").val("");
    });
  },

  handleLogin: function() {
    $("body").on("click", ".login", function(event) {
      HTMLRenderer.showElement(".form--login");
      HTMLRenderer.hideElement(this);
    });
  },

  handleLogout: function() {
    $("body").on("click", ".logout", function (event) {
      HTMLRenderer.showElement(".login");
      HTMLRenderer.hideElement(this);
      HTMLRenderer.hideElement(".greeting");
      App.logoutUser();
    });
  },

  handleDragDrop: function() {
    $(".word-bank").sortable({
      connectWith: ".poem",
      items: ".word"
    });
    
    $(".poem").sortable({
      connectWith: ".word-bank",
      items: ".word"
    });
  }
};