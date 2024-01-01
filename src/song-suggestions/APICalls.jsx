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

export function getGenres(accessToken, setGenres) {
    axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
        headers: {
            Authorization: "Bearer " + accessToken,
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
export function searchArtist(accessToken, artist, setArtistSuggestions) {
    axios.get('https://api.spotify.com/v1/search', {
        params: {
            q: artist,
            type: "artist",
            limit: 5
        },
        headers: {
            Authorization: "Bearer " + accessToken,
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

export function searchSong(accessToken, song, setSongSuggestions) {
    axios.get('https://api.spotify.com/v1/search', {
        params: {
            q: song,
            type: "track",
            limit: 5
        },
        headers: {
            Authorization: "Bearer " + accessToken,
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

export function getRecommendations(accessToken, artistseeds, tracksseeds, genreseeds, amount, recommendations, setRecommendations) {
console.log(artistseeds)
console.log(genreseeds)
console.log(tracksseeds)
    axios.get('https://api.spotify.com/v1/recommendations', {
        params: {
            limit: amount,
            seed_artists: artistseeds,
            seed_genres: genreseeds,
            seed_tracks: tracksseeds
        },
        headers: {
            Authorization: "Bearer " + accessToken,
        },

    })
        .then(res => {
            console.log(res.data)
            res.data.tracks.forEach((track) => recommendations.push(track.uri))
        })
        .catch(err => {
            console.log(err)
        });
}

export function createPlaylist(accessToken, userID, PlaylistName, PlaylistDescription, recommendations, newPlaylist, setNewPlayList) {
    const url = `https://api.spotify.com/v1/users/${userID}/playlists`;

    const headers = {
        Authorization: `Bearer ${accessToken}`,
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
            setNewPlayList(res.data)
            
        })
        .catch(err => {
            console.log(err)
        });
}

export function addTracks(accessToken, recommendations, newPlaylist, setStep) {
    let uniqueuris = [...new Set(recommendations)];

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };

    const requestData = {
        uris: uniqueuris,
        position: 0
    };

    console.log(uniqueuris)
    console.log(newPlaylist)

    let href = newPlaylist.tracks.href

    console.log(href)

    console.log(href, requestData, { headers })

    axios.post(href, requestData, { headers })
        .then(res => {
           console.log(res)
           setStep(8)
        })
        .catch(err => {

        });
}