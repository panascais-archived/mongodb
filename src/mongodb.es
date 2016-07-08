/**
 * @module Mongo-DB
 */

/**
 * NPM requirements
 */
import { MongoClient as client, ObjectID as objectid } from 'mongodb';

/**
 * Shared database connection
 */
let database = null;

/**
 * Default configuration
 */
const config = {
  minSkip: 0,
  maxLimit: 1000,
  sortLastID: {
    _id: -1,
  },
};

export default class {

  /**
   * Mongo-DB constructor.
   * @param {string} url - connnection string
   * @param {string} collection - collection name
   * @param {boolean} id - true for collections that use autogeneration of the _id
   */
  constructor(url, collection, id) {
    this.url = url;
    this.collection = collection;

    if (id) {
      this.objectid = objectid;
    }
  }

  /**
   * Obtains or creates a connection, and resolves to the current collection
   * @return {object} a promise with a pointer to the collection connection.
   */
  connect() {
    if (database && database.databaseName !== undefined) {
      return this.getCollection();
    }

    return client.connect(this.url).then(data => {
      database = data;
      database.on('close', this.onClose);
      database.on('error', this.onError);
      return this.getCollection();
    }).catch(error => {
      throw new Error(error);
    });
  }

  getCollection() {
    return new Promise((resolve) => {
      const collection = database.collection(this.collection);
      return resolve(collection);
    });
  }

  onClose() {
    console.warn('Closing connection!');
    database = null;
  }

  onError(error) {
    console.error(error);
  }

  /**
   * Finds documents in current collection
   * @param {Object} query - MongoDB query.
   * @return {Object} a promise with the resulting array.
   */
  find(
    query = {},
    proj = {},
    skip = config.minSkip,
    limit = config.maxLimit,
    sort = config.sortLastID
  ) {
    return new Promise((respond, reject) => {
      this.connect().then(collection => {
        this.fixQueryID(query);
        collection.find(query)
        .skip(skip)
        .limit(limit)
        .project(proj)
        .sort(sort)
        .toArray((error, data) => {
          if (error) {
            reject(error);
          } else {
            respond(data);
          }
        });
      }).catch(error => reject(error));
    });
  }

  /**
   * Finds one document in current collection
   * @param {Object} query - MongoDB query.
   * @return {Object} a promise with the resulting array.
   */
  findOne(query, proj) {
    return this.connect().then(collection => {
      this.fixQueryID(query);
      const projection = proj || {};
      return collection.findOne(query, projection);
    });
  }

  /**
   * Inserts a document in current collection
   * @param {Object} document - the document to be inserted.
   * @return {Object} a promise with the operation result.
   */
  insert(document) {
    return this.connect().then(collection => {
      return collection.insert(document);
    });
  }

  /**
   * Inserts documents into the current collection
   * @param {Object} documents - the documents to be inserted.
   * @return {Object} a promise with the operation result.
   */
  insertMany(documents) {
    return this.connect().then(collection => {
      return collection.insertMany(documents);
    });
  }

  /**
   * Updates a document in current collection
   * @param {Object} query - the query to find the documents will be affected.
   * @param {Object} document - the object witha a document replace or instructions to apply
   * @return {Object} a promise with the operation result.
   */
  update(query, document) {
    return this.connect().then(collection => {
      this.fixQueryID(query);
      return collection.update(query, document);
    });
  }

  /**
   * Deletes documents in current collection
   * @param {Object} query - the query to find the documents that will be deleted.
   * @return {Object} a promise with the operation result.
   */
  remove(query) {
    return this.connect().then(collection => {
      this.fixQueryID(query);
      return collection.remove(query);
    });
  }

  /**
   * Executes an aggregation framework query
   * @param {Object} query - the query steps to be executed.
   * @return {Object} a promise with the resulting array.
   */
  aggregate(query) {
    return this.connect().then(collection => {
      this.fixQueryID(query);
      return collection.aggregate(query).toArray();
    });
  }

  /**
   * Counts how many documents are in current collection
   * @return {Object} a promise with the operation result.
   */
  count() {
    return this.connect().then(collection => {
      return collection.count();
    });
  }

  /**
   * Counts how many documents satisfy a query in current collection
   * @param {Object} query - the query steps to be executed.
   * @return {Object} a promise with the operation result.
   */
  countByQuery(query) {
    return this.connect().then(collection => {
      this.fixQueryID(query);
      return collection.find(query).count();
    });
  }

  /**
   * Adds a index on a specific field
   * @param {String} index - name of the field.
   * @param {Object} options - options for index.
   * @return {Object} a promise with the operation result.
   */
  createIndex(index, options) {
    return this.connect().then(collection => {
      return collection.createIndex(index, options);
    });
  }

  /**
   * Uses ObjectId when collection requires it, changing _id
   * @param {Object} query - the query with an _id of type string, number...
   * @return {Object} a promise with the resulting array.
   */
  fixQueryID(query) {
    if (this.objectid && query && query._id) {
      query._id = new this.objectid(query._id);
    }
  }
}
