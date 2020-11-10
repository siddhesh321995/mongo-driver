const MongoClient = require('mongodb').MongoClient;
const Db = require('mongodb').Db;
const fs = require('fs');

/**
 * Creates connection with mongodb, if fails, throws error
 * @param {(client:MongoClient)=>void} onConnection Callback after connection is made
 * @returns {Promise<MongoClient>} MongoClient Promise
 */
const makeConnection = (onConnection, onConnectionFail) => {
  if (typeof onConnectionFail == "undefined") {
    onConnectionFail = (er) => {
      throw new Error(er);
    };
  }

  let cert;

  if (MongoDBManager.HAS_CERT) {
    cert = fs.readFileSync(MongoDBManager.CERT_PATH);
  }
  const opts = (MongoDBManager.HAS_CERT) ? { sslCA: cert } : { useNewUrlParser: true };

  return new Promise((res, rej) => {
    MongoClient.connect(MongoDBManager.CONNECTION_STRING, opts, (err, client) => {
      if (err) {
        onConnectionFail(err);
        rej(err);
        return;
      }

      if (!client) {
        onConnectionFail("Could not connect to database");
        rej("Could not connect to database");
      }
      typeof onConnection == 'function' && onConnection(client);
      res(client);
    });
  });
};

/**
 * @class MongoDBManager
 * Simple mongodb manger singleton class
 */
const MongoDBManager = function MongoDBManager() {
  if (!MongoDBManager.INSTANCE) {
  } else {
    throw new Error("Instance already present please use MongoDBManager.INSTANCE");
  }
};

MongoDBManager.CONNECTION_STRING = '';
MongoDBManager.CERT_PATH = '';
MongoDBManager.DATABASE_NAME = '';
MongoDBManager.HAS_CERT = false;
/**
 * @type {MongoDBManager} Singleton instance
 */
MongoDBManager.INSTANCE = null;

/**
 * Inserts single document in given collection.
 * @param {*} doc Any type of object to store
 * @param {string} collectionName name of collection
 * @param {Function} onDocInsertSuccess Callback for success
 * @param {Function} onDocInsertFail Callback for fail
 */
MongoDBManager.prototype.insertDoc = function insertDoc(doc, collectionName, onDocInsertSuccess, onDocInsertFail) {
  makeConnection((client) => {
    const db = client.db(MongoDBManager.DATABASE_NAME);
    db.collection(collectionName).insertOne(doc).then(function (data) {
      data = JSON.parse(data);
      if (data.ok == 1) {
        typeof onDocInsertSuccess == "function" && onDocInsertSuccess({
          doc: data.ops[0],
          insertedId: data.insertedId,
          insertedCount: data.insertedCount
        });
      } else {
        typeof onDocInsertFail == "function" && onDocInsertFail(data);
      }
      client.close();
    }, onDocInsertFail);
  }, onDocInsertFail);
};

/**
 * Inserts single document in given collection.
 * @param {*} doc Any type of object to store
 * @param {string} collectionName name of collection
 * @param {Db} dbObj Database connection object
 * @returns {Promise<{doc:any;insertedId:any;insertedCount}>} Promise of insert document
 */
MongoDBManager.prototype.insertDocProm = async function insertDocProm(doc, collectionName, dbObj) {
  let closeClient = false;
  let client;
  if (dbObj == void 0) {
    client = await makeConnection();
    dbObj = client.db(MongoDBManager.DATABASE_NAME);
    closeClient = true;
  }

  return new Promise(async (res, rej) => {
    try {
      let data = await dbObj.collection(collectionName).insertOne(doc);
      data = JSON.parse(data);
      closeClient && client.close();
      if (data.ok == 1) {
        res({
          doc: data.ops[0],
          insertedId: data.insertedId,
          insertedCount: data.insertedCount
        });
      } else {
        rej(data);
      }
    } catch (err) {
      rej(err);
    }
  });
};

/**
 * Fetches all documents in given collection
 * @param {string} collectionName name of collection
 * @param {Function} successCb Callback for success
 * @param {Function} failCb Callback for fail
 */
MongoDBManager.prototype.getAllDocuments = function getAllDocuments(collectionName, successCb, failCb) {
  if (typeof successCb != "function") {
    throw new Error("2nd argument as a function is required");
  }

  makeConnection((client) => {
    const db = client.db(MongoDBManager.DATABASE_NAME);
    db.collection(collectionName).find({}).toArray(function (err, result) {
      client.close();
      if (err) {
        typeof failCb == 'function' && failCb(err);
        return;
      }
      successCb(result);
    });
  }, failCb);
};

/**
 * Fetches all documents in given collection
 * @param {string} collectionName name of collection
 * @param {Object} query any type of mongodb query
 * @param {Function} successCb Callback for success
 * @param {Function} failCb Callback for fail
 */
MongoDBManager.prototype.getDocumentsBy = function getDocumentsBy(collectionName, query, successCb, failCb) {
  if (typeof successCb != "function") {
    throw new Error("3rd argument as a function is required");
  }

  makeConnection((client) => {
    const db = client.db(MongoDBManager.DATABASE_NAME);
    db.collection(collectionName).find(query).toArray(function (err, result) {
      client.close();
      if (err) {
        typeof failCb == 'function' && failCb(err);
        return;
      }
      successCb(result);
    });
  }, failCb);
};

/**
 * Fetches all documents in given collection
 * @param {string} collectionName name of collection
 * @param {Object} query any type of mongodb query
 * @param {Db} dbObj Database connection object
 * @returns {Promise<any[]>} Return all documents in array form
 */
MongoDBManager.prototype.getDocumentsByProm = async function getDocumentsByProm(collectionName, query, dbObj) {
  let closeClient = false;
  let client;
  if (dbObj == void 0) {
    client = await makeConnection();
    dbObj = client.db(MongoDBManager.DATABASE_NAME);
    closeClient = true;
  }
  return new Promise((res, rej) => {
    try {
      dbObj.collection(collectionName).find(query).toArray((err, result) => {
        closeClient && client.close();
        if (err) {
          rej(err);
          return;
        }
        res(result);
      });
    } catch (err) {
      rej(err);
    }
  });
};

/**
 * Fetches all documents in given collection
 * @param {string} collectionName name of collection
 * @param {Object} params any type of mongodb query
 * @param {Db} dbObj Database connection object
 * @returns {Promise<any[]>} Return all documents in array form
 */
MongoDBManager.prototype.getDocumentsParamProm = async function getDocumentsByProm(collectionName, params, dbObj) {
  let closeClient = false;
  let client;
  if (dbObj == void 0) {
    client = await makeConnection();
    dbObj = client.db(MongoDBManager.DATABASE_NAME);
    closeClient = true;
  }
  return new Promise((res, rej) => {
    try {
      let out = dbObj.collection(collectionName);
      if (params.query !== void 0) {
        out = out.find(params.query);
      } else {
        params.query = {};
        out = out.find(params.query);
      }
      if (params.sort) {
        out = out.sort(params.sort);
      }
      if (params.limit !== void 0) {
        out = out.limit(params.limit);
      }
      if (params.skip !== void 0) {
        out = out.skip(params.skip);
      }
      out.toArray((err, result) => {
        closeClient && client.close();
        if (err) {
          rej(err);
          return;
        }
        res(result);
      });
    } catch (err) {
      rej(err);
    }
  });
};

/**
 * Fetches all documents in given collection
 * @param {string} collectionName name of collection
 * @param {Object} params any type of mongodb query
 * @param {Db} dbObj Database connection object
 * @returns {Promise<any[]>} Return all documents in array form
 */
MongoDBManager.prototype.getDistinctDocumentsProm = async function getDocumentsByProm(collectionName, params, dbObj) {
  let closeClient = false;
  let client;
  if (dbObj == void 0) {
    client = await makeConnection();
    dbObj = client.db(MongoDBManager.DATABASE_NAME);
    closeClient = true;
  }

  let out = dbObj.collection(collectionName);
  out = out.distinct(params.distinct.propName, params.query);
  closeClient && client.close();
  return out;
};

/**
 * Get aggregation result in promise.
 * @param {string} collectionName name of collection
 * @param {object[]} aggquery Aggregate query
 * @param {Db} dbObj Database connection object
 * @returns {Promise<any[]>} Return all documents in array form
 */
MongoDBManager.prototype.getAggregate = async function getAggregate(collectionName, aggquery, dbObj) {
  let closeClient = false;
  let client;
  if (dbObj == void 0) {
    client = await makeConnection();
    dbObj = client.db(MongoDBManager.DATABASE_NAME);
    closeClient = true;
  }
  return new Promise((res, rej) => {
    try {
      dbObj.collection(collectionName).aggregate(aggquery).toArray((err, result) => {
        closeClient && client.close();
        if (err) {
          rej(err);
          return;
        }
        res(result);
      });
    } catch (err) {
      rej(err);
    }
  });
};

/**
 * Get max of given field from collection.
 * @param {string} collectionName name of collection
 * @param {object[]} aggquery Aggregate query
 * @param {Db} dbObj Database connection object
 * @returns {Promise<number>} Return maximum number 1 if no documents are matched/available
 */
MongoDBManager.prototype.getMax = async function getMax(collectionName, fieldName, idField, dbObj) {
  let closeClient = false;
  let client;
  if (dbObj == void 0) {
    client = await makeConnection();
    dbObj = client.db(MongoDBManager.DATABASE_NAME);
    closeClient = true;
  }
  return new Promise((res, rej) => {
    try {
      dbObj.collection(collectionName).aggregate([{
        $group:
        {
          _id: '$' + idField,
          maxField: { $max: '$' + fieldName }
        }
      }]).toArray((err, result) => {
        closeClient && client.close();
        if (err) {
          rej(err);
          return;
        }

        let maxId = 0;
        if (result.length) {
          for (const res of result) {
            if (res.maxField > maxId) {
              maxId = res.maxField;
            }
          }
        }
        res(maxId);
      });
    } catch (err) {
      rej(err);
    }
  });
};

/**
 * Updates one document from collection.
 * @param {string} collectionName name of collection
 * @param {*} query Object containing query checks
 * @param {*} newVal Object containing new  updated values
 * @param {Function} onSuccess Callback for success
 * @param {Function} onFail Callback for fail
 */
MongoDBManager.prototype.updateOneDoc = function updateOneDoc(collectionName, query, newVal, onSuccess, onFail) {
  makeConnection((client) => {
    const db = client.db(MongoDBManager.DATABASE_NAME);
    var newvalues = { $set: newVal };
    db.collection(collectionName).updateOne(query, newvalues, function (err, res) {
      client.close();
      if (err) {
        typeof onFail == "function" && onFail(err);
      }
      typeof onSuccess == "function" && onSuccess(res);
    });
  }, onFail);
};

/**
 * Updates one document from collection.
 * @param {string} collectionName name of collection
 * @param {*} query Object containing query checks
 * @param {*} newVal Object containing new  updated values
 * @param {Db} dbObj Database connection object
 * @returns {Promise<CommandResult>} Command result promise
 */
MongoDBManager.prototype.updateOneDocProm = async function updateOneDocProm(collectionName, query, newVal, dbObj) {
  let closeClient = false;
  let client;
  if (dbObj == void 0) {
    client = await makeConnection();
    dbObj = client.db(MongoDBManager.DATABASE_NAME);
    closeClient = true;
  }
  return new Promise((resolver, rej) => {
    try {
      dbObj.collection(collectionName).updateOne(query, newVal, function (err, res) {
        closeClient && client.close();
        if (err) {
          rej(err);
        }
        resolver(res);
      });
    } catch (err) {
      rej(err);
    }
  });
};

/**
 * Updates one document from collection.
 * @param {string} collectionName name of collection
 * @param {*} query Object containing query checks
 * @param {*} params Object delete options
 * @param {Db} dbObj Database connection object
 * @returns {Promise<CommandResult>} Command result promise
 */
MongoDBManager.prototype.deleteDocument = async function deleteDocument(collectionName, query, params, dbObj) {
  let closeClient = false;
  let client;
  if (dbObj == void 0) {
    client = await makeConnection();
    dbObj = client.db(MongoDBManager.DATABASE_NAME);
    closeClient = true;
  }

  return new Promise((res, rej) => {
    dbObj.collection(collectionName).remove(query, params);
  });
};



/**
 * Updates one document from collection.
 * @param {string} collectionName name of collection
 * @param {Object} query Object containing query checks
 * @param {Object} params Object delete options
 * @param {Db} dbObj Database connection object
 * @returns {Promise<DeleteWriteOpResultObject>} Command result promise
 */
MongoDBManager.prototype.deleteOneDocProm = async function deleteOneDocProm(collectionName, query, params, dbObj) {
  let closeClient = false;
  let client;
  if (dbObj == void 0) {
    client = await makeConnection();
    dbObj = client.db(MongoDBManager.DATABASE_NAME);
    closeClient = true;
  }

  return dbObj.collection(collectionName).deleteOne(query).then((resp) => {
    if (closeClient) {
      client.close();
    }
    return resp;
  });
};

/**
 * @typedef {{connectionString:string;certPath:string;dbName:string;hasCert?:boolean}} MongoDBManagerConfiguration
 */

/**
 * Configures mongoclient.
 * @param {MongoDBManagerConfiguration} attr Attrubites for configuration
 */
MongoDBManager.configure = function configure(attr) {
  if (attr.hasCert === void 0) { attr.hasCert = true; }

  MongoDBManager.CONNECTION_STRING = attr.connectionString;
  MongoDBManager.CERT_PATH = attr.certPath;
  MongoDBManager.DATABASE_NAME = attr.dbName;
  MongoDBManager.HAS_CERT = attr.hasCert;
};

/**
 * Returns MongoDBManager instance.
 * @returns {MongoDBManager}
 */
MongoDBManager.getInstance = function getInstance() {
  if (!MongoDBManager.INSTANCE) {
    MongoDBManager.INSTANCE = new MongoDBManager();
  }
  return MongoDBManager.INSTANCE;
};

class MGConnection {
  /**
   * @type {MongoClient}
   */
  client;
  /**
   * @type {{[id:string]:Db}
   */
  db = {};
  constructor(attr = {}) {

  }

  async openConnection(dbNames = [MongoDBManager.DATABASE_NAME]) {
    this.client = await makeConnection();
    for (const dbName of dbNames) {
      const db = this.client.db(dbName);
      this.db[dbName] = db;
    }
    return this.client;
  }

  closeConnection() {
    this.client.close();
  }
}

module.exports = {
  MongoDBManager: MongoDBManager,
  MGConnection,
  Db
};
