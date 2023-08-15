import { Form, Input, message, Button } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

import LoginImg from "../assets/login.jpg"
const Login = () => {
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);

  const submitHandler = async (values) => {
    try {
      setShowSpinner(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      localStorage.setItem(
        "data",
        JSON.stringify({ ...data.user, password: "" })
      );
      console.log(data);
      message.success("Login Successful");
      setShowSpinner(false);

      navigate("/");
    } catch (error) {
      message.error("Login Failed");
      setShowSpinner(false);
    }
  };

  //Prevent for Login User
  useEffect(() => {
    if (localStorage.getItem("data")) {
      navigate("/");
    }
  }, [navigate]);
  //Prevent for Login User

  return (
    <div className="register-container">
       <div className="register-overlay">
       <div className="image-container">
           <img src={LoginImg} alt="image" className="register-image" />
         </div>
         <div className="form-container">
         {showSpinner && <Spinner />}
         <Form onFinish={submitHandler} className="login-form">
        <h3 className="mb-4" style={{ color: 'white' }}>Login</h3>
        

        <Form.Item
          label={<label style={{ color: "white" }}>Email</label>}
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "white" }}>Password</label>}
          name="password"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input type="password" />
        </Form.Item>

        <div className="d-flex flex-column gap-3 align-items-center">
          <Link to="/register" className="text-muted" >
            <p style={{ color: 'white' }}>Not Registered? Click Here to Register</p>
          </Link>
          <Button type="primary" htmlType="submit" className="w-100">
            Login
          </Button>
        </div>
      </Form>
        
         </div>
   
       </div>
       </div>
  );
};

export default Login;
