var ezmongo = require('./lib');

ezmongo.connect('mongodb://10.163.11.20:27017/omd');


setTimeout(function () {
  var co = ezmongo.find('order',
    {buyer_name: /.*啤酒.*/},
    {
      skip   : 4995,
      limit  : 1,
      sort   : {_id: -1},
      project: {_id: 1}
    });
  co(function (err, rres) {
    console.log(rres);
  });

  // var co = ezmongo.deleteOne('test');
  // co(function (err, rres) {
  //   console.log(rres);
  // });
  //console.log(co.next());

  // var co = ezmongo.insert('test', [
  //   {    a: 1, b: 21  },
  //   {    a: 2, b: 22  },
  //   {    a: 3, b: 23  }
  // ]);
  // co(function (err, rres) {
  //   console.log(rres);
  // });


}, 1000);