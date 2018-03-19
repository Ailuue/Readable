import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories, fetchPosts, postVote } from "../actions";
import Nav from "./Nav";
import Header from "./Header.js";
import PostIndex from "./PostIndex";
import SortBy from "./SortBy";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      active: "all",
      sortBy: "title"
    };
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  handleActive = name => {
    this.setState({ active: name });
  };
  handleOrder = order => {
    this.setState({ sortBy: order });
  };

  sortPosts = posts => {
    let copyPosts = JSON.parse(JSON.stringify(posts));
    copyPosts.sort((a, b) => {
      if (this.state.sortBy === "voteScore") {
        if (b.voteScore < a.voteScore) return -1;
        if (a.voteScore < b.voteScore) return 1;
        else return 0;
      }
      if (this.state.sortBy === "title") {
        if (b.title > a.title) return -1;
        if (a.title > b.title) return 1;
        else return 0;
      }
      if (this.state.sortBy === "author") {
        if (b.author > a.author) return -1;
        if (a.author > b.author) return 1;
        else return 0;
      }
      if (this.state.sortBy === "comments") {
        if (b.commentCount < a.commentCount) return -1;
        if (a.commentCount < b.commentCount) return 1;
        else return 0;
      }
      if (this.state.sortBy === "date") {
        if (b.timestamp < a.timestamp) return -1;
        if (a.timestamp < b.timestamp) return 1;
        else return 0;
      } else {
        return 0;
      }
    });
    return copyPosts;
  };

  render() {
    const { posts } = this.props;
    let sortedPosts = [{}];
    if (posts != null && posts.length > 1) {
      sortedPosts = this.sortPosts(posts);
    }

    return (
      <div className="container-fluid text-center">
        <Header />
        <div className="container p-4" />
        <Nav handleActive={this.handleActive} active={this.state.active} />
        <div className="list-group">
          <SortBy handleOrder={this.handleOrder} />
          <PostIndex posts={sortedPosts} active={this.state.active} />
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
