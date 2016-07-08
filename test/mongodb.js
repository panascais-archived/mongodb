import test from 'ava';
import mongodb from '../src/mongodb.es';

const cfg = {

  good: {
    db: 'database',
    user: 'database',
    auth: 'database',
    host: 'localhost',
    port: 27017,
  },

  bad: {
    db: 'database',
    user: 'database',
    auth: 'database',
    host: 'localhost',
    port: 27018,
  },

};

test('should connect to the database', t => {
  const url = `mongodb://${cfg.good.user}:${cfg.good.auth}@${cfg.good.host}:${cfg.good.port}/${cfg.good.db}`;
  const db = new mongodb(url, cfg.good.db, true);
  return db.connect()
  .then(() => {
    t.pass();
  })
  .catch((error) => {
    t.fail(error.toString());
  });
});

test('should not connect to the database', t => {
  const url = `mongodb://${cfg.bad.user}:${cfg.bad.auth}@${cfg.bad.host}:${cfg.bad.port}/${cfg.bad.db}`;
  const db = new mongodb(url, cfg.bad.db, true);
  return db.connect()
  .then(() => {
    t.fail('Connected to database');
  })
  .catch((error) => {
    t.pass(error.toString());
  });
});

test('should insert a document into the database', t => {
  const url = `mongodb://${cfg.good.user}:${cfg.good.auth}@${cfg.good.host}:${cfg.good.port}/${cfg.good.db}`;
  const db = new mongodb(url, cfg.good.db, true);
  return db.insert({ test: 'test' })
  .then(() => {
    t.pass('Inserted document into the database');
  })
  .catch((error) => {
    t.pass(error.toString());
  });
});

test('should find documents in the database', t => {
  const url = `mongodb://${cfg.good.user}:${cfg.good.auth}@${cfg.good.host}:${cfg.good.port}/${cfg.good.db}`;
  const db = new mongodb(url, cfg.good.db, true);
  return db.find()
  .then(() => {
    t.pass('Found documents');
  })
  .catch((error) => {
    t.fail(error.toString());
  });
});

test('should remove a document in the database', t => {
  const url = `mongodb://${cfg.good.user}:${cfg.good.auth}@${cfg.good.host}:${cfg.good.port}/${cfg.good.db}`;
  const db = new mongodb(url, cfg.good.db, true);
  return db.insert({ test: 'test' }).then(() => {
    db.remove({ test: 'test' })
    .then(() => {
      t.pass('Removed documents');
    })
    .catch((error) => {
      t.fail(error.toString());
    });
  });
});
