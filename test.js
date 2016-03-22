var ezmongo = require('./lib');

ezmongo.connect('mongodb://localhost:27017/wdm');


setTimeout(function () {
  var co = ezmongo.find('store');
  co(function (err, rres) {
    console.log(err, rres);
  });
}, 1000);