import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ addPost }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      title: postTitle,
      content: postContent,
    };

    await axios
      .post('http://microblog.com/posts/create', post)
      .then((post) => addPost(post.data))
      .catch((err) => console.log(err));

    setPostTitle('');
    setPostContent('');
  };

  const handleTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="box">
        <div className="field">
          <label className="label" htmlFor="postTitle">
            <div className="control">
              Title
              <input
                className="input"
                id="postTitle"
                name="postTitle"
                type="text"
                placeholder="An interesting title..."
                value={postTitle}
                onChange={handleTitleChange}
              />
            </div>
          </label>
        </div>
        <div className="field">
          <label className="label" htmlFor="postContent">
            <div className="control">
              <textarea
                className="textarea"
                id="postContent"
                name="postContent"
                placeholder="Some content..."
                value={postContent}
                onChange={handleContentChange}
              />
            </div>
          </label>
        </div>
        <div className="buttons">
          <button className="button is-primary" type="submit">
            Add Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
