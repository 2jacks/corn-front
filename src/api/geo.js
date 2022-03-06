import { BACKEND } from '../constants/BACKEND'

async function requestStats(geojson) {
  return await fetch(BACKEND.SERVER + '/geo/21/researches/3/stats/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      geojson,
    }),
  })
    .then((res) => res.json())
    .then((data) => data)
}

export { requestStats }
