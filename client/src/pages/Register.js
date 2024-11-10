import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const registerHero1 = `${process.env.PUBLIC_URL}/assets/loginhero2.png`;

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registration successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {loading && <Spinner />}
      <div className="w-full lg:w-1/2 bg-blue-600 flex justify-center items-center p-8 lg:p-16">
        <img
          src={registerHero1}
          alt="Register Hero"
          className="max-w-full h-auto"
        />
      </div>
      <div className="absolute top-4 left-4">
        <div className="bg-white rounded-full p-3 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
          <ArrowLeftOutlined
            onClick={() => navigate("/")} // Navigate back to the landing page
            className="text-blue-600 text-2xl"
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 p-8 lg:p-16 bg-white flex flex-col justify-center items-center space-y-6">
        <h1 className="text-4xl font-bold text-blue-600">POCKETLY</h1>
        <h2 className="text-2xl font-semibold text-gray-800">
          Create Your Account
        </h2>
        <p className="text-gray-600 text-center">
          Sign up to get started with our services and enjoy your experience.
        </p>

        <Form
          layout="vertical"
          onFinish={submitHandler}
          className="w-full max-w-md space-y-4"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input
              placeholder="Name"
              className="rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              type="email"
              placeholder="Email Address"
              className="rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </Form.Item>

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

          <button className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Register Now
          </button>

          <Link to="/login" className="text-blue-600 text-sm hover:underline">
            Already registered? Login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
