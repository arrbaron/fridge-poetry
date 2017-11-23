const HTMLRenderer = {
  displayHaikus: function(data) {
    $(".haikus").empty();
    data.forEach((item, index) => {
      $(".haikus").append(`
        <div class="haiku">
        <p>${item.beginning.text}</p>
        <p>${item.middle.text}</p>
        <p>${item.ending.text}</p>
        </div>
      `);
    });
  },

  displayNewHaiku: function(haiku) {
    $(".haikus").append(`
      <div class="haiku">
      <p>${haiku.beginning.text}</p>
      <p>${haiku.middle.text}</p>
      <p>${haiku.ending.text}</p>
      </div>
    `);
  }
};