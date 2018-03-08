import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends Component {
  render() {
    console.log(this.props.categories);
    return (
      <nav className="navbar navbar-light bg-faded">
        <div className="row">
          <div className="col-2">
            <Link to="/form">Add Post</Link>
          </div>
          <div className="col-10 row">
            {this.props.categories != null &&
              this.props.categories.map(category => {
                return (
                  <div className="col" key={category.name}>
                    <a>{category.name}</a>
                  </div>
                );
              })}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categoryReducer.categories
  };
};
export default connect(mapStateToProps)(Nav);
