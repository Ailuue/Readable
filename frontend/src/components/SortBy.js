import React from 'react';

const SortBy = ({ handleOrder }) => {
  return (
    <div className="list-group-item alert row">
      <div className="col-1" />
      <div className="col-1">
        <a onClick={() => handleOrder('voteScore')}>Vote Score</a>
      </div>
      <div className="col-6">
        <a onClick={() => handleOrder('title')}>Title</a>
      </div>
      <div className="col-1">
        <a onClick={() => handleOrder('author')}>Author</a>
      </div>
      <div className="col-1">
        <a onClick={() => handleOrder('comments')}># of Comments</a>
      </div>
      <div className="col-2">
        <a onClick={() => handleOrder('date')}>Post Date</a>
      </div>
    </div>
  );
};

export default SortBy;
