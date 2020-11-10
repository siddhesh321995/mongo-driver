# mongo-driver
Simple basic driver for node and mongo db combination

[![Build Status](https://travis-ci.com/siddhesh321995/mongo-driver.svg?branch=main)](https://travis-ci.com/siddhesh321995/mongo-driver)
![Node.js CI](https://github.com/siddhesh321995/mongo-driver/workflows/Node.js%20CI/badge.svg?branch=main)
[![Coverage Status](https://coveralls.io/repos/github/siddhesh321995/mongo-driver/badge.svg?branch=main)](https://coveralls.io/github/siddhesh321995/cmsone-api?branch=main)

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

### Get driver instance
```
const driver = MongoDriver.MongoDBManager.getInstance();
```

### Insert documents
```
await driver.insertDocProm({ 'id': 1, 'string': 'abc', 'number': 10 }, collectionName);
```

### Fetch documents
```
await driver.getDocumentsByProm(collectionName, { 'id': 1 });
```

## Complete Documentation
[Click here](DOCUMENTATION.md) to checkout complete documentation or View Documentation page [here](https://siddhesh321995.github.io/mongo-driver/)

## Features:
- Supports Insert, Fetch, Delete, Update document etc functionality.
- Simple light weight driver for your mongodb.
- Only 1 dependency.
