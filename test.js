var ezmongo = require('./lib');

 ezmongo.connect('mongodb://mongoadmin:docker_youku@112.74.29.211:27017/goods');
 // ezmongo.connect('mongodb://112.74.29.211:27017/goods');


setTimeout(function () {

  var co = ezmongo.find('brand');
  co(function (err, rres) {
    console.log(rres);
  });
  
  //
  // var co = ezmongo.findOne('brand',
  //   {buyer_name: /.*啤酒.*/},
  //   {
  //     skip   : 4995,
  //     limit  : 1,
  //     sort   : {_id: -1},
  //     project: {_id: 1}
  //   });
  // co(function (err, rres) {
  //   console.log(rres);
  // });

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