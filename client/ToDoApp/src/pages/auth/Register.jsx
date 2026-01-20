import React, { useState } from 'react'
import { Input, Button, Form, message } from 'antd'
import styles from './Login.module.css'
import login from '../../assets/login.jpg'
import { Link, useNavigate } from 'react-router'
import { getErrorMessage } from '../../util/GetError'
import '../../App.css';
import AuthServices from '../../services/authServices'


function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async(values) => {
    console.log('Register attempt:', values);
    // Add Register logic here
    try{
      setLoading(true);
      const data ={
        firstname,
        lastname,
        username,
        password
      } 
      const response = await AuthServices.registerUser(data);
      console.log(response.data);
      setLoading(false);
      message.success("You are successfully Registered");
      navigate('/login');

    }catch(err){
      console.log(err);
      message.error(getErrorMessage(err));
      setLoading(false);

    }
  };

  return (<>
    <div className={styles.login_container}>
      <div className={styles.login_card}>
        <img src={login} alt="Register" />
        <h2>Register</h2>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="firstname"
            rules={[{ required: true, message: 'Please input your Firstname!' }]}
          >
            <Input
              placeholder='Firstname'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="lastname"
            rules={[{ required: true, message: 'Please input your Lastname!' }]}
          >
            <Input
              placeholder='Lastname'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <div>
            Existing User? <Link to='/login'>Login</Link>
          </div>
          <Form.Item>
            <Button loading={loading} disabled={!username || !password} type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div></>
  )
}

export default Register