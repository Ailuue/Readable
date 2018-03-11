import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts, postVote } from '../actions';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import api from '../utils/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      active: 'all',
      sortBy: 'title'
    };
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  getCategories() {
    api
      .getAll()
      .then(res => this.setState({ categories: res.data.categories }));
  }

  handleActive = name => {
    this.setState({ active: name });
  };
  handleOrder = order => {
    this.setState({ sortBy: order });
  };

  render() {
    const { posts } = this.props;
    let sortedPosts;
    if (posts != null && posts.length > 1) {
      sortedPosts = posts.sort((a, b) => {
        if (this.state.sortBy === 'voteScore') {
          if (b.voteScore < a.voteScore) return -1;
          if (a.voteScore < b.voteScore) return 1;
          else return 0;
        }
        if (this.state.sortBy === 'title') {
          if (b.title > a.title) return -1;
          if (a.title > b.title) return 1;
          else return 0;
        }
        if (this.state.sortBy === 'author') {
          if (b.author > a.author) return -1;
          if (a.author > b.author) return 1;
          else return 0;
        }
        if (this.state.sortBy === 'comments') {
          if (b.commentCount < a.commentCount) return -1;
          if (a.commentCount < b.commentCount) return 1;
          else return 0;
        }
        if (this.state.sortBy === 'date') {
          if (b.timestamp < a.timestamp) return -1;
          if (a.timestamp < b.timestamp) return 1;
          else return 0;
        }
      });
    } else {
      sortedPosts = posts;
    }
    return (
      <div className="container-fluid text-center">
        <h1 className="alert bg-success">Readable</h1>
        <div className="container p-4" />
        <Nav handleActive={this.handleActive} active={this.state.active} />
        <div className="list-group">
          <div className="list-group-item alert row">
            <div className="col-1" />
            <div className="col-1">
              <a onClick={() => this.handleOrder('voteScore')}>Vote Score</a>
            </div>
            <div className="col-6">
              <a onClick={() => this.handleOrder('title')}>Title</a>
            </div>
            <div className="col-1">
              <a onClick={() => this.handleOrder('author')}>Author</a>
            </div>
            <div className="col-1">
              <a onClick={() => this.handleOrder('comments')}># of Comments</a>
            </div>
            <div className="col-2">
              <a onClick={() => this.handleOrder('date')}>Post Date</a>
            </div>
          </div>

          {posts != null &&
            sortedPosts.map(post => {
              let date = new Date(post.timestamp);
              if (
                this.state.active === 'all' ||
                this.state.active === post.category
              ) {
                return (
                  <div key={post.id}>
                    <div className="list-group-item list-group-item-warning row">
                      <div className="col-1">
                        <button
                          onClick={() => this.props.postVote(post.id, 'upVote')}
                        >
                          <i className="fas fa-angle-up fa-sm" />
                        </button>
                        <button
                          onClick={() =>
                            this.props.postVote(post.id, 'downVote')
                          }
                        >
                          <i className="fas fa-angle-down fa-sm" />
                        </button>
                      </div>
                      <div className="col-1">
                        <p>{post.voteScore}</p>
                      </div>

                      <div className="col-6">
                        <Link to={`/post/${post.id}`}>
                          <h3>{post.title}</h3>
                        </Link>
                      </div>
                      <div className="col-1">
                        <p>{post.author}</p>
                      </div>
                      <div className="col-1">{post.commentCount}</div>

                      <div className="col-2">
                        <p>{date.toDateString()}</p>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return;
              }
            })}
        </div>
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

export default connect(mapStateToProps, {
  fetchCategories,
  fetchPosts,
  postVote
})(App);
