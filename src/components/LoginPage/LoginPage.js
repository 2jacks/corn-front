import React, {useState} from 'react'
import './LoginPage.scss'
import {Form, Input, Button, Checkbox} from 'antd'

import {useNavigate} from 'react-router-dom'
import {AuthService} from '../../services/AuthService'

import {useDispatch, useSelector} from "react-redux";
import {userFetched} from "../../store/features/user/userSlice";


const LoginPage = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [credentials, setCredentials] = useState()

   const _onFinish = (values) => {
      // if (values.remember) {
      //    window.localStorage.setItem('username', values.username)
      // }
      AuthService.login(values.username, values.password)
        .then((data) => {
           window.localStorage.setItem('user', JSON.stringify({
              username: values.username,
              // Впихнуть сюда пароль?
              refresh_token: data.refresh
           }))
           window.sessionStorage.setItem('access_token', data.access)
           dispatch(userFetched({username: values.username, refresh_token: data.refresh, access_token: data.access}))
           navigate('/')
        })
        .catch(() => {
           /*TODO
           *  1. Сбросить пароль в форме
           *  2. Вывод надписи "Ошибка ввода"
           *  3. Редирект обратно на логин?*/

           console.log('login error')
        })
   }

   const _onFinishFailed = () => {
      console.log('finished failed')
   }

   return (
     <div className={'login__form'}>
        <Form
          name="basic"
          labelCol={{
             span: 8,
          }}
          wrapperCol={{
             span: 16,
          }}
          initialValues={{
             remember: false,
             username: 'anton_postman',
             password: '315220kalter',
          }}
          onFinish={_onFinish}
          onFinishFailed={_onFinishFailed}
          autoComplete="off"
        >
           <Form.Item
             label="Username"
             name="username"
             rules={[
                {
                   required: true,
                   message: 'Имя пользователя (не e-mail!)',
                },
             ]}
           >
              <Input/>
           </Form.Item>

           <Form.Item
             label="Password"
             name="password"
             rules={[
                {
                   required: true,
                   message: 'Пароль',
                },
             ]}
           >
              <Input.Password/>
           </Form.Item>

           <Form.Item
             name="remember"
             valuePropName="checked"
             wrapperCol={{
                offset: 8,
                span: 16,
             }}
           >
              <Checkbox>Remember me</Checkbox>
           </Form.Item>

           <Form.Item
             wrapperCol={{
                offset: 8,
                span: 16,
             }}
           >
              <Button type="primary" htmlType="submit">
                 Submit
              </Button>
           </Form.Item>
        </Form>
     </div>
   )
}

export {LoginPage}
