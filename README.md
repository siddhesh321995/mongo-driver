# mongo-driver
Simple basic driver for node and mongo db combination

[![Build Status](https://travis-ci.com/siddhesh321995/mongo-driver.svg?branch=master)](https://travis-ci.com/siddhesh321995/cmsone-api)
![Node.js CI](https://github.com/siddhesh321995/mongo-driver/workflows/Node.js%20CI/badge.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/siddhesh321995/mongo-driver/badge.svg?branch=master)](https://coveralls.io/github/siddhesh321995/cmsone-api?branch=master)

## Installation:

```
npm install mongo-driverify --save
```


Setup your Mongo Driver
```
const MongoDriver = require('mongo-driverify');

MongoDriver.MongoDBManager.configure({
    connectionString: 'mongodb+srv://XXXX:XXXX@XXXX-XXXX.mongodb.net/XXXX',
    hasCert: false,
    certPath: '',
    dbName: 'XXXX'
});
```

## Usage:

### Insert documents
```
await MongoDriver.MongoDBManager.getInstance().insertDocProm({ 'id': 1, 'string': 'abc', 'number': 10 }, collectionName);
```

### Fetch documents
```
await MongoDriver.MongoDBManager.getInstance().getDocumentsByProm(collectionName, { 'id': rndId });
```

## Complete Documentation
[a relative link](DOCUMENTATION.md) Click here to checkout complete documentation.

## Features:
- Supports Insert, Fetch, Delete, Update documents.
- Simple light weight driver for your mongodb.
- Only 1 dependency.
