const EventListeners = {
  dragSourceElement: null,

  startListeners: function() {
    this.handleVerseFormSubmit();
    this.handlePoemClear();
    this.handleWordClicked();
  },
  
  handleVerseFormSubmit: function () {
    $(".verse-form").on("submit", function (event) {
      event.preventDefault();
      let newVerse = $(".verse__textbox").val();

      // App.createVerse(newVerse);
      HTMLRenderer.displayNewPoem(App.createPoem(App.insertVerse(App.createVerse(newVerse))));
      $(".verse__textbox").val("");
    });
  },

  handlePoemClear: function () {
    $(".verse__clear").click(function () {
      $(".poems").empty();
    });
  },

  handleWordClicked: function() {
    $(".words").on("click", ".word", function(event) {
      let word = $(this).text();

      HTMLRenderer.addWord(word);
      $(this).remove();
    });
  },

  handleDragDrop: function() {
    $(".words").sortable({
      connectWith: ".fridge",
      items: ".word"
    });
    
    $(".fridge").sortable({
      connectWith: ".words",
      items: ".word"
    });
  }
};