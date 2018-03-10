import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOnePost, fetchComments } from '../actions';
import { Link } from 'react-router-dom';

class Post extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchOnePost(id);
    this.props.fetchComments(id);
  }

  render() {
    const { post, comments } = this.props;
    let date;
    if (post != null) {
      date = new Date(post.timestamp);
    }
    return (
      <div>
        <div>
          {post != null && (
            <div className="card" style={{ width: '18 rem' }}>
              <div className="card-body">
                <h3 className="card-title">{post.title}</h3>
                <h5 className="card-subtitle">{date.toDateString()}</h5>
                <h4 className="card-subtitle">Score: {post.voteScore}</h4>
                <h6 className="card-subtitle">Category: {post.category}</h6>
                <p className="card-text">{post.body}</p>
              </div>

              <Link className="btn btn-primary" to="/">
                Back to Index
              </Link>
              <button className="btn btn-danger pull-xs-right">
                {' '}
                Delete Post
              </button>
            </div>
          )}
        </div>
        <div>
          {' '}
          {comments != null &&
            comments.map(comment => {
              return <div>{comment.body}</div>;
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.postsReducer.posts,
    comments: state.commentsReducer.comments
  };
};

export default connect(mapStateToProps, { fetchOnePost, fetchComments })(Post);
