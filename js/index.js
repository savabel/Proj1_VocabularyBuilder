// DOM elements

let wordSearchedInput = document.getElementById("wordSearchedInput");  // To get word entered by user
let wordSearchedButton = document.getElementById("wordSearchedButton");  // To get button click using addEventListener
let wordDefinitionList = document.getElementById("wordDefinitionList");  // To insert definitions in UI
let wordSynonymList = document.getElementById("wordSynonymList");  // To insert synonyms in UI
let wordAntonymList = document.getElementById("wordAntonymList");  // To insert antonyms in UI
let associatedWordsDiagram = document.getElementById("associatedWordsDiagram");  // To insert associated words bubble diagram
 
function associatedWordBubble(event){
    let wordId = document.getElementById("wordSearchedInput")
    event.preventDefault();
    console.log(wordId.value);
    let apiURL = "https://api.datamuse.com/words?rel_jjb=";
    fetch(apiURL + wordId.text)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

document.getElementById("wordSearchedButton").addEventListener("click", function(event){

    associatedWordBubble(event);
})

