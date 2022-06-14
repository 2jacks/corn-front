import {API_URL} from '../constants/BACKEND'

class GeoService {
   //AOI
   static async fetchAOIs({username, fieldId, researchId}) {
      return await fetch(API_URL + `/geo/${username}/fields/${fieldId}/researches/${researchId}/aoi`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      })
        .then((res) => res.json())
   }

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

   //FIELDS
   static async fetchFields(username) {
      return await fetch(API_URL + `/geo/${username}/fields`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      })
        .then((res) => res.json())
   }

   static async deleteField({username, fieldId}) {
      return await fetch(API_URL + `/geo/${username}/fields`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            fieldId: fieldId
         })
      })
        .then((res) => res.json())
   }


   //RESEARCHES
   static async fetchFieldResearches(username, fieldId) {
      return await fetch(API_URL + `/geo/${username}/fields/${fieldId}/researches`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      }).then((res) => res.json())
   }

   //FITOSCAN
   static async fetchFitoScan({username, fieldId, researchId}) {
      return await fetch(API_URL + `/geo/${username}/fields/${fieldId}/researches/${researchId}/fitoscan`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      })
        .then((res) => res.json())
   }

   //ANALYSIS
   static async getDiffResearches({res_1, res_2, field}) {
      return await fetch(API_URL + `/geo/analysis/index_diff/`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            firstRes: res_1,
            secondRes: res_2,
            mask: field.geometry
         })
      }).then((res) => res)

   }
}

export {GeoService}
