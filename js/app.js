let word = $("#wordSearchedInput");
let wordSearchButton = $("#wordSearchedButton");

wordSearchButton.click(function() {
  sendReq();
  sendReq2();
});

function sendReq () { 
$.ajax({
  url: "https://dictionaryapi.com/api/v3/references/collegiate/json/"+word.val()+"?key=6e24356d-2fb6-4be3-b313-7b5d84c23b93",
   type: "GET",
  dataType: "json",
  success: (data)=>{
    console.log(data);

    if(isDataEmpty(data)) {
      return;
    }

    clearDefinitions();

    for(i=(data.length-1);i>-1;i--) {
      if((data[i].shortdef) === undefined) {
        displaySuggestions(data[i]);
      }else{
        displayDefinitions(data[i]);
      // sendReq2 ();
      }
    }

    $("li").show(1000);
    displayPicture(data);
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
      console.log(data);
  
      if(isDataEmpty(data)) {
        return;
      }
  
      clearDefinitions();
  
      for(i=(data.length-1);i>-1;i--) {
        if(((data[i].meta.syns) === undefined) || ((data[i].meta.ants) === undefined)){
          displaySuggestions(data[i]); 
        }else{
          // displayDefinitions(data[i]);
          displaySynonyms(data[i]);
          displayAntonyms(data[i]);
        }
      }
      console.log(data);
  
      $("li").show(1000);
      displayPicture(data);
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
    console.log("Arrived on --> isDataEmpty() = true");

    return true;
  }

  console.log("Arrived on --> isDataEmpty() = false");
};

function clearDefinitions() {
  console.log("Arrived on --> clearDefinitions()");

  $("li").remove();
  $("br").remove();
  $("#noSuggestions").remove();
  $(".picture").attr("hidden","hidden");
  $("#image").removeAttr("src");
}

function displaySuggestions(data) {
  console.log("Arrived on --> displaySuggestions()");

  $("#definitionList").after("<br><li><b>Suggestion:</b> "+data+"</li>");
  $("li").hide();
}

function displayDefinitions(data) {
  console.log("Arrived on --> displayDefinitions()");

  for(x=(data.shortdef.length-1);x>-1;x--) {
    console.log(data.shortdef[x]);
    $("#wordDefinitionList").after("<br><li><b>"+data.fl+":</b> "+data.shortdef[x]+"</li>");
    $("li").hide();
  }
}

function displaySynonyms(data) {
  console.log("Arrived on --> displayDefinitions()");

  for(x=(data.meta.syns.length-1);x>-1;x--) {
    console.log(data.meta.syns[x]);
    $("#wordSynonymList").after("<br><li><b>"+data.fl+":</b> "+data.meta.syns[x]+"</li>");
    $("li").hide();
  }
}

function displayAntonyms(data) {
  console.log("Arrived on --> displayAntonyms()");

  for(x=(data.meta.ants.length-1);x>-1;x--) {
    console.log(data.meta.ants[x]);
    $("#wordAntonymList").after("<br><li><b>"+data.fl+":</b> "+data.meta.ants[x]+"</li>");
    $("li").hide();
  }
}

// function displayPicture(data) {
//   console.log("Arrived on --> displayPicture()");

//   if(data[0].art) {
//       $(".picture").removeAttr("hidden");
//       $("#image").attr("src", "https://www.merriam-webster.com/assets/mw/static/art/dict/"+data[0].art.artid+".gif").hide().delay(100).show(1200);
//       $("#image").attr("title", data[0].hwi.hw);
//   }else{
//     $(".picture").attr("hidden","hidden");
//   }
// }
