import React, { useState } from 'react'
import './LoginPage.scss'

import { Form, Input, Button, Checkbox } from 'antd'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/user'

const LoginPage = () => {
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState()

  const _onFinish = (values) => {
    if (values.remember) {
      window.localStorage.setItem('username', values.username)
    }
    login(values.username, values.password)
      .then((data) => {
        setCredentials(data)
        window.localStorage.setItem('refresh_token', data.refresh)
        window.sessionStorage.setItem('access_token', data.access)

        console.log(data)
        navigate('/')
      })
      // Перенести catch в api?
      .catch(() => {
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
          remember: true,
          username: '',
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
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
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

export { LoginPage }
