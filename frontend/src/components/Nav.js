import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import Form from './Form';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <h1 className="navbar-brand mb-0">
          <Link to="/form">Go to form</Link>
        </h1>
      </nav>
    );
  }
}

export default Nav;
