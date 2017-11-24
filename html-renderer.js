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

  displayNewPoem: function(poem) {
    $(".poems").append(`
      <div class="poem">
      <p>${poem.beginning.text}</p>
      <p>${poem.middle.text}</p>
      <p>${poem.ending.text}</p>
      </div>
    `);
  },

  displayWords: function(words) {
    words.forEach((item, index) => {
      $(".words").append(`
        <button class="word" draggable="true">${item}</button>
      `);
    });

    EventListeners.addDragListeners();
  },

  addWord: function(word) {
    let currentWords = $(".verse__textbox").val();
    $(".verse__textbox").val(`${currentWords} ${word}`);
  }
};