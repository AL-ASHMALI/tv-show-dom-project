//You can edit ALL of the code here
//You can edit ALL of the code here
let allEpisodes = getAllEpisodes();
let displayingNumOfEp = document.getElementById("number-of-episodes");
let rootElem = document.getElementById("root");
let url = "https://api.tvmaze.com/shows/82/episodes";

// Fetching the data from the TV maze Api
fetch(url)
  .then((Response) => Response.json())
  .then((data) => (allEpisodes = data));

function setup() {
  makePageForEpisodes(allEpisodes);
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
    // use append rather than append child so that you can do multiple elemnts t once
    cardEl.append(titleEl, imageEl, summaryEl);
    rootElem.append(cardEl);
  });

  displayingNumOfEp.innerHTML = `Displaying ${episodeList.length}/${allEpisodes.length}`;
}

// Search function
function searchFun() {
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

searchFun();

// DropDown menu
const numberFormat = (episodeCode) => {
  return episodeCode.toString().padStart(2, 0);
};

function dropDownAllEpisodes() {
  let dropDownEP = document.getElementById("episodesDropDown");
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

dropDownAllEpisodes();

window.onload = setup;
