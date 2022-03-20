import {API_URL} from '../constants/BACKEND'
import {checkForErrors} from "../utils/http/checkForErrors";

class AuthService {
   static async login(username, password) {
      return await fetch(API_URL + '/auth/jwt/create', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            username: username,
            password: password,
         }),
      })
        .then(checkForErrors)
        .then((res) => res)
   }

   static async verify(access) {
      return await fetch(API_URL + '/auth/jwt/verify/', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            token: access,
         }),
      })
        .then(checkForErrors)
        .then((res) => res)
   }

}

export {AuthService}
