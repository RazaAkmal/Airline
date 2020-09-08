import axios from 'axios';

export default function globalAxios() {

  return (
    axios.create({
      baseURL: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/",
      headers: {
        "x-rapidapi-key": "1fd29b48cfmsha93fa973c10d834p1c553djsn3871a6c7862b"
      }
    })
  )
}