define(function(require){
  var React = require('react');
  var ReactDom = require('react-dom');

  var Header = require('jsx!app/components/header');
  var Body = require('jsx!app/components/body');
  var Home = require('jsx!app/components/Home');
  var Page = require('jsx!app/components/page');
  var Footer = require('jsx!app/components/footer');

  var Router = require('react-router').Router;
  var Route = require('react-router').Route;
  var Link = require('react-router').Link;
  var browserHistory = require('react-router').browserHistory;


  function App(){
    var PageView = React.createClass({
      getInitialState: function(){
        return {
            loaded: false
          }
      },
      componentWillMount: function(){
        $.ajax(rootDir + "/ajax-listener.php", {
          method: 'POST',
          data: {request: "pages"},
          dataType: 'json',
          success: function(s){
            var results = this.sortByKey(s, "menu_order");
            this.setState({
              posts: results,
              loaded: true,
            });
          }.bind(this)
        });
      },
      sortByKey: function(array, key) {
        return array.sort(function(a, b) {
          var x = a[key]; var y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      },
      render: function(){
        if(this.state.loaded){
          return (
            <Page posts={this.state.posts} />
          )
        } else {
          return (
            <div>Loading...</div>
          )
        }
      }
    });
    this.AppView = React.createClass({
      getInitialState: function() {
        return {
          posts: [],
          route: 0
        };
      },
      handleRoute: function(route){
        this.setState({
          route: route
        });
      },
      componentDidMount: function(){
       $.ajax(rootDir + "/ajax-listener.php", {
         method: 'post',
         dataType: 'json',
         success: function(s){
           this.setState({
             posts: s
           });
         }.bind(this)
       });
      },
      postData: function(){
        return $.ajax(rootDir + "/ajax-listener.php", {
            method: 'post',
            dataType: 'json',
            success: function(s){
              return s;
            }
          });
      },
      render: function() {
        return (
          <div id="wrapper">
            <Header postData={this.state.posts} routeHandler={this.handleRoute}/>
            <Body route={this.state.route}/>
            <Footer postData={this.state.posts} routeHandler={this.handleRoute}/>
          </div>
        );
      }
    });
  }

  App.prototype.init = function () {
    ReactDom.render(<this.AppView />, document.getElementById('render-target'), function(e,s){
      //console.log(e);
      //console.log(s);
    });
  };

  return App;
});
