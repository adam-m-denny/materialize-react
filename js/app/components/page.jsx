define(function(require){
  var React = require('react');
  var ReactDom = require('react-dom');
  var mat = require('materialize');
var Router = require('react-router').Router;
  var Header = require('jsx!app/components/header');

  var Footer = require('jsx!app/components/footer');

  var Page = React.createClass({

    getInitialState: function(){
      var location = window.location.href.split('/');
      var locationEnd = location[location.length - 1];
      return {
        title: "",
        content: "",
        loaded: false,
        loc: locationEnd,
        posts: [
          {
            post_title: "",
            post_content: ""
          },
          {
            post_title: "",
            post_content: ""
          },
          {
            post_title: "",
            post_content: ""
          },
          {
            post_title: "",
            post_content: ""
          }
        ],
      }
    },
    componentWillMount: function(){
      console.log(this.props);
    },
    componentDidMount: function(){

    },
    sortByKey: function(array, key) {
      return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    },
    render: function(){
      var location = window.location.href.split('/');
      var locationEnd = location[location.length - 1];
      
      if(!this.state.loaded){
        for(var i = 0; i < this.props.posts.length; ++i){
          var title = locationEnd.replace("%20", " ");
          if(this.props.posts[i].post_title == title){
            this.setState({
              title: this.props.posts[i].post_title,
              content: this.props.posts[i].post_content,
              loaded: true
            });
          }
        }
      }
      if(this.state.loaded){
        console.log(this.state.title);
        return (
          <div id="wrapper">
            <Header postData={this.state.posts} routeHandler={this.handleRoute}/>
          <div className="container" key={locationEnd}>
            <div className="row">
              <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">{this.state.title}</span>
                    <p>{this.state.content}</p>
                  </div>
                  <div className="card-action">
                    <a href="#">This is a link</a>
                    <a href="#">This is a link</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <Footer />
          </div>
        )
      } else {
        return (<div>loading...</div>);
      }
    }
  });
return Page;
});
