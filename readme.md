[![Chat](https://img.shields.io/gitter/room/panascais/mongodb.svg?style=flat-square)](https://gitter.im/panascais/mongodb)
[![Travis CI](https://img.shields.io/travis/panascais/mongodb.svg?style=flat-square)](https://travis-ci.org/panascais/mongodb)
[![Dependencies](https://img.shields.io/david/panascais/mongodb.svg?style=flat-square)](https://david-dm.org/panascais/mongodb)
[![Version](https://img.shields.io/npm/v/mongo-db.svg?style=flat-square)](https://www.npmjs.com/package/mongo-db)
[![Downloads](https://img.shields.io/npm/dt/mongo-db.svg?style=flat-square)](https://www.npmjs.com/package/mongo-db)
[![License](https://img.shields.io/npm/l/mongo-db.svg?style=flat-square)](https://www.npmjs.com/package/mongo-db)

[![npm statistics](https://nodei.co/npm/mongo-db.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/mongo-db)

Mongo-DB is a [MongoDB](https://www.npmjs.com/package/mongodb) wrapper using ES7 and Promises.

## Installation

You can install Mongo-DB through the command line by using the following command:

```
npm i mongo-db --save
```

## Usage:

```javascript
import mongodb from 'mongo-db';

const cfg = {
  database: 'database',
  collection: 'database',
  user: 'database',
  password: 'database',
  host: 'mongo.local',
  port: 27017,
};
const url = `mongodb://${cfg.user}:${cfg.password}@${cfg.host}:${cfg.port}/${cfg.database}`;
const db  = new mongodb(url, cfg.collection, true);
```

## Documentation:

db.find()
---------
#### Find documents in the database

```javascript
db.find()
  .then((result) => {
    console.log(`Documents found: ${result}`)
  })
  .catch((err) => {
    console.error(`Could not find documents: ${err}`)
  });
```

db.findOne()
------------
#### Find a document in the database

```javascript
db.findOne()
  .then((result) => {
    console.log(`Document found: ${result}`)
  })
  .catch((err) => {
    console.error(`Could not find document: ${err}`)
  });
```

db.insert()
-----------
#### Inserts a document into the database

```javascript
const document = {
  one: 1,
  two: 2
};

db.insert(document)
  .then(() => {
    console.log('Document inserted!')
  })
  .catch((err) => {
    console.error(`Inserting the document failed: ${err}`)
  });
```

db.insertMany()
---------------
#### Inserts documents into the database

```javascript
const documents = [
  {
    one: 1,
    two: 2
  },
  {
    three: 3,
    four: 4
  }
];

db.insertMany(documents)
  .then(() => {
    console.log('Documents inserted!')
  })
  .catch((err) => {
    console.error(`Inserting the documents failed: ${err}`)
  });
```

db.update()
-----------
#### Update a document in the database

```javascript
const document = [
  {
    one: 1,
    two: 2
  }
];

db.update(query, document, options)
  .then(() => {
    console.log('Document updated!')
  })
  .catch((err) => {
    console.error(`Updating the document failed: ${err}`)
  });
```

db.remove()
-----------
#### Remove a document in the database

```javascript
db.remove(query)
  .then(() => {
    console.log('Document removed!')
  })
  .catch((err) => {
    console.error(`Removing the document failed: ${err}`)
  });
```

db.aggregate()
--------------
#### Execute an aggregation framework query

```javascript
db.aggregate(query)
  .then(() => {
    console.log('Aggregation framework query executed!')
  })
  .catch((err) => {
    console.error(`Executing aggregation framework query failed: ${err}`)
  });
```

db.count()
----------
#### Count documents in collection

```javascript
db.count()
  .then((result) => {
    console.log(`Document count: ${result}`)
  })
  .catch((err) => {
    console.error(`Counting the documents failed: ${err}`)
  });
```

db.countByQuery()
-----------------
#### Count documents in collection by query

```javascript
db.countByQuery(query)
  .then((result) => {
    console.log(`Document count: ${result}`)
  })
  .catch((err) => {
    console.error(`Counting the documents failed: ${err}`)
  });
```

db.createIndex()
-----------------
#### Create a index

```javascript
db.createIndex(index, options)
  .then(() => {
    console.log('Index created!')
  })
  .catch((err) => {
    console.error(`Creating the index failed: ${err}`)
  });
```

## Contributing:

Interested in contributing to Mongo-DB? Contributions are welcome, and are accepted via pull requests. Please [review these guidelines](https://github.com/panascais/mongodb/blob/master/contributing.md) before submitting any pull requests.

## License:
Code licensed under [MIT](https://github.com/panascais/mongodb/blob/master/license.md), documentation under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
