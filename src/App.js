import React, {useEffect} from 'react'
import './App.css'

import {LoginPage} from './_pages/LoginPage/LoginPage'
import {MainPage} from './_pages/MainPage/MainPage'

import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import {AuthService} from "./services/AuthService";
import {userFetched} from "./store/features/user/userSlice";
import {useDispatch} from "react-redux";

const App = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   function checkUser(data) {
      let localUser = JSON.parse(window.localStorage.getItem('user'))
      let access_token = window.sessionStorage.getItem('access_token')
      console.log({...localUser, access_token})

      AuthService.verify(access_token)
        .then((res) => {
           dispatch(userFetched({...localUser, access_token}))
        })
        .catch((err) => {
           console.log(err)
           navigate('/login')
        })
   }

   // При заходе на / проверяет наличие юзера в локал сторажах и добавляет их в стор. Если стораж пустой - идем в регу
   useEffect(() => {
      checkUser()
   }, [])

   return (

     <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={<MainPage/>}/>
     </Routes>


   )
}

export default App
