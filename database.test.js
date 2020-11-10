const should = require('should');
const MongoDriver = require('./index');

const connStr = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
const hasCert = false;
const certPath = '';
const dbName = 'cmsone';
const collectionName = 'testcollection';

const rndId = Math.round(Math.random() * 1000000);
let insertedProm;

describe('Database operations', () => {
  it('Connect & insert a document', (done) => {
    MongoDriver.MongoDBManager.configure({
      connectionString: connStr,
      hasCert: hasCert,
      certPath: certPath,
      dbName: dbName
    });
    const out = MongoDriver.MongoDBManager.getInstance().insertDocProm({ 'id': rndId, 'string': 'abc', 'number': 10 }, collectionName);
    insertedProm = new Promise((res, rej) => {
      out.then(() => {
        done();
        res();
      }).catch((exp) => { done(exp.toString()); rej(); });
    });
  }).timeout(4000);

  it('Connect & fetch the same document', (done) => {
    MongoDriver.MongoDBManager.configure({
      connectionString: connStr,
      hasCert: hasCert,
      certPath: certPath,
      dbName: dbName
    });
    insertedProm.then(() => {
      const out = MongoDriver.MongoDBManager.getInstance().getDocumentsByProm(collectionName, { 'id': rndId });
      out.then((resp) => {
        resp.length.should.equal(1);
        resp[0].string.should.equal('abc');
        done();
      }).catch((exp) => { done(exp.toString()); });
    }).catch((exp) => { done(exp.toString()); });
  }).timeout(4000);
});