var ObjectID    = require("mongodb").ObjectID;
var MongoClient = require('mongodb').MongoClient;
var errors      = require("common-rest-errors");
var db          = null;

module.exports = {
  connect         : function (dbUrl) {
    MongoClient.connect(dbUrl, function (err, newDB) {
      console.log("mongodb now connected");
      db = newDB;
    });
  },
  find            : function (collectionName, query, options) {
    return function (callback) {
      var collection = db().collection(collectionName);
      var docs       = collection.find(query);
      console.log(collectionName, "------", options);
      if (!options) {
        options = {};
      }
      if (options.hasOwnProperty("project")) {
        docs.project(options['project']);
      }
      if (options.hasOwnProperty("skip")) {
        docs.skip(options['skip']);
      }
      if (options.hasOwnProperty("limit")) {
        docs.limit(options['limit']);
      }
      if (options.hasOwnProperty("comment")) {
        docs.comment(options['comment']);
      }
      if (options.hasOwnProperty("sort")) {
        docs.sort(options['sort']);
      }
      if (options.hasOwnProperty("max")) {
        docs.max(options['max']);
      }
      if (options.hasOwnProperty("min")) {
        docs.min(options['min']);
      }
      if (options.hasOwnProperty("sort")) {
        docs.sort(options['sort']);
      }
      docs.toArray(callback);
    }
  },
  count           : function (collectionName, query, options) {
    return function (callback) {
      var collection = db().collection(collectionName);
      collection.count(query, options, callback);
    }
  },
  findOne         : function *(collectionName, query, options) {
    if (!options) {
      options = {};
    }
    options.limit = 1;
    var res       = yield this.find(collectionName, query, options);
    if (res.length > 0)
      return res[0];
    return null;
  },
  exists          : function *(collectionName, query) {
    var res = yield this.count(collectionName, query);
    return res > 0;
  },
  insert          : function (collectionName, docs, options) {
    return function (callback) {
      var collection = db().collection(collectionName);
      if (Array.isArray(docs)) {
        collection.insertMany(docs, options, callback)
      } else {
        collection.insertOne(docs, options, function (err, r) {
          if (err) return next(err);
          if (r.result.ok == 1) {
            callback(err, docs);
          } else {
            callback(errors.CUSTOM("插入失败."));
          }
        })
      }
    }
  },
  findOneAndUpdate: function (collectionName, filter, doc, options) {
    return function (callback) {
      var collection = db().collection(collectionName);
      collection.updateOne(filter, {$set: doc}, options, callback);
    }
  },
  updateById      : function *(collectionName, _id, doc, options) {
    return yield this.updateOne(collectionName, {_id: new ObjectID(_id)}, doc, options);
  },
  save            : function *(collectionName, doc, options) {
    if (doc.hasOwnProperty("_id") && doc._id != null && doc._id != "") {
      var _id = doc._id;
      delete doc._id;
      return yield this.findOneAndUpdate(collectionName, {_id: new ObjectID(_id)}, doc, options);
    } else {
      doc._id = new ObjectID();
      //console.log(doc);
      return yield this.insert(collectionName, doc, options);
    }
  },
  sum             : function (collectionName, key, match) {
    return function (callback) {
      var collection = db().collection(collectionName);
      var xV         = [];
      if (match) {
        xV.push({
          $match: match
        });
      }
      xV.push({
        $group: {
          _id: null,
          sum: {$sum: "$" + key}
        }
      });
      collection.aggregate(xV).toArray(function (err, res) {
        if (res.length > 0) {
          callback(null, res[0].sum);
        }
      });
    }
  }
};