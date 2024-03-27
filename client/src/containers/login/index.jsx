import React from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import LoginImg from "../../assets/images/contactus/login.svg";
import Logo from "../../assets/images/header/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../../requests";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducer";
import { GoogleOutlined } from "@ant-design/icons";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const response = await login(values);
      if (response.token) {
        localStorage.setItem("token", response.token);
        notification.success({
          message: "Logged in successfully",
          description: "Happy shopping!",
        });
        dispatch(setUser(response));
        navigate("/");

        console.log("login successful", response);
      }
    } catch (error) {
      console.log("login error", error);
      notification.error({
        message: "Login error",
        description: error.response.data.message,
      });
    }
  };

  const handleGoogleSignIn = () => {
    // You can handle Google sign-in logic here
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",

        padding: "10px",
      }}
    >
      <img src={LoginImg} alt="loginimage" style={{ width: "50%" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "400px",
          padding: "30px",
          background: "whitesmoke",
        }}
      >
        {/* <img
          style={{ width: "150px", height: "100px" }}
          alt="logo"
          src={Logo}
        /> */}
        <h1>Login</h1>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Button
            type="primary"
            icon={<GoogleOutlined />}
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </Button>
          {/* <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
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
            <Button type="link">forgot Password?</Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item> */}
        </Form>
        {/* <h5>
          Don't have an account?
          <Link to="/signup">
            <Button type="link">Create account</Button>
          </Link>
        </h5>
        <h5>
          By creating an account or logging in, you agree with Fabbricato's
          Terms and Conditions and Privacy Policy.
        </h5> */}
      </div>
    </div>
  );
};

export default Login;
