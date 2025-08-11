import React from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import InputField from "../components/InputField";
import AuthCard from "../components/AuthCard";
import { Link } from "react-router-dom";
import "../App.css";
import "./Login.css";


const Login = () => {
  return (
    <div className="centered-screen">
       <div className="card">
        <div className="logo">
          <img src="/flutter-logo.svg" alt="Flutter Logo" width="40" height="40" />
        </div>
      <div className="auth-card">
        
        <h2 className="heading">Login to your account</h2>
        <h3 className="sub-heading"> Welcome Back to Flutter Kanpur!</h3>

        <button className="button-light">
          <img
            src="/google-logo.svg"
            alt="Google Logo"
            width="20"
            style={{ marginRight: "10px", verticalAlign: "middle" }}
          />
          Continue with Google
        </button>

        <div className="separator"></div>

        <div className="input-cover">
          <input type="email" className="input" placeholder="Email" />
        </div>
        
                <button className="button">CONTINUE </button>
                
        
                <p className="text-small">
                  Don't have an account? <Link to="/SignUp" className="link-SignUp">Sign up</Link>
                </p>

      
        
      </div>
      

      <p className="text-xs">
          By creating account you agree to our{" "}
          <span className="link">Terms of Service</span> &{" "}
          <span className="link">Privacy Policy</span>
        </p>
    </div>
    
    </div>
  );
};

export default Login;