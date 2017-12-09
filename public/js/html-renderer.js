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
      this.hideSpecificElement(".fridge__button--save");
      this.showSpecificElement(".fridge__button--update");
    }
    else {
      this.displayWordBank(App.getRandomWords(WORD_BANK, 3));
      this.displayPoem();
      HTMLRenderer.hideSpecificElement(".fridge__button--update");
      HTMLRenderer.showSpecificElement(".fridge__button--save");
    }
    this.addRandomRotation();
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

    window.scrollTo(0, 0);
  },

  displayTwitterButton: function(poem, isUpdated) {
    $(".twitter-share-button").closest(".flex-row").remove();
    let twitterLink = `<a class="twitter-share-button" href = "https://twitter.com/intent/tweet?text=%22`;
    // <a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Share%20your%20fridge!"> Tweet</a>
    if (!isUpdated) {
      poem.poem.forEach((item, index) => {
        twitterLink += `${item}%20`;
      });
    }
    else {
      poem.forEach((item, index) => {
        twitterLink += `${item}%20`;
      });
      isUpdated = false;
    }

    $(".fridge").prepend(`<div class="flex-row"><div class="flex-column">${twitterLink}%22%20a%20%23fridgePoem%20created%20on%20@FridgePoetryApp">Tweet this fridge!</a></div></div>`);
    // $("main").append("hello world");
  },

  displayUserInfo(username) {
    $(".userinfo").parents(".flex-column").prop("hidden", false);
    $(".greeting").html(`Hi, ${username}!`);
  },

  hideUserInfo() {
    $(".userinfo").parents(".flex-column").prop("hidden", true);
  },

  hideElement(element) {
    $(element).parents(".flex-column").prop("hidden", true);
  },

  showElement(element) {
    $(element).parents(".flex-column").prop("hidden", false);
  },

  hideSpecificElement(element) {
    $(element).hide();
  },

  showSpecificElement(element) {
    $(element).show();
  },

  addRandomRotation() {
    const maxAngle = 10;

    $(".word").each(function(index) {
      let angle = Math.floor(Math.random() * maxAngle) - (maxAngle / 2);
      $(this).css({
        '-webkit-transform': 'rotate(' + angle + 'deg)',
        '-moz-transform': 'rotate(' + angle + 'deg)',
        '-ms-transform': 'rotate(' + angle + 'deg)',
        'transform': 'rotate(' + angle + 'deg)'
      });
    });
  }
};