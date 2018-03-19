import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({ active, handleActive, categories }) => {
  const checkActive = name => {
    if (active === name) {
      return 'alert alert-info';
    } else {
      return '';
    }
  };

  return (
    <nav className="navbar navbar-light bg-faded">
      <div className="row">
        <div className="col-2">
          <Link className="btn btn-info float-left" to="/post/form">
            Add Post
          </Link>
        </div>
        <div className="col-10 row">
          <div className="col">
            <Link
              to="/"
              className={checkActive('all')}
              onClick={() => handleActive('all')}
            >
              all
            </Link>
          </div>
          {categories != null &&
            categories.map(category => {
              return (
                <div className="col" key={category.name}>
                  <Link
                    to={`/${category.name}`}
                    className={checkActive(category.name)}
                    onClick={() => handleActive(category.name)}
                  >
                    {category.name}
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.categoryReducer.categories
  };
};
export default connect(mapStateToProps)(Nav);
