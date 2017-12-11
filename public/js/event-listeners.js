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
      this.handleCatClick();
      this.handleDogClick();
      this.listenersStarted = true;
    }
  },
  
  handleFridgeButtonNew: function() {
    $("body").on("click", ".fridge__button--new", function(){
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
      App.deleteFridgeInAPI(id);
    });
  },

  handleLinks: function() {
    $("body").on("click", ".register-link", function() {
      HTMLRenderer.showSection(".form--register");
    });
    $("body").on("click", ".login-link", function () {
      HTMLRenderer.showSection(".form--login");
      HTMLRenderer.showSpecificElement(".form--login");
    });
    $("body").on("click", ".landing-link", function () {
      HTMLRenderer.showSection(".landing");
      HTMLRenderer.hideElement(".greeting");
      HTMLRenderer.hideElement(".buttons");
      HTMLRenderer.hideElement(".logout");
      App.newLogin = true;
    });
  },

  handleForms: function() {
    const minLength = 5;
    
    $(".form--register").on("submit", function (event) {
      event.preventDefault();

      let username = $(".form--register__username").val();
      let password = $(".form--register__password").val();

      if (username.length < minLength) {
        HTMLRenderer.showError(`Username must be at least ${minLength} characters long`);
        return; 
      }

      if (password.length < minLength) {
        HTMLRenderer.showError(`Password must be at least ${minLength} characters long`);
        return;
      }
      
      App.registerUser(username, password);

      $(".form--register__username").val("");
      $(".form--register__password").val("");
    });
    $(".form--login").on("submit", function (event) {
      event.preventDefault();

      let username = $(".form--login__username").val();
      let password = $(".form--login__password").val();

      App.loginUser(username, password);
      
      $(".form--register__username").val("");
      $(".form--register__password").val("");
    });
  },

  handleLogin: function() {
    $("body").on("click", ".login", function(event) {
      HTMLRenderer.showSpecificElement(".form--login");
      HTMLRenderer.hideSpecificElement(this);
    });
  },

  handleLogout: function() {
    $("body").on("click", ".logout", function (event) {
      HTMLRenderer.showSpecificElement(".login");
      HTMLRenderer.hideSpecificElement(this);
      HTMLRenderer.hideElement(".greeting");
      App.logoutUser();
    });
  },

  handleCatClick: function() {
    $(".picture--cat").click(function(event) {
      var audio = document.getElementById("audio");
      audio.play();
    });
  },

  handleDogClick: function () {
    $(".picture--dog").click(function (event) {
      var audio = document.getElementById("audio2");
      audio.play();
    });
  },

  handleDragDrop: function() {
    $(".word-bank").sortable({
      connectWith: ".poem",
      items: ".word",
      start: function(event, ui) {
        const maxAngle = 10;
        let angle = Math.floor(Math.random() * maxAngle) - (maxAngle / 2);
        $(ui.item).css({
          '-webkit-transform': 'rotate(' + angle + 'deg)',
          '-moz-transform': 'rotate(' + angle + 'deg)',
          '-ms-transform': 'rotate(' + angle + 'deg)',
          'transform': 'rotate(' + angle + 'deg)'
        });
      },
      stop: function(event, ui) {
      }
    });
    
    $(".poem").sortable({
      connectWith: ".word-bank",
      items: ".word",
      start: function (event, ui) {
        console.log($(ui.item));
        const maxAngle = 10;
        let angle = Math.floor(Math.random() * maxAngle) - (maxAngle / 2);
        $(ui.item).css({
          '-webkit-transform': 'rotate(' + angle + 'deg)',
          '-moz-transform': 'rotate(' + angle + 'deg)',
          '-ms-transform': 'rotate(' + angle + 'deg)',
          'transform': 'rotate(' + angle + 'deg)'
        });
      },
      update: function (event, ui) {
        let updatedPoem = [];
        
        $(".poem .word").each(function (index) {
          updatedPoem.push(this.innerText);
          
        });
        HTMLRenderer.displayTwitterButton(updatedPoem, true);
      }
    });
  },
};
