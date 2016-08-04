require.config({
  paths: {
    "react": "bower_components/react/react-with-addons",
    "react-dom": "bower_components/react/react-dom.min",
    "react-router": "bower_components/react-router/umd/ReactRouter",
    "babel": "bower_components/requirejs-react-jsx/babel-5.8.34.min",
    "jsx": "bower_components/requirejs-react-jsx/jsx",
    "text": "bower_components/requirejs-text/text",
    "jquery": "bower_components/jquery/dist/jquery",
    "materialize": "bower_components/Materialize/dist/js/materialize.min",
    "hammerjs": "bower_components/hammerjs/hammer.min",
    "jquery-hammerjs": "bower_components/jquery-hammerjs/jquery.hammer",
  },

  shim : {
    "react": {
      "exports": "React"
    },
    'materialize': {
      deps: ['jquery', 'jquery-hammerjs']
    },
    'jquery': {
      exports: '$'
    }
  },

  config: {
    babel: {
      sourceMaps: "inline", // One of [false, 'inline', 'both']. See https://babeljs.io/docs/usage/options/
      fileExtension: ".jsx" // Can be set to anything, like .es6 or .js. Defaults to .jsx
    }
  }
});

require(['jsx!app'], function(App){

  var app = new App();
  app.init();

});
