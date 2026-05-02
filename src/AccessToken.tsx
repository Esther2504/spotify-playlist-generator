import axios from "axios";

export function getAccessToken(authToken: string, redirect_url: string) {
    console.log(authToken);

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
            let currentDate = Date.now()
            localStorage.setItem('accessToken', res.data.access_token)
            localStorage.setItem('accessTokenTime', currentDate.toString())
        })
        .catch((err) => {
            console.log(err)
        })

}


export default function checkAccessToken() {
    const savedAuthToken = localStorage.getItem('authToken')
    const accessToken = localStorage.getItem('accessToken')
    let accessTokenTime = localStorage.getItem('accessTokenTime');
    let currentTime = Date.now()
    console.log(accessTokenTime)
    console.log(currentTime)
    if (accessToken && accessTokenTime && ((currentTime - parseInt(accessTokenTime)) < 3600000)) {
        return true;
    } else {
        getAccessToken(savedAuthToken)
        console.log('get new token')
    }
}