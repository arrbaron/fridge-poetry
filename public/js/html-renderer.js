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
      this.displayAuthors([App.currentUser]);
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
    let addedAuthors = [];
    
    $(".fridge__info__authors").empty();
    if (!authors) return;

    authors.forEach((item, index) => {
      if ($.inArray(item, addedAuthors) !== -1) {
        // item already in array
      }
      else {
        $(".fridge__info__authors").append(`
        <span class="fridge__info__author">${item} </span>
      `);
        addedAuthors.push(item);
      }
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

  showError: function(error) {
    const displayTime = 2000;

    $(".error").text(error);

    $(".error").prop("hidden", false);
    setTimeout(function() {
      $(".error").prop("hidden", true)
    }, displayTime);
  },

  displayTwitterButton: function(poem, isUpdated) {
    $(".twitter-share-button").closest(".flex-row").remove();
    let twitterLink = `<a class="twitter-share-button magnet" target="_blank" href = "https://twitter.com/intent/tweet?text=%22`;
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

    $(".fridge").prepend(`<div class="flex-row"><div class="flex-column">${twitterLink}%22%20a%20%23fridgePoem%20created%20on%20@FridgePoetryApp"><img src="https://image.flaticon.com/icons/png/512/23/23931.png" class="twitter-icon"></a></div></div>`);
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