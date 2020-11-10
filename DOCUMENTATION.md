### Table of Contents

-   [makeConnection][1]
    -   [Parameters][2]
-   [MongoDBManager][3]
    -   [insertDoc][4]
        -   [Parameters][5]
    -   [insertDocProm][6]
        -   [Parameters][7]
    -   [getAllDocuments][8]
        -   [Parameters][9]
    -   [getDocumentsBy][10]
        -   [Parameters][11]
    -   [getDocumentsByProm][12]
        -   [Parameters][13]
    -   [getDocumentsParamProm][14]
        -   [Parameters][15]
    -   [getDistinctDocumentsProm][16]
        -   [Parameters][17]
    -   [getAggregate][18]
        -   [Parameters][19]
    -   [getMax][20]
        -   [Parameters][21]
    -   [updateOneDoc][22]
        -   [Parameters][23]
    -   [updateOneDocProm][24]
        -   [Parameters][25]
    -   [deleteDocument][26]
        -   [Parameters][27]
    -   [deleteOneDocProm][28]
        -   [Parameters][29]
    -   [INSTANCE][30]
    -   [configure][31]
        -   [Parameters][32]
    -   [configure][33]
        -   [Parameters][34]
    -   [getInstance][35]
-   [client][36]
-   [db][37]

## makeConnection

Creates connection with mongodb, if fails, throws error

### Parameters

-   `onConnection`
-   `onConnectionFail`

Returns **[Promise][38]&lt;MongoClient>** MongoClient Promise

## MongoDBManager

### insertDoc

Inserts single document in given collection.

#### Parameters

-   `doc` **any** Any type of object to store
-   `collectionName` **[string][39]** name of collection
-   `onDocInsertSuccess` **[Function][40]** Callback for success
-   `onDocInsertFail` **[Function][40]** Callback for fail

### insertDocProm

Inserts single document in given collection.

#### Parameters

-   `doc` **any** Any type of object to store
-   `collectionName` **[string][39]** name of collection
-   `dbObj` **Db** Database connection object

### getAllDocuments

Fetches all documents in given collection

#### Parameters

-   `collectionName` **[string][39]** name of collection
-   `successCb` **[Function][40]** Callback for success
-   `failCb` **[Function][40]** Callback for fail

### getDocumentsBy

Fetches all documents in given collection

#### Parameters

-   `collectionName` **[string][39]** name of collection
-   `query` **[Object][41]** any type of mongodb query
-   `successCb` **[Function][40]** Callback for success
-   `failCb` **[Function][40]** Callback for fail

### getDocumentsByProm

Fetches all documents in given collection

#### Parameters

-   `collectionName` **[string][39]** name of collection
-   `query` **[Object][41]** any type of mongodb query
-   `dbObj` **Db** Database connection object

Returns **[Promise][38]&lt;[Array][42]&lt;any>>** Return all documents in array form

### getDocumentsParamProm

Fetches all documents in given collection

#### Parameters

-   `collectionName` **[string][39]** name of collection
-   `params` **[Object][41]** any type of mongodb query
-   `dbObj` **Db** Database connection object

Returns **[Promise][38]&lt;[Array][42]&lt;any>>** Return all documents in array form

### getDistinctDocumentsProm

Fetches all documents in given collection

#### Parameters

-   `collectionName` **[string][39]** name of collection
-   `params` **[Object][41]** any type of mongodb query
-   `dbObj` **Db** Database connection object

Returns **[Promise][38]&lt;[Array][42]&lt;any>>** Return all documents in array form

### getAggregate

Get aggregation result in promise.

#### Parameters

-   `collectionName` **[string][39]** name of collection
-   `aggquery` **[Array][42]&lt;[object][41]>** Aggregate query
-   `dbObj` **Db** Database connection object

Returns **[Promise][38]&lt;[Array][42]&lt;any>>** Return all documents in array form

### getMax

Get max of given field from collection.

#### Parameters

-   `collectionName` **[string][39]** name of collection
-   `fieldName`
-   `idField`
-   `dbObj` **Db** Database connection object
-   `aggquery` **[Array][42]&lt;[object][41]>** Aggregate query

Returns **[Promise][38]&lt;[number][43]>** Return maximum number 1 if no documents are matched/available

### updateOneDoc

Updates one document from collection.

#### Parameters

-   `collectionName` **[string][39]** name of collection
-   `query` **any** Object containing query checks
-   `newVal` **any** Object containing new  updated values
-   `onSuccess` **[Function][40]** Callback for success
-   `onFail` **[Function][40]** Callback for fail

### updateOneDocProm

Updates one document from collection.

#### Parameters

-   `collectionName` **[string][39]** name of collection
-   `query` **any** Object containing query checks
-   `newVal` **any** Object containing new  updated values
-   `dbObj` **Db** Database connection object

Returns **[Promise][38]&lt;CommandResult>** Command result promise

### deleteDocument

Updates one document from collection.

#### Parameters

-   `collectionName` **[string][39]** name of collection
-   `query` **any** Object containing query checks
-   `params` **any** Object delete options
-   `dbObj` **Db** Database connection object

Returns **[Promise][38]&lt;CommandResult>** Command result promise

### deleteOneDocProm

Updates one document from collection.

#### Parameters

-   `collectionName` **[string][39]** name of collection
-   `query` **[Object][41]** Object containing query checks
-   `params` **[Object][41]** Object delete options
-   `dbObj` **Db** Database connection object

Returns **[Promise][38]&lt;DeleteWriteOpResultObject>** Command result promise

### INSTANCE

Type: [MongoDBManager][44]

### configure

#### Parameters

-   `attr`   (optional, default `{}`)

### configure

Configures mongoclient.

#### Parameters

-   `attr` **MongoDBManagerConfiguration** Attrubites for configuration (optional, default `{}`)

### getInstance

Returns MongoDBManager instance.

Returns **[MongoDBManager][44]**

## client

Type: MongoClient

## db

[1]: #makeconnection

[2]: #parameters

[3]: #mongodbmanager

[4]: #insertdoc

[5]: #parameters-1

[6]: #insertdocprom

[7]: #parameters-2

[8]: #getalldocuments

[9]: #parameters-3

[10]: #getdocumentsby

[11]: #parameters-4

[12]: #getdocumentsbyprom

[13]: #parameters-5

[14]: #getdocumentsparamprom

[15]: #parameters-6

[16]: #getdistinctdocumentsprom

[17]: #parameters-7

[18]: #getaggregate

[19]: #parameters-8

[20]: #getmax

[21]: #parameters-9

[22]: #updateonedoc

[23]: #parameters-10

[24]: #updateonedocprom

[25]: #parameters-11

[26]: #deletedocument

[27]: #parameters-12

[28]: #deleteonedocprom

[29]: #parameters-13

[30]: #instance

[31]: #configure

[32]: #parameters-14

[33]: #configure-1

[34]: #parameters-15

[35]: #getinstance

[36]: #client

[37]: #db

[38]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[39]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[40]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[41]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[42]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[43]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[44]: #mongodbmanager