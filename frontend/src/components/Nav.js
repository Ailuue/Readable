import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends Component {
  checkActive = name => {
    if (this.props.active === name) {
      return 'alert alert-info';
    } else {
      return '';
    }
  };

  render() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <div className="row">
          <div className="col-2">
            <Link to="/form">Add Post</Link>
          </div>
          <div className="col-10 row">
            <div className="col">
              <a
                href="#"
                className={this.checkActive('all')}
                onClick={() => this.props.handleActive('all')}
              >
                all
              </a>
            </div>
            {this.props.categories != null &&
              this.props.categories.map(category => {
                return (
                  <div className="col" key={category.name}>
                    <a
                      href="#"
                      className={this.checkActive(category.name)}
                      onClick={() => this.props.handleActive(category.name)}
                    >
                      {category.name}
                    </a>
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
