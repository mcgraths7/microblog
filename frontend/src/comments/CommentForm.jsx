import React, { useState } from 'react';

// eslint-disable-next-line react/prop-types
const CommentForm = ({ addComment }) => {
  const [commentContent, setCommentContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(commentContent);
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
