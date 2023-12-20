/*window.location.href rappresenta url della pagina scritto nel browser, urlsearchparams serve a prendere un parametro tipo album id per poi usarlo nella fetch corrispondente e inserirlo nella pagina*/

document.addEventListener("DOMContentLoaded", () => {
  let searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("input", () => {
    if (searchBar.value.length >= 3) {
      searchContent(searchBar.value);
    }
  });
});

async function searchContent(text) {
  let response = await searchArtistContent(text);
  createCard(response.data);
}

function setOnPlay(artistName, trackName, imgSrc, duration) {
  let playerArtist = document.getElementById("playerArtistName");
  let playerTrack = document.getElementById("playerTrackName");
  let playerImg = document.getElementById("playerTrackImage");
  let playerDuration = document.getElementById("durataTrack");

  playerDuration.innerText = normalizeTime(duration);
  playerArtist.innerText = artistName;
  playerTrack.innerText = trackName;
  playerImg.src = imgSrc;
}

/*CREO UNA ROW GENERICA*/
function createNewRow(className) {
  let newRow = document.createElement("div");
  if (className) newRow.className = className;
  newRow.classList.add("row");
  return newRow;
}

function createNewCol(colNum, className) {
  let newCol = document.createElement("div");
  if (className) newCol.className = className;
  newCol.classList.add(`col-${colNum}`);
  return newCol;
}

function playAlbum() {
  // Add logic for playing the album
  console.log("Play button clicked");
}

function saveAlbum() {
  // Add logic for saving the album
  console.log("Save button clicked");
}

function normalizeTime(seconds, detailed = false) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  if (detailed) {
    let result = "";
    if (hours > 0) {
      result += hours + (hours === 1 ? " ora " : " ore ");
    }
    if (minutes > 0) {
      result += minutes + " min ";
    }
    result += remainingSeconds + " sec";
    return result.trim();
  } else {
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    remainingSeconds =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    if (hours > 0) {
      return hours + ":" + minutes + ":" + remainingSeconds;
    } else {
      return minutes + ":" + remainingSeconds;
    }
  }
}

function createCard(list) {
  if (!list.length > 0) return;

  let contentList = document.getElementById("contentList");
  contentList.innerHTML = "";

  let currentRow = createNewRow();

  for (let i = 0; i < list.length; i++) {
    if (i % 5 == 0 || i == list.length) {
      contentList.appendChild(currentRow);
      currentRow = createNewRow();
    }

    currentRow.appendChild(buildCard(list[i]));
  }
}

/*CREO LA SINGOLA CARD*/
function buildCard(el) {
  // Crea l'elemento div con la classe 'col-3 card text-bg-light mb-3'
  const cardDiv = document.createElement("div");
  cardDiv.className =
    "col-3 card bg-dark text-bg-secondary border-0 m-1 ms-5 mb-3";
  cardDiv.style.width = "10rem";
  cardDiv.style.height = "15rem";
  cardDiv.style.background = "0";

  // Crea l'elemento div con la classe 'card-body' e aggiungilo come figlio di cardDiv
  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.className = "card-body p-1";
  cardDiv.appendChild(cardBodyDiv);

  const imgTrack = document.createElement("a");
  imgTrack.href = `./album.html?albumId=${el.album.id}`;

  let img = document.createElement("img");
  img.className = "mt-0 img-fluid rounded-3";
  img.src = el.album.cover_medium;
  // Crea l'elemento h5 con la classe 'card-title' e aggiungilo come figlio di cardBodyDiv
  const track = document.createElement("a");
  track.className = "card-title mb-0 text-decoration-none";
  track.href = `./album.html?albumId=${el.album.id}`;
  track.innerText = el.album.title;

  const artist = document.createElement("a");
  artist.className = "card-text text-secondary text-decoration-none lh-1";
  artist.href = `./artist.html?artistId=${el.artist.id}`;
  artist.innerText = el.artist.name;

  // Crea l'elemento p con la classe 'card-text' e aggiungilo come figlio di cardBodyDiv
  const album = document.createElement("a");
  album.className = "card-text text-secondary text-decoration-none lh-1";
  album.href = `./album.html?albumId=${el.album.id}`;
  album.innerText = el.album.title;

  imgTrack.appendChild(img);
  cardBodyDiv.appendChild(imgTrack);
  cardBodyDiv.appendChild(track);
  cardBodyDiv.appendChild(artist);
  cardBodyDiv.appendChild(document.createElement("br"));
  // Aggiungi cardText come figlio di cardBodyDiv
  cardBodyDiv.appendChild(album);
  return cardDiv;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
