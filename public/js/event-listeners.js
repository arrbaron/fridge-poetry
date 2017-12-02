const EventListeners = {
  startListeners: function() {
    this.handleFridgeButtonNew();
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

  handleFridgeButtonSave: function() {
    $("body").on("click", ".fridge__button--save", function () {
      let sortedItems = $.makeArray($(".fridge .poem .word"));
      let texts = [];

      sortedItems.forEach((item, index) => {
        console.log(item.innerText);
        texts.push(item.innerText);
      });

      App.saveFridge(texts);
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