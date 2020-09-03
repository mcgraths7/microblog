import React, { useState, useEffect } from 'react';
import _ from 'lodash-core';
import axios from 'axios';
import CommentForm from '../comments/CommentForm';
import CommentContainer from '../comments/CommentContainer';

const Post = ({ id, title, content }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const response = await axios.get(
        `http://localhost:3002/posts/${id}/comments`,
      );
      setComments(response.data);
    }
    fetchComments();
  }, [id]);

  const addComment = ({ comment }) => {
    setComments((previousComments) => {
      const newComments = [...previousComments];
      return [...newComments, comment];
    });
  };

  return (
    <div className="column is-half">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title message">{`${id}. ${title}`}</p>
        </header>
        <section className="card-content">
          <div className="content">{content}</div>
        </section>
        <hr className="hr" />
        <section className="card-content">
          <p className="content">
            {_.isEmpty(comments)
              ? "It's too quiet... Add a comment!"
              : 'Comments:'}
          </p>
          <CommentContainer comments={comments} />
        </section>
        <footer className="card-content">
          <CommentForm addComment={addComment} postId={id} />
        </footer>
      </div>
    </div>
  );
};

export default Post;
