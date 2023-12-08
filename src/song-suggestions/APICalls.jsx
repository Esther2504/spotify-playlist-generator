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

export function createPlaylist(userID, accessToken, songType, playlistName, genre, setNewPlayListID, setNewPlaylist, newPlaylist) {
    const url = `https://api.spotify.com/v1/users/${userID}/playlists`;

    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };

    const data = {
        name: `${songType} songs from '${playlistName}'`,
        description: `Playlist containing the ${genre} songs from '${playlistName}'`,
        public: false,
    };

    if (!newPlaylist) {
        axios.post(url, data, { headers })
            .then(response => {
                setNewPlayListID(response.data.id)
                setNewPlaylist(response.data.tracks.href)
            })
            .catch(error => {
            });
    }
}