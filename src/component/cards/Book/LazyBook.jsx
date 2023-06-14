import React, { lazy, Suspense } from 'react';
import Book from './Book';
function LazyBook(props) {
    return (
      <Book
        key={props.book.teacherName}
        img={props.book.imgUrl}
        desc={props.book.teacherbookDescription}
        mrp={props.book.price}
        offer={props.book.offer}
      />
    );
  }
  
  export default LazyBook;