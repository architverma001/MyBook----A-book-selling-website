import React, { useState, useContext, useEffect, useRef, lazy, Suspense } from 'react';
import Book from './../../component/cards/Book/Book';
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore"; 
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Search.css'
const LazyBook = lazy(() => import('../../component/cards/Book/LazyBook'));

function Search(props) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(6); // Set the number of books to display per page
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const loadMoreRef = useRef(null);
  const [hasMoreData, setHasMoreData] = useState(true);



  
  useEffect(() => {
    if (currentUser === null) {
      // navigate('/login');
    } else {
      // console.log(currentUser.uid);
    }
  }, [currentUser, navigate]);

 






  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {

        const querys = query(collection(db, props.searchStr), limit(20));
        const querySnapshot = await getDocs(querys);
        const booksData = querySnapshot.docs.map((doc) => doc.data());
        setBooks(booksData);
        setHasMoreData(querySnapshot.size >= booksPerPage);
      } catch (error) {
        console.log('An error occurred while fetching books:', error);
      }
      setLoading(false);
    };
  
    fetchBooks();
  
    return () => {
      // Reset the state when navigating
      setBooks([]);
      setLoading(false);
      setCurrentPage(1);
      setHasMoreData(true);
    };
  }, [props.searchStr, currentUser, navigate]);
  useEffect(() => {
    const handleScroll = () => {
      if (
        loadMoreRef.current &&
        loadMoreRef.current.getBoundingClientRect().top <= window.innerHeight
      ) {
        if (!loading && hasMoreData) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMoreData]);

  useEffect(() => {
    const fetchMoreBooks = async () => {
      setLoading(true);
      try {
        const lastBook = books[books.length - 1];
        const querySnapshot = await getDocs(
          query(
            collection(db, props.searchStr),
            orderBy('desc'),
            startAfter(lastBook ? lastBook.desc : null),
            limit(10)
          )
        );
        const newBooks = querySnapshot.docs.map((doc) => doc.data());
        setBooks((prevBooks) => [...prevBooks, ...newBooks]);
        if (querySnapshot.size < booksPerPage) {
          setHasMoreData(false);
          setLoading(false);
        }
      } catch (error) {
        console.log('An error occurred while fetching more books:', error);
      }
      setLoading(false);
    };

    if (currentPage > 1) {
      fetchMoreBooks();
     
    }
  }, [currentPage, props.searchStr]);





  return (
   
    <div>
      
    <div className='d-flex flex-wrap p-2'>
      {books.map((book) => (
        
          <Book 
          key={book.desc + book.Id + book.teacherName + book.imgUrl + book.mrp + book.offer} 
         img = {book.imgUrl}
        desc = {book.teacherbookDescription}
          mrp = {book.price}
          name = {book.desc}
          offer = {book.offer}
          pdf = {book.pdfUrl}
          driveURL = {book.driveURL}
          teacherName = {book.teacherName}
          />
        ))}
    
      {!loading && books.length === 0 && (
        <p>Nothing found matching your result</p>
      )}
    
    </div>
    {loading && books.length !== 0 && (
        <p className='aligncenter'>Loading....</p>
      )}
    <div ref={loadMoreRef} style={{ height: '30px' }}/>
    </div>
    
  );
}

export default Search;





/*

import React, { useState,useContext, useEffect, useRef, lazy, Suspense  } from 'react';
import Book from './../../component/cards/Book/Book';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const  LazyBook =  lazy(() => import('../../component/cards/Book/LazyBook'));
function Search(props) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10); // Set the number of books to display per page
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const loadMoreRef = useRef(null);
  useEffect(() => {
    if (currentUser === null) {
      navigate('/login');
    } else {
      console.log(currentUser.uid);
    }
  }, [currentUser, navigate]
  );
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, props.searchStr));
        const booksData = querySnapshot.docs.map((doc) => doc.data());
        setBooks(booksData);
      } catch (error) {
        console.log('An error occurred while fetching books:', error);
      }
      setLoading(false);
    };

    // Clear the books array before fetching new data
    setBooks([]);
    setCurrentPage(1);

    fetchBooks();
  }, [props.searchStr]);


  useEffect(() => {
    const handleScroll = () => {
      if (
        loadMoreRef.current &&
        loadMoreRef.current.getBoundingClientRect().top <= window.innerHeight
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Get the current books based on pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const currentBooks = books.slice(0, indexOfLastBook);

  return (
    <div className='d-flex flex-wrap justify-content-evenly'>
      <Suspense fallback={<p>Loading books...</p>}>
        {currentBooks.map((book) => (
          <Book
            key={book.teacherName}
            img={book.imgUrl}
            desc={book.teacherbookDescription}
            mrp={book.price}
            offer={book.offer}
          />
        ))}
      </Suspense>
      {loading && <p>Loading...</p>}
      {!loading && books.length === 0 && (
        <p>Nothing found matching your result</p>
      )}
      {!loading && currentBooks.length < books.length && (
        <div ref={loadMoreRef} style={{ height: '20px' }}></div>
      )}
    </div>
  );
}

export default Search;


*/