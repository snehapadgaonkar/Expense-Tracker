import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginHero1 = `${process.env.PUBLIC_URL}/assets/loginhero.png`; // Update the image path as per your assets

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("Login Successful");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/home");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {loading && <Spinner />}

      {/* Left Side - Illustration */}
      <div className="w-full lg:w-1/2 bg-blue-600 flex justify-center items-center p-8 lg:p-16">
        <img src={loginHero1} alt="Login Hero" className="max-w-full h-auto" />
      </div>

      {/* Back Arrow */}
      <div className="absolute top-4 left-4">
        <div className="bg-white rounded-full p-3 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
          <ArrowLeftOutlined
            onClick={() => navigate("/")}
            className="text-blue-600 text-2xl"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 p-8 lg:p-16 bg-white flex flex-col justify-center items-center space-y-6">
        <h1 className="text-4xl font-bold text-blue-600">POCKETLY</h1>
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome Back :)
        </h2>
        <p className="text-gray-600 text-center">
          Log in to effortlessly track your expenses and gain control of your
          financial journey.
        </p>

        <Form
          layout="vertical"
          onFinish={submitHandler}
          className="w-full max-w-md space-y-4"
        >
          {/* Email Input */}
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              type="email"
              placeholder="Email Address"
              className="rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </Form.Item>

          {/* Password Input */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input
              type="password"
              placeholder="Password"
              className="rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </Form.Item>

          {/* Login Button */}
          <button className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Login Now
          </button>

          {/* Link to Register */}
          <Link
            to="/register"
            className="text-blue-600 text-sm hover:underline"
          >
            Don’t have an account? Create one
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
