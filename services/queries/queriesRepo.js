const crypto = require('crypto');

const Repository = require('../repository/repository');

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
    console.log(post.comments);
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
    // console.log(updatedComments);
    await super.update(updatedComment.postId, {
      ...post,
      comments: [...updatedComments],
    });
  }
}

// const qr = new QueriesRepository('./queries.json');
// qr.addPost({ title: 'hello world', content: 'new  content' });
// const addComments = async () => {
//   await qr.addComment({ postId: '16df68c3', content: 'A second comment' });
//   await qr.addComment({ postId: '16df68c3', content: 'A third comment' });
//   await qr.addComment({
//     postId: '16df68c3',
//     content: 'A fourth orange comment',
//   });
// };

// addComments();

// const updateComments = async () => {
//   await qr.updateComment({
//     postId: '16df68c3',
//     content: 'A fourth orange comment',
//     status: 'rejected',
//     id: '46bb5357',
//   });
//   await qr.updateComment({
//     postId: '16df68c3',
//     content: 'A second comment',
//     status: 'approved',
//     id: '42b243bc',
//   });
//   await qr.updateComment({
//     postId: '16df68c3',
//     content: 'A third comment',
//     status: 'approved',
//     id: '3883ba5b',
//   });
// };

module.exports = new QueriesRepository('./queries.json');
