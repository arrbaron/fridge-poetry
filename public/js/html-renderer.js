const HTMLRenderer = {
  displayAllPoems: function(data) {
    $(".poems").empty();
    data.forEach((item, index) => {
      $(".poems").append(`
        <div class="poem">
        <p>${item.beginning.text}</p>
        <p>${item.middle.text}</p>
        <p>${item.ending.text}</p>
        </div>
      `);
    });
  },

  displayFridge: function(fridge) {
    console.log(fridge);
    this.clearFridge();
    if (fridge) {
      this.displayWordBank(fridge.wordBank);
      EventListeners.handleFridgeButtonUpdate(fridge._id);
      EventListeners.handleFridgeButtonDelete(fridge._id);
    }
    else {
      this.displayWordBank(App.getRandomWords(WORD_BANK, 3));
    }
    this.displayPoem(fridge);
  },

  displayPoem: function(poem) {
    if (poem) {
      poem.poem.forEach((item, index) => {
        $(".poem").append(`
        <div class="word">${item}</div>
      `);
      });
    }
  },

  displayWordBank: function(words) {
    words.forEach((item, index) => {
      $(".word-bank").append(`
        <div class="word">${item}</div>
      `);
    });
    EventListeners.handleDragDrop();
  },

  clearFridge: function() {
    $(".poem").empty();
    $(".word-bank").empty();
  },

  emptySection: function(section) {
    $(section).empty();
  },

  showSection: function(section) {
    const sections = [".landing", ".form", ".fridge"];

    sections.forEach((item, index) => {
      $(item).prop("hidden", true);
    });
  
    $(section).prop("hidden", false);
  }
};