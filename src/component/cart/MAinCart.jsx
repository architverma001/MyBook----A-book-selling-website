import React, { useContext, useEffect, useState } from 'react';
import { collection, query, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import CArtBook from '../cards/Book/CArtBook';
import Gpay from '../../payments/Gpay';

const MainCart = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(6); // Set the number of books to display per page
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const current = currentUser?.uid || '';
  let price = 0;
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchBooks = async () => {
          const querys = query(collection(db, user.uid + 'cart'));
          const querySnapshot = await getDocs(querys);
          const booksData = querySnapshot.docs.map((doc) => doc.data());
          setBooks(booksData);
        };

        fetchBooks();
      } else {
        alert('Please login to continue');
        navigate('/login');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate,books]);

  const handlePaymentSuccess = () => {
    setIsPaymentSuccess(true);
  };

  useEffect(() => {
    if (isPaymentSuccess) {
      const addBooksToFirestore = async () => {
        try {
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1; // Months are zero-based
          const day = currentDate.getDate();
          const hours = currentDate.getHours();
          const minutes = currentDate.getMinutes();
          const seconds = currentDate.getSeconds();
          const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          const nameId = formattedDateTime;

          await Promise.all(
            books.map((book) =>
              setDoc(doc(db, current, `${book.book.desc}-${nameId}`), {
                bookUrl: book.book.pdf,
                bookName: book.book.desc,
                bookImg: book.book.img,
                bookdesc: book.book.name,
                Id: nameId,
                driveURL: book.book.pdf,
              })
            )
          );
        } catch (error) {
          console.error('Error adding books to Firestore:', error);
        }
      };

      addBooksToFirestore();
    }
  }, [isPaymentSuccess,navigate]);

  return (
    <div>
      <div className="d-flex flex-row flex-wrap justify-content-start p-2">
        {books.map((book) => {
          price = parseInt(price) + parseInt(book.book.offer);
          return (
            <CArtBook
              key={`${book.book.desc}${book.book.Id}${book.book.teacherName}${book.book.imgUrl}${book.book.mrp}${book.book.offer}`}
              img={book.book.img}
              desc={book.book.desc}
              mrp={book.book.mrp}
              offer={book.book.offer}
              pdf={book.book.pdf}
              driveURL={book.book.pdf}
              teacherName={book.book.teacherName}
              name={book.book.name}
            />
          );
        })}
        {books.length === 0 && <h3>Your cart is empty</h3>}
      </div>
      <div className="p-2 ms-4" style={{ fontSize: '18px' }}>
        <strong>Your total cost is: {price}</strong>
        <div className="d-flex justify-content-center">
         { price!==0 && <Gpay offer={price} onSuccess={handlePaymentSuccess} />}
        </div>
      </div>
    </div>
  );
};

export default MainCart;
