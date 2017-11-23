const MOCK_VERSES = 
{
    beginnings: 
    [
        {
            id: "111",
            text: "is this a haiku?",
            author: "haikudude1",
            date: 14700000123
        },
        {
            id: "112",
            text: "um how should i start",
            author: "haikudude12",
            date: 14700000123
        },
        {
            id: "113",
            text: "so is it like this",
            author: "haikudude13434",
            date: 14700000123
        }
    ],
    
    middles:
    [
       {
            id: "114",
            text: "haikus are so very great aren't they?",
            author: "haikudude1434343",
            date: 14700000123
        },
        {
            id: "115",
            text: "you need seven syllables",
            author: "haikudude11111",
            date: 14700000123
        },
        {
            id: "116",
            text: "it's that simple don't you see",
            author: "haikudude1231241",
            date: 14700000123
        } 
    ],

    endings:
    [
        {
            id: "117",
            text: "you did it well done",
            author: "haikudude123423423",
            date: 14700000123
        },
        {
            id: "118",
            text: "i am proud of you",
            author: "haikudude112313",
            date: 14700000123
        },
        {
            id: "119",
            text: "let's celebrate now",
            author: "haikudude144314",
            date: 14700000123
        }
    ]
};

const App = {
    haikus: [],
    
    getRecentHaikus: function() {
        setTimeout(() => { callbackFn(MOCK_VERSES)}, 1000);
    },

    createHaiku: function(beginning, middle, ending) {
        let newHaiku = {
            beginning: beginning,
            middle: middle,
            ending: ending
        };

        this.haikus.push(newHaiku);
        HTMLRenderer.displayNewHaiku(newHaiku);
        return newHaiku;
    },

    getRandomVerse: function(data) {
        let randomVerse;

        randomVerse = data[Math.floor(Math.random() * data.length)];
        return randomVerse;
    },

    createVerse: function(verse) {
        let newVerse = {
            id: 190880,
            text: verse,
            author: "newAuthor",
            date: 190909
        };
        
        this.createHaiku(newVerse, this.getRandomVerse(MOCK_VERSES.middles), this.getRandomVerse(MOCK_VERSES.endings));
    }
};

const HTMLRenderer = {
    displayHaikus: function(data) {
        $(".haikus").empty();
        data.forEach((item, index) => {
            $(".haikus").append(`
                <div class="haiku">
                    <p>${item.beginning.text} (${item.beginning.author})</p>
                    <p>${item.middle.text} (${item.middle.author})</p>
                    <p>${item.ending.text} (${item.ending.author})</p>
                </div>
            `);
        });
    },

    displayNewHaiku: function(haiku) {
        $(".haikus").append(`
                <div class="haiku">
                    <p>${haiku.beginning.text} (${haiku.beginning.author})</p>
                    <p>${haiku.middle.text} (${haiku.middle.author})</p>
                    <p>${haiku.ending.text} (${haiku.ending.author})</p>
                </div>
        `);
    }
};

const EventListeners = {
    handleHaikuFormSubmit: function() {
        $(".verse-form").on("submit", function(event) {
            event.preventDefault();
            let newVerse = $(".verse__textbox").val();
            
            App.createVerse(newVerse);
            $(".verse__textbox").val("");
        });
    },

    handleHaikuClear: function() {
        $(".verse__clear").click(function() {
            $(".haikus").empty();
        });
    }
};

EventListeners.handleHaikuFormSubmit();
EventListeners.handleHaikuClear();