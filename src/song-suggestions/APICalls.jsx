import axios from "axios";

export function getUser(accessToken, setUserID, setError) {
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
            setError(true)
        })
}
export function searchArtist(accessToken, artist, setArtistSuggestions, setError) {
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
            setArtistSuggestions(res.data.artists.items)
        })
        .catch(err => {
            setError(true)
        });
}

export function searchSong(accessToken, song, setSongSuggestions, setError) {
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
            setSongSuggestions(res.data.tracks.items)
        })
        .catch(err => {
            setError(true)
        });
}

export function getRecommendations(accessToken, artistseeds, tracksseeds, genreseeds, amount, recommendations, setRecommendations, setError) {
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
            res.data.tracks.forEach((track) => recommendations.push(track.uri))
        })
        .catch(err => {
            setError(true)
        });
}

export function createPlaylist(accessToken, userID, PlaylistName, PlaylistDescription, recommendations, newPlaylist, setNewPlayList) {
    const url = `https://api.spotify.com/v1/users/${userID}/playlists`;
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };

    let data;

    if (!PlaylistName) {
        data = {
            name: `Created with the Spotify Playlist Generator`,
            description: `${PlaylistDescription}`,
            public: false,
        };
    } else {
        data = {
            name: `${PlaylistName}`,
            description: `${PlaylistDescription}`,
            public: false,
        };
    }
    axios.post(url, data, { headers })
        .then(res => {
            setNewPlayList(res.data)
        })
        .catch(err => {
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

    let href = newPlaylist.tracks.href

    axios.post(href, requestData, { headers })
        .then(res => {
            setStep(8)
        })
        .catch(err => {
        });
}