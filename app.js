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
    
    reset: function() {
        this.seedData(this.haikus);
    },

    getRecentHaikus: function() {
        setTimeout(() => { callbackFn(MOCK_VERSES)}, 1000);
    },

    createHaiku: function(parts) {
        console.log("createHaiku" + parts[1].text);
        
        let newHaiku = {
            beginning: parts[0],
            middle: parts[1],
            ending: parts[2]
        };

        this.haikus.push(newHaiku);
        // HTMLRenderer.displayNewHaiku(newHaiku);
        return newHaiku;
    },

    getRandomVerse: function(data) {
        let randomVerse;

        randomVerse = data[Math.floor(Math.random() * data.length)];
        return randomVerse;
    },

    createVerse: function(verse) {
        console.log("createVerse" + verse);
        
        let newVerse = {
            id: 190880,
            text: verse,
            author: "newAuthor",
            date: 190909
        };
        
        // TODO - validate this is a valid verse
        // this.insertVerse(newVerse);
        return newVerse;
    },

    insertVerse: function(newVerse) {
        console.log("insertVerse" + newVerse.text);
        
        const {beginnings, middles, endings} = MOCK_VERSES;
        let partsToInsert = [this.getRandomVerse(beginnings), this.getRandomVerse(middles), this.getRandomVerse(endings)];

        // choose a list randomly
        let lines = [beginnings, middles, endings];
        let randomIndex = Math.floor(Math.random() * lines.length);
        let randomLine = lines[randomIndex];

        // put our verse into that list
        randomLine.push(newVerse);

        // replace the appropriate part with our new verse
        for (let i = 0; i < partsToInsert.length; i++) {
            if (i === randomIndex) {
                partsToInsert[i] = newVerse;
            }
        }
        // create a new haiku with our verse and two other verses
        console.log(partsToInsert[0].text);
        return [partsToInsert[0], partsToInsert[1], partsToInsert[2]];
    },

    seedData: function(data) {
        const seedCount = 3;

        for (let i = 0; i < seedCount; i++) {
            this.createHaiku([this.getRandomVerse(MOCK_VERSES.beginnings), this.getRandomVerse(MOCK_VERSES.middles), this.getRandomVerse(MOCK_VERSES.endings)]);
        }

        HTMLRenderer.displayHaikus(this.haikus);
    }
};

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

const EventListeners = {
    handleHaikuFormSubmit: function() {
        $(".verse-form").on("submit", function(event) {
            event.preventDefault();
            let newVerse = $(".verse__textbox").val();
            
            // App.createVerse(newVerse);
            HTMLRenderer.displayNewHaiku(App.createHaiku(App.insertVerse(App.createVerse(newVerse))));
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

$(App.reset());