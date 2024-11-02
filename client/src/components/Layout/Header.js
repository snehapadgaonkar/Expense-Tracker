import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import "../../styles/HeaderStyles.css";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Add this line
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    Modal.confirm({
      title: 'Confirm Logout',
      content: 'Are you sure you want to log out?',
      okText: 'Yes',
      okType: 'danger', // Red button
      cancelText: 'No',
      onOk: () => {
        localStorage.removeItem("user");
        message.success('Logged out successfully');
        navigate("/login");
      },
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          POCKETLY
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <h6 className="nav-link">
                <UserOutlined /> {loginUser && loginUser.name}
              </h6>
            </li>
            <li className="nav-item">
              <button
                className={`btn ${isLoggingOut ? "btn-danger" : "btn-outline-primary"}`}
                onClick={logoutHandler}
                onMouseDown={() => setIsLoggingOut(true)}
                onMouseUp={() => setIsLoggingOut(false)}
                onMouseLeave={() => setIsLoggingOut(false)}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
