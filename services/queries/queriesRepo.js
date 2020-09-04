const crypto = require('crypto');

const Repository = require('./repository/repository');

const randomId = () => crypto.randomBytes(4).toString('hex');

class QueriesRepository extends Repository {
  async addPost(attrs) {
    const post = { ...attrs };
    post.id = randomId();
    post.comments = [];
    const posts = await super.getAll();
    posts[post.id] = post;
    await super.writeAll(posts);
    return post;
  }

  async addComment(attrs) {
    const comment = { ...attrs };
    comment.id = randomId();
    comment.status = 'pending';
    const post = await super.getOne(comment.postId);
    post.comments.push(comment);
    await super.update(comment.postId, {
      ...post,
      comments: [...post.comments],
    });
    return post;
  }

  async updateComment(attrs) {
    const updatedComment = { ...attrs };
    const post = await super.getOne(updatedComment.postId);
    const commentId = updatedComment.id;
    const updatedComments = post.comments.map((c) => {
      if (c.id === commentId) {
        return updatedComment;
      }
      return c;
    });
    await super.update(updatedComment.postId, {
      ...post,
      comments: [...updatedComments],
    });
  }
}

module.exports = new QueriesRepository('./queries.json');
