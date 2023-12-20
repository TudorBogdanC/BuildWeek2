/*window.location.href rappresenta url della pagina scritto nel browser, urlsearchparams serve a prendere un parametro tipo album id per poi usarlo nella fetch corrispondente e inserirlo nella pagina*/

document.addEventListener("DOMContentLoaded", () => {
  let url = new URL(window.location.href);
  if (url.searchParams.get("artistId")) {
    let artistId = url.searchParams.get("artistId");

    getArtistData(artistId);

    setArrowsNavigation(artistId);
  }
});

async function getArtistData(artistId) {
  try {
    let artist = await getArtistById(artistId);

    if (!artist) console.error("Invalid or missing data in the API response.");

    artistCard(artist); // Pass the response to albumCard function
    await getPopData(artist.id);
  } catch (error) {
    console.error("Error fetching artist data:", error);
  }
}

async function artistCard(response) {
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

  const headerMonthlyFan = document.getElementById("headerMonthlyFan");
  const headerArtistName = document.getElementById("headerArtistName");

  const likeArtist = document.getElementById("likeArtist");
  const likeArtistImg = document.getElementById("likeArtistImg");
  const likeNumber = document.getElementById("likeNumber");

  likeArtist.innerText = artistName;
  likeArtistImg.src = response.picture_small;
  likeNumber.innerText = getRandomNumber(1, 15);

  headerMonthlyFan.innerText = fan;
  headerArtistName.innerText = artistName;
}

async function getPopData(artistId, trackLimit) {
  try {
    const responseArtistTopTracks = await getArtistTopTracks(
      artistId,
      trackLimit
    );
    contentPopList(responseArtistTopTracks); // Pass the response to albumCard function
  } catch (error) {
    console.error("Error fetching artist top tracks data:", error);
  }
}

function contentPopList(artistTopTracks) {
  const popularList = document.getElementById("popularSongs");

  popularList.innerHTML = "";

  artistTopTracks.data.forEach((track, index) => {
    let row = document.createElement("div");
    row.classList.add("row", "d-flex", "m-3");
    row.style.cursor = "pointer";
    row.addEventListener("click", function () {
      setOnPlay(
        track.artist.name,
        track.title,
        track.album.cover_medium,
        track.duration
      );
    });

    let col1 = document.createElement("div");
    col1.classList.add("col-1");
    col1.textContent = index + 1;

    let col2 = document.createElement("div");
    col2.classList.add("col-2");
    let img = document.createElement("img");
    img.src = track.album.cover_small;
    col2.appendChild(img);

    let col6 = document.createElement("div");
    col6.classList.add("col-6");
    col6.textContent = track.title;

    let col2Rank = document.createElement("div");
    col2Rank.classList.add("col-2");
    col2Rank.textContent = track.rank;

    let col1Time = document.createElement("div");
    col1Time.classList.add("col-1");
    col1Time.textContent = normalizeTime(track.duration);

    // Aggiungi gli elementi creati alla riga
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col6);
    row.appendChild(col2Rank);
    row.appendChild(col1Time);

    // Aggiungi la riga alla lista
    popularList.appendChild(row);
  });
}

async function setArrowsNavigation(artistId) {
  let nextArtistId = Number(artistId) + 1;
  let previousArtistId = Number(artistId) - 1;
  if (Number(artistId) <= 1) {
    previousArtistId = 1;
  }

  const nextArrow = document.getElementById("nextArtist");
  const previousArrow = document.getElementById("previousArtist");

  let url = "./artist.html?artistId=";

  nextArrow.href = url + nextArtistId;
  previousArrow.href = url + previousArtistId;
}
