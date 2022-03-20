import {API_URL} from '../constants/BACKEND'

class GeoService {
   static async requestStats(geojson) {
      return await fetch(API_URL + '/geo/21/researches/3/stats/', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            geojson,
         }),
      })
        .then((res) => res.json())
   }

   static async fetchFields(username) {
      return await fetch(API_URL + `/geo/${username}/fields`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      })
        .then((res) => res.json())
   }

   static async fetchFieldResearches(username, fieldId) {
      return await fetch(API_URL + `/geo/${username}/fields/${fieldId}/researches`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      }).then((res) => res.json())
   }
}

export {GeoService}
