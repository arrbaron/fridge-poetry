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
            author: "haikudude1",
            date: 14700000123
        },
        {
            id: "113",
            text: "so is it like this",
            author: "haikudude1",
            date: 14700000123
        }
    ],
    
    middles:
    [
       {
            id: "114",
            text: "haikus are so very great aren't they?",
            author: "haikudude1",
            date: 14700000123
        },
        {
            id: "115",
            text: "you need seven syllables",
            author: "haikudude1",
            date: 14700000123
        },
        {
            id: "116",
            text: "it's that simple don't you see",
            author: "haikudude1",
            date: 14700000123
        } 
    ],

    endings:
    [
        {
            id: "117",
            text: "you did it well done",
            author: "haikudude1",
            date: 14700000123
        },
        {
            id: "118",
            text: "i am proud of you",
            author: "haikudude1",
            date: 14700000123
        },
        {
            id: "119",
            text: "let's celebrate now",
            author: "haikudude1",
            date: 14700000123
        }
    ]
};

const App = {
    haikus: [],
    
    getRecentHaikus: () => {
        setTimeout(() => { callbackFn(MOCK_VERSES)}, 1000);
    },

    createHaiku: (beginning, middle, ending) => {
        let newHaiku = `
  
        ${beginning.text}
        ${middle.text}
        ${ending.text}
        `;

        // why doesn't this work? this.haikus.push(newHaiku)
        App.haikus.push(newHaiku);
        return newHaiku;
    },

    getVerse: data => {
        let randomVerse;

        randomVerse = data[Math.floor(Math.random() * data.length)];
        return randomVerse;
    }
};

const HTMLRenderer = {
    displayHaikus: data => {
        console.log(App.haikus);
    }
};

const EventListeners = {

};

console.log(App.createHaiku(App.getVerse(MOCK_VERSES.beginnings), App.getVerse(MOCK_VERSES.middles), App.getVerse(MOCK_VERSES.endings)));

console.log(App.haikus);