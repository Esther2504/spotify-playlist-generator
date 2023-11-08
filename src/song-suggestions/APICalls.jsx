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