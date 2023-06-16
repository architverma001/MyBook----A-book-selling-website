import React, { useContext, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Cod.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Cod = () => {
  const location = useLocation();
  const form = useRef();
  const [done, setDone] = useState(false)
  const book = location.state.details;
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
        "service_yvnk47f",
        "template_5v8xo7r",
        form.current,
        "PCj6aiJDsN2VtUGFJ"
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
       
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="user_name" className="user" placeholder="Name" required/>
          <input type="email" name="user_email" className="user" placeholder="Email" required />
          <input type="tel" name="user_phone" className="user" placeholder="Phone Number" required />
          <input type="text" name="book_name" className="user" placeholder="Book Name" required value={bookName}/>
          <input type="text" name="auth_name" className="user" placeholder="Author Name" required value={AuthorName}/>
          <textarea name="message" className="user" placeholder="Address" required />
          <input type="submit" value="Send" className="button" required />
          {done && <span>Thanks for contacting us We will contact you soon</span>}
          <div
            className="blur c-blur1"
            style={{ background: "var(--purple)" }}
          ></div>
        </form>
      </div>
    </div>
  );
};

export default Cod;