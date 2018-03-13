import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = props => {
  return (
    <div className="alert container-fluid banner row">
      <Link to="/">
        <img
          className="book col-md-1"
          src="/image/book_icon_512.png"
          placeholder="book icon"
        />
      </Link>
      <h1 className="col-md-10 title">Readable</h1>
      <div className="col-md-1" />
    </div>
  );
};

export default Header;
