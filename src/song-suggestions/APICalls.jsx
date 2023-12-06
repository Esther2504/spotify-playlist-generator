import axios from "axios";
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