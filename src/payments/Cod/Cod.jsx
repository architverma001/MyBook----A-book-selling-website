import React, { useContext, useRef, useState,useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./Cod.css";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db, auth } from '../../firebase';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Cod = () => {

  const [profile, setProfile] = useState({});
  useEffect(() => {
    const fetchProfile = async (userId) => {
      try {
        const q = query(collection(db, 'profile'), where("id", "==", userId));
        const querySnapshot = await getDocs(q);
        const profileData = querySnapshot.docs.map((doc) => doc.data());
        setProfile(profileData[0]);
      } catch (error) {
        console.log('An error occurred while fetching profile:', error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchProfile(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const location = useLocation();
  const form = useRef();
  const [done, setDone] = useState(false)
  const book = location.state.details;
  console.log(book)
  const bookName = book.desc;
  const AuthorName = book.teacherName;

  const navigate = useNavigate();
  const sendEmail = (e) => {
    e.preventDefault();
  if(!form.current.user_name.value){
    alert("Please enter your name")
    return
    }
    if(!form.current.user_email.value){
        alert("Please enter your email")
        return
    }
    if(!form.current.user_phone.value){
        alert("Please enter your phone number")
        return

    }
    if(!form.current.book_name.value){
        alert("Please enter your book name")
        return
    }
    if(!form.current.message.value){
        alert("Please enter your address")
        return
    }
    emailjs
      .sendForm(
        "service_vy9spfn",
        "template_bidqa7k",
        form.current,
        "mmyloZXwmWQ_xYqIn"
      )
      .then(
        (result) => {
           
          setDone(true);
          form.current.reset();
          setTimeout(() => {
            navigate('/')
          }
            , 2000)
          
        },
        (error) => {
          console.log("error")
          console.log(error.text);
        }
      );
  };

  return (
    
    <div className="d-flex flex-column justify-content-center txt"  id="contact">
   <h3>Pay on delivery</h3>
   <p>(Shipping charges will be added)</p>
      <div className="w-left">
        <div className="awesome">
        
          <div
            className="blur s-blur1"
            style={{ background: "#ABF1FF94" }}
            
          ></div>
        </div>
      </div>
     
      <div className="c-right">
       
        <form ref={form} onSubmit={sendEmail} className="bck">
          <input type="text" name="user_name" className="user" placeholder="Name" required value={profile.name}/>
          <input type="email" name="user_email" className="user" placeholder="Email" required value={profile.email} />
          <input type="tel" name="user_phone" className="user" placeholder="Phone Number" required value={profile.phone} />
          <input type="text" name="book_name" className="user" placeholder="Book Name" required value={bookName}/>
          <input type="text" name="auth_name" className="user" placeholder="Author Name" required value={AuthorName}/>
          <textarea name="message" className="user" placeholder="Address" required value={profile.address} />
          <input type="submit" value="Send" className="button" required />
          {done && <span>Thanks for contacting us We will contact you soon</span>}
          <div
            className="blur c-blur1"
            style={{ background: "var(--purple)" }}>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Cod;
