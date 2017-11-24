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

  addDragListeners: function() {
    let words = document.querySelectorAll(".word");
    let fridge = document.querySelector(".fridge");

    [].forEach.call(words, function(word) {
      word.addEventListener("dragstart", EventListeners.handleDragStart, false);
      word.addEventListener("dragend", EventListeners.handleDragEnd, false);
    });

    fridge.addEventListener("dragenter", EventListeners.handleDragEnter, false);
    fridge.addEventListener("dragover", EventListeners.handleDragOver, false);
    fridge.addEventListener("dragleave", EventListeners.handleDragLeave, false);
    fridge.addEventListener("drop", EventListeners.handleDrop, false);
  },

  handleDragStart: function(event) {
    $(this).addClass("dragged");
    dragSourceElement = this;

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", this.innerHTML);
  },

  handleDragEnd: function(event) {
    $(".fridge").removeClass("drag-over");
    $(this).removeClass("dragged");
  },

  handleDrop: function(event) {
    console.log("drop");
    
    event.stopPropagation();

    if ($(".fridge").hasClass("drag-over")) {
      $(dragSourceElement).remove();
    }
    this.innerHTML += `<span class="magnet"> ${event.dataTransfer.getData("text/html")}</span>`;
  },

  handleDragOver: function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    return false;
  },

  handleDragEnter: function(event) {
    $(this).addClass("drag-over");
  },

  handleDragLeave: function(event) {
    $(this).removeClass("drag-over");
  }
};


let words = document.querySelectorAll(".word");
console.log(words);

[].forEach.call(words, function(word) {
  console.log("hello word");
  word.addEventListener("dragstart", handleDragStart, false);
});