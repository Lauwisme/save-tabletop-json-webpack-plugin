'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tabletop = require('tabletop');

var _tabletop2 = _interopRequireDefault(_tabletop);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function SaveRemoteFilePlugin(options) {
    _classCallCheck(this, SaveRemoteFilePlugin);

    if (options instanceof Array) {
      this.options = options;
    } else {
      this.options = [options];
    }
  }

  _createClass(SaveRemoteFilePlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.hooks.emit.tapAsync({
        name: 'SaveTabletopJsonWebpackPlugin',
        context: true
      }, function (context, compilation, callback) {
        var count = _this.options.length;
        var tabletopInit = function tabletopInit(option) {
          var onLoadTabletopData = function onLoadTabletopData(data) {
            for (var key in data) {
              var obj = data[key];
              console.log(key);
              var dataString = JSON.stringify(obj.elements, null, 4);

              _fs2.default.writeFileSync(option.outputDir + key + '.json', dataString);
            }
          };
          option.callback = onLoadTabletopData;
          _tabletop2.default.init(option);
        };
        _this.options.forEach(tabletopInit);
      });
    }
  }]);

  return SaveRemoteFilePlugin;
}();
