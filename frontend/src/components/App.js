import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchCategories } from '../actions';
import Nav from './Nav';
import api from '../utils/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null
    };
  }

  componentDidMount() {
    // this.getCategories();
    this.props.fetchCat();
  }

  getCategories() {
    api
      .getAll()
      .then(res => this.setState({ categories: res.data.categories }));
  }

  render() {
    return (
      <div className="container-fluid text-center">
        <h1 className="alert alert-success">Readable</h1>
        <Nav />
        {this.props.categories != null &&
          this.props.categories.map(category => {
            return (
              <div>
                <p>{category.name}</p>
                <p>{category.path}</p>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { categories: state.tempReducer.categories };
};

const mapDispatchToProps = dispatch => {
  return { fetchCat: () => dispatch(fetchCategories()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
