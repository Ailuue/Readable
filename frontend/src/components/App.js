import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts } from '../actions';
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
    this.props.fetchPosts();
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

        {this.props.posts != null &&
          this.props.posts.map(post => {
            return (
              <div key={post.id}>
                <p>{post.title}</p>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categoryReducer.categories,
    posts: state.postsReducer.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCat: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
