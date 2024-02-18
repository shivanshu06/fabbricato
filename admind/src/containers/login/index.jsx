import { Form, Input, Button } from "antd";
// import { login } from "../../requests";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './styles.module.css'
import {superlogin} from '../../requests'

const Login = () => {
  const tok = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    // const tok=localStorage.getItem('token')
    return (tok ? navigate ('/app'): navigate('/'))
  }, [tok]);


  const onFinish = async (values) => {
    try{
    const resp =await superlogin(values)
    console.log(resp.data);
      const token = resp.data.token;
      localStorage.setItem('token', token);
     return (token? navigate ('/app'): navigate('/'))
    }catch(err){
      console.log(err)
    }
  };

  
  
 

  return (
    <div className={styles.content}>
    <div className={styles.form}>
      <h2 style={{color:'black'}}>
        Login
      </h2>
    <Form name="loginForm" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
    </div>
    </div>
  );
};
export default Login;
