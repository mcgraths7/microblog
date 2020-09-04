/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const _ = require('lodash-core');

const fsPromises = fs.promises;

class Repository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository requires a filename');
    }

    this.filename = filename;

    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '{}');
    }
  }

  async getAll() {
    const posts = await fsPromises.readFile(this.filename, {
      encoding: 'utf-8',
    });
    return JSON.parse(posts);
  }

  async writeAll(records) {
    await fsPromises.writeFile(this.filename, JSON.stringify(records, null, 2));
  }

  async getOne(id) {
    const records = await this.getAll();
    const recordId = _.findKey(records, ['id', id]);
    return records[recordId];
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const recordId = _.findKey(records, ['id', id]);
    const record = records[recordId];

    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }

    Object.assign(record, attrs);
    const newRecords = await this.writeAll(records);
    return newRecords;
  }
}

module.exports = Repository;
