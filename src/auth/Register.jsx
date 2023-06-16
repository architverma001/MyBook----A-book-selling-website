import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;


    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
       setLoading(false)
       navigate('/')
    } catch (err) {
      setErr(true);
      setLoading(false);
      alert(err.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
        <span className="logo">Lectureb@sket</span>
        <span className="title">Register</span>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
         
          <button disabled={loading}>Sign up</button>
          {loading && " please wait..."}
          <p className="navigate">
          You do have an account? <Link to="/login">Login</Link>
        </p>
        </form>
       
      </div>
    </div>
  );
};

export default Register;
