import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import shop from "../../assets/images/contactus/shop.svg";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/images/header/logo.png'

const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    if (values.password !== values.retypePassword) {
      form.setFields([
        {
          name: "retypePassword",
          errors: ["The passwords do not match"],
        },
      ]);
    } else {
      // Passwords match, proceed with registration
      // Send user registration data to your backend API
      // Replace the following placeholder code with your actual API call
      fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          phone: values.phone,
          password: values.password,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            console.log("User registered successfully.");
            form.resetFields();
            navigate("/login");
            notification.success({
              message: "Account created successfully",
              description: "Happy shopping!",
            });
          } else {
            console.error("Registration failed.");
          }
        })
        .catch((error) => {
          console.error("Registration error:", error);
        });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <img style={{ width: "50%" }} src={shop} alt="shopping" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          width: "400px",
          background: "whitesmoke",
        }}
      >
        <img style={{width:'150px',height:'100px'}} alt="logo" src={Logo}/>
        <h1>Create account</h1>
        <Form form={form} name="registration" onFinish={onFinish}>
          <Form.Item
            name="firstname"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="lastname"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input placeholder="Phone" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="retypePassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please retype your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Retype Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create account
            </Button>
          </Form.Item>
        </Form>
        <h5>
          Already have an account?
          <Link to="/login">
            <Button type="link">Log in</Button>
          </Link>
        </h5>
        <h5>
          By creating an account or logging in, you agree with Fabbricato's
          Terms and Conditions and Privacy Policy.
        </h5>
      </div>
    </div>
  );
};

export default Signup;
