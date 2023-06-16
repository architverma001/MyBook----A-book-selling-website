import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      // Access user information from the response
      const user = res.user;

      // Update profile
      await updateProfile(user, {
        displayName: user.displayName,
      });

      setLoading(false);
      navigate("/");
    } catch (err) {
      setErr(true);
      setLoading(false);
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile
      await updateProfile(res.user, {
        displayName: displayName,
      });

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setErr(true);
      setLoading(false);
      alert(err.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <button onClick={handleGoogleSignIn} disabled={loading}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Register;