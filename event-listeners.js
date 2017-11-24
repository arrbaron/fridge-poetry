const EventListeners = {
  startListeners: function() {
    this.handleHaikuFormSubmit();
    this.handleHaikuClear();
    this.handleWordClicked();
  },
  
  handleHaikuFormSubmit: function () {
    $(".verse-form").on("submit", function (event) {
      event.preventDefault();
      let newVerse = $(".verse__textbox").val();

      // App.createVerse(newVerse);
      HTMLRenderer.displayNewHaiku(App.createHaiku(App.insertVerse(App.createVerse(newVerse))));
      $(".verse__textbox").val("");
    });
  },

  handleHaikuClear: function () {
    $(".verse__clear").click(function () {
      $(".haikus").empty();
    });
  },

  handleWordClicked: function() {
    $(".words").on("click", ".word", function(event) {
      let word = $(this).text();

      HTMLRenderer.addWord(word);
      $(this).remove();
    });
  }
};