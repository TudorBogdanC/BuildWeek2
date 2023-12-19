/*window.location.href rappresenta url della pagina scritto nel browser, urlsearchparams serve a prendere un parametro tipo album id per poi usarlo nella fetch corrispondente e inserirlo nella pagina*/

document.addEventListener("DOMContentLoaded", () => {
  let url = new URL(window.location.href);
  if (url.searchParams.get("albumId")) {
    let albumId = url.searchParams.get("albumId");
    /*FUNZIONE PER POPOLARE ALBUM*/
  }
  if (url.searchParams.get("artistId")) {
    let artistId = url.searchParams.get("artistId");
    /*FUNZIONE PER POPOLARE ARTIST*/
  }
  /*EVENTO INPUT SEARCH BAR DA 3 CARATTERI*/
  let searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("input", () => {
    if (searchBar.value.length >= 3) {
      searchContent(searchBar.value);
    }
  });
});

/*FETCH API*/
async function searchContent(text) {
  let response = await (
    await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=artist:"${text}"`
    )
  ).json();

  createCard(response.data);
}

async function getAlbumData() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("albumId");

  try {
    let response = await (
      await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/album/${id}`
      )
    ).json();
    console.log(response);
    albumCard(response); // Pass the response to albumCard function
  } catch (error) {
    console.error("Error fetching album data:", error);
  }
}

async function albumCard(response) {
  // Check if the response contains the necessary information
  if (!response) {
    console.error("Invalid or missing data in the API response.");
    return;
  }

  // Access the cover_xl property from the response
  const cover = response.cover_medium;
  const title = response.title;
  const artistPic = response.artist.picture;
  const artistName = response.artist.name;
  const year = response.release_date;
  const numTracks = response.nb_tracks;
  const durationSec = response.duration;
  const durationMin = durationSec / 60;
  const tracks = response.tracks.data;

  let htmlTrackList = "";

  tracks.forEach((track, index) => {
    htmlTrackList += `<div class="row text-light mt-5">
        <div class="col-1 text-end">${index + 1}</div>
        <div class="col-6">${track.title}<br>${track.artist.name}</div>
      
        <div class="col-3 text-end">${track.rank}</div>
        <div class="col-2 text-end">${track.duration}</div>
        </div>
        `;
  });

  //const artistPic = response.album.contributors.picture_small;
  // Crea l'elemento div con la classe 'col-3 card text-bg-light mb-3'
  const cardAlbum = document.getElementById("bg-image");
  const cardTracks = document.getElementById("listaTracks");

  // Crea l'elemento div con la classe 'card-body' e aggiungilo come figlio di cardDiv
  const div = `
    
      <div class="row d-flex">
        <div class="col-4">
          <img src="${cover}" salt="albumPicture">
        </div>
        <div class="col-8 text-light d-flex flex-column align-items-start align-self-end">
        <small>ALBUM</small>
        <h1 class="mb-3 display-2 fw-bolder">${title}</h1>
        <small><img class="rounded-circle" style="width: 5%;" src="${artistPic}" alt="artistPicture">
        ${artistName} • ${year} • ${numTracks} brani, ${durationMin} min.
        </small>
        </div>
      </div>
    
    
  `;
  cardAlbum.innerHTML += div;

  // Inizio div tracks

  const list = `
    <div class="row text-light mt-5">
        <div class="col-1 text-end">#</div>
        <div class="col-6">TITOLO</div>
      
        <div class="col-3 text-end">RIPRODUZIONI</div>
        <div class="col-2 text-end">
          <i
           class="fa-regular fa-clock fa-xs"
           style="color: #d2d9e4"
          ></i>
    </div>
    ${htmlTrackList}
  `;

  cardTracks.innerHTML += list;

  return cardAlbum; // You may want to return cardAlbum if needed
}

// Call the getAlbumData function to initiate the process




// Funzione per fare il fetch del id album dalla API //

async function getArtistData() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("artistId");

  try {
    let response = await (
      await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`
      )
    ).json();
    console.log(response);
    artistCard(response); // Pass the response to albumCard function
  } catch (error) {
    console.error("Error fetching album data:", error);
  }
}




async function artistCard(response) {
  // Check if the response contains the necessary information
  if (!response) {
    console.error("Invalid or missing data in the API response.");
    return;
  }

  // Accedi alle proprietà dal response 
  const artistCover = response.picture_xl;
  const artistName = response.name;
  const fan = response.nb_fan;

  // crea la constante dove javascript inserirà il div creato con la struttura html //
  const cardAlbum = document.getElementById("bg-image");

  // Set the background image of the cardAlbum div
  cardAlbum.style.backgroundImage = `url(${artistCover})`;
  cardAlbum.style.backgroundSize = "cover";
  cardAlbum.style.backgroundPosition = "center";

  // Creare la card con copertina album ed info che si popola al search di un determinato artista //
  const div = `
  <div class="row mb-5">
  <!--icone-->
  <div class="col mt-3 d-flex justify-content-between">
    <div>
      <a class="text-decoration-none" href="./homepage.html">
        <i
          class="fa-solid fa-circle-chevron-left fa-2xl"
          style="color: black"
        ></i>
      </a>
      <a class="text-decoration-none" href="./album.html">
        <i
          class="fa-solid fa-circle-chevron-right fa-2xl"
          style="color: black"
        ></i>
      </a>
    </div>
    <!-- ========== ICONA PROFILO ========== -->
    <div class="dropdown">
      <button
        class="backGroundBlack btn btn-dark rounded-5 dropdown-toggle btn-sm mb-3 p-0 pe-2"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="./assets/images/avatar-2.jpg"
          class="rounded-circle"
          alt="immagine profilo"
          height="23px"
          width="23px"
        />
        Livia Nautilus ...
      </button>
      <ul class="dropdown-menu dropdown-menu-dark rounded-2">
        <li><a class="dropdown-item" href="#">Account</a></li>
        <li>
          <a class="dropdown-item" href="#">Impostazioni</a>
        </li>

        <li><hr class="dropdown-divider" /></li>
        <li>
          <a class="dropdown-item" href="#">Esci</a>
        </li>
      </ul>
    </div>
  </div>
</div>
<div class="row d-flex mb-3 text-light">
    <small><img src="./assets/images/verify.png">Artista verificato</small>
    <div class="col-8 d-flex flex-column align-items-start align-self-end">
    <h1 class="mb-3 display-2 fw-bolder">${artistName}</h1>
    </div>
    <small>${fan} ascoltatori mensili </small>
</div>
  `;

  // Append il contenuto html al div cardAlbum //
  cardAlbum.innerHTML = div;
}


async function getPopData() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("artistId");
  let responseArtist;
  try {
     responseArtist = await (
      await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`
      )
    ).json();
    console.log(responseArtist);
    contentPopList(responseArtist); // Pass the response to albumCard function
  } catch (error) {
    /*console.error("Error fetching album data:", error);*/
  }
}

document.addEventListener("DOMContentLoaded", getPopData);


const popularSongs = document.getElementById ('popularSongs');
const container = `

   <div class="col-8">
      <h5>Popolari</h5>
      <!-- Popolari -->
        <div class="d-flex"> 
       
          <small>VISUALIZZA ALTRO</small>
         </div>
        </div>
      <div class="col-4">
       <h5>Brani che ti piacciono</h5>
      
      <div>
        <strong>Hai messo mi piace a 11 brani</strong>
        <small>Di</small>
      </div>
    </div>    
`

const cover = responseArtist.cover_medium;
const trackPop = responseArtist.tracks.data;
const rankPop = responseArtist.rank;
const durationPop = responseArtist.duration;


popularSongs.innerHTML += container;
function contentPopList () {
const divPopolari = `
<div class="row" id="popularList">
  <div class="col">
    <ol>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ol>
  </div>
  <div class="col">${cover}</div>
  <div class="col">${trackPop}</div>
  <div class="col">${rankPop}</div>
  <div class="col">${durationPop}</div>
</div>
`
popularList.innerHTML += divPopolari;
}








/*CARDS NELLA SEARCH*/

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
/*CREO UNA ROW GENERICA*/
function createNewRow() {
  let newRow = document.createElement("div");
  newRow.classList.add("row");
  return newRow;
}

/*CREO LA SINGOLA CARD*/
function buildCard(el) {
  // Crea l'elemento div con la classe 'col-3 card text-bg-light mb-3'
  const cardDiv = document.createElement("div");
  cardDiv.className = "col-3 card bg-dark text-bg-secondary border-0 m-1 mb-3";
  cardDiv.style.width = "10rem";
  cardDiv.style.height = "15rem";
  cardDiv.style.background = "0";

  // Crea l'elemento div con la classe 'card-header' e aggiungilo come figlio di cardDiv
  // const cardHeaderDiv = document.createElement("div");
  // cardHeaderDiv.className = "card-header";
  // cardHeaderDiv.innerText = el.artist.name;
  // cardDiv.appendChild(cardHeaderDiv);

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

/* HOME PAGE Album in evidenza */
function albumEvidenza() {
  // Effettua una richiesta HTTP all'API
  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=britneyspears"
  )
    .then((response) => response.json())
    .then((data) => {
      // Popola gli elementi con i dati ottenuti dall'API
      const albumCover = document.getElementById("albumCover");
      const titolo = document.getElementById("testoAlbum");

      // Genera un indice random per selezionare la copertina dell'album
      const randomIndex = Math.floor(Math.random() * data.data.length);

      albumCover.src = data.data[randomIndex].artist.picture_medium;
      titolo.textContent = data.data[randomIndex].title;
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });
}

albumEvidenza();

function playAlbum() {
  // Add logic for playing the album
  console.log("Play button clicked");
}

function saveAlbum() {
  // Add logic for saving the album
  console.log("Save button clicked");
}

// Funzione per mettere a display in maniera dinamica al refresh un artista diverso per ogni colonna di Buonasera //

function scaricaAlbums() {
  const artists = ["coldplay", "Muse", "Rihanna", "Madonna", "Queen", "Mika"];

  artists.forEach((artist, index) => {
    // Effettua una richiesta HTTP all'API
    fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Popola gli elementi con i dati ottenuti dall'API
        const div = document.getElementById(`album${index + 1}`);
        const imgElements = div.querySelectorAll("img");
        const title = div.querySelector("small");

        // Genera un indice random per selezionare la copertina dell'album
        const randomIndex1 = Math.floor(Math.random() * data.data.length);
        const randomIndex2 = Math.floor(Math.random() * data.data.length);
        const randomIndex3 = Math.floor(Math.random() * data.data.length);
        const randomIndex4 = Math.floor(Math.random() * data.data.length);

        imgElements[0].src = data.data[randomIndex1].album.cover_medium;
        imgElements[1].src = data.data[randomIndex2].album.cover_medium;
        imgElements[2].src = data.data[randomIndex3].album.cover_medium;
        imgElements[3].src = data.data[randomIndex4].album.cover_medium;
        title.textContent = data.data[randomIndex1].artist.name;
      })
      .catch((error) => {
        console.error("Si è verificato un errore:", error);
      });
  });
}

scaricaAlbums();

// Funzione per creare dinamicamente 5 card per fare un display di 5 artisti diversi //

function createCards() {
  const artists = ["daftpunk", "coldplay", "Muse", "Rihanna", "Britney"];
  const cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = "";

  artists.forEach((artist) => {
    fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`
    )
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.data.length);
        const song = data.data[randomIndex];
        const card = `
          <div class="card d-flex align-items-center bg-black bg-opacity-25 text-light">
            <img class="card-img-top mt-2" src="${song.album.cover_medium}" alt="Copertina" style="width: 90%">
            <div class="card-body">
              <h5 class="card-title">${song.artist.name}</h5>
            </div>
          </div>
        `;
        cardsContainer.innerHTML += card;
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

createCards();
