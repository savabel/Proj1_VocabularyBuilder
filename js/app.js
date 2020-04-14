let word = $("#wordSearchedInput");
let wordSearchButton1 = $("#wordSearchedButton");
 
wordSearchButton1.click(function() {
  
  sendReq();
  sendReq2();
});
function sendReq () { 
  // console.log("SendReq")
$.ajax({
  url: "https://dictionaryapi.com/api/v3/references/collegiate/json/"+word.val()+"?key=6e24356d-2fb6-4be3-b313-7b5d84c23b93",
   type: "GET",
  dataType: "json",
  success: (data)=>{
  console.log("Arrived at get MW Definitions--->",data);
    for(i=(data.length-1);i>-1;i--) {
      if((data[i].shortdef) === undefined) {
        displaySuggestions(data[i]);
      }else{
        displayDefinitions(data[i]);
        }
    }
    $("li").show(1000);
    },
  error: (xhr,status,error)=>{
    alert("Error: " + errorMessage);
  }
});
};
// Search for the antonyms and the synonyms
function sendReq2 () { 
   $.ajax({
    url: "https://dictionaryapi.com/api/v3/references/thesaurus/json/"+word.val()+"?key=adadaaf3-5550-4de2-94ec-94de7acf5572",
         type: "GET",
    dataType: "json",
    success: (data)=>{
      console.log("Arrived at get MW Thesauraus --->", data);
  
      for(i=(data.length-1);i>-1;i--) {
        if(((data[i].meta.syns) === undefined) || ((data[i].meta.ants) === undefined)){
          displaySuggestions(data[i]); 
        }else{
          displaySynonyms(data[i]);
          displayAntonyms(data[i]);
        }
      }
      console.log(data);
      $("li").show(1000);
    },
    error: (xhr,status,error)=>{
      alert("Error: " + errorMessage);
    }
  });
  };
function isDataEmpty (data) {
  if ($.isEmptyObject(data)) {
    clearDefinitions();
    $("#definitionList").after("<h1 id='noSuggestions'>Sorry, we couldn't find your definition(s).<br>Please search again.</h1>");
    return true;
  }
};
function displaySuggestions(data) {
  console.log("Arrived on --> displaySuggestions()");
  $("#definitionList").after("<br><li><b>Suggestion:</b> "+data+"</li>");
  $("li").hide();
}
function displayDefinitions(data) {
  for(x=(data.shortdef.length-1);x>-1;x--) {
    console.log(data.shortdef[x]);
    $("#wordDefinitionList").after("<br><li><b>"+data.fl+":</b> "+data.shortdef[x]+"</li>");
    $("li").hide();
  }
}
function displaySynonyms(data) {
  for(y=(data.meta.syns.length-1);y>-1;y--) {
    console.log(data.meta.syns[y]);
    $("#wordSynonymList").after("<li><b>"+data.fl+":</b> "+data.meta.syns[y]+" </li>");
    $("li").hide();
  }
}
function displayAntonyms(data) {
  for(w=(data.meta.ants.length-1);w>-1;w--) {
    console.log(data.meta.ants[w]);
    $("#wordAntonymList").after("<li><b>"+data.fl+":</b> "+data.meta.ants[w]+"</li>");
    $("li").hide();
  }
}