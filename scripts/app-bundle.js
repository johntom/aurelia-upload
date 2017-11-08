define('app',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function App(http) {
      _classCallCheck(this, App);

      http.configure(function (config) {
        config.withBaseUrl('http://localhost:3000/');
      });
      this.http = http;
      this.upmess = '';
    }

    App.prototype.submit = function submit(images) {
      var _this = this;

      var formData = new FormData();

      for (var i = 0; i < images.length; i++) {
        formData.append('file', images[i]);
      }
      console.log(formData, 'formData');

      this.http.fetch('upload', {
        mode: 'cors',
        method: 'POST',
        body: formData
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data.message);
        _this.upmess = data.message;
        console.log('this.upmess', _this.upmess);
      }).catch(function (error) {
        return console.log(error);
      });

      this.http.fetch('api/v1/getdir', {
        mode: 'cors',
        method: 'get'
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data.data);
        _this.files = data.data;
        console.log('this.files', _this.files);
      }).catch(function (error) {
        return console.log(error);
      });
    };

    App.prototype.activate = function activate() {
      var _this2 = this;

      this.http.fetch('api/v1/getdir', {
        mode: 'cors',
        method: 'get'
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data.data);
        _this2.files = data.data;
        console.log('this.files', _this2.files);
      }).catch(function (error) {
        return console.log(error);
      });
    };

    return App;
  }()) || _class);
});
define('BlobToUrlValueConverter',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var BlobToUrlValueConverter = exports.BlobToUrlValueConverter = function () {
    function BlobToUrlValueConverter() {
      _classCallCheck(this, BlobToUrlValueConverter);
    }

    BlobToUrlValueConverter.prototype.toView = function toView(blob) {
      return URL.createObjectURL(blob);
    };

    return BlobToUrlValueConverter;
  }();
});
define('date-format',[], function () {
  "use strict";
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('FileListToArrayValueConverter',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var FileListToArrayValueConverter = exports.FileListToArrayValueConverter = function () {
    function FileListToArrayValueConverter() {
      _classCallCheck(this, FileListToArrayValueConverter);
    }

    FileListToArrayValueConverter.prototype.toView = function toView(fileList) {
      var files = [];
      if (!fileList) {
        return files;
      }
      for (var i = 0; i < fileList.length; i++) {
        files.push(fileList.item(i));
      }
      return files;
    };

    return FileListToArrayValueConverter;
  }();
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n     <!--height: 200px;\r\n        img {\r\n      max-width: 200px;\r\n      height: auto;\r\n   \r\n    }-->\r\n    <!--max-height:95px;-->\r\n  <style>\r\n \r\n\r\nimg {\r\n  display: block;\r\n  max-width:200px;\r\n  max-height:200px;\r\n  width: auto;\r\n  height: auto;\r\n}\r\n\r\n\r\n    \r\n  </style>\r\n  <require from=\"./BlobToUrlValueConverter\"></require>\r\n  <require from=\"./FileListToArrayValueConverter\"></require>\r\n    <!--<require from=\"./date-format\"></require>-->\r\n  <!--must use name=file as that's what backend is expecting with multer' -->\r\n  <h1> Aurelia Upload Demo with Trails Backend ${upmess} </h1>\r\n  <form submit.delegate=\"submit(file)\">\r\n    <input type=\"file\" name=\"file\" files.bind=\"file\" multiple>\r\n    <button type=\"submit\">Upload files</button>\r\n\r\n  </form>\r\n\r\n\r\n  <div class=\"row\">\r\n\r\n    <ul>\r\n      <li repeat.for=\"onefile of file | fileListToArray\">\r\n\r\n        <div class=\"col s3\">\r\n          <p>${onefile.name}: ${onefile.type} ${onefile.size / 1000} kb</p>\r\n          <img src.bind=\"onefile | blobToUrl\"><img>\r\n          <!--<p>-modified:${file.lastModifiedDate| date:'year' }-</p>-->\r\n          <!--<p>Last Modified: ${file.lastModifiedDate| dateFormat:'year' } </p></div>\r\n                    <br>-->\r\n        </div>\r\n\r\n      </li>\r\n\r\n    </ul>\r\n\r\n  </div>\r\n\r\n\r\n  <div class=\"row\">\r\n\r\n    <ul>\r\n      <li repeat.for=\"file of files\">\r\n\r\n        <div class=\"col s6\">\r\n          <p><a target='_blank' href ='http://localhost:3000/api/v1/getfile/${file.url}'> ${file.url}</a>   </p>\r\n   \r\n        </div>\r\n\r\n      </li>\r\n\r\n    </ul>\r\n\r\n  </div>\r\n\r\n\r\n\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map