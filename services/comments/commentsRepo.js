const crypto = require('crypto');

const Repository = require('./repository/repository');

const randomId = () => crypto.randomBytes(4).toString('hex');

class CommentsRepository extends Repository {
  async create(attrs) {
    const comments = await super.getAll();
    const comment = { ...attrs };
    comment.id = randomId();
    comment.status = 'pending';
    comments[comment.id] = comment;
    await super.writeAll(comments);
    return comment;
  }

  async getByPostId(postId) {
    const comments = super.getAll();
    const commentsByPostId = comments.filter((c) => c.postId === postId);
    return commentsByPostId;
  }
}

module.exports = new CommentsRepository('./comments.json');
