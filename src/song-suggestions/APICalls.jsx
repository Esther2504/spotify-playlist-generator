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

export function getRecommendations(getAccessToken, artistseeds, tracksseeds, chosenGenres, amount, recommendations, setRecommendations) {
    console.log(amount)
    console.log(artistseeds)
    console.log(tracksseeds)
    console.log(chosenGenres)
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
            res.data.tracks.forEach((track) => recommendations.push(track.uri))
            res.data.tracks.forEach((track) => console.log(track.uri))
            console.log(recommendations)
        })
        .catch(err => {
            console.log(err)
        });
}

export function createPlaylist(getAccessToken, userID, PlaylistName, PlaylistDescription, recommendations, newPlaylist, setNewPlayList) {
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
            setNewPlayList(res.data)
            
        })
        .catch(err => {
            console.log(err)
        });
}

export function addTracks(getAccessToken, recommendations, newPlaylist, setStep) {
    let uniqueuris = [...new Set(recommendations)];

    const headers = {
        'Authorization': `Bearer ${getAccessToken}`,
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