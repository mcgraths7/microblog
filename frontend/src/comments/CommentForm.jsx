import React, { useState } from 'react';
import _ from 'lodash-core';
import axios from 'axios';

const CommentForm = ({ postId, addComment }) => {
  const [commentContent, setCommentContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const comment = {
      postId,
      id: _.uniqueId(),
      content: commentContent,
    };

    await axios
      .post(`http://localhost:3002/posts/${postId}/comments`, comment)
      .then(() => addComment({ comment }));

    setCommentContent('');
  };

  const handleChange = (e) => {
    setCommentContent(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="postContent">
          <div className="control">
            <textarea
              className="textarea"
              id="postContent"
              name="postContent"
              placeholder="Some content..."
              rows="2"
              value={commentContent}
              onChange={handleChange}
            />
          </div>
        </label>
      </div>
      <div className="buttons">
        <button className="button is-primary" type="submit">
          Add Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
