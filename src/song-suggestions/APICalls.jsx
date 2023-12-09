import axios from "axios";

export function getUser(accessToken, setUserID) {
    axios
        .get(`https://api.spotify.com/v1/me`, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
        .then((res) => {
            setUserID(res.data.id)
        })
        .catch((err) => {
        })
}

export function getGenres(getAccessToken, setGenres) {
    axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
        headers: {
            Authorization: "Bearer " + getAccessToken,
        },
    })
        .then(res => {
            console.log(res.data)
            setGenres(res.data.genres)
        })
        .catch(err => {
            console.log(err)
        });
}
export function searchArtist(getAccessToken, artist, setArtistSuggestions) {
    axios.get('https://api.spotify.com/v1/search', {
        params: {
            q: artist,
            type: "artist",
            limit: 5
        },
        headers: {
            Authorization: "Bearer " + getAccessToken,
        },

    })
        .then(res => {
            console.log(res.data)
            setArtistSuggestions(res.data.artists.items)
        })
        .catch(err => {
            console.log(err)
        });
}

export function searchSong(getAccessToken, song, setSongSuggestions) {
    axios.get('https://api.spotify.com/v1/search', {
        params: {
            q: song,
            type: "track",
            limit: 5
        },
        headers: {
            Authorization: "Bearer " + getAccessToken,
        },

    })
        .then(res => {
            console.log(res.data)
            setSongSuggestions(res.data.tracks.items)
            console.log(res.data.tracks.items)
        })
        .catch(err => {
            console.log(err)
        });
}

export function getRecommendations(getAccessToken, artistseeds, tracksseeds, chosenGenres, amount) {
    console.log(artistseeds)
    axios.get('https://api.spotify.com/v1/recommendations', {
        params: {
            limit: amount,
            seed_artists: artistseeds,
            seed_genres: chosenGenres,
            seed_tracks: tracksseeds
        },
        headers: {
            Authorization: "Bearer " + getAccessToken,
        },

    })
        .then(res => {
            console.log(res.config.url)
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        });
}

export function createPlaylist(getAccessToken, userID, PlaylistName, PlaylistDescription, songSuggestions, newPlaylistID, setNewPlayListID) {
    const url = `https://api.spotify.com/v1/users/${userID}/playlists`;

    const headers = {
        Authorization: `Bearer ${getAccessToken}`,
        'Content-Type': 'application/json',
    };

    const data = {
        name: `${PlaylistName}`,
        description: `${PlaylistDescription}`,
        public: false,
    };

    axios.post(url, data, { headers })
        .then(res => {
            console.log(res)
            setNewPlayListID(res.data.id)
            addTracks(getAccessToken, songSuggestions, newPlaylistID)
        })
        .catch(err => {
            console.log(err)
        });
}

export function addTracks(getAccessToken, songSuggestions, newPlaylistID) {
    const requestHeaders = {
        'Authorization': `Bearer ${getAccessToken}`,
        'Content-Type': 'application/json',
    };

    const requestData = {
        uris: songSuggestions,
        position: 0
    };

    axios.post(newPlaylistID, requestData, {
        headers: requestHeaders
    })
        .then(response => {
           
        })
        .catch(error => {

        });
}