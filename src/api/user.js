import { BACKEND } from '../constants/BACKEND'

async function login(username, password) {
  return await fetch(BACKEND.SERVER + '/auth/jwt/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res
      } else {
        throw new Error(res.statusText)
      }
    })
    .then((res) => res.json())
}

async function verifyUser(access) {
  return await fetch(BACKEND.SERVER + '/auth/jwt/verify/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: access,
    }),
  })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res
      } else {
        throw new Error(res.statusText)
      }
    })
    .then((res) => res.json())
}

export { login, verifyUser }
