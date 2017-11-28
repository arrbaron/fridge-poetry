const EventListeners = {
  startListeners: function() {
    this.handleFridgeButtonNew();
    this.handleFridgeButtonSave();
    this.handleFridgeButtonClear();
    this.handleFridgeButtonWords();
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