import axios from "axios";
export function getGenres(getAccessToken, getGenres) {
    console.log(getAccessToken)
    const url = `https://api.spotify.com/v1/recommendations/available-genre-seeds`;

    // const headers = {
    //     Authorization: `Bearer ${getAccessToken}`,
    //     'Content-Type': 'application/json',
    // };

        axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
            headers: {
                Authorization: "Bearer " + getAccessToken,
            },
        })
            .then(res => {
         getGenres(res.data)
            })
            .catch(err => {
                console.log(err)
            });
}