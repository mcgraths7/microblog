import React, { useState, useEffect } from 'react';
import _ from 'lodash-core';
import axios from 'axios';
import Post from './Post';
import PostForm from './PostForm';

const PostContainer = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get('http://localhost:3003/queries');
      setPosts((previousPosts) => ({ ...previousPosts, ...response.data }));
    }
    fetchPosts();
  }, []);

  const addPost = ({ post }) => {
    setPosts((previousPosts) => {
      const newPosts = { ...previousPosts };
      newPosts[post.id] = post;
      console.log({ ...newPosts });
      return { ...newPosts };
    });
  };

  const postItems = _.map(posts, (post) => (
    <Post
      key={post.id}
      id={post.id}
      title={post.title}
      content={post.content}
      postComments={post.comments || []}
    />
  ));

  return (
    <section>
      <section className="section">
        <PostForm addPost={addPost} />
      </section>
      <section className="section">
        <div className="columns is-multiline">{postItems}</div>
      </section>
    </section>
  );
};

export default PostContainer;
