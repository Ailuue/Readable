import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Field, reduxForm } from 'redux-form';
import {
  fetchOnePost,
  fetchComments,
  deletePost,
  deleteComment,
  postVote,
  commentVote
} from '../actions';
import { Link } from 'react-router-dom';
import Header from './Header';

class ShowPost extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchOnePost(id);
    this.props.fetchComments(id);
  }

  onDeletePost() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  onDeleteComment(id) {
    this.props.deleteComment(id, () => {
      this.props.history.push(`/post/${this.props.match.params.id}`);
    });
  }

  render() {
    const { post, comments } = this.props;
    let date;
    if (post && post != null) {
      date = new Date(post[0].timestamp);
    }
    return (
      <div className="container">
        <Header />
        <div>
          {post && post != null ? (
            post[0].id && (
              <div>
                <div className="">
                  <div className="container text-center h3">
                    <u>Post</u>
                  </div>

                  <h3 className="alert alert-warning post">{post[0].title}</h3>
                  <div className="row postInfo">
                    <div className="lead col-1">
                      <button
                        onClick={() =>
                          this.props.postVote(
                            this.props.match.params.id,
                            'upVote'
                          )
                        }
                      >
                        <i className="fas fa-angle-up fa-sm" />
                      </button>
                      <button
                        onClick={() =>
                          this.props.postVote(
                            this.props.match.params.id,
                            'downVote'
                          )
                        }
                      >
                        <i className="fas fa-angle-down fa-sm" />
                      </button>
                    </div>
                    <div className="col-2">
                      <h4>Score: {post[0].voteScore}</h4>
                    </div>
                    <div className="col-1" />
                    <h4 className="col-4">Category: {post[0].category}</h4>
                    <h4 className="col-4">{date.toDateString()}</h4>
                  </div>
                  <p className="card alert-warning">{post[0].body}</p>
                </div>
                <Link
                  to={`/post/${post[0].id}/comment/form`}
                  className="btn btn-success pull-xs-left"
                >
                  Add Comment
                </Link>
                <Link
                  to={{
                    pathname: '/post/form',
                    state: {
                      post: post[0]
                    }
                  }}
                  className="btn btn-warning m-4"
                >
                  Edit Post
                </Link>
                <button
                  className="btn btn-danger pull-xs-right"
                  onClick={() => this.onDeletePost()}
                >
                  Delete Post
                </button>
              </div>
            )
          ) : (
            <div>Loading</div>
          )}
        </div>
        <div className="container text-center h3">Comments</div>
        <div className="list-group">
          <div className="list-group-item alert row">
            <div className="col-1">Vote Score</div>
            <div className="col-7">Comment</div>
            <div className="col-2">Author</div>
            <div className="col-2">Date Posted</div>
          </div>
        </div>

        <div className="list-group">
          {comments == null || post == null ? (
            <p className="list-group-item">No Comments</p>
          ) : comments.length > 0 ? (
            comments.map(comment => {
              let commentDate = new Date(comment.timestamp);
              return (
                <div
                  key={comment.id}
                  className="list-group-item list-group-item-warning row"
                  style={{ width: '18 rem' }}
                >
                  <div className="col-1">
                    <button
                      onClick={() =>
                        this.props.commentVote(comment.id, 'upVote')
                      }
                    >
                      <i className="fas fa-angle-up fa-sm" />
                    </button>
                    <button
                      onClick={() =>
                        this.props.commentVote(comment.id, 'downVote')
                      }
                    >
                      <i className="fas fa-angle-down fa-sm" />
                    </button>
                  </div>
                  <p className="col-1">{comment.voteScore}</p>
                  <h6 className="col-6">{comment.body}</h6>
                  <p className="col-2">{comment.author}</p>
                  <p className="col-2">{commentDate.toDateString()}</p>
                  <div className="container">
                    <div className="d-flex flex-row-reverse">
                      <div className="p-1">
                        <Link
                          to={{
                            pathname: `/post/${post.id}/comment/form`,
                            state: {
                              comment: comment
                            }
                          }}
                          className="btn btn-warning btn-sm"
                        >
                          Edit Comment
                        </Link>
                      </div>
                      <div className="p-1">
                        <button
                          className="btn btn-danger btn-sm pull-xs-right"
                          onClick={() => this.onDeleteComment(comment.id)}
                        >
                          {' '}
                          Delete Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="list-group-item">No Comments</p>
          )}
        </div>
        <Link className="btn btn-primary m-4" to="/">
          Back to Index
        </Link>
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

export default connect(mapStateToProps, {
  fetchOnePost,
  fetchComments,
  deletePost,
  deleteComment,
  postVote,
  commentVote
})(ShowPost);
