import React, { useContext, useEffect, useState } from 'react'
import BookCopy from './BookCopy'
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore"; 
import {db,auth} from '../../firebase'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
const Cart = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(6); // Set the number of books to display per page
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  var current = '';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchBooks = async () => {
          const querys = query(collection(db, user.uid));
          const querySnapshot = await getDocs(querys);
          const booksData = querySnapshot.docs.map((doc) => doc.data());
          setBooks(booksData);
          current = user.uid;
        };
  
        fetchBooks();
      }
      else{
        alert("Please login to continue");
        navigate('/login');
        return;
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, [navigate,current]);


  return (
    <div className='d-flex flex-row flex-wrap justify-content-center p-2'>
      {books.map((book) => (
       
        <BookCopy key={book.Id} img={book.bookImg}  desc = {book.bookName} pdf = {book.bookUrl}
        driveURL = {book.driveURL}
        /> ))}
       {books.length === 0 && <h3>Your books is empty</h3>}
    </div>
  )
}

export default Cart