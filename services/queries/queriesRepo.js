const Repository = require('./repository/repository');

class QueriesRepository extends Repository {
  async addPost(attrs) {
    const post = { ...attrs };
    const posts = await super.getAll();
    posts[post.id] = post;
    await super.writeAll(posts);
    return post;
  }

  async addComment(attrs) {
    const comment = { ...attrs };
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
        return {
          id: updatedComment.id,
          postId: updatedComment.postId,
          content: updatedComment.content,
          status: updatedComment.status,
        };
      }
      return {
        ...c,
      };
    });
    const updatedPost = await super.update(updatedComment.postId, {
      ...post,
      comments: [...updatedComments],
    });
    return updatedPost;
  }
}

module.exports = new QueriesRepository('./queries.json');
