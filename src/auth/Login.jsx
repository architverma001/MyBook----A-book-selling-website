import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css"; // Import the CSS file for Login component

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="formContainer m-2">
      <div className="formWrapper">
        <div>
          <h1 className="logo">Lectureb@sket</h1>
          <h2 className="title">Sign in</h2>
        </div>

        <button className="googleButton mb-4" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>

        <p className="navigate">
          Know about our platform? <Link to="/about">About us</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;