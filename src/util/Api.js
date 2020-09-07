import axios from 'axios';

export default function globalAxios() {

  return (
    axios.create({
      baseURL: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/",
      headers: {
        "x-rapidapi-key": "8edf91f661msh238b40689a60f3cp16a6dcjsn88172d726a48"
      }
    })
  )
}