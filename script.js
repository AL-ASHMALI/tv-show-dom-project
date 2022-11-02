let allEpisodes;
let allShows;
let displayingNumOfEp = document.getElementById("number-of-episodes");
let rootElem = document.getElementById("root");
let showDropDown;

function removeAllChildeNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function setup() {
  fetch("https://api.tvmaze.com/shows")
    .then((response) => response.json())
    .then((allShows) => {showsDropDown(allShows); makePageForShows(allShows)});

}

function getEpisodes() {
  makePageForEpisodes(allEpisodes);
  dropDownAllEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  episodeList.forEach((episode) => {
    let cardEl = document.createElement("div");
    let titleEl = document.createElement("h2");
    let imageEl = document.createElement("img");
    let summaryEl = document.createElement("div");
    cardEl.className = "card";
    titleEl.className = "title";
    imageEl.className = "img";
    summaryEl.className = "summary";
    titleEl.innerText = `${episode.name}- S${numberFormat(
      episode.season
    )} E${numberFormat(episode.number)}`;
    imageEl.setAttribute("src", episode.image.medium);
    summaryEl.innerHTML = episode.summary;
    cardEl.append(titleEl, imageEl, summaryEl);
    rootElem.append(cardEl);
  });

  displayingNumOfEp.innerHTML = `Displaying ${episodeList.length}/${allEpisodes.length}`;
  searchFun(episodeList);
}

// function homeBtn(){
//   const homeBtn = document.querySelector("button"); 
//   homeBtn.addEventListener("click", (e) => {
//     makePageForShows(allShows);
//   })
// }
// Search function
function searchFun(allEpisodes) {

  const searchInput = document.querySelector("[data-search]");
  searchInput.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase();
    let isVisible = allEpisodes.filter((user) => {
      return (
        user.name.toLowerCase().includes(value) ||
        user.summary.toLowerCase().includes(value)
      );

      //  user.element.classList.toggle("hide", !isVisible);
    });

    rootElem.innerHTML = "";
    makePageForEpisodes(isVisible);
    displayingNumOfEp.innerHTML = `Displaying ${isVisible.length}/${allEpisodes.length}`;
  });
}


// Episode drop-down menu
const numberFormat = (episodeCode) => {
  return episodeCode.toString().padStart(2, 0);
};

function dropDownAllEpisodes() {
  
  let dropDownEP = document.getElementById("episodesDropDown");
  dropDownEP.innerHTML = "";
  for (let i = 0; i < allEpisodes.length; i++) {
    let options = document.createElement("option");
    options.setAttribute("value", allEpisodes[i].id);
    options.innerHTML = `S${numberFormat(allEpisodes[i].season)}E${numberFormat(
      allEpisodes[i].number
    )} - ${numberFormat(allEpisodes[i].name)}`;
    dropDownEP.appendChild(options);

    dropDownEP.addEventListener("change", function () {
      let selectedValue = this.value;
      let selectedEpisode = allEpisodes.filter(
        (episode) => episode.id == selectedValue
      );

      rootElem.innerHTML = "";
      makePageForEpisodes(selectedEpisode);

      displayingNumOfEp.innerHTML = `Displaying ${selectedEpisode.length}/${allEpisodes.length}`;
    });
  }
}

function showsDropDown(showList) {
  //displaying the show in alphabetical order
  showList.sort((a, b) => {
    let firstShowName = a.name.toLowerCase();
    let secondShowName = b.name.toLowerCase();
    
    return firstShowName < secondShowName ? -1 : 1;
  });

  // looping through the list of shows and displaying the shows names.
  showList.map((show) => {
    showDropDown = document.getElementById("showsDropDown");
    let option = document.createElement("option");
    option.innerText = show.name; // the name of the show.
    option.value = show.id; // the ID of the show.
    showDropDown.appendChild(option);

    // showDropDown.addEventListener("change", (e) => getShow(e));
  });
  showDropDown.addEventListener("change", (e) => displayTheShow(e));
}

function displayTheShow(e) {
  removeAllChildeNodes(rootElem);
  showId = e.target.value;
  fetch("https://api.tvmaze.com/shows/" + showId + "/episodes")
    .then((response) => response.json())
    .then((data) => (allEpisodes = data))
    .then(() => getEpisodes());
}

function makePageForShows(showsList) {
  rootElem.innerHTML = ""; 
  showsList.forEach((show) => {
    let cardEl = document.createElement("div");
    let titleEl = document.createElement("h2");
    let imageEl = document.createElement("img");
    let summaryEl = document.createElement("div");
    let extraInfoEl = document.createElement("div");
    let rateEl = document.createElement("div");
    let genresEl = document.createElement("div");
    let statusEl = document.createElement("div");
    let runTimeEl = document.createElement("div");
    cardEl.className = "card";
    titleEl.className = "title";
    imageEl.className = "img";
    summaryEl.className = "summary";
    extraInfoEl.className = "extra-info";
    rateEl.className = "rate"; 
    genresEl.className = "genres";
    statusEl.className = "status"; 
    runTimeEl.className = "run-time"; 

    titleEl.innerText = show.name;
    imageEl.setAttribute("src", show.image.medium);
    summaryEl.innerHTML = show.summary;
    rateEl.innerHTML = `Rated: ${show.rating.average}`;
    genresEl.innerHTML = `Genres: ${show.genres}`; 
    statusEl.innerHTML = `Status: ${show.status}`
    runTimeEl.innerHTML = `Runtime: ${show.runtime}`;
    extraInfoEl.append(rateEl, genresEl, statusEl, runTimeEl); 
    cardEl.append(titleEl, imageEl, summaryEl, extraInfoEl);
    rootElem.append(cardEl);

    //styling content
    
  });

  searchShowFun(showsList); 



  // displayingNumOfEp.innerHTML = `Displaying ${episodeList.length}/${allEpisodes.length}`;
}

function searchShowFun(allEpisodes) {
  const searchInput = document.querySelector("[data-search]");
  searchInput.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase();
    let isVisible = allEpisodes.filter((user) => {
      return (
        user.name.toLowerCase().includes(value) ||
        user.summary.toLowerCase().includes(value)
      );

      //  user.element.classList.toggle("hide", !isVisible);
    });

    rootElem.innerHTML = "";
    makePageForShows(isVisible);
    // showDropDown(isVisible);
    displayingNumOfEp.innerHTML = `Displaying ${isVisible.length}/${allEpisodes.length}`;
  });
}



window.onload = setup;
