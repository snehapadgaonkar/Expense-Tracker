import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Spinner from "../components/Spinner";
import "../styles/LoginPage.css"; // Import the CSS file

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginHero1 = `${process.env.PUBLIC_URL}/assets/loginhero.png`;
  

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/users/login', values);
      setLoading(false);
      message.success('Login Successful');
      localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }));
      navigate('/');
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-container">
      {loading && <Spinner />}
      <div className="login-left">
        <div className="illustration">
          <img src={loginHero1} alt="Login Hero" />
        </div>
      </div>
      <div className="login-right">
      <h1 className="logo-title">POCKETLY</h1>
        <h2 className="welcome-title">Welcome Back :)</h2>
        <p className="welcome-subtitle">Log in to effortlessly track your expenses and gain control of your financial journey.</p>
        <Form layout="vertical" onFinish={submitHandler} className="login-form">
          <Form.Item label="Email Address" name="email" rules={[{ required: true, message: 'Please enter your email!' }]}>
            <Input type="email" placeholder="Email Address" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <button className="btn login-button">Login Now</button>
          <Link to="/register" className="register-link">
          <button className="btn create-account-button">Create Account</button>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
