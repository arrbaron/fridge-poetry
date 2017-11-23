const EventListeners = {
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
  }
};