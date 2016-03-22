# ezway2mongo
An easy way to access mongo with mongodb and yield.

## Usage

```
npm i --save ezway2mongo
```

### First

Connect to your mongo db after your appliction started.

Remember connect only once.

```
var ezmongo = require('ezway2mongo');
ezmongo.connect('mongodb://localhost:27017/test');
```

### Then

Use the methods

```
var result = yield ezmongo.find('collectionName', {a:1}, {skip:20, limit:20});
```

## API

### find

### count

### findOne

### exists

### insert

### findOneAndUpdate

### updateById

### save

### sum