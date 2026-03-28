import axios from "axios";

export default function getAccessToken(authToken: string) {
    axios.post(`https://accounts.spotify.com/api/token`,
        new URLSearchParams({
            grant_type: "authorization_code",
            code: authToken,
            redirect_uri: "https://emilia-nonepical-stevie.ngrok-free.dev/",
        }), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': "Basic " + btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`),
        },
    })
        .then((res) => {
            console.log(res);
            localStorage.setItem('accessToken', res.data.access_token)
        })
        .catch((err) => {
            console.log(err)
        })

}