import {API_URL} from '../constants/BACKEND'

class GeoService {
   static async createAOI({username, fieldId, researchId, geom, area}) {
      return await fetch(API_URL + `/geo/${username}/fields/${fieldId}/researches/${researchId}/aoi`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            username, fieldId, researchId, geom, area
         })
      })
        .then((res) => res.json())
   }

   static async fetchAOIs({username, fieldId, researchId}) {
      return await fetch(API_URL + `/geo/${username}/fields/${fieldId}/researches/${researchId}/aoi`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      })
        .then((res) => res.json())
   }

   static async deleteAOI({username, fieldId, researchId, aoiId}) {
      return await fetch(API_URL + `/geo/${username}/fields/${fieldId}/researches/${researchId}/aoi`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({aoiId})
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
