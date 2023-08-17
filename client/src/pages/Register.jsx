import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const Register = () => {
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);

  const submitHandler = async (values) => {
    try {
      setShowSpinner(true);
      await axios.post("/api/v1/users/register", values);
      message.success("Registration Successfull");
      navigate("/login");
      setShowSpinner(false);
    } catch (error) {
      setShowSpinner(false);
      message.error("Invalid usename or password");
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
 <h1 className="regiter-title">Manage your Expanse</h1>
    <div className="register-overlay">
    <div className="image-container">
        <img 
        src='https://www.orangemantra.com/blog/wp-content/uploads/2021/08/expense-tracking-app.png'

         alt="image" className="register-image" />
      </div>
      <div className="form-container">
      {showSpinner && <Spinner />}

     
        <Form onFinish={submitHandler} >
          <h3 style={{ color: 'white' }}>Register </h3>
          <Form.Item
            label={<label style={{ color: "white" }}>Name</label>}
            name="name"
            rules={[{ required: true, message: "Please enter your name" },{ type: "name", message: "Please enter a valid name" }]}
          >
            <Input type="text" />
          </Form.Item>
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
            <Input className="ant-input" type="password" />
          </Form.Item>

          <div className="d-flex flex-column gap-3">
            <Link to="/login"> <p style={{ color: 'white'}}>Already Registered ? Click Here to Login</p></Link>
            <button  className="btn btn-primary">
              
              Register
            </button>
          </div>
        </Form>
      </div>

    </div>
    </div>
  );
};

export default Register;
