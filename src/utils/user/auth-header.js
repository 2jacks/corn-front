export default function authHeader() {
   const user = JSON.parse(localStorage.getItem('user'));
   const access_token = window.sessionStorage.getItem('access_token')
   if (user && access_token) {
      return {Authorization: 'JWT ' + access_token};
   } else {
      return {};
   }
}
