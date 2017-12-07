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
    this.clearFridge();
    if (fridge) {
      this.displayWordBank(fridge.wordBank);
      EventListeners.handleFridgeButtonUpdate(fridge._id);
      EventListeners.handleFridgeButtonDelete(fridge._id);
      this.displayPoem(fridge);
      this.displayAuthors(fridge.authors);
      this.hideElement(".fridge__button--save");
      this.showElement(".fridge__button--update");
    }
    else {
      this.displayWordBank(App.getRandomWords(WORD_BANK, 3));
      this.displayPoem();
      HTMLRenderer.hideElement(".fridge__button--update");
      HTMLRenderer.showElement(".fridge__button--save");
    }
  },

  displayPoem: function(poem) {
    if (poem) {
      poem.poem.forEach((item, index) => {
        $(".poem").append(`
        <div class="word">${item}</div>
      `);
      });
      this.displayTwitterButton(poem);
    }
    else {
      let message = ["your", "poem", "here"];
      message.forEach((item, index) => {
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

  displayAuthors: function(authors) {
    console.log(authors);
    $(".fridge__info__authors").empty();
    authors.forEach((item, index) => {
      $(".fridge__info__authors").append(`
      <span class="fridge__info__author">${item}, </span>
      `);
    });
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
  },

  showAlert: function(alert) {
    const displayTime = 2000;

    $(alert).prop("hidden", false);
    setTimeout(function() {
      $(alert).prop("hidden", true)
    }, displayTime);
  },

  displayTwitterButton: function(poem) {
    $(".twitter-share-button").remove();
    let twitterLink = `<a class="twitter-share-button" href = "https://twitter.com/intent/tweet?text=%22`;
    // <a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Share%20your%20fridge!"> Tweet</a>
    poem.poem.forEach((item, index) => {
      twitterLink += `${item}%20`;
    });
    console.log(twitterLink);
    $(".fridge").prepend(`<div class="flex-row">${twitterLink}%22%20a%20%23fridgePoem%20created%20on%20@FridgePoetryApp">Tweet this fridge!</a></div>`);
    // $("main").append("hello world");
  },

  displayUserInfo(username) {
    $(".userinfo").prop("hidden", false);
    $(".greeting").html(`Hi, ${username}!`);
  },

  hideUserInfo() {
    $(".userinfo").prop("hidden", true);
  },

  hideElement(element) {
    $(element).prop("hidden", true);
  },

  showElement(element) {
    $(element).prop("hidden", false);
  },
};