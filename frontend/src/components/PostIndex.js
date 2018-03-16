import React from 'react';
import { Link } from 'react-router-dom';

const PostIndex = props => {
  const { posts, active } = props;
  return (
    <div>
      {posts != null &&
        posts.map(post => {
          let date = new Date(post.timestamp);
          if (active === 'all' || active === post.category) {
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
                      onClick={() => this.props.postVote(post.id, 'downVote')}
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
            return null;
          }
        })}
    </div>
  );
};

export default PostIndex;
