import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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
    const address = e.target[3].value;
    const phone = e.target[4].value;
    const file = e.target[5].files[0];
      if(!file || !displayName || !email || !password || !address || !phone){
        setErr(true);
        setLoading(false);
        return;
      }

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const Id = auth.currentUser.uid;
      const storageRef = ref(storage, `${Id}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      //get image url
      const url = await getDownloadURL(uploadTask.ref);
      //update profile
      await Promise.all([
        setDoc(doc(db, 'profile', Id), {
          name: displayName,
          email: email,
          address: address,
          phone:phone,
          profilePic: url,
          id: Id,
        })
    
      ]);
  
      //Create a unique image name
       setLoading(false)
       navigate('/')
    } catch (err) {
      setErr(true);
      alert(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
        <span className="logo">Lecturesbasket</span>
        <span className="title">Sign up</span>
          <input required type="text" placeholder="name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required type="text" placeholder="address" />
          <input required type="tel" placeholder="phone number" />
          <input required type="file" accept="image/jpeg, image/png, image/gif" placeholder="profile picture" />
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
