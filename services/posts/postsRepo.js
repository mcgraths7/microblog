const crypto = require('crypto');

const Repository = require('./repository/repository');

const randomId = () => crypto.randomBytes(4).toString('hex');

class PostsRepository extends Repository {
  async create(attrs) {
    const posts = await super.getAll();
    const post = { ...attrs };
    post.id = randomId();
    posts[post.id] = post;
    await super.writeAll(posts);
    return post;
  }
}

module.exports = new PostsRepository('./posts.json');
