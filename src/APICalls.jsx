import axios from "axios";

export function getPlaylists(getAccessToken, setData, data, setCurrentStep, currentStep, accessToken) {

    axios
    .get('https://api.spotify.com/v1/me/playlists/', {
      headers: {
        Authorization: "Bearer " + getAccessToken,
      },
    })
    .then((res) => {
      setData(res.data)
      console.log(data)
      setCurrentStep(currentStep + 1)
    })
    .catch((err) => {
      console.log(err.response)
    })
}

export function getTracks(playlistid, playlistName, accessToken, setTracks) {
    axios
    .get(`https://api.spotify.com/v1/playlists/${playlistid}/tracks`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      console.log(res.data)
      setTracks(res.data)
    })
    .catch((err) => {
      console.log(err.response)
    })

}