const EventListeners = {
  startListeners: function() {
    this.handleFridgeButtonNew();
    this.handleFridgeButtonSave();
    this.handleFridgeButtonClear();
    this.handleFridgeButtonWords();
  },
  
  handleFridgeButtonNew: function() {
    $("body").on("click", ".fridge__button--new", function(){
      HTMLRenderer.displayNewFridge(App.getRandomFridge());
    });
  },

  handleFridgeButtonSave: function() {
    $("body").on("click", ".fridge__button--save", function () {
      let sortedItems = $.makeArray($(".fridge .word"));
      let texts = [];

      sortedItems.forEach((item, index) => {
        texts.push(item.innerHTML);
      });

      App.saveFridge(texts);
    });
  },

  handleFridgeButtonClear: function() {
    $("body").on("click", ".fridge__button--clear", function () {
      HTMLRenderer.emptySection($(".fridge"));
    });
  },

  handleFridgeButtonWords: function() {
    $("body").on("click", ".fridge__button--words", function () {
      HTMLRenderer.emptySection($(".words"));
      HTMLRenderer.displayWords(App.getRandomWords(WORD_POOL, 3));
    });
  },

  handleDragDrop: function() {
    $(".words").sortable({
      connectWith: ".fridge",
      items: ".word",
      tolerance: "pointer"
    });
    
    $(".fridge").sortable({
      connectWith: ".words",
      items: ".word",
      tolerance: "pointer"
    });
  }
};