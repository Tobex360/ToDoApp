import React, { useState } from 'react'
import { Input, Button, Form, message } from 'antd'
import styles from './Login.module.css'
import login from '../../assets/login.jpg'
import { Link, useNavigate} from 'react-router'
import '../../App.css';
import AuthServices from '../../services/authServices'
import { getErrorMessage } from '../../util/GetError'


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[loading,setLoading]= useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(values) => {
    console.log('Login attempt:', values);
    try{
      setLoading(true);
      let data = {
        username,
        password,
      }
      const response = await AuthServices.loginUser(data);
      console.log(response.data);
      localStorage.setItem('user',JSON.stringify(response.data));
      message.success("user loggedin Succesfully");
      navigate('/to-do-list')
      setLoading(false)

    }catch(err){
      console.log(err);
      message.error(getErrorMessage(err));
      setLoading(false)
    }
    // Add login logic here
  };

  return (<>
    <div className={styles.login_container}>
      <div className={styles.login_card}>
        <img src={login} alt="Login" />
        <h2>Login</h2>
        <Form onFinish={handleSubmit} layout="vertical">
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
            new User? <Link to='/register'>Register</Link>
          </div>
          <Form.Item>
            <Button loading={loading} disabled={!username || !password} type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div></>
  )
}

export default Login