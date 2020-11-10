const should = require('should');
const MongoDriver = require('./index');

const connStr = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
const hasCert = false;
const certPath = '';
const dbName = 'cmsone';
const collectionName = 'testcollection';
const isDatabaseTest = false;

if (isDatabaseTest) {
  require('./database.test');
}

describe('Mongo Driver Tests', () => {
  describe('Class level tests', () => {
    it('Singleton object from a singleton class', (done) => {
      (MongoDriver.MongoDBManager.getInstance()).should.equal(MongoDriver.MongoDBManager.getInstance());
      done();
    });
  });

  describe('Driver configuration', () => {
    it('Connection string is configurable', (done) => {
      MongoDriver.MongoDBManager.configure({
        connectionString: connStr,
        hasCert: hasCert,
        certPath: certPath,
        dbName: dbName
      });
      (MongoDriver.MongoDBManager.CONNECTION_STRING).should.equal(connStr);
      done();
    });

    it('Database name is configurable', (done) => {
      MongoDriver.MongoDBManager.configure({
        connectionString: connStr,
        hasCert: hasCert,
        certPath: certPath,
        dbName: dbName
      });
      (MongoDriver.MongoDBManager.DATABASE_NAME).should.equal(dbName);
      done();
    });

    it('Certificate option is by default true', (done) => {
      MongoDriver.MongoDBManager.configure();
      (MongoDriver.MongoDBManager.HAS_CERT).should.equal(true);
      done();
    });
  });

  /* describe('Database operations', () => {

  }); */
});