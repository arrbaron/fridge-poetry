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
    this.displayWordBank(App.getRandomWords(WORD_BANK, 3));
    this.displayPoem(fridge);
  },

  displayPoem: function(poem) {
    $(".poem").empty();
    
    poem.words.forEach((item, index) => {
      $(".poem").append(`
        <div class="word">${item}</div>
      `);
    });
  },

  displayWordBank: function(words) {
    $(".word-bank").empty();
    
    words.forEach((item, index) => {
      $(".word-bank").append(`
        <div class="word">${item}</div>
      `);
    });
    EventListeners.handleDragDrop();
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