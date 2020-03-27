// DOM elements

let wordSearchedInput = document.getElementById("wordSearchedInput"); // To get word entered by user
let wordSearchedButton = document.getElementById("wordSearchedButton"); // To get button click using addEventListener
let wordDefinitionList = document.getElementById("wordDefinitionList"); // To insert definitions in UI
let wordSynonymList = document.getElementById("wordSynonymList"); // To insert synonyms in UI
let wordAntonymList = document.getElementById("wordAntonymList"); // To insert antonyms in UI
let associatedWordsDiagram = document.getElementById("associatedWordsDiagram"); // To insert associated words bubble diagram

//This function collects an array of associated words and create the bubble
function associatedWordBubble(arrayOfWords) {
    $('#associatedWordsDiagram').empty();
  console.log(wordSearchedInput.value);
  let width = 750;
  let height = 750;
  let nodeWidth = 100;
  let nodes = [];
  nodes.push({ name: wordSearchedInput.value }); //adding the source node
  let svg = d3
    .select("#associatedWordsDiagram")
    .attr("width", width)
    .attr("height", height);
  let links = []; //to contain all the lines connecting the bubbles
  for (let i = 0; i < arrayOfWords.length; i++) {
    links.push({
      source: wordSearchedInput.value,
      target: arrayOfWords[i].word
    });
    nodes.push({ name: arrayOfWords[i].word });
  }

  console.log("Link = ", links);
  console.log("nodes = ", nodes);
  //simulation links the nodes to the lines
  let simulation = d3
    .forceSimulation()
    .force("charge", d3.forceManyBody().strength(-800))
    .force(
      "link",
      d3
        .forceLink()
        .id(function(d) {
          return d.name;
        })
        .distance(250)
    )
    .force("x", d3.forceX(width / 2))
    .force("y", d3.forceY(height / 2))
    .on("tick", ticked);

  //create the link between all nodes
  let allLinks = svg
    .selectAll(".link")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link");

  //create all the nodes
  let allNodes = svg
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", function(d, i) {
      if (d.name == wordSearchedInput.value) return "triggernode";
      else return "node";
    });

  //this appends the rectangle into the nodes
  allNodes
    .append("circle")
    .attr("cx", nodeWidth / 2)
    .attr("cy", 0)
    .attr("r", nodeWidth / 2);

  //this appends the text into the nodes
  allNodes
    .append("text")
    .attr("x", nodeWidth / 2)
    .attr("dy", 0)
    .text(function(d) {
      return d.name;
    });

  simulation.nodes(nodes);
  simulation.force("link").links(links);
  //The purpose of this function draws the line from the origin to the final destination and display the diagram on the page
  function ticked() {
    allLinks
      .attr("x1", function(d) {
        return d.source.x;
      })
      .attr("y1", function(d) {
        return d.source.y;
      })
      .attr("x2", function(d) {
        return d.target.x;
      })
      .attr("y2", function(d) {
        return d.target.y;
      });

    allNodes.attr("transform", function(d) {
      return "translate(" + (d.x - nodeWidth / 2) + "," + d.y + ")";
    });
  }
}

//The purpose of this function is to use the Datamuse API to get the associated word
function associatedWord() {
  let apiURL = "https://api.datamuse.com/words?rel_jjb=";
  $.ajax({
    dataType: "json",
    type: "Get",
    url: apiURL + wordSearchedInput.value + "&max=10"
  })
    .then(data => {
      associatedWordBubble(data);
      console.log(data);
    })
    .catch(err => console.log(err));
}

//We call the associatedWordBubble function when the user clicks the search button
wordSearchedButton.addEventListener("click", function(event) {
  event.preventDefault();
  associatedWord();
});
