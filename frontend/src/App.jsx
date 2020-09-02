import React, { useState } from 'react';
import _ from 'lodash-core';
import PostForm from './posts/PostForm';
import PostContainer from './posts/PostContainer';

const App = () => {
  const [posts, setPosts] = useState([]);
  const addPost = (postTitle, postContent) => {
    const newPost = {
      id: _.uniqueId(),
      title: postTitle,
      content: postContent,
    };
    setPosts([...posts, newPost]);
  };

  return (
    <section className="container">
      <article className="section">
        <PostForm addPost={addPost} />
      </article>
      <article className="section">
        <PostContainer posts={posts} />
      </article>
    </section>
  );
};

export default App;
