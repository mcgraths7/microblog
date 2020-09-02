import React from 'react';
import Post from './Post';

// eslint-disable-next-line react/prop-types
const PostContainer = ({ posts }) => {
  // eslint-disable-next-line react/prop-types
  const postItems = posts.map((post) => (
    <Post
      key={post.id}
      id={post.id}
      title={post.title}
      content={post.content}
    />
  ));

  return <div className="columns is-multiline">{postItems}</div>;
};

export default PostContainer;
