import React, { useState, useEffect } from 'react';
import _ from 'lodash-core';
import axios from 'axios';
import Post from './Post';
import PostForm from './PostForm';

const PostContainer = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/posts');
      setPosts(response.data);
    } catch (err) {
      console.log('There was a problem...', err);
    }
  };

  useEffect(async () => {
    fetchPosts();
  }, []);

  const addPost = (postTitle, postContent) => {
    let id;
    _.map(posts, (post) => {
      if (post.id === _.uniqueId) {
        return _.uniqueId();
      }
      id = _.uniqueId();
      return id;
    });
    const newPost = {
      id,
      title: postTitle,
      content: postContent,
    };
    axios.post('http://localhost:3001/posts', {
      id: newPost.id,
      title: newPost.title,
      content: newPost.content,
    })
      .then(() => {
        setPosts({ ...posts, id: newPost });
      })
      .catch((err) => {
        console.log('There was a problem...', err);
      });
  };

  const postItems = _.map(posts, (post) => (
    <Post
      key={post.id}
      id={post.id}
      title={post.title}
      content={post.content}
    />
  ));

  return (
    <section>
      <section className="section">
        <PostForm addPost={addPost} />
      </section>
      <section className="section">
        <div className="columns is-multiline">
          {postItems}
        </div>
      </section>
    </section>
  );
};

export default PostContainer;
