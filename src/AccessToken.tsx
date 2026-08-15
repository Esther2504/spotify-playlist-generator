import axios from "axios";

export function getAccessToken(authToken: string, redirect_url: string) {


  // axios.post(`https://accounts.spotify.com/api/token`,
  //     new URLSearchParams({
  //         grant_type: "authorization_code",
  //         code: authToken,
  //         redirect_uri: "https://esther2504.github.io/spotify-playlist-generator/",
  //     }), {
  //     headers: {
  //         'content-type': 'application/x-www-form-urlencoded',
  //         'Authorization': "Basic " + btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`),
  //     },
  // })
  //     .then((res) => {
  //         console.log(res);
  //         let currentDate = Date.now()
  //         localStorage.setItem('accessToken', res.data.access_token)
  //         localStorage.setItem('accessTokenTime', currentDate.toString())
  //     })
  //     .catch((err) => {
  //         console.log(err)
  //             console.log(authToken)

  //     })

}


export async function authFlow() {

  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

  const codeVerifier = generateRandomString(64);

  const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }

  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  const hashed = await sha256(codeVerifier)
  const codeChallenge = base64encode(hashed);

  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = 'https://esther2504.github.io/spotify-playlist-generator/';

  const scope = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "user-library-modify",
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-read-recently-played",
  ].join(" ");

  const authUrl = new URL("https://accounts.spotify.com/authorize")

  window.localStorage.setItem('codeVerifier', codeVerifier);

  const params = {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  }

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();

}

const getToken = async code => {

  const codeVerifier = localStorage.getItem('codeVerifier');
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUrl = 'https://esther2504.github.io/spotify-playlist-generator/';

  console.log(clientId)
  //   const code = localStorage.getItem('authToken');

  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUrl,
      code_verifier: codeVerifier,
    }),
  }

  const body = await fetch(url, payload);
  const response = await body.json();

  console.log(response)
  console.log(clientId + ' ' + code + ' ' + redirectUrl + ' ' + codeVerifier);

  const currentDate = new Date();

  localStorage.setItem('accessToken', response.access_token);
  localStorage.setItem('refreshToken', response.refresh_token);
  const expirationTime = new Date(
  currentDate.getTime() + response.expires_in * 1000
);

localStorage.setItem('expirationTime', expirationTime.toISOString());
}



export default async function checkAccessToken(redirect) {
  const accessToken = localStorage.getItem('accessToken');
  const accessTokenTime = localStorage.getItem('expirationTime');
    const savedAuthToken = localStorage.getItem('authToken')
    const refreshToken = localStorage.getItem('refreshToken');

  if (accessToken && accessTokenTime) {
    if (Date.now() < new Date(accessTokenTime).getTime()) {
      return true;
    }
  }

  const refreshed = await getRefreshToken(redirect);

  if (refreshed) {
    return true;
  }

  const authUrl =
    `https://accounts.spotify.com/authorize` +
    `?client_id=${process.env.REACT_APP_CLIENT_ID}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(
      `https://esther2504.github.io/spotify-playlist-generator${redirect}`
    )}` +
    `&scope=${encodeURIComponent(
      'streaming user-read-email user-read-private user-library-read user-top-read user-library-modify playlist-read-private playlist-modify-public playlist-modify-private user-read-recently-played'
    )}`;

  window.location.href = authUrl;

  return false;
}

const getRefreshToken = async (redirect) => {

  const refreshToken = localStorage.getItem('refreshToken');
  const url = "https://accounts.spotify.com/api/token";
  const clientId = process.env.REACT_APP_CLIENT_ID;

    if (!refreshToken) {
    return false;
  }

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId
    }),
  }
  const result = await fetch(url, payload);
  const response = await result.json();

  if (!result.ok) {
    console.log(response)
    if (response.error === 'invalid_grant') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=https://esther2504.github.io/spotify-playlist-generator${redirect ? redirect : '/'}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-top-read%20user-library-modify%20playlist-read-private%20playlist-modify-public%20playlist-modify-private%20user-read-recently-played`;
      return;
    }

    throw new Error(`Token refresh failed: ${response.error}`);
  }

localStorage.setItem('accessToken', response.access_token);

const expirationTime = new Date(
  Date.now() + response.expires_in * 1000
);

localStorage.setItem('expirationTime', expirationTime.toISOString());

if (response.refresh_token) {
  localStorage.setItem('refreshToken', response.refresh_token);
}

return true;
}