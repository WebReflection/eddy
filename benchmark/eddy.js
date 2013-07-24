require(__dirname + '/../build/eddy.node.js');
var EventEmitter = require('events').EventEmitter;
function showAndSave(key, times) {
  var valid = 0 < time.get(key);
  console.log([
    '',
    key + ' [' + times + ' times]',
    'was: ' + (score[key] || ''),
    'now: ' + (valid ? time.get(key) : '')
  ].join('\n'));
  if (valid) {
    score[key] = Math.min(score[key] || Infinity, time.get(key));
  }
}
var time = {
  start: function (key) {
    var time = process.hrtime();
    this['_' + key] = {
      start: time,
      end: null
    };
  },
  end: function (key) {
    var time = process.hrtime();
    this['_' + key].end = time;
    return this.get(key);
  },
  get: function (key){
    var time = this['_' + key];
    return  parseFloat(time.end.join('.')) -
            parseFloat(time.start.join('.'));
  }
};
var fs = require('fs'),
    fileName = __dirname + '/score.json',
    score = JSON.parse(
      fs.existsSync(fileName) ?
        fs.readFileSync(fileName) :
        '{}'
      ),
    tests = {
      'EventEmitter#on(single)': function (key) {
        time.start(key);
        for (var i = 0, fn = function(){return true}, result = []; i < 0xFFFF; i++) {
          result[i] = ((new EventEmitter).on('test', fn));
        }
        time.end(key);
        showAndSave(key, 0xFFFF);
      },
      'Object#on(single)': function (key) {
        time.start(key);
        for (var i = 0, fn = function(){return true}, result = []; i < 0xFFFF; i++) {
          result[i] = ({}.on('test', fn));
        }
        time.end(key);
        showAndSave(key, 0xFFFF);
      }
      ,
      'EventEmitter#on(typeN)': function (key) {
        time.start(key);
        for (var o = new EventEmitter, i = 0, fn = function(){return true}, result = []; i < 0xFFFF; i++) {
          o.on('test' + i, fn);
        }
        time.end(key);
        showAndSave(key, 0xFFFF);
      },
      'Object#on(typeN)': function (key) {
        time.start(key);
        for (var o = {}, i = 0, fn = function(){return true}, result = []; i < 0xFFFF; i++) {
          o.on('test' + i, fn);
        }
        time.end(key);
        showAndSave(key, 0xFFFF);
      }
      ,
      'EventEmitter#on(multiple)': function (key) {
        time.start(key);
        for (var i = 0, fn = function(){return true}, result = []; i < 0xFFFF; i++) {
          result[i] = (
            (new EventEmitter).on('test', function(){})
              .on('test', function(){})
              .on('test', function(){})
          );
        }
        time.end(key);
        showAndSave(key, 0xFFFF);
      },
      'Object#on(multiple)': function (key) {
        time.start(key);
        for (var i = 0, fn = function(){return true}, result = []; i < 0xFFFF; i++) {
          result[i] = (
            {}.on('test', function(){})
              .on('test', function(){})
              .on('test', function(){})
          );
        }
        time.end(key);
        showAndSave(key, 0xFFFF);
      }
      ,
      'EventEmitter#on(multipleN)': function (key) {
        time.start(key);
        for (var i = 0, fn = function(){return true}, result = []; i < 0xFFF; i++) {
          result[i] = (
            (new EventEmitter).on('test', function(){})
              .on('test' + i, function(){})
              .on('test' + i, function(){})
          );
        }
        time.end(key);
        showAndSave(key, 0xFFF);
      },
      'Object#on(multipleN)': function (key) {
        time.start(key);
        for (var i = 0, fn = function(){return true}, result = []; i < 0xFFF; i++) {
          result[i] = (
            {}.on('test', function(){})
              .on('test' + i, function(){})
              .on('test' + i, function(){})
          );
        }
        time.end(key);
        showAndSave(key, 0xFFF);
      },
      'EventEmitter#emit(single)': function (key) {
        for (var i = 0, fn = function(){return true}, result = []; i < 0xFFFF; i++) {
          result[i] = ((new EventEmitter).on('test', fn));
        }
        time.start(key);
        for (i = 0; i < 0xFFFF; i++) {
          result[i].emit('test', null, i);
        }
        time.end(key);
        showAndSave(key, 0xFFFF);
      }
      ,
      'Object#emit(single)': function (key) {
        for (var i = 0, fn = function(){return true}, result = []; i < 0xFFFF; i++) {
          result[i] = ({}.on('test', fn));
        }
        time.start(key);
        for (i = 0; i < 0xFFFF; i++) {
          result[i].emit('test', null, i);
        }
        time.end(key);
        showAndSave(key, 0xFFFF);
      }
      ,
      'EventEmitter#emit(multiple)': function (key) {
        for (var i = 0, result = []; i < 0xFFFF; i++) {
          result[i] = (
            (new EventEmitter).on('test', function(){})
              .on('test', function(){})
              .on('test', function(){})
          );
        }
        time.start(key);
        for (i = 0; i < 0xFFFF; i++) {
          result[i].emit('test', null, i);
        }
        time.end(key);
        showAndSave(key, 0xFFFF);
      },
      'Object#emit(multiple)': function (key) {
        for (var i = 0, result = []; i < 0xFFFF; i++) {
          result[i] = (
            {}.on('test', function(){})
              .on('test', function(){})
              .on('test', function(){})
          );
        }
        time.start(key);
        for (i = 0; i < 0xFFFF; i++) {
          result[i].emit('test', null, i);
        }
        time.end(key);
        showAndSave(key, 0xFFFF);
      },
      'EventEmitter#emit(multipleN)': function (key) {
        for (var i = 0, result = []; i < 0xFFF; i++) {
          result[i] = (
            (new EventEmitter).on('test', function(){})
              .on('test' + i, function(){})
              .on('test' + i + 1, function(){})
          );
        }
        time.start(key);
        for (i = 0; i < 0xFFF; i++) {
          result[i].emit('test', null, i);
          result[i].emit('test' + i, null, i);
          result[i].emit('test' + i + 1, null, i);
        }
        time.end(key);
        showAndSave(key, 0xFFF);
      },
      'Object#emit(multipleN)': function (key) {
        for (var i = 0, result = []; i < 0xFFF; i++) {
          result[i] = (
            {}.on('test', function(){})
              .on('test' + i, function(){})
              .on('test' + i + 1, function(){})
          );
        }
        time.start(key);
        for (i = 0; i < 0xFFF; i++) {
          result[i].emit('test', null, i);
          result[i].emit('test' + i, null, i);
          result[i].emit('test' + i + 1, null, i);
        }
        time.end(key);
        showAndSave(key, 0xFFF);
      },
      'EventEmitter#off(single)': function (key) {
        for (var i = 0, fn = function(){return true}, result = []; i < 0xFFFF; i++) {
          result[i] = ((new EventEmitter).on('test', fn));
        }
        time.start(key);
        for (i = 0; i < 0xFFFF; i++) {
          result[i].off('test', fn);
        }
        time.end(key);
        showAndSave(key, 0xFFFF);
      },
      'Object#off(single)': function (key) {
        for (var i = 0, fn = function(){return true}, result = []; i < 0xFFFF; i++) {
          result[i] = ({}.on('test', fn));
        }
        time.start(key);
        for (i = 0; i < 0xFFFF; i++) {
          result[i].off('test', fn);
        }
        time.end(key);
        showAndSave(key, 0xFFFF);
      }
      ,
      'EventEmitter#off(multiple)': function (key) {
        for (var i = 0,
          fn1 = function(){return 1},
          fn2 = function(){return 2},
          fn3 = function(){return 3},
          result = []; i < 0xFFFF; i++) {
            result[i] = (
              (new EventEmitter).on('test', fn1)
                .on('test', fn2)
                .on('test', fn3)
            );
        }
        time.start(key);
        for (i = 0; i < 0xFFFF; i++) {
          result[i]
            .off('test', fn1)
            .off('test', fn2)
            .off('test', fn3)
          ;
        }
        time.end(key);
        showAndSave(key, 0xFFFF);
      },
      'Object#off(multiple)': function (key) {
        for (var i = 0,
          fn1 = function(){return 1},
          fn2 = function(){return 2},
          fn3 = function(){return 3},
          result = []; i < 0xFFFF; i++) {
            result[i] = (
              {}.on('test', fn1)
                .on('test', fn2)
                .on('test', fn3)
            );
        }
        time.start(key);
        for (i = 0; i < 0xFFFF; i++) {
          result[i]
            .off('test', fn1)
            .off('test', fn2)
            .off('test', fn3)
          ;
        }
        time.end(key);
        showAndSave(key, 0xFFFF);
      }
    };

Object.keys(tests).forEach(function(key, i){
  //if (!!(i % 2))
  this[key](key);
}, tests);

process.on('exit', function () {
  console.log('');
  fs.writeFileSync(fileName, JSON.stringify(score));
});
