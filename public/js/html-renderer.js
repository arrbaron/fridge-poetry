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

  displayNewFridge: function(fridge) {
    $(".fridge").empty();
    
    fridge.words.forEach((item, index) => {
      $(".fridge").append(`
        <div class="word">${item}</div>
      `);
    });
  },

  displayWords: function(words) {
    words.forEach((item, index) => {
      $(".words").append(`
        <div class="word">${item}</div>
      `);
    });
    EventListeners.handleDragDrop();
  },

  emptySection: function(section) {
    $(section).empty();
  }
};