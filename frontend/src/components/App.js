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
        <div className="alert row">
          <div className="col-1">
            <p>Vote Score</p>
          </div>
          <div className="col-8">
            <p>Title</p>
          </div>
          <div className="col-1">
            <p>Author</p>
          </div>
          <div className="col-1"># of Comments</div>
        </div>
        {this.props.posts != null &&
          this.props.posts.map(post => {
            return (
              <div className="alert row" key={post.id}>
                <div className="col">
                  <p>{post.voteScore}</p>
                </div>
                <div className="col-8">
                  <h3>{post.title}</h3>
                </div>
                <div className="col">
                  <p>{post.author}</p>
                </div>
                <div className="col">{post.commentCount}</div>
                <div className="col" />
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