/*FETCH API*/
async function fetchData(url) {
  return await (await fetch(url)).json();
}

async function searchArtistContent(text) {
  return fetchData(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=artist:"${text}"`
  );
}

async function getAlbumById(albumId) {
  return fetchData(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`
  );
}

async function getArtistById(artistId) {
  return fetchData(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`
  );
}

async function getArtistTopTracks(artistId, trackLimit = 5) {
  return fetchData(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=${trackLimit}`
  );
}

async function getAlbumInEvidence(textToSearch) {
  return fetchData(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${textToSearch}`
  );
}

async function getAlbumListByArtistId(artistId) {
  return fetchData(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/albums`
  );
}
