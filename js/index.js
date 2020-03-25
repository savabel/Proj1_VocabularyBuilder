
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