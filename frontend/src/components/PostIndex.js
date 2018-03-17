import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postVote, deletePost, fetchPosts } from '../actions';

const PostIndex = props => {
  const { posts, active, postVote, deletePost, fetchPosts } = props;

  const onDeletePost = post => {
    const { id } = post;
    deletePost(id, () => {
      fetchPosts();
    });
  };

  return (
    <div>
      {posts !== null &&
        Object.keys(posts[0]).length > 0 &&
        posts.map(post => {
          let date = new Date(post.timestamp);
          if (active === 'all' || active === post.category) {
            return (
              <div key={post.id}>
                <div className="list-group-item list-group-item-warning row">
                  <div className="col-1">
                    <button onClick={() => postVote(post.id, 'upVote')}>
                      <i className="fas fa-angle-up fa-sm" />
                    </button>
                    <button onClick={() => postVote(post.id, 'downVote')}>
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
                    <Link
                      to={{
                        pathname: '/post/form',
                        state: {
                          post: post,
                          origin: 'index'
                        }
                      }}
                      className="btn btn-sm btn-warning"
                    >
                      Edit Post
                    </Link>
                    <button
                      className="btn btn-sm btn-danger pull-xs-right"
                      onClick={() => onDeletePost(post)}
                    >
                      Delete Post
                    </button>
                  </div>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
    </div>
  );
};

export default connect(null, { postVote, deletePost, fetchPosts })(PostIndex);
