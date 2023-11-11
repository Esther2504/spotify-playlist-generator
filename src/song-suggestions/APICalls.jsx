import axios from "axios";
export function getGenres(getAccessToken, getGenres) {
        axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
            headers: {
                Authorization: "Bearer " + getAccessToken,
            },
        })
            .then(res => {
                console.log(res.data.genres)
         getGenres(res.data.genres)
            })
            .catch(err => {
                console.log(err)
            });
}
export function searchSong(getAccessToken, song) {
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
            })
            .catch(err => {
                console.log(err)
            });
}