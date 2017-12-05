const EventListeners = {
  startListeners: function() {
    this.handleFridgeButtonNew();
    this.handleFridgeButtonCreate();
    this.handleFridgeButtonSave();
    this.handleFridgeButtonClear();
    this.handleFridgeButtonWords();
    this.handleLinks();
    this.handleForms();
  },
  
  handleFridgeButtonNew: function() {
    $("body").on("click", ".fridge__button--new", function(){
      HTMLRenderer.displayFridge(App.getRandomFridge());
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

      App.addFridge(wordBank, poem);
      App.saveFridge(wordBank, poem);
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
    $("body").on("click", ".fridge__button--update", function () {
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
      
      App.updateFridge(id, wordBank, poem);
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
    });
  },

  handleForms: function() {
    $(".form--register").on("submit", function (event) {
      event.preventDefault();

      let username = $(".form--register__username").val();
      let password = $(".form--register__password").val();

      console.log(`${username} ${password}`);
      App.registerUser(username, password);

      $(".form--register__username").val("");
      $(".form--register__password").val("");
    });
    $(".form--login").on("submit", function (event) {
      event.preventDefault();

      let username = $(".form--login__username").val();
      let password = $(".form--login__password").val();

      console.log(`${username} ${password}`);
      App.loginUser(username, password);

      $(".form--register__username").val("");
      $(".form--register__password").val("");
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