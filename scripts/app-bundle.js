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
    };

    return App;
  }()) || _class);
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
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <h1> Upload demo  ${upmess} </h1>\r\n  <form submit.delegate=\"submit(file)\">\r\n    <input type=\"file\" name=\"file\" files.bind=\"file\" multiple>\r\n    <button type=\"submit\">Send  via code</button>\r\n   \r\n  </form>\r\n\r\n  <!--<form submit.delegate=\"submit(file)\">\r\n    <input type=\"file\" name=\"images\" files.bind=\"images\" multiple>\r\n    <button type=\"submit\">Send  via code</button>\r\n  </form>-->\r\n\r\n\r\n  <!-- /////////////////////////////////////  -->\r\n\r\n  <!--<form class=\"pure-form pure-form-stacked\" action=\"http://localhost:8880/api/v1/uploadcsv\" method=\"post\" enctype=\"multipart/form-data\">-->\r\n     <!--<form class=\"pure-form pure-form-stacked\" action=\"http://localhost:3000/attachments\" method=\"post\" enctype=\"multipart/form-data\">\r\n \r\n    <fieldset>\r\n  \r\n      <label for=\"subject\">Attachment smethod=\"post\"<label>\r\n      <input name=\"file\" type=\"file\" placeholder=\"Password\">\r\n      <button class=\"pure-button pure-button-primary\">Send</button>\r\n    </fieldset>\r\n  </form>\r\n\r\n\r\n   <form class=\"pure-form pure-form-stacked\" action=\"http://localhost:3000/attachments\" method=\"post\" enctype=\"multipart/form-data\">\r\n \r\n    <fieldset>\r\n  \r\n      <label for=\"subject\">Attachment smethod=\"post\"<label>\r\n      <input name=\"file\" type=\"file\" placeholder=\"Password\">\r\n      <button class=\"pure-button pure-button-primary\">Send</button>\r\n    </fieldset>\r\n  </form>-->\r\n\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map