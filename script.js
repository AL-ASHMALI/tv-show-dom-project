let allEpisodes;
let allShows;
let displayingNumOfEp = document.getElementById("number-of-episodes");
let rootElem = document.getElementById("root");
let showDropDown;
const homeBtn = document.getElementById("home-btn");

homeBtn.addEventListener("click", () => {
  window.location.reload();
});

function removeAllChildeNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function setup() {
  fetch("https://api.tvmaze.com/shows")
    .then((response) => response.json())
    .then((allShows) => {
      showsDropDown(allShows);
      makePageForShows(allShows);
    });
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
  // searchFun(episodeList);
}

// -------------------------------------Search function------------------------------------------------------

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();
  console.log(value);
  let isVisible = allEpisodes.filter((user) => {
    return (
      user.name.toLowerCase().includes(value) ||
      user.summary.toLowerCase().includes(value)
    );
  });

  rootElem.innerHTML = "";
  makePageForEpisodes(isVisible);
  displayingNumOfEp.innerHTML = `Displaying ${isVisible.length}/${allEpisodes.length}`;
});

// function searchForShow(e, allShows) {
//    const searchInputBox = document.getElementById("search");
//   let searchInputWord = e.target.value.toLowerCase();
//   let searchedShows = allShows.filter((user) => {
//     return (
//       user.name.toLowerCase().includes(searchInputWord) ||
//       user.summary.toLowerCase().includes(searchInputWord)
//     );
//   });
//   makePageForShows(searchedShows);
// }
// const searchInputBox = document.getElementById("search");
// searchInputBox.addEventListener("input", (e) => {
//   searchForShow(e, allShows);
//   console.log("rabi");
// });

// ---------------------------------------------------------------------------------------------------------------
// Episode drop-down menu
const numberFormat = (episodeCode) => {
  return episodeCode.toString().padStart(2, 0);
};
 let dropDownEP = document.getElementById("episodesDropDown");
function dropDownAllEpisodes() {
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
// -----------------This function is for the shows drop down-----------------------------------------------
function showsDropDown(showList) {
  showList.sort((a, b) => {                   //displaying the show in alphabetical order
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
  });
  showDropDown.addEventListener("change", (e) => displayTheEpisode(e));
}
// --------------------------------------------------------------------------------------------------------------------

// --------------------Displaying the show when selected from the shows drop down menu.--------------------------
function displayTheEpisode(e) {
  removeAllChildeNodes(rootElem);
  dropDownEP.style.display = "block";
  showId = e.target.value;
  fetch("https://api.tvmaze.com/shows/" + showId + "/episodes")
    .then((response) => response.json())
    .then((data) => (allEpisodes = data))
    .then(() => getEpisodes());
}
// ---------------------------------------------------------------------------------------------------------------------

    
function makePageForShows(showsList) {
  rootElem.innerHTML = "";
  dropDownEP.style.display = "none";
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
    rateEl.innerHTML = `Rated: ${show.rating.average}`;
    genresEl.innerHTML = `Genres: ${show.genres}`;
    statusEl.innerHTML = `Status: ${show.status}`;
    runTimeEl.innerHTML = `Runtime: ${show.runtime}`;
    summaryEl.innerHTML = show.summary;

    extraInfoEl.append(rateEl, genresEl, statusEl, runTimeEl);
    cardEl.append(titleEl, imageEl,extraInfoEl, summaryEl);
    rootElem.append(cardEl);

    // titleEl.addEventListener("click", (e) => displayTheEpisode(e));
  });
  // searchShowFun(showsList);
  
}



// function searchShowFun(allShows) {
// searchInput.addEventListener("input", (e) => {
//   let showValue = e.target.value.toLowerCase();
//   console.log(showValue);
//   let isVisible = episodeList.filter((user) => {
//     return (
//       user.name.toLowerCase().includes(showValue) ||
//       user.summary.toLowerCase().includes(showValue)
//     );

//     //  user.element.classList.toggle("hide", !isVisible);
//   });

//   rootElem.innerHTML = "";
//   makePageForShows(isVisible);
//   // showDropDown(isVisible);
//   displayingNumOfEp.innerHTML = `Displaying ${isVisible.length}/${episodeList.length}`;
// });
// }

window.onload = setup;
